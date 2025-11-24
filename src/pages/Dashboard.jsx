import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { FiSend, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';

export default function Dashboard() {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
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

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-dark-900 overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 bg-dark-800 border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-xl font-semibold text-white">Chats</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {users.map(user => (
                        <div
                            key={user.uid}
                            onClick={() => setSelectedUser(user)}
                            className={`p-4 flex items-center cursor-pointer hover:bg-dark-700 transition-colors ${selectedUser?.uid === user.uid ? 'bg-dark-700' : ''}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {user.email[0].toUpperCase()}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">{user.email}</p>
                                <p className="text-xs text-gray-400">Online</p>
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
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {selectedUser.email[0].toUpperCase()}
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-white">{selectedUser.email}</h3>
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
        </div>
    );
}
