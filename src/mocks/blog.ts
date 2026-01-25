import type { BlogPostData, FullBlogPost } from '@/types/models';

/**
 * Blog posts listing data
 */
export const blogPosts: BlogPostData[] = [
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

/**
 * Full blog posts with content (used in BlogDetailPage)
 * Note: In production, this would be fetched from an API
 */
export const fullBlogPosts: FullBlogPost[] = blogPosts.map(post => ({
  ...post,
  content: `
    <p>This is a comprehensive article about ${post.title.toLowerCase()}. The content would include detailed insights, examples, and best practices.</p>
    
    <h2>Introduction</h2>
    <p>In this article, we'll explore the key concepts and practical applications related to ${post.category}. Whether you're just getting started or looking to deepen your expertise, this guide will provide valuable insights.</p>
    
    <h2>Key Takeaways</h2>
    <ul>
      <li>Understanding the fundamentals and core principles</li>
      <li>Practical implementation strategies and best practices</li>
      <li>Common pitfalls to avoid and how to overcome challenges</li>
      <li>Real-world examples and case studies</li>
    </ul>
    
    <h2>Deep Dive</h2>
    <p>Let's examine the technical details and explore how you can apply these concepts in your own projects. The landscape is constantly evolving, and staying up to date with the latest trends is crucial for success.</p>
    
    <h2>Conclusion</h2>
    <p>By implementing these strategies and following best practices, you can significantly improve your workflow and achieve better results. Remember that continuous learning and adaptation are key to long-term success.</p>
  `,
  tags: ['testing', 'automation', 'best-practices'],
  authorInfo: {
    name: post.author,
    role: 'Senior QA Engineer',
    bio: `${post.author} is a testing expert with years of experience in software quality and automation. Passionate about sharing knowledge and helping teams build better software.`,
    avatar: undefined,
    x: undefined,
    linkedin: undefined,
  },
}));
