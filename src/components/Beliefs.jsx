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
                        className="hidden lg:block relative"
                    >
                        <svg width="300" height="300" viewBox="0 0 200 200" className="opacity-80">
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 0.2 }} />
                                    <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
                                </linearGradient>
                            </defs>

                            {/* Abstract Geometric Shapes */}
                            <motion.circle
                                cx="100" cy="100" r="80"
                                stroke="url(#grad1)" strokeWidth="1" fill="none"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.circle
                                cx="100" cy="100" r="60"
                                stroke="currentColor" strokeWidth="0.5" className="text-neutral-200" fill="none"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Connecting Nodes */}
                            <g className="text-neutral-300" fill="currentColor">
                                <circle cx="100" cy="20" r="4" />
                                <circle cx="180" cy="100" r="4" />
                                <circle cx="100" cy="180" r="4" />
                                <circle cx="20" cy="100" r="4" />
                            </g>

                            {/* Cross lines */}
                            <motion.path
                                d="M100 20 L100 180 M20 100 L180 100"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                className="text-neutral-200"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </svg>

                        {/* Floating visual elements */}
                        <div className="absolute top-0 right-10 w-20 h-20 bg-purple-100 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50 animate-blob"></div>
                        <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-100 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50 animate-blob animation-delay-2000"></div>
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
