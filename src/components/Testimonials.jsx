import { TESTIMONIALS } from "../constants";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
    return (
        <div className="py-20 lg:py-24 border-b border-neutral-100">
            <div className="text-center mb-16">
                <h2 className="text-5xl lg:text-7xl font-bold text-primary tracking-tighter mb-4 text-balance">
                    Don't take my word for it<span className="text-purple-600">*</span>
                </h2>
                <p className="text-neutral-500 text-sm italic">
                    * Real feedback from teammates, founders, and PMs I've worked with.
                </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {TESTIMONIALS.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`group relative bg-white rounded-2xl border border-neutral-100 p-8 lg:p-10 
                            hover:border-neutral-200 hover:shadow-md transition-all duration-300
                            ${index === 0 ? 'lg:row-span-1' : ''}`}
                    >
                        {/* Gradient Accent on Hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50/0 via-blue-50/0 to-indigo-50/0 
                            group-hover:from-purple-50/30 group-hover:via-blue-50/20 group-hover:to-indigo-50/10 
                            transition-all duration-500 pointer-events-none" />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400 text-sm" />
                                ))}
                                <span className="text-neutral-400 ml-2 text-xs font-mono">5/5</span>
                            </div>

                            {/* Quote */}
                            <div className="relative mb-8">
                                <svg
                                    className="absolute -top-2 -left-2 w-10 h-10 text-neutral-100 -z-10"
                                    fill="currentColor"
                                    viewBox="0 0 32 32"
                                >
                                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
                                </svg>
                                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-neutral-100">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-primary font-bold text-sm">{testimonial.author}</h4>
                                    <p className="text-neutral-500 text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
