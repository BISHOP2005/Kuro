import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiShield, FiZap } from 'react-icons/fi';

export default function Home() {
    return (
        <div className="min-h-screen bg-dark-900 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-100 sm:text-7xl"
                    >
                        Connect instantly with{' '}
                        <span className="relative whitespace-nowrap text-blue-500">
                            <span className="relative">Kuro</span>
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-400"
                    >
                        A modern, secure, and lightning-fast chat application built for seamless communication.
                        Experience real-time messaging with a sleek dark interface.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-10 flex justify-center gap-x-6"
                    >
                        <Link
                            to="/signup"
                            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:bg-blue-700 hover:text-slate-100 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
                        >
                            Get started
                        </Link>
                        <Link
                            to="/login"
                            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-800 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
                        >
                            Log in
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-dark-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FiZap className="w-8 h-8 text-yellow-400" />}
                            title="Lightning Fast"
                            description="Real-time message delivery with zero latency. Stay connected instantly."
                        />
                        <FeatureCard
                            icon={<FiShield className="w-8 h-8 text-green-400" />}
                            title="Secure"
                            description="Your conversations are private and secure with robust authentication."
                        />
                        <FeatureCard
                            icon={<FiMessageSquare className="w-8 h-8 text-blue-400" />}
                            title="Modern UI"
                            description="A beautiful dark-themed interface designed for comfort and focus."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-dark-700 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </motion.div>
    );
}
