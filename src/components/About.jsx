import { ABOUT_TEXT, ABOUT_STATS } from "../constants";
import aboutImg from "../assets/about.png";
import { motion } from "framer-motion";

const About = () => {
    const paragraphs = ABOUT_TEXT.split('\n\n');

    return (
        <div id="about" className="border-b border-neutral-100 pb-12 sm:pb-16 md:pb-20 pt-6 sm:pt-8 md:pt-10">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6 sm:mb-8 md:mb-12 text-2xl sm:text-3xl font-bold tracking-tight text-primary"
            >
                The Story Behind the Work
            </motion.h2>

            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 items-start">
                {/* Text Content - Left Side */}
                <div className="w-full lg:w-1/2 space-y-8 sm:space-y-10 md:space-y-12">
                    {/* Staggered Paragraphs */}
                    <div className="space-y-4 sm:space-y-6">
                        {paragraphs.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-base sm:text-lg text-secondary leading-relaxed"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>

                    {/* Stats Cards - Grid Layout */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-2 gap-3 sm:gap-4"
                    >
                        {ABOUT_STATS.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-neutral-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
                            >
                                {/* Gradient Background on Hover */}
                                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-50/0 to-blue-50/0 group-hover:from-purple-50/40 group-hover:to-blue-50/20 transition-all duration-300" />

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2 group-hover:text-purple-600 transition-colors duration-300">
                                        {stat.value}
                                    </h3>
                                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                </div>

                                {/* Decorative Dot */}
                                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-2 h-2 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Image - Right Side */}
                <div className="w-full lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative group"
                    >
                        {/* Gradient Ring */}
                        <div className="absolute -inset-1 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />

                        {/* Image Container */}
                        <div className="relative">
                            <img
                                className="relative rounded-xl sm:rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover w-full h-auto shadow-md hover:shadow-xl"
                                src={aboutImg}
                                alt="About Arsalaan"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-black/5" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
