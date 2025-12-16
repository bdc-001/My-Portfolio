import { FAQS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaYoutube, FaGuitar, FaPenNib, FaChartLine, FaPowerOff } from "react-icons/fa";

const PersonalFAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const getIcon = (index) => {
        switch (index) {
            case 0: return <FaYoutube className="w-6 h-6 text-red-500" />;
            case 1: return <FaGuitar className="w-6 h-6 text-amber-600" />;
            case 2: return <FaPenNib className="w-6 h-6 text-indigo-500" />;
            case 3: return <FaChartLine className="w-6 h-6 text-green-500" />;
            case 4: return <FaPowerOff className="w-6 h-6 text-gray-500" />;
            default: return null;
        }
    };

    return (
        <div className="py-24 border-b border-neutral-100">
            <h2 className="text-5xl lg:text-7xl font-bold text-primary tracking-tighter text-center mb-20 text-balance">
                Off the grid <span className="text-neutral-300">(but still me)</span>
            </h2>

            <div className="max-w-4xl mx-auto px-4 grid gap-6">
                {FAQS.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={`group border rounded-2xl transition-all duration-300 
                                ${isOpen
                                    ? "bg-white border-neutral-200 shadow-md"
                                    : "bg-white border-neutral-100 hover:border-neutral-200 hover:shadow-sm"
                                }`
                            }
                        >
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl transition-all duration-300
                                        ${isOpen ? "bg-neutral-100" : "bg-neutral-50"}`}>
                                        {getIcon(index)}
                                    </div>
                                    <span className={`font-semibold text-lg transition-colors duration-300
                                        ${isOpen ? "text-primary" : "text-neutral-700 group-hover:text-primary"}`}>
                                        {faq.question}
                                    </span>
                                </div>
                                <span className={`ml-4 p-2 rounded-full transition-all duration-300
                                    ${isOpen ? "bg-neutral-900 text-white" : "bg-neutral-50 text-neutral-400 group-hover:bg-neutral-100"}`}>
                                    {isOpen ? <FiMinus /> : <FiPlus />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 pl-16">
                                            <p className="text-base text-neutral-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default PersonalFAQ;
