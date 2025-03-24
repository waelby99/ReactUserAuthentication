import React, {useContext} from 'react'
import {assets} from "../assets/assets.js";
import {AppContent} from "../context/AppContext.jsx";

const Header = () => {
    const {userData}=useContext(AppContent)
    return (
        <div className='flex flex-col items-center mt-20 px-4 text-center'>
            <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6'/>
            <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'> Salut {userData ? userData.name+" "+userData.lname : "fuckk"} !
                <img src={assets.hand_wave} alt="" className='w-8 aspect-square'/></h1>
            <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Bienvenu dan notre Application </h2>
            <p className='mb-8 max-w-md'>Lorem ipsum erggre egfzrg zrgze zrgz verzgz regzegr berztbt gerz</p>
            <button className='border border-gray-500 rouded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Commencer</button>
        </div>
    )
}
export default Header
