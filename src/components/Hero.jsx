import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/HeroImageFinal.png";
import { motion } from "framer-motion";

const container = (delay) => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, delay: delay, ease: "easeOut" },
    },
});

const Hero = () => {
    return (
        <div className="border-b border-neutral-100 py-20 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col font-sans">
                        <motion.div
                            variants={container(0)}
                            initial="hidden"
                            animate="visible"
                            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-full mb-6 w-max"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                            Product Manager
                        </motion.div>
                        <motion.h1
                            variants={container(0.2)}
                            initial="hidden"
                            animate="visible"
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6 text-balance"
                        >
                            Arsalaan Mohammed <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-500">
                                Crafting AI Products !
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={container(0.4)}
                            initial="hidden"
                            animate="visible"
                            className="max-w-xl text-lg sm:text-xl text-neutral-500 leading-relaxed font-medium"
                        >
                            {HERO_CONTENT}
                        </motion.p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10"
                    >
                        <img
                            src={profilePic}
                            alt="Arsalaan Mohammed - Product Manager"
                            className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[28rem] lg:h-[34rem] object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105"
                            fetchPriority="high"
                            loading="eager"
                            width="448"
                            height="544"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
