import { useState } from 'react';
import { BlogCard } from '@/components/features/blog/BlogCard';
import type { BlogPostData } from '@/types/models';

const blogPosts: BlogPostData[] = [
  {
    id: '1',
    title: 'The Future of AI-Powered Testing: What to Expect in 2026',
    excerpt: 'Artificial intelligence is transforming how we approach software testing. Learn about the latest trends and what they mean for development teams.',
    author: 'Sarah Chen',
    date: 'January 10, 2026',
    readTime: '5 min read',
    category: 'AI & ML',
  },
  {
    id: '2',
    title: 'Best Practices for Test Automation in CI/CD Pipelines',
    excerpt: 'Integrating automated testing into your CI/CD pipeline can dramatically improve code quality. Here are our top tips for getting it right.',
    author: 'Michael Rodriguez',
    date: 'January 5, 2026',
    readTime: '8 min read',
    category: 'DevOps',
  },
  {
    id: '3',
    title: 'How We Reduced Test Execution Time by 60%',
    excerpt: 'A deep dive into the optimization strategies that helped us dramatically improve test performance for our customers.',
    author: 'Emily Watson',
    date: 'December 28, 2025',
    readTime: '6 min read',
    category: 'Engineering',
  },
  {
    id: '4',
    title: 'Understanding Test Coverage: Beyond the Numbers',
    excerpt: 'Test coverage metrics are important, but they don\'t tell the whole story. Learn how to interpret and improve your testing strategy.',
    author: 'David Kim',
    date: 'December 20, 2025',
    readTime: '7 min read',
    category: 'Testing',
  },
  {
    id: '5',
    title: 'Building a Testing Culture: Lessons from 100+ Teams',
    excerpt: 'We analyzed successful testing practices from hundreds of development teams. Here\'s what we learned about building a quality-first culture.',
    author: 'Lisa Thompson',
    date: 'December 15, 2025',
    readTime: '10 min read',
    category: 'Culture',
  },
  {
    id: '6',
    title: 'API Testing Made Simple: A Comprehensive Guide',
    excerpt: 'Everything you need to know about API testing, from basic concepts to advanced strategies for microservices architectures.',
    author: 'James Park',
    date: 'December 8, 2025',
    readTime: '12 min read',
    category: 'Testing',
  },
  {
    id: '7',
    title: 'The ROI of Automated Testing: A Data-Driven Analysis',
    excerpt: 'We crunched the numbers on automated testing investments. The results might surprise you.',
    author: 'Sarah Chen',
    date: 'December 1, 2025',
    readTime: '9 min read',
    category: 'Business',
  },
  {
    id: '8',
    title: 'Security Testing in the Age of AI',
    excerpt: 'How artificial intelligence is changing the landscape of security testing and vulnerability detection.',
    author: 'Michael Rodriguez',
    date: 'November 22, 2025',
    readTime: '8 min read',
    category: 'Security',
  },
  {
    id: '9',
    title: 'Mobile App Testing: Strategies for Success',
    excerpt: 'The unique challenges of mobile testing and how to overcome them with the right tools and processes.',
    author: 'Emily Watson',
    date: 'November 15, 2025',
    readTime: '11 min read',
    category: 'Mobile',
  },
];

const categories = ['All', 'AI & ML', 'DevOps', 'Engineering', 'Testing', 'Culture', 'Business', 'Security', 'Mobile'];

export const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Insights, tutorials, and updates from the QA AI team. Learn about testing best practices, 
              AI innovation, and software quality.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No posts found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-900 dark:to-accent-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get the latest posts delivered to your inbox
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our newsletter to stay up to date with testing best practices, product updates, and industry insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all whitespace-nowrap shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
