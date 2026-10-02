import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { POSTS } from "../lib/posts";
import SectionHeader from "./SectionHeader";
import BlogCard from "./BlogCard";
import Reveal from "./Reveal";

const FeaturedWriting = () => (
  <section id="writing" className="container-site scroll-mt-24 py-20 md:py-28">
    <SectionHeader
      index="04"
      label="Writing"
      meta={`${POSTS.length} essays`}
      title={
        <>
          Stories &amp; <span className="text-neutral-500">shared lessons.</span>
        </>
      }
      description="Honest reflections on product, growth, and the occasional pivot, mostly written so I don't forget them myself."
      action={
        <Link to="/blog" className="btn-ghost group">
          All posts
          <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      }
    />

    <div className="grid gap-4 md:grid-cols-2">
      {POSTS.slice(0, 2).map((post, i) => (
        <Reveal key={post.slug} delay={i * 0.08} className="h-full">
          <BlogCard post={post} />
        </Reveal>
      ))}
    </div>
  </section>
);

export default FeaturedWriting;
