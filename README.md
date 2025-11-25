# Kuro Chat Application

![Kuro Banner](https://placehold.co/1200x400/121212/3b82f6?text=Kuro+Chat)

**Live Demo:** [https://kuro-ccf9c.web.app](https://kuro-ccf9c.web.app)

Kuro is a modern, real-time chat application built with React, Tailwind CSS, and Firebase. It features a sleek dark-themed UI, secure authentication, and instant messaging capabilities with private 1-on-1 chat rooms.

## 🚀 Features

-   **Real-time Messaging**: Instant message delivery using Firebase Realtime Database.
-   **Private 1-on-1 Chats**: Dedicated chat rooms for private conversations.
-   **User Profiles**: Customizable display names and avatars.
-   **Secure Authentication**: Email/Password login and signup via Firebase Auth.
-   **Live User Status**: See who is registered and start chatting immediately.
-   **Responsive Design**: Fully optimized for desktop and mobile devices.
-   **Dark Mode**: A carefully crafted dark theme for reduced eye strain.
-   **Modern UI**: Glassmorphism effects, smooth animations, and a clean interface.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite
-   **Styling**: Tailwind CSS v4, PostCSS
-   **Backend/Database**: Firebase (Auth, Realtime Database, Hosting)
-   **Routing**: React Router DOM
-   **Animations**: Framer Motion
-   **Icons**: React Icons
-   **Utilities**: date-fns, uuid

## 📂 Project Structure

```
d:/Kuro/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components (Navbar, etc.)
│   ├── context/         # React Context (AuthContext)
│   ├── pages/           # Application pages (Home, Login, Signup, Dashboard)
│   ├── App.jsx          # Main application component with routing
│   ├── firebase.js      # Firebase configuration
│   ├── index.css        # Global styles and Tailwind setup
│   └── main.jsx         # Entry point
├── .env                 # Environment variables (not committed)
├── .firebaserc          # Firebase project configuration
├── firebase.json        # Firebase Hosting configuration
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## ⚡ Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   A Firebase project

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/kuro-chat.git
    cd kuro-chat
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Firebase credentials:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🔒 Security

-   Firebase credentials are stored in `.env` and excluded from version control.
-   Database rules should be configured to allow read/write access only to authenticated users.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
