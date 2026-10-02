import { FiEye, FiThumbsUp } from "react-icons/fi";
import { formatCount } from "../lib/blogStats";
import CountUp from "./motion/CountUp";

const Placeholder = () => <span className="inline-block h-2.5 w-6 animate-pulse rounded bg-white/10" aria-hidden />;

const PostStats = ({ stats, status, className = "" }) => {
  if (status === "unavailable" && !stats) return null;

  return (
    <div className={`flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-neutral-500 ${className}`}>
      <span className="inline-flex items-center gap-1.5" title="Unique readers">
        <FiEye className="h-3.5 w-3.5" aria-hidden />
        {stats ? (
          <span>
            <CountUp value={formatCount(stats.views)} duration={1.2} /> {stats.views === 1 ? "read" : "reads"}
          </span>
        ) : (
          <Placeholder />
        )}
      </span>
      <span className="inline-flex items-center gap-1.5" title="Readers who found this worth their time">
        <FiThumbsUp className="h-3.5 w-3.5" aria-hidden />
        {stats ? <CountUp value={formatCount(stats.up)} duration={1.2} /> : <Placeholder />}
      </span>
    </div>
  );
};

export default PostStats;
