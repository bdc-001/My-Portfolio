import { motion } from "framer-motion";
import { BLOG_POSTS } from "../constants/blogs";
import BlogCard from "../components/BlogCard";
import { useState } from "react";

const Blog = () => {
    const [selectedTag, setSelectedTag] = useState("All");

    // Get all unique tags
    const allTags = ["All", ...new Set(BLOG_POSTS.flatMap(post => post.tags))];

    // Filter posts by tag
    const filteredPosts = selectedTag === "All"
        ? BLOG_POSTS
        : BLOG_POSTS.filter(post => post.tags.includes(selectedTag));

    return (
        <div className="pt-20">
            <div className="container mx-auto px-8">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="pt-8 pb-4"
                >
                    <div className="flex items-center gap-2 text-sm">
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
                    className="py-16 border-b border-neutral-100 mb-16"
                >
                    <div className="max-w-4xl">
                        <h1 className="text-5xl lg:text-7xl font-bold text-primary tracking-tighter mb-6 text-balance leading-tight">
                            Thoughts on Product, Tech, and Growth
                        </h1>
                        <p className="text-xl text-secondary leading-relaxed max-w-2xl">
                            Lessons from building AI-powered products, managing teams, and everything in between. Subscribe to get notified when I publish something new.
                        </p>
                    </div>
                </motion.div>

                {/* Tag Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap gap-3">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTag === tag
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-24">
                    {filteredPosts.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            featured={index === 0 && selectedTag === "All"}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-lg text-neutral-400">No posts found with tag "{selectedTag}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
