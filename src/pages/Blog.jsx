import { motion } from "framer-motion";
import { BLOG_POSTS } from "../constants/blogs";
import BlogCard from "../components/BlogCard";
import WorkList from "../components/WorkList";

const Blog = () => {

    return (
        <div className="pt-16 sm:pt-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-4"
                >
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <a href="/" className="text-neutral-400 hover:text-primary transition-colors">Home</a>
                        <span className="text-neutral-300">/</span>
                        <span className="text-primary font-medium">Blog</span>
                    </div>
                </motion.div>

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="py-8 sm:py-12 md:py-16 border-b border-neutral-100 mb-8 sm:mb-12 md:mb-16"
                >
                    <div className="max-w-4xl">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary tracking-tighter mb-4 sm:mb-6 text-balance leading-tight">
                            Stories from the Journey
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-secondary leading-relaxed max-w-2xl">
                            Personal reflections on growth, challenges, and the unexpected paths that lead us where we are. From the hills of Darjeeling to IIT, and beyond—these are the stories that shaped me.
                        </p>
                    </div>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pb-12 sm:pb-16 md:pb-24">
                    {BLOG_POSTS.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            featured={index === 0}
                        />
                    ))}
                </div>

                {/* Selected Work */}
                <WorkList />
            </div>
        </div>
    );
};

export default Blog;
