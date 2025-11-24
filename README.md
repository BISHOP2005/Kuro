# Kuro Chat Application

A modern, real-time messaging web application built with React, Tailwind CSS, and Firebase.

## Features

- 🔐 **Secure Authentication**: Email/password authentication with Firebase Auth
- 💬 **Real-time Messaging**: Instant message delivery using Firebase Realtime Database
- 🌙 **Dark Theme**: Sleek, modern dark-themed UI
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ✨ **Smooth Animations**: Powered by Framer Motion

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **Backend**: Firebase (Authentication + Realtime Database)
- **Routing**: React Router v7
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BISHOP2005/Kuro.git
cd Kuro
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_DATABASE_URL=your_database_url_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

You can use `.env.example` as a template.

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in Authentication settings
3. Create a Realtime Database
4. Set up database rules (see below)

### Database Rules

```json
{
  "rules": {
    "users": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "messages": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx          # Navigation component
├── context/
│   └── AuthContext.jsx     # Authentication context
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Login.jsx           # Login page
│   ├── Signup.jsx          # Signup page
│   └── Dashboard.jsx       # Chat interface
├── firebase.js             # Firebase configuration
├── main.jsx                # App entry point
└── index.css               # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Known Issues

- Message reception may require page refresh in some cases (debugging in progress)
- Firebase security rules need to be configured manually

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Firebase](https://firebase.google.com/)
