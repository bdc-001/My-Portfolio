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
                    {/* Minimalist Graphic: Alignment */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="hidden lg:block relative mt-16 opacity-90"
                    >
                        <svg width="100%" height="160" viewBox="0 0 320 120" className="overflow-visible">
                            {/* Magnet (Source/Beliefs) - Minimal Line Art */}
                            <motion.g
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            >
                                {/* U-Shape */}
                                <path
                                    d="M 40 30 L 100 30 A 30 30 0 0 1 100 90 L 40 90"
                                    fill="none"
                                    stroke="#262626"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 40 42 L 95 42 A 18 18 0 0 1 95 78 L 40 78"
                                    fill="none"
                                    stroke="#e5e5e5"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                {/* Label */}
                                <text x="35" y="105" className="font-sans text-[10px] tracking-[0.2em] font-semibold fill-neutral-400">BELIEFS</text>
                            </motion.g>

                            {/* Ball (Target/Actions) - Solid Circle */}
                            <motion.g
                                initial={{ x: 10 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            >
                                <circle
                                    cx="240"
                                    cy="60"
                                    r="14"
                                    fill="#262626"
                                />
                                {/* Label */}
                                <text x="240" y="105" textAnchor="middle" className="font-sans text-[10px] tracking-[0.2em] font-semibold fill-neutral-400">ACTIONS</text>
                            </motion.g>

                            {/* Force Lines - Subtle Dash Animation */}
                            <defs>
                                <linearGradient id="fadeLine" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0" stopColor="#a855f7" stopOpacity="0" />
                                    <stop offset="0.5" stopColor="#a855f7" stopOpacity="0.4" />
                                    <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Top Field Line */}
                            <motion.path
                                d="M 120 40 Q 180 40 220 55"
                                fill="none"
                                stroke="url(#fadeLine)"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                animate={{ strokeDashoffset: [20, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Center Field Line */}
                            <motion.path
                                d="M 120 60 L 215 60"
                                fill="none"
                                stroke="url(#fadeLine)"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                animate={{ strokeDashoffset: [20, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Bottom Field Line */}
                            <motion.path
                                d="M 120 80 Q 180 80 220 65"
                                fill="none"
                                stroke="url(#fadeLine)"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                animate={{ strokeDashoffset: [20, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                        </svg>
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
                            className="p-10 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-purple-600 transition-colors">
                                <span className="text-neutral-300 mr-3 text-lg align-middle transform translate-y-[-2px] inline-block">0{index + 1}.</span>
                                {belief.title}
                            </h3>
                            <p className="text-neutral-500 leading-relaxed text-base md:text-lg pl-0 md:pl-10">
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
