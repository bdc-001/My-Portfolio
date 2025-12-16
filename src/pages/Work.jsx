import WorkSection from "../components/WorkSection";
import { EXPERIENCES, PROJECTS } from "../constants";
import { motion } from "framer-motion";

const Work = () => {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-8">
                {/* Breadcrumb Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="pt-8 pb-4"
                >
                    <div className="flex items-center gap-2 text-sm">
                        <a href="/" className="text-neutral-400 hover:text-primary transition-colors">Home</a>
                        <span className="text-neutral-300">/</span>
                        <span className="text-primary font-medium">Work</span>
                    </div>
                </motion.div>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="py-16 border-b border-neutral-100"
                >
                    <div className="max-w-4xl">
                        <h1 className="text-5xl lg:text-7xl font-bold text-primary tracking-tighter mb-8 text-balance leading-tight">
                            Turning ideas into impact.
                        </h1>
                        <p className="text-xl text-secondary leading-relaxed max-w-2xl">
                            A deep dive into my product journey—how I identify problems, craft strategies, and ship solutions that drive measurable business growth.
                        </p>
                    </div>
                </motion.div>

                {/* Work Sections */}
                <WorkSection title="Professional Experience" data={EXPERIENCES} id="experience" />
                <WorkSection title="Selected Projects" data={PROJECTS} id="projects" />
            </div>
        </div>
    );
};

export default Work;
