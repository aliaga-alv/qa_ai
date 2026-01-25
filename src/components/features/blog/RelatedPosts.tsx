import { BlogCard } from '@/components/features/blog/BlogCard';
import type { BlogPostData } from '@/types/models';

interface RelatedPostsProps {
  posts: BlogPostData[];
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-16 dark:border-gray-700">
      <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Related Articles</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
