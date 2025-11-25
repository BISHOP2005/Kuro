import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase';
import { ref, onValue, push, serverTimestamp, update } from 'firebase/database';
import { updateProfile } from 'firebase/auth';
import { FiSend, FiUser, FiSettings, FiX } from 'react-icons/fi';
import { format } from 'date-fns';

export default function Dashboard() {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [displayName, setDisplayName] = useState(currentUser.displayName || '');
    const [avatarUrl, setAvatarUrl] = useState(currentUser.photoURL || '');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const usersRef = ref(database, 'users');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const userList = Object.values(data).filter(user => user.uid !== currentUser.uid);
                setUsers(userList);
            }
        });

        return unsubscribe;
    }, [currentUser]);

    useEffect(() => {
        if (!selectedUser) return;

        const chatId = [currentUser.uid, selectedUser.uid].sort().join('_');
        const messagesRef = ref(database, `messages/${chatId}`);

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMessages(Object.values(data));
            } else {
                setMessages([]);
            }
        });

        return unsubscribe;
    }, [selectedUser, currentUser]);

    // Fetch last message for each user
    useEffect(() => {
        if (users.length === 0) return;

        const unsubscribes = users.map(user => {
            const chatId = [currentUser.uid, user.uid].sort().join('_');
            const lastMessageRef = ref(database, `messages/${chatId}`);
            // In a real app, we'd use limitToLast(1) query, but for simplicity we'll just listen to the node
            // and get the last value. Optimizing this would be a good future step.
            return onValue(lastMessageRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const msgs = Object.values(data);
                    const lastMsg = msgs[msgs.length - 1];
                    setUsers(prevUsers => prevUsers.map(u =>
                        u.uid === user.uid ? { ...u, lastMessage: lastMsg } : u
                    ));
                }
            });
        });

        return () => unsubscribes.forEach(unsub => unsub());
    }, [users.length, currentUser.uid]); // Dependency on users.length to avoid infinite loop with setUsers

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    async function handleSendMessage(e) {
        e.preventDefault();
        if (!message.trim() || !selectedUser) return;

        const chatId = [currentUser.uid, selectedUser.uid].sort().join('_');
        const messagesRef = ref(database, `messages/${chatId}`);

        await push(messagesRef, {
            text: message,
            senderId: currentUser.uid,
            timestamp: serverTimestamp()
        });

        setMessage('');
    }

    async function handleUpdateProfile(e) {
        e.preventDefault();
        try {
            await updateProfile(currentUser, {
                displayName: displayName,
                photoURL: avatarUrl
            });

            const userRef = ref(database, `users/${currentUser.uid}`);
            await update(userRef, {
                displayName: displayName,
                photoURL: avatarUrl
            });

            setShowProfileModal(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-dark-900 overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 bg-dark-800 border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Chats</h2>
                    <button
                        onClick={() => setShowProfileModal(true)}
                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <FiSettings />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {users.map(user => (
                        <div
                            key={user.uid}
                            onClick={() => setSelectedUser(user)}
                            className={`p-4 flex items-center cursor-pointer hover:bg-dark-700 transition-colors ${selectedUser?.uid === user.uid ? 'bg-dark-700' : ''}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold overflow-hidden">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt={user.email} className="w-full h-full object-cover" />
                                ) : (
                                    user.email[0].toUpperCase()
                                )}
                            </div>
                            <div className="ml-3 flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline">
                                    <p className="text-sm font-medium text-white truncate">{user.displayName || user.email}</p>
                                    {user.lastMessage && (
                                        <span className="text-xs text-gray-500 ml-2">
                                            {user.lastMessage.timestamp ? format(new Date(user.lastMessage.timestamp), 'HH:mm') : ''}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 truncate">
                                    {user.lastMessage ? (
                                        <span className={user.lastMessage.senderId === currentUser.uid ? 'text-gray-500' : 'text-white'}>
                                            {user.lastMessage.senderId === currentUser.uid ? 'You: ' : ''}{user.lastMessage.text}
                                        </span>
                                    ) : (
                                        'Start a conversation'
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="p-4 border-b border-white/10 bg-dark-800 flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold overflow-hidden">
                                {selectedUser.photoURL ? (
                                    <img src={selectedUser.photoURL} alt={selectedUser.email} className="w-full h-full object-cover" />
                                ) : (
                                    selectedUser.email[0].toUpperCase()
                                )}
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-white">{selectedUser.displayName || selectedUser.email}</h3>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-900">
                            {messages.map((msg, index) => {
                                const isMe = msg.senderId === currentUser.uid;
                                return (
                                    <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-dark-700 text-white rounded-bl-none'}`}>
                                            <p>{msg.text}</p>
                                            <p className={`text-xs mt-1 ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                                                {msg.timestamp ? format(new Date(msg.timestamp), 'HH:mm') : 'Sending...'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 bg-dark-800 border-t border-white/10 flex gap-4">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-dark-900 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                            />
                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <FiSend />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400 flex-col">
                        <FiUser className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-xl">Select a user to start chatting</p>
                    </div>
                )}
            </div>

            {/* Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-dark-800 p-6 rounded-xl border border-white/10 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
                            <button onClick={() => setShowProfileModal(false)} className="text-gray-400 hover:text-white">
                                <FiX size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Display Name</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Avatar URL</label>
                                <input
                                    type="text"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
