import { TOOLKIT } from "../constants";
import { motion } from "framer-motion";
import { RiNotionFill, RiReactjsLine } from "react-icons/ri";
import { SiJira, SiMiro, SiCanva, SiMixpanel, SiApachesuperset, SiGoogleanalytics } from "react-icons/si";
import { FaFigma, FaNodeJs } from "react-icons/fa";

// Map string names to actual icon components
const IconMap = {
    "RiNotionFill": RiNotionFill,
    "SiJira": SiJira,
    "SiMiro": SiMiro,
    "FaFigma": FaFigma,
    "SiCanva": SiCanva,
    "SiMixpanel": SiMixpanel,
    "SiApachesuperset": SiApachesuperset,
    "SiGoogleanalytics": SiGoogleanalytics,
    "RiReactjsLine": RiReactjsLine,
    "FaNodeJs": FaNodeJs
};

const Toolkit = () => {
    // Flatten the toolkit object into a single array of tools
    const allTools = Object.values(TOOLKIT).flat();
    // Duplicate the list to create a seamless loop
    const marqueeTools = [...allTools, ...allTools];

    return (
        <div className="border-b border-neutral-100 pb-24 pt-10 overflow-hidden">
            <h2 className="mb-16 text-3xl font-bold tracking-tight text-primary">
                Product Toolkit
            </h2>

            <div className="relative flex overflow-x-hidden group">
                <motion.div
                    className="flex flex-nowrap gap-16"
                    animate={{ x: "-50%" }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Adjust speed here (higher = slower)
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeTools.map((tool, index) => {
                        const IconComponent = IconMap[tool.icon];
                        return (
                            <div key={index} className="flex items-center gap-3 flex-shrink-0">
                                {tool.isImage ? (
                                    <img
                                        src={tool.icon}
                                        alt={tool.name}
                                        className="w-6 h-6 object-contain opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100"
                                    />
                                ) : (
                                    IconComponent && (
                                        <IconComponent className="text-2xl text-neutral-400 transition-colors hover:text-primary" />
                                    )
                                )}
                                <span className="text-lg font-medium text-neutral-500 whitespace-nowrap">
                                    {tool.name}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Gradient masks for smooth fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/90 to-transparent z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/90 to-transparent z-10"></div>
            </div>
        </div>
    );
};

export default Toolkit;
