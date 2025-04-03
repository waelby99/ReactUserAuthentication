# AuthAppFrontend

## 📋 Description
AuthApp Frontend est une interface utilisateur moderne développée avec React et Vite qui se connecte au backend AuthAppBackend. Cette application offre une expérience utilisateur fluide pour l'authentification, la vérification d'email et la gestion de compte, avec un design responsive réalisé avec Tailwind CSS.

## 🚀 Fonctionnalités

- **Interface utilisateur complète**
  - Inscription et connexion
  - Vérification d'email par code OTP
  - Réinitialisation de mot de passe
  - Page d'accueil personnalisée

- **Conception moderne**
  - Un Design responsive avec Tailwind CSS
  - Interface utilisateur intuitive et accessible
  - Navigation fluide entre les pages

- **État d'appplication géré**
  - Gestion du contexte avec React Context API
  - État de connexion persistant
  - Récupération et stockage des données utilisateur

- **Communication sécurisée**
  - Requêtes API avec axios
  - Support des cookies d'authentification
  - Gestion des erreurs avec notifications toast

## 🛠️ Technologies

- **React** - Bibliothèque UI
- **Vite** - Outil de build rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Navigation entre les pages
- **Axios** - Client HTTP pour les requêtes API
- **React Toastify** - Notifications utilisateur
- **Context API** - Gestion de l'état global

## 📦 Installation

```bash
# Cloner le dépôt
git clone https://github.com/waelby99/ReactUserAuthentication.git
cd ReactUserAuthentication

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Modifier le fichier .env avec vos propres valeurs

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## 🔧 Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
VITE_BACKEND_URL=http://localhost:5000
```

## 📁 Structure du projet

```
authapp/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── EmailVerify.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── ResetPassword.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
└── package.json
```

## 🧩 Composants principaux

### AppContext.jsx

Le contexte global de l'application qui gère :
- L'état d'authentification
- Les données utilisateur
- Les requêtes API vers le backend

```jsx
// Exemple d'utilisation dans un composant
import { useContext } from 'react';
import { AppContent } from '../context/AppContext';

function MyComponent() {
  const { isLoggedin, userData } = useContext(AppContent);
  
  return (
    <div>
      {isLoggedin ? (
        <p>Bienvenue, {userData?.name}!</p>
      ) : (
        <p>Veuillez vous connecter</p>
      )}
    </div>
  );
}
```

### Pages principales

- **Home.jsx** - Page d'accueil pour les utilisateurs authentifiés
- **Login.jsx** - Formulaire de connexion
- **EmailVerify.jsx** - Page de vérification d'email
- **ResetPassword.jsx** - Page de réinitialisation de mot de passe

## 🔐 Communication avec le Backend

Le frontend communique avec le backend via des requêtes axios. Les cookies sont automatiquement inclus dans les requêtes grâce à :

```jsx
axios.defaults.withCredentials = true;
```

Exemple de requête API :

```jsx
const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
      email,
      password
    });
    
    if (data.success) {
      setIsLoggedin(true);
      await getUserData();
      toast.success("Connexion réussie!");
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};
```

## 🎨 Personnalisation du style

Le projet utilise Tailwind CSS pour le styling. Vous pouvez personnaliser l'apparence en modifiant :

- `index.css` - Pour les styles globaux
- Les classes Tailwind directement dans les composants

## 📱 Responsive Design

L'interface s'adapte automatiquement à différentes tailles d'écran grâce à Tailwind CSS :

```jsx
// Exemple d'élément responsive
<div className="w-full md:w-1/2 lg:w-1/3 p-4">
  {/* Contenu */}
</div>
```

## 📄 Licence

ISC

## 👨‍💻 Auteur

Wael Ben Youssef

---

⭐ Si vous trouvez ce projet utile, n'hésitez pas à lui attribuer une étoile sur GitHub !
