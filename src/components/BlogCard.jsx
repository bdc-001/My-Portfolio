import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiArrowRight } from "react-icons/fi";

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

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

const BlogCard = ({ post, index, featured = false }) => {
    return (
        <motion.article
            variants={itemVariants}
            className="group"
        >
            <Link to={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 py-8 border-b border-neutral-100 group-hover:bg-neutral-50/30 transition-colors duration-300 rounded-lg px-2 -mx-2">
                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-center order-2 md:order-1">
                        {/* Meta Top */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.slice(0, 2).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[9px] uppercase tracking-[0.15em] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 group-hover:border-purple-200 transition-colors duration-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-neutral-300">•</span>
                            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">{formatDateWithOrdinal(post.date)}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary group-hover:text-neutral-800 transition-colors duration-300 mb-3 leading-tight tracking-tight">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
                            {post.excerpt}
                        </p>

                        {/* Bottom Meta */}
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-4 text-xs text-neutral-400">
                                <span className="flex items-center gap-1.5">
                                    <FiClock className="w-3.5 h-3.5" />
                                    {post.readTime}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                <span>Read Full Story</span>
                                <FiArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className={`order-1 md:order-2 shrink-0 ${featured ? 'md:w-[400px]' : 'md:w-[280px]'} aspect-[16/9] md:aspect-[4/3] overflow-hidden rounded-md bg-neutral-100`}>
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default BlogCard;
