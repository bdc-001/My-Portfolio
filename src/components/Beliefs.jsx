import { BELIEFS } from "../constants";
import { motion } from "framer-motion";

const Beliefs = () => {
    return (
        <div className="py-24 border-b border-neutral-100">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                {/* Left Side: Headline */}
                <div className="flex-1 lg:sticky lg:top-32 lg:self-start">

                    <h2 className="text-6xl lg:text-8xl font-bold text-primary tracking-tighter leading-[0.9] mb-12">
                        What I<br />
                        Believe
                    </h2>

                    {/* Decorative Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative mt-8"
                    >
                        <svg width="100%" height="280" viewBox="0 0 400 200" className="overflow-visible">
                            <defs>
                                <linearGradient id="magnetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ef4444" /> {/* Red-ish like a magnet */}
                                    <stop offset="50%" stopColor="#f87171" />
                                    <stop offset="100%" stopColor="#ef4444" />
                                </linearGradient>
                                <radialGradient id="ballGradient" cx="30%" cy="30%" r="70%">
                                    <stop offset="0%" stopColor="#e5e5e5" />
                                    <stop offset="100%" stopColor="#a3a3a3" />
                                </radialGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Magnet Body (U-Shape) */}
                            <motion.path
                                d="M 50 50 L 50 100 A 60 60 0 0 0 170 100 L 170 50 L 130 50 L 130 100 A 20 20 0 0 1 90 100 L 90 50 Z"
                                fill="url(#magnetGradient)"
                                stroke="#dc2626"
                                strokeWidth="2"
                                transform="rotate(-90, 110, 100) translate(-20, 0)" // Rotated to face right
                                filter="url(#glow)"
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            />

                            {/* Magnet Poles (White Tips) */}
                            <motion.path
                                d="M 50 50 L 90 50 L 90 70 L 50 70 Z"
                                fill="white"
                                transform="rotate(-90, 110, 100) translate(-20, 0)"
                                opacity="0.9"
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M 130 50 L 170 50 L 170 70 L 130 70 Z"
                                fill="white"
                                transform="rotate(-90, 110, 100) translate(-20, 0)"
                                opacity="0.9"
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            />

                            {/* Text on Magnet */}
                            <text
                                x="80"
                                y="115"
                                transform="rotate(0)"
                                fill="white"
                                fontSize="14"
                                fontWeight="bold"
                                letterSpacing="1"
                                className="font-sans"
                            >
                                BELIEFS
                            </text>

                            {/* Attraction Lines (Lightning/Force) */}
                            <motion.g
                                stroke="#a855f7"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="4 4"
                                opacity="0.6"
                            >
                                <motion.path d="M 180 80 Q 230 70 280 90"
                                    animate={{ strokeDashoffset: [0, -20] }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.path d="M 180 100 L 275 100"
                                    animate={{ strokeDashoffset: [0, -20] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.path d="M 180 120 Q 230 130 280 110"
                                    animate={{ strokeDashoffset: [0, -20] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                />
                            </motion.g>

                            {/* Ball (Actions) */}
                            <motion.circle
                                cx="300"
                                cy="100"
                                r="40"
                                fill="url(#ballGradient)"
                                stroke="#737373"
                                strokeWidth="1"
                                initial={{ x: 10 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            >
                            </motion.circle>

                            {/* Text on Ball */}
                            <text x="300" y="105" textAnchor="middle" fill="#404040" fontSize="10" fontWeight="bold" className="font-sans uppercase">
                                Actions
                            </text>

                            {/* Reflection on Ball */}
                            <circle cx="285" cy="85" r="10" fill="white" opacity="0.4" />
                        </svg>

                        {/* Background Glows */}
                        <div className="absolute top-10 left-10 w-32 h-32 bg-red-100 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-40"></div>
                        <div className="absolute top-10 right-20 w-32 h-32 bg-purple-100 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-40"></div>
                    </motion.div>
                </div>

                {/* Right Side: List */}
                <div className="flex-1 flex flex-col gap-6">
                    {BELIEFS.map((belief, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-purple-600 transition-colors">
                                {belief.id}. {belief.title}
                            </h3>
                            <p className="text-neutral-500 leading-relaxed text-sm">
                                {belief.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Beliefs;
