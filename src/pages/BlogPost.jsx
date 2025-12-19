import { useParams, Link, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../constants/blogs";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiArrowLeft, FiShare2, FiCopy, FiCheck } from "react-icons/fi";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";

const formatDateWithOrdinal = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();

    const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${getOrdinal(day)} ${month}, ${year}`;
};

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.slug === slug);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">Post Not Found</h1>
                    <Link to="/blog" className="text-purple-600 hover:underline">← Back to Blog</Link>
                </div>
            </div>
        );
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } else {
            handleCopyLink();
        }
    };

    return (
        <div className="pt-16 sm:pt-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8"
                >
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-sm sm:text-base text-neutral-500 hover:text-primary transition-colors"
                    >
                        <FiArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to Blog</span><span className="sm:hidden">Back</span>
                    </button>
                </motion.div>

                {/* Article Header */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-primary tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10 md:mb-12 pb-6 sm:pb-8 border-b border-neutral-100">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-neutral-500">
                            <span>{formatDateWithOrdinal(post.date)}</span>
                            <span className="flex items-center gap-1">
                                <FiClock className="w-3 h-3 sm:w-4 sm:h-4" />
                                {post.readTime}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border border-neutral-200 text-neutral-700 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all flex-1 sm:flex-initial justify-center"
                            >
                                {copied ? <FiCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : <FiCopy className="w-3 h-3 sm:w-4 sm:h-4" />}
                                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
                                <span className="sm:hidden">{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors shadow-sm flex-1 sm:flex-initial justify-center"
                            >
                                <FiShare2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl mb-8 sm:mb-10 md:mb-12 aspect-[21/9]">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        {post.content.split('\n\n').map((paragraph, index) => {
                            // Handle headings
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2 key={index} className="text-2xl sm:text-3xl font-bold text-primary mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-6">
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            }
                            if (paragraph.startsWith('### ')) {
                                return (
                                    <h3 key={index} className="text-xl sm:text-2xl font-bold text-primary mt-6 sm:mt-8 mb-3 sm:mb-4">
                                        {paragraph.replace('### ', '')}
                                    </h3>
                                );
                            }
                            // Regular paragraphs
                            return (
                                <p key={index} className="text-base sm:text-lg text-secondary leading-relaxed mb-4 sm:mb-6">
                                    {paragraph}
                                </p>
                            );
                        })}
                    </div>

                    {/* Share Section */}
                    <div className="mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-neutral-100">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-base sm:text-lg text-neutral-600 text-center sm:text-left">Found this helpful? Share it with your network.</p>
                            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-neutral-200 text-neutral-700 text-sm sm:text-base font-medium rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors flex-1 sm:flex-initial justify-center"
                                >
                                    {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                                    <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
                                    <span className="sm:hidden">{copied ? 'Copied' : 'Copy'}</span>
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-purple-700 transition-colors flex-1 sm:flex-initial justify-center"
                                >
                                    <FiShare2 className="w-4 h-4" />
                                    <span className="hidden sm:inline">Share Article</span>
                                    <span className="sm:hidden">Share</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts - Only show if there are other posts */}
                    {BLOG_POSTS.filter(p => p.id !== post.id).length > 0 && (
                        <div className="max-w-4xl mx-auto mt-8 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-24">
                            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 md:mb-8">More Articles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        to={`/blog/${relatedPost.slug}`}
                                        className="group bg-white rounded-xl border border-neutral-100 p-4 sm:p-6 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
                                    >
                                        <h4 className="text-lg sm:text-xl font-bold text-primary group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">
                                            {relatedPost.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 mb-3 sm:mb-4">
                                            {relatedPost.excerpt}
                                        </p>
                                        <span className="text-xs sm:text-sm text-purple-600 font-medium group-hover:underline">
                                            Read More →
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default BlogPost;
