import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BlogPostData } from '@/types/models';

interface BlogCardProps {
  post: BlogPostData;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* Image */}
      <Link to={`/blog/${post.id}`} className="block">
        <div className="flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-6xl font-bold text-primary-600 dark:text-primary-400">QA</span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <Link to={`/blog/${post.id}`}>
          <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-400">{post.excerpt}</p>

        {/* Meta */}
        <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Author & CTA */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            By {post.author}
          </span>
          <Link
            to={`/blog/${post.id}`}
            className="flex items-center gap-1 text-sm font-semibold text-primary-600 transition-all hover:gap-2 dark:text-primary-400"
          >
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};
