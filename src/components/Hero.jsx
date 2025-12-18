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
                        <motion.span
                            variants={container(0)}
                            initial="hidden"
                            animate="visible"
                            className="text-base sm:text-lg text-secondary mb-3 sm:mb-4 font-medium"
                        >
                            Hi! I'm Arsalaan, a Product Manager from India.
                        </motion.span>
                        <motion.h1
                            variants={container(0.2)}
                            initial="hidden"
                            animate="visible"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1] mb-4 sm:mb-6 md:mb-8 text-balance"
                        >
                            Crafting experiences users crave, results businesses trust.
                        </motion.h1>
                        <motion.p
                            variants={container(0.4)}
                            initial="hidden"
                            animate="visible"
                            className="max-w-xl text-base sm:text-lg md:text-xl text-secondary leading-relaxed font-light"
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
                        className="relative"
                    >
                        <img
                            src={profilePic}
                            alt="Arsalaan Mohammed"
                            className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[28rem] lg:h-[36rem] lg:mt-12 rounded-2xl object-cover grayscale transition-all duration-500 hover:grayscale-0 shadow-2xl skew-y-3"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10"></div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
