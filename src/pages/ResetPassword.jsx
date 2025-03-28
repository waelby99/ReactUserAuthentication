import React, { useContext, useState, useRef } from 'react'
import { assets } from "../assets/assets.js"
import { useNavigate } from "react-router-dom"
import { AppContent } from "../context/AppContext.jsx"
import axios from "axios"
import { toast } from "react-toastify"

const ResetPassword = () => {
    const { backendUrl } = useContext(AppContent)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
    const inputRefs = useRef(Array(6).fill(null))

    const handleInput = (e, index) => {
        const value = e.target.value
        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData('text').slice(0, 6)
        pasteData.split('').forEach((char, i) => {
            if (inputRefs.current[i]) {
                inputRefs.current[i].value = char
                const event = new Event('input', { bubbles: true })
                inputRefs.current[i].dispatchEvent(event)
            }
        })
    }

    const handleSubmitEmail = async (e) => {
        e.preventDefault()
        if (!email.trim()) {
            toast.error('Veuillez entrer votre adresse email')
            return
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/sendreset`, { email })
            if (data.success) {
                toast.success('Un code de vérification a été envoyé à votre email')
                setIsEmailSent(true)
            } else {
                toast.error(data.message || 'Erreur lors de l\'envoi du code')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur de connexion au serveur')
        }
    }

    const handleSubmitOtp = async (e) => {
        e.preventDefault()
        const otpCode = inputRefs.current.map(input => input.value).join('')

        if (otpCode.length !== 6) {
            toast.error('Veuillez entrer les 6 chiffres du code reçu')
            return
        }

        setOtp(otpCode)
        setIsOtpSubmitted(true)
        toast.success('Code validé avec succès')
    }

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault()
        const missingFields = []
        if (!email) missingFields.push('Email')
        if (!otp) missingFields.push('Code OTP')
        if (!newPassword) missingFields.push('Nouveau mot de passe')

        if (missingFields.length > 0) {
            toast.error(`Champs manquants : ${missingFields.join(', ')}`)
            return
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/resetpwd`, {
                email,
                otp,
                newpassword: newPassword
            })

            if (data.success) {
                toast.success('Mot de passe réinitialisé avec succès!')
                navigate('/login')
            } else {
                toast.error(data.message || 'Échec de la réinitialisation')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de la réinitialisation')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
            <img
                src={assets.logo}
                alt="Logo"
                className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
                onClick={() => navigate('/')}
            />

            {!isEmailSent && (
                <form onSubmit={handleSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-white text-2xl font-bold mb-4 text-center">Réinitialisation de mot de passe</h2>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm mb-2">Adresse Email</label>
                        <div className="flex items-center gap-3 p-3 rounded-full bg-[#333A5C]">
                            <img src={assets.mail_icon} alt="Email" className="w-4 h-4" />
                            <input
                                type="email"
                                placeholder="exemple@domain.com"
                                className="w-full bg-transparent outline-none text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
                    >
                        Envoyer le code
                    </button>
                </form>
            )}

            {isEmailSent && !isOtpSubmitted && (
                <form onSubmit={handleSubmitOtp} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-white text-2xl font-bold mb-4 text-center">Vérification du code</h2>
                    <p className="text-gray-300 text-sm mb-6 text-center">
                        Entrez le code à 6 chiffres reçu par email
                    </p>
                    <div className="flex justify-between mb-8" onPaste={handlePaste}>
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="w-12 h-12 text-center text-xl bg-[#333A5C] text-white rounded-md"
                                ref={(el) => (inputRefs.current[index] = el)}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
                    >
                        Vérifier le code
                    </button>
                </form>
            )}

            {isOtpSubmitted && isEmailSent && (
                <form onSubmit={handleSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-white text-2xl font-bold mb-4 text-center">Nouveau mot de passe</h2>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm mb-2">Nouveau mot de passe</label>
                        <div className="flex items-center gap-3 p-3 rounded-full bg-[#333A5C]">
                            <img src={assets.lock_icon} alt="Mot de passe" className="w-4 h-4" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-transparent outline-none text-white"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
                    >
                        Réinitialiser le mot de passe
                    </button>
                </form>
            )}
        </div>
    )
}

export default ResetPassword