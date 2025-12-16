import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiArrowRight } from "react-icons/fi";

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

const BlogCard = ({ post, featured = false }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`group ${featured ? 'lg:col-span-2' : ''}`}
        >
            <Link to={`/blog/${post.slug}`} className="block">
                <div className={`bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-neutral-200 hover:shadow-xl transition-all duration-300 ${featured ? 'lg:grid lg:grid-cols-2 lg:gap-8' : ''}`}>
                    {/* Image */}
                    <div className={`relative overflow-hidden bg-neutral-100 ${featured ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className={`p-6 ${featured ? 'lg:p-8 flex flex-col justify-center' : 'lg:p-8'}`}>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h3 className={`font-bold text-primary group-hover:text-purple-600 transition-colors duration-300 mb-3 line-clamp-2 ${featured ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'}`}>
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className={`text-secondary leading-relaxed mb-4 ${featured ? 'text-lg line-clamp-3' : 'text-base line-clamp-2'}`}>
                            {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <FiClock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                                <span>{formatDateWithOrdinal(post.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-primary font-medium group-hover:text-purple-600 transition-colors">
                                Read More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default BlogCard;
