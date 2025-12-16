import { useParams, Link, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../constants/blogs";
import { motion } from "framer-motion";
import { FiClock, FiArrowLeft, FiShare2 } from "react-icons/fi";
import { useEffect } from "react";

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.slug === slug);

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

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="pt-20">
            <div className="container mx-auto px-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="pt-8 pb-8"
                >
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-neutral-500 hover:text-primary transition-colors"
                    >
                        <FiArrowLeft /> Back to Blog
                    </button>
                </motion.div>

                {/* Article Header */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl lg:text-6xl font-bold text-primary tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex items-center justify-between mb-12 pb-8 border-b border-neutral-100">
                        <div className="flex items-center gap-6 text-sm text-neutral-500">
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <span className="flex items-center gap-1">
                                <FiClock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                            <FiShare2 className="w-4 h-4" />
                            Share
                        </button>
                    </div>

                    {/* Cover Image */}
                    <div className="relative overflow-hidden rounded-2xl mb-12 aspect-[21/9]">
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
                                    <h2 key={index} className="text-3xl font-bold text-primary mt-12 mb-6">
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            }
                            if (paragraph.startsWith('### ')) {
                                return (
                                    <h3 key={index} className="text-2xl font-bold text-primary mt-8 mb-4">
                                        {paragraph.replace('### ', '')}
                                    </h3>
                                );
                            }
                            // Regular paragraphs
                            return (
                                <p key={index} className="text-lg text-secondary leading-relaxed mb-6">
                                    {paragraph}
                                </p>
                            );
                        })}
                    </div>

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-neutral-100">
                        <div className="flex items-center justify-between">
                            <p className="text-lg text-neutral-600">Found this helpful? Share it with your network.</p>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <FiShare2 />
                                Share Article
                            </button>
                        </div>
                    </div>
                </motion.article>

                {/* Related Posts */}
                <div className="max-w-4xl mx-auto mt-16 mb-24">
                    <h3 className="text-2xl font-bold text-primary mb-8">More Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                            <Link
                                key={relatedPost.id}
                                to={`/blog/${relatedPost.slug}`}
                                className="group bg-white rounded-xl border border-neutral-100 p-6 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
                            >
                                <h4 className="text-xl font-bold text-primary group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">
                                    {relatedPost.title}
                                </h4>
                                <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
                                    {relatedPost.excerpt}
                                </p>
                                <span className="text-sm text-purple-600 font-medium group-hover:underline">
                                    Read More →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
