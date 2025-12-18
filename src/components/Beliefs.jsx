import { BELIEFS } from "../constants";
import { motion } from "framer-motion";

const Beliefs = () => {
    return (
        <div className="py-24 border-b border-neutral-100">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                {/* Left Side: Headline */}
                <div className="flex-1 lg:sticky lg:top-32 lg:self-start">

                    <h2 className="text-6xl lg:text-8xl font-bold text-primary tracking-tighter leading-[0.9]">
                        What I<br />
                        Believe
                    </h2>
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
