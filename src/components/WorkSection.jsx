import { motion } from "framer-motion";

const WorkSection = ({ title, data, id }) => {
    return (
        <div id={id} className="border-b border-neutral-100 pb-24 pt-10">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 text-3xl font-bold tracking-tight text-primary"
            >
                {title}
            </motion.h2>

            <div className="flex flex-col gap-32">
                {data.map((study, index) => (
                    <div key={index} className="group relative grid gap-12 lg:grid-cols-12 items-center">
                        {/* Visual Side - Larger Image */}
                        <motion.div
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            initial={{ opacity: 0, x: -30, scale: 0.95 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-last" : ""}`}
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-100/50 shadow-sm transition-all duration-500 hover:shadow-xl aspect-[16/10]">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src={study.image}
                                    alt={study.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 30 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            className="lg:col-span-6 flex flex-col justify-center h-full"
                        >
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="flex items-center gap-3 text-xs font-semibold text-purple-600 mb-3 tracking-wider uppercase">
                                    <span>{study.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                                    <span className="text-neutral-500">{study.role}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-primary mb-2 leading-tight group-hover:text-purple-600 transition-colors duration-300">
                                    {study.title}
                                </h3>
                                <p className="text-lg text-secondary leading-relaxed">{study.subtitle}</p>
                            </motion.div>

                            {/* Challenge & Solution */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="space-y-6 mb-8"
                            >
                                <div>
                                    <h5 className="text-sm font-bold text-primary mb-1">The Challenge</h5>
                                    <p className="text-secondary text-sm leading-relaxed">{study.problem}</p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-primary mb-1">The Solution</h5>
                                    <p className="text-secondary text-sm leading-relaxed">{study.solution}</p>
                                </div>
                            </motion.div>

                            {/* Metrics - Horizontal 3-column layout */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="border-t border-neutral-100 pt-6"
                            >
                                <div className="grid grid-cols-3 gap-6">
                                    {study.impact.slice(0, 3).map((metric, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                                            whileHover={{ y: -4 }}
                                            className="flex flex-col bg-neutral-50 rounded-xl p-4 border border-neutral-100 hover:border-purple-200 hover:shadow-sm transition-all duration-300"
                                        >
                                            <span className="text-2xl font-bold text-primary mb-1">
                                                {metric.split(" ")[0]}
                                            </span>
                                            <span className="text-[10px] text-secondary uppercase tracking-wide leading-tight">
                                                {metric.split(" ").slice(1).join(" ")}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkSection;
