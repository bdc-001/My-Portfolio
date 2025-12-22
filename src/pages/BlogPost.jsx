import { useParams, Link, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../constants/blogs";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiArrowLeft, FiShare2, FiCopy, FiCheck, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";
import profilePic from "../assets/HeroImageFinal.png";

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

const renderContent = (text) => {
    if (!text) return null;

    // Split text by **bold** tags
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-primary">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.slug === slug);
    const [copied, setCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [stats, setStats] = useState({ likes: 0, dislikes: 0 });
    const [userVote, setUserVote] = useState(null); // 'like', 'dislike', or null

    useEffect(() => {
        const storedStats = localStorage.getItem(`v3-blog-stats-${post?.id}`);
        const storedVote = localStorage.getItem(`v3-blog-vote-${post?.id}`);

        if (storedStats) {
            setStats(JSON.parse(storedStats));
        } else {
            const initialStats = { likes: 0, dislikes: 0 };
            setStats(initialStats);
            localStorage.setItem(`v3-blog-stats-${post?.id}`, JSON.stringify(initialStats));
        }

        if (storedVote) {
            setUserVote(storedVote);
        }
    }, [post?.id]);

    const handleVote = (type) => {
        let newStats = { ...stats };
        let newVote = type;

        if (userVote === type) {
            // Remove vote
            newStats[type === 'like' ? 'likes' : 'dislikes'] = Math.max(0, newStats[type === 'like' ? 'likes' : 'dislikes'] - 1);
            newVote = null;
        } else if (userVote) {
            // Switch vote
            newStats[userVote === 'like' ? 'likes' : 'dislikes'] = Math.max(0, newStats[userVote === 'like' ? 'likes' : 'dislikes'] - 1);
            newStats[type === 'like' ? 'likes' : 'dislikes']++;
        } else {
            // New vote
            newStats[type === 'like' ? 'likes' : 'dislikes']++;
        }

        setStats(newStats);
        setUserVote(newVote);
        localStorage.setItem(`v3-blog-stats-${post?.id}`, JSON.stringify(newStats));
        if (newVote) {
            localStorage.setItem(`v3-blog-vote-${post?.id}`, newVote);
        } else {
            localStorage.removeItem(`v3-blog-vote-${post?.id}`);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress((currentScroll / totalScroll) * 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4 tracking-tight">Post Not Found</h1>
                    <Link to="/blog" className="text-neutral-500 hover:text-black transition-colors font-medium underline underline-offset-4">← Back to Stories</Link>
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
        <div className="pt-24 sm:pt-32 min-h-screen bg-white bg-dots selection:bg-neutral-100 selection:text-black">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-neutral-50 z-[100]">
                <motion.div
                    className="h-full bg-black origin-left"
                    style={{ scaleX: scrollProgress / 100 }}
                />
            </div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Back Nav */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-[800px] mx-auto mb-16"
                >
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary transition-colors font-medium group"
                    >
                        <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Blog</span>
                    </button>
                </motion.div>

                <div className="max-w-[840px] mx-auto">
                    {/* Header */}
                    <header className="mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-[52px] font-bold text-primary tracking-tight leading-[1.1] mb-10">
                                {post.title}
                            </h1>

                            <div className="flex items-center justify-between gap-6 pb-8">
                                <div className="flex items-center gap-5 text-sm text-neutral-400 font-medium">
                                    <span>{formatDateWithOrdinal(post.date)}</span>
                                    <span className="flex items-center gap-2">
                                        <FiClock className="w-4 h-4" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleCopyLink}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-100 text-[13px] font-medium text-neutral-500 hover:bg-neutral-50 transition-all active:scale-95"
                                    >
                                        {copied ? <FiCheck className="w-3.5 h-3.5 text-green-600" /> : <FiCopy className="w-3.5 h-3.5" />}
                                        <span>Copy Link</span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-600 text-white text-[13px] font-semibold hover:bg-purple-700 transition-all active:scale-95 shadow-sm shadow-purple-100"
                                    >
                                        <FiShare2 className="w-3.5 h-3.5" />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </header>

                    {/* Content Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative aspect-video rounded-[24px] overflow-hidden mb-16 shadow-2xl shadow-neutral-200/50 bg-neutral-50"
                    >
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Main Content Body */}
                    <article className="prose prose-neutral max-w-none mb-24">
                        {post.content.split('\n\n').map((paragraph, index) => {
                            const pText = paragraph.trim();

                            // Headers
                            if (pText.startsWith('## ')) {
                                return (
                                    <motion.h2
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="text-2xl sm:text-3xl font-bold text-purple-600 mt-16 mb-8 tracking-tight leading-tight"
                                    >
                                        {pText.replace('## ', '')}
                                    </motion.h2>
                                );
                            }

                            if (pText.startsWith('### ')) {
                                return (
                                    <motion.h3
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="text-xl sm:text-2xl font-bold text-purple-600 mt-12 mb-6 tracking-tight leading-snug"
                                    >
                                        {pText.replace('### ', '')}
                                    </motion.h3>
                                );
                            }

                            // Bullet Lists
                            if (pText.startsWith('- ')) {
                                const items = paragraph.split('\n');
                                return (
                                    <motion.ul
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="list-disc list-outside ml-6 mb-10 space-y-4"
                                    >
                                        {items.map((it, i) => (
                                            <li key={i} className="text-lg sm:text-xl text-neutral-800 leading-relaxed pl-2">
                                                {renderContent(it.replace('- ', ''))}
                                            </li>
                                        ))}
                                    </motion.ul>
                                );
                            }

                            // Numbered Lists (like the Delivery Engine)
                            if (/^\d+\./.test(pText)) {
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="text-lg sm:text-xl text-neutral-800 leading-relaxed mb-10 border-l-2 border-neutral-100 pl-6 py-1"
                                    >
                                        {renderContent(paragraph)}
                                    </motion.div>
                                );
                            }

                            // Regular paragraphs
                            return (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="text-lg sm:text-xl text-neutral-800 leading-relaxed mb-10 tracking-normal"
                                >
                                    {renderContent(paragraph)}
                                </motion.p>
                            );
                        })}
                    </article>

                    {/* Like/Dislike Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center pt-8 pb-16 border-t border-neutral-100"
                    >
                        <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-widest">Was this helpful?</h4>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => handleVote('like')}
                                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full border transition-all duration-300 ${userVote === 'like'
                                    ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200'
                                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-purple-400 hover:text-purple-600'
                                    }`}
                            >
                                <FiThumbsUp className={`w-5 h-5 ${userVote === 'like' ? 'animate-bounce' : ''}`} />
                                <span className="font-bold">{stats.likes}</span>
                            </button>

                            <button
                                onClick={() => handleVote('dislike')}
                                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full border transition-all duration-300 ${userVote === 'dislike'
                                    ? 'bg-neutral-800 border-neutral-800 text-white shadow-lg shadow-neutral-200'
                                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-red-400 hover:text-red-600'
                                    }`}
                            >
                                <FiThumbsDown className={`w-5 h-5 ${userVote === 'dislike' ? 'animate-shake' : ''}`} />
                                <span className="font-bold">{stats.dislikes}</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Pagination / More Stories */}
                    {BLOG_POSTS.filter(p => p.id !== post.id).length > 0 && (
                        <footer className="pt-20 border-t border-neutral-100 pb-20">
                            <h4 className="text-xs uppercase tracking-[0.3em] font-black text-neutral-400 mb-12 text-center">Continue Reading</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">
                                {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((rel) => (
                                    <Link key={rel.id} to={`/blog/${rel.slug}`} className="group">
                                        <div className="aspect-[16/9] rounded-sm overflow-hidden mb-6 bg-neutral-100">
                                            <img src={rel.coverImage} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" alt="" />
                                        </div>
                                        <h5 className="font-bold text-xl text-primary leading-[1.2] mb-3 group-hover:underline decoration-neutral-200 underline-offset-[6px]">
                                            {rel.title}
                                        </h5>
                                        <p className="text-sm text-neutral-500 line-clamp-2">{rel.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        </footer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
