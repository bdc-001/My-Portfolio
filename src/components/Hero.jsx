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
        <div className="border-b border-neutral-100 pb-24 lg:mb-32">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="w-full lg:w-2/3">
                    <div className="flex flex-col font-sans">
                        <motion.span
                            variants={container(0)}
                            initial="hidden"
                            animate="visible"
                            className="text-lg text-secondary mb-4 font-medium"
                        >
                            Hi! I'm Arsalaan, a Product Manager from India.
                        </motion.span>
                        <motion.h1
                            variants={container(0.2)}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1] mb-8 text-balance"
                        >
                            Crafting experiences users crave, results businesses trust.
                        </motion.h1>
                        <motion.p
                            variants={container(0.4)}
                            initial="hidden"
                            animate="visible"
                            className="max-w-xl text-xl text-secondary leading-relaxed font-light"
                        >
                            {HERO_CONTENT}
                        </motion.p>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative"
                    >
                        <img
                            src={profilePic}
                            alt="Arsalaan Mohammed"
                            className="w-72 h-72 lg:w-96 lg:h-96 rounded-2xl object-cover grayscale transition-all duration-500 hover:grayscale-0 shadow-2xl skew-y-3"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10"></div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
