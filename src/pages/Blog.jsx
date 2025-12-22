import { motion } from "framer-motion";
import { BLOG_POSTS } from "../constants/blogs";
import BlogCard from "../components/BlogCard";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const Blog = () => {
    return (
        <div className="pt-16 sm:pt-20 bg-white bg-dots">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="pt-6 sm:pt-8 md:pt-10 pb-4"
                >
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <a href="/" className="text-neutral-500 hover:text-primary transition-colors duration-200">Home</a>
                        <span className="text-neutral-300">/</span>
                        <span className="text-primary font-medium">Blog</span>
                    </div>
                </motion.div>

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="py-10 sm:py-14 md:py-20 mb-12 sm:mb-16 md:mb-20"
                >
                    <div className="max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight mb-6 sm:mb-8 leading-[1.1]"
                        >
                            Stories & Shared Lessons
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="text-lg sm:text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-3xl"
                        >
                            A collection of honest reflections on product, growth, and the occasional pivot, mostly written so I don't forget them myself.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Blog Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 pb-16 sm:pb-20 md:pb-28"
                >
                    {BLOG_POSTS.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            index={index}
                            featured={index === 0}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
