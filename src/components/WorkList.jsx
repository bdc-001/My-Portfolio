import { EXPERIENCES, PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

const WorkList = () => {
    const allWork = [...EXPERIENCES, ...PROJECTS].slice(0, 4); // Display top 4 items

    return (
        <div className="border-b border-neutral-100 pb-20 pt-10">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-primary">
                    Selected Work
                </h2>
                <Link to="/work" className="text-secondary hover:text-primary flex items-center gap-2 text-sm transition-colors mb-1">
                    View All Projects <RiArrowRightLine />
                </Link>
            </div>

            <div className="flex flex-col">
                {allWork.map((study, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group border-t border-neutral-100 py-8 transition-colors hover:bg-neutral-50/50"
                    >
                        <Link to="/work" className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-2">
                            <div className="md:col-span-5">
                                <h3 className="text-2xl font-semibold text-primary group-hover:text-purple-600 transition-colors">
                                    {study.title}
                                </h3>
                            </div>
                            <div className="md:col-span-4">
                                <span className="text-neutral-500 font-medium">{study.category}</span>
                            </div>
                            <div className="md:col-span-3 text-right">
                                <span className="text-neutral-400 text-sm">{study.role}</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WorkList;
