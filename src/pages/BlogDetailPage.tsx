import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Linkedin, Twitter, Facebook } from 'lucide-react';
import { BlogContent } from '@/components/features/blog/BlogContent';
import { BlogAuthor } from '@/components/features/blog/BlogAuthor';
import { RelatedPosts } from '@/components/features/blog/RelatedPosts';
import type { FullBlogPost } from '@/types/models';

// Mock blog posts data with full content
const blogPosts: FullBlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI-Powered Testing: What to Expect in 2026',
    excerpt: 'Artificial intelligence is transforming how we approach software testing. Learn about the latest trends and what they mean for development teams.',
    author: 'Sarah Chen',
    date: 'January 10, 2026',
    readTime: '5 min read',
    category: 'AI & ML',
    tags: ['AI', 'Testing', 'Automation', 'Future'],
    authorInfo: {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former QA lead at Google with 10+ years of experience in software testing and AI. Passionate about making quality assurance accessible to all developers.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    content: `Artificial intelligence has been transforming industries for years, but its impact on software testing is only beginning to be fully realized. As we move through 2026, we're seeing AI-powered testing tools become more sophisticated, accessible, and integral to modern development workflows.

# The Current State of AI in Testing

Traditional testing approaches have served us well, but they come with limitations. Manual testing is time-consuming and prone to human error, while conventional automation requires significant upfront investment in scripting and maintenance. AI-powered testing addresses these challenges by learning from your application, generating test cases intelligently, and adapting to changes automatically.

## Intelligent Test Generation

One of the most exciting developments is AI's ability to generate test cases automatically. By analyzing your application's structure, user flows, and code patterns, AI can identify potential edge cases and create comprehensive test suites that would take weeks to write manually.

## Self-Healing Tests

Test maintenance has traditionally been a major pain point. When your application changes, tests break. AI-powered self-healing tests can detect these changes and automatically update test scripts, dramatically reducing maintenance overhead.

# What's Coming in 2026

The next wave of AI testing tools will bring even more powerful capabilities:

- Predictive analytics that identify which areas of your code are most likely to contain bugs
- Natural language test creation where you can describe tests in plain English
- Automated visual regression testing that catches UI inconsistencies humans might miss
- Integration with development tools for real-time feedback as you code

## Impact on Development Teams

These advances mean development teams can ship faster without sacrificing quality. QA engineers can focus on strategic testing initiatives rather than maintaining test scripts. Developers get immediate feedback on their code changes. And product managers can have higher confidence in release quality.

# Getting Started with AI Testing

The barrier to entry for AI-powered testing has never been lower. Modern platforms like QA AI make it easy to integrate intelligent testing into your existing workflow. You don't need a PhD in machine learning – just a commitment to quality and a willingness to embrace new approaches.

## Best Practices

When adopting AI-powered testing, start small. Pick a critical user flow and let AI generate tests for it. Review the results, provide feedback, and iterate. As you build confidence, expand to more areas of your application.

The future of testing is intelligent, automated, and accessible. The question isn't whether to adopt AI-powered testing, but when. And based on what we're seeing in 2026, that time is now.`,
  },
  {
    id: '2',
    title: 'Best Practices for Test Automation in CI/CD Pipelines',
    excerpt: 'Integrating automated testing into your CI/CD pipeline can dramatically improve code quality. Here are our top tips for getting it right.',
    author: 'Michael Rodriguez',
    date: 'January 5, 2026',
    readTime: '8 min read',
    category: 'DevOps',
    tags: ['CI/CD', 'Automation', 'DevOps', 'Best Practices'],
    authorInfo: {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher and software architect with expertise in building scalable testing infrastructure. Previously built testing systems at Amazon and Microsoft.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    content: `Continuous Integration and Continuous Deployment (CI/CD) has become the standard for modern software development. But the true power of CI/CD is only realized when paired with comprehensive automated testing.

# Why Test Automation Matters in CI/CD

Every commit should be validated automatically. Manual testing creates bottlenecks, slows releases, and reduces confidence. Automated tests running in your CI/CD pipeline catch issues early, when they're cheapest to fix.

## The Testing Pyramid in CI/CD

Structure your automated tests following the testing pyramid:

- Unit tests form the base: fast, focused, and plentiful
- Integration tests in the middle: verify component interactions
- End-to-end tests at the top: validate complete user flows

# Best Practices

## 1. Fast Feedback Loops

Your CI/CD pipeline should provide feedback within minutes, not hours. Optimize test execution with parallelization and smart test selection. Run critical tests first to catch major issues quickly.

## 2. Stable Test Environment

Flaky tests that pass and fail randomly undermine confidence. Use containerization to ensure consistent test environments. Implement proper wait strategies and avoid hard-coded timeouts.

## 3. Meaningful Test Reports

When tests fail, developers need clear information to diagnose issues quickly. Include screenshots, logs, and stack traces. Integrate with your notification system to alert the right people.

The key to successful test automation in CI/CD is treating your test code with the same care as your production code. Invest in maintainability, reliability, and speed, and you'll reap the benefits in faster releases and higher quality.`,
  },
  {
    id: '3',
    title: 'How We Reduced Test Execution Time by 60%',
    excerpt: 'A deep dive into the optimization strategies that helped us dramatically improve test performance for our customers.',
    author: 'Emily Watson',
    date: 'December 28, 2025',
    readTime: '6 min read',
    category: 'Engineering',
    tags: ['Performance', 'Optimization', 'Testing', 'Engineering'],
    authorInfo: {
      name: 'Emily Watson',
      role: 'Head of Engineering',
      bio: 'Engineering leader specializing in scalable systems and performance optimization. Former tech lead at Stripe and Airbnb.',
      linkedin: 'https://linkedin.com',
    },
    content: `Test execution time directly impacts developer productivity. Slow tests mean slower feedback loops, context switching, and frustrated developers. Here's how we cut our test execution time by more than half.

# The Performance Problem

Our customers were running test suites that took 30-45 minutes. Developers would commit code, then wait nearly an hour for feedback. This was unsustainable.

## Identifying Bottlenecks

We started by profiling test execution. The main culprits were:
- Sequential test execution
- Slow database operations
- Redundant test setup
- Network latency in API calls

# Optimization Strategies

## Parallel Execution

The biggest win came from running tests in parallel. We implemented intelligent test distribution across multiple workers, achieving near-linear speedup.

## Database Optimization

We replaced slow database setup with in-memory test databases and transaction rollbacks. This reduced setup time from seconds to milliseconds per test.

The results speak for themselves: average test execution time dropped from 45 minutes to 18 minutes, and developer satisfaction increased dramatically.`,
  },
  {
    id: '4',
    title: 'Understanding Test Coverage: Beyond the Numbers',
    excerpt: 'Test coverage metrics are important, but they don\'t tell the whole story. Learn how to interpret and improve your testing strategy.',
    author: 'David Kim',
    date: 'December 20, 2025',
    readTime: '7 min read',
    category: 'Testing',
    tags: ['Testing', 'Metrics', 'Quality', 'Best Practices'],
    authorInfo: {
      name: 'David Kim',
      role: 'Head of Product',
      bio: 'Product leader with a track record of building developer tools that teams love. Passionate about metrics that matter.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    content: `Test coverage is one of the most commonly tracked metrics in software development. But what does 80% coverage really mean? And more importantly, does it mean your application is well-tested?

# The Coverage Trap

Many teams fixate on achieving a specific coverage percentage. "We need 90% coverage!" becomes the rallying cry. But coverage metrics can be misleading. High coverage doesn't guarantee quality, and low coverage doesn't always mean poor testing.

## What Coverage Actually Measures

Code coverage tells you which lines of code were executed during your tests. That's it. It doesn't tell you if your tests are meaningful, if they test the right scenarios, or if they would catch real bugs.

# Better Metrics

Instead of obsessing over coverage percentages, focus on these questions:

- Are critical user paths thoroughly tested?
- Do tests validate business logic, not just code execution?
- Would these tests catch the types of bugs you've seen in production?

## Quality Over Quantity

A single well-designed test that validates a critical business rule is worth more than 100 tests that just exercise code without meaningful assertions.

# Practical Strategies

Start with risk-based testing. Identify the parts of your application where bugs would have the highest impact. Ensure those areas have comprehensive, meaningful tests. Then expand coverage to medium and low-risk areas.

Use mutation testing to validate your test quality. This technique intentionally introduces bugs to see if your tests catch them. It's a powerful way to identify weak tests that provide false confidence.

Remember: the goal isn't 100% coverage. The goal is confidence that your application works correctly. Focus on tests that provide real value, and coverage will naturally follow.`,
  },
  {
    id: '5',
    title: 'Building a Testing Culture: Lessons from 100+ Teams',
    excerpt: 'We analyzed successful testing practices from hundreds of development teams. Here\'s what we learned about building a quality-first culture.',
    author: 'Lisa Thompson',
    date: 'December 15, 2025',
    readTime: '10 min read',
    category: 'Culture',
    tags: ['Culture', 'Best Practices', 'Team', 'Quality'],
    authorInfo: {
      name: 'Lisa Thompson',
      role: 'Head of Customer Success',
      bio: 'Dedicated to ensuring every team gets maximum value from quality practices. Former engineering manager at Netflix.',
      linkedin: 'https://linkedin.com',
    },
    content: `We've worked with hundreds of development teams, from small startups to large enterprises. The teams that consistently ship quality software share common cultural practices around testing. Here's what we learned.

# Testing is Everyone's Responsibility

The most successful teams don't have a separate QA department that tests code after development. Instead, everyone owns quality. Developers write tests for their code. Product managers define acceptance criteria. Designers consider testability in their designs.

## Shift Left

Testing starts at the beginning of development, not at the end. Requirements are testable. Designs consider edge cases. Code is written with testing in mind.

# Automate Everything

Manual testing has its place, but automated tests provide the foundation. The best teams automate regression testing, allowing humans to focus on exploratory testing and edge cases that machines can't catch.

## Test in Production

Don't be afraid of production. Use feature flags, canary deployments, and monitoring to test in real-world conditions. Some issues only appear at scale with real users.

# Celebrate Test Successes

Make testing visible and celebrated. Share test coverage improvements in standups. Recognize when tests catch important bugs before they reach production. Create a positive feedback loop around quality.

The teams that excel at testing don't treat it as a burden. They see it as an investment in shipping faster with confidence. Build that culture, and quality follows naturally.`,
  },
  {
    id: '6',
    title: 'API Testing Made Simple: A Comprehensive Guide',
    excerpt: 'Everything you need to know about API testing, from basic concepts to advanced strategies for microservices architectures.',
    author: 'James Park',
    date: 'December 8, 2025',
    readTime: '12 min read',
    category: 'Testing',
    tags: ['API', 'Testing', 'Microservices', 'Tutorial'],
    authorInfo: {
      name: 'James Park',
      role: 'Lead AI Engineer',
      bio: 'PhD in Machine Learning, building the AI that powers intelligent test generation. Previously researched at MIT.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    content: `APIs are the backbone of modern applications. Whether you're building a monolith or microservices, API testing is crucial for ensuring reliability. Here's your complete guide to effective API testing.

# Why API Testing Matters

API tests sit at a sweet spot in the testing pyramid. They're faster than UI tests but more comprehensive than unit tests. They validate business logic without the brittleness of UI-dependent tests.

## Types of API Tests

Different types of API tests serve different purposes:

- Contract tests verify API interfaces match expectations
- Integration tests validate API interactions with databases and services
- End-to-end tests check complete workflows across multiple APIs
- Performance tests ensure APIs meet response time requirements

# Testing REST APIs

REST APIs are stateless and resource-oriented. Test HTTP methods (GET, POST, PUT, DELETE) against your resources. Validate response codes, headers, and body content.

## Key Areas to Test

Don't just test happy paths. Cover:

- Authentication and authorization
- Input validation and error handling
- Rate limiting and throttling
- Data consistency across operations
- Concurrent access scenarios

# Testing GraphQL APIs

GraphQL presents unique challenges. Test query complexity limits, validate nested queries, and ensure proper error handling. Test fragments, mutations, and subscriptions thoroughly.

## Microservices Challenges

In microservices architectures, test service contracts carefully. Use consumer-driven contract testing to catch breaking changes early. Test circuit breakers and fallback mechanisms.

# Best Practices

Write API tests that are fast, isolated, and reliable. Use test data builders for consistent setup. Mock external dependencies. Run API tests in your CI pipeline for every commit.

API testing doesn't have to be complex. With the right approach and tools, you can build confidence in your APIs while maintaining development velocity.`,
  },
  {
    id: '7',
    title: 'The ROI of Automated Testing: A Data-Driven Analysis',
    excerpt: 'We crunched the numbers on automated testing investments. The results might surprise you.',
    author: 'Sarah Chen',
    date: 'December 1, 2025',
    readTime: '9 min read',
    category: 'Business',
    tags: ['ROI', 'Business', 'Metrics', 'Automation'],
    authorInfo: {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former QA lead at Google with 10+ years of experience in software testing and AI. Passionate about making quality assurance accessible to all developers.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    content: `"Automated testing is expensive." We hear this objection frequently. But when you look at the data, the ROI tells a different story. Let's examine the real costs and benefits of automated testing.

# The True Cost of Bugs

Production bugs are expensive. Studies show fixing a bug in production costs 15-100x more than catching it during development. Beyond direct fix costs, consider:

- Lost revenue during downtime
- Customer trust and churn
- Support team burden
- Developer context switching

## Manual Testing Costs

Manual testing seems cheaper upfront. No tooling costs, no automation development. But calculate the ongoing expense:

- QA time for each release
- Regression testing overhead
- Bug escape rate
- Release velocity constraints

# Automation Investment

Yes, automated testing requires upfront investment:

- Tool and infrastructure costs
- Time to write initial tests
- Learning curve for the team
- Ongoing test maintenance

But these costs are one-time or decrease over time, while manual testing costs compound with every release.

## The Numbers

Based on data from 200+ teams we've worked with:

- Average time to implement automated testing: 2-3 months
- Reduction in QA time per release: 60-80%
- Decrease in production bugs: 40-70%
- Increase in deployment frequency: 3-5x
- ROI break-even point: 3-6 months

# Beyond Direct ROI

The benefits extend beyond measurable ROI:

- Faster feature development
- Improved developer confidence
- Better work-life balance (fewer production fires)
- Ability to refactor with confidence

The data is clear: automated testing pays for itself quickly and continues to provide value for years. The real question isn't whether you can afford to automate – it's whether you can afford not to.`,
  },
  {
    id: '8',
    title: 'Security Testing in the Age of AI',
    excerpt: 'How artificial intelligence is changing the landscape of security testing and vulnerability detection.',
    author: 'Michael Rodriguez',
    date: 'November 22, 2025',
    readTime: '8 min read',
    category: 'Security',
    tags: ['Security', 'AI', 'Vulnerabilities', 'Testing'],
    authorInfo: {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher and software architect with expertise in building scalable testing infrastructure. Previously built testing systems at Amazon and Microsoft.',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    content: `Security vulnerabilities cost businesses billions annually. Traditional security testing methods struggle to keep pace with modern threats. AI is changing that equation.

# The Security Testing Challenge

Modern applications are complex. Microservices, APIs, third-party integrations – each introduces potential vulnerabilities. Manual security reviews and traditional scanning tools miss sophisticated attacks.

## Common Vulnerabilities

The OWASP Top 10 highlights critical security risks:

- Injection attacks (SQL, NoSQL, command)
- Broken authentication
- Sensitive data exposure
- XML external entities
- Broken access control

Traditional tools detect known patterns. But attackers constantly evolve. We need smarter approaches.

# AI-Powered Security Testing

AI brings several advantages to security testing:

## Pattern Recognition

Machine learning models trained on millions of code samples identify subtle vulnerability patterns humans might miss. They recognize security anti-patterns across multiple languages and frameworks.

## Behavioral Analysis

AI can analyze application behavior to detect anomalies indicating potential security issues. It learns normal patterns and flags deviations that might represent attacks or vulnerabilities.

## Automated Fuzzing

AI-driven fuzzing generates test inputs specifically designed to trigger security flaws. Unlike random fuzzing, AI fuzzing learns from feedback to generate increasingly sophisticated test cases.

# Implementation Strategies

Start with AI-augmented static analysis. Tools like GitHub's CodeQL use machine learning to identify vulnerabilities in source code. Integrate these into your CI pipeline for immediate feedback.

Add dynamic testing with AI-powered security scanners that learn your application's behavior and test for vulnerabilities during runtime.

## Human + AI

AI doesn't replace security experts. It amplifies their capabilities. Use AI to handle routine checks and flag potential issues, freeing security engineers to focus on complex threats and architectural reviews.

# The Future

As AI advances, security testing will become more predictive. Instead of just finding existing vulnerabilities, AI will predict potential future security issues based on code patterns and architectural decisions.

The stakes are too high to rely on traditional security testing alone. AI provides the intelligence and scale needed to protect modern applications against evolving threats.`,
  },
  {
    id: '9',
    title: 'Mobile App Testing: Strategies for Success',
    excerpt: 'The unique challenges of mobile testing and how to overcome them with the right tools and processes.',
    author: 'Emily Watson',
    date: 'November 15, 2025',
    readTime: '11 min read',
    category: 'Mobile',
    tags: ['Mobile', 'Testing', 'iOS', 'Android'],
    authorInfo: {
      name: 'Emily Watson',
      role: 'Head of Engineering',
      bio: 'Engineering leader specializing in scalable systems and performance optimization. Former tech lead at Stripe and Airbnb.',
      linkedin: 'https://linkedin.com',
    },
    content: `Mobile apps present unique testing challenges. Device fragmentation, network conditions, touch interactions, and platform-specific behaviors require specialized approaches. Here's how to test mobile apps effectively.

# The Mobile Testing Challenge

Unlike web applications that run in browsers with relatively consistent behavior, mobile apps face:

- Thousands of device models with different screen sizes and capabilities
- Multiple OS versions with varying API support
- Network conditions from 5G to offline
- Touch gestures and device sensors
- Platform-specific UI paradigms

## Real Devices vs. Emulators

Start with emulators and simulators for rapid iteration. They're fast and convenient for early testing. But don't stop there.

Real device testing is essential. Emulators can't fully replicate:

- Actual touch response and gestures
- Camera and sensor behavior
- Performance on lower-end devices
- Carrier-specific configurations

# Testing Strategy

## Unit and Integration Tests

Test business logic and API interactions independent of the UI. These tests run fast and provide quick feedback. Aim for high coverage at this level.

## UI Automation

Use platform-specific frameworks (XCTest for iOS, Espresso for Android) or cross-platform tools like Appium. Focus UI tests on critical user flows rather than comprehensive coverage.

## Manual Exploratory Testing

Reserve time for manual testing. Humans excel at finding usability issues, visual problems, and edge cases that automated tests miss.

# Platform-Specific Considerations

## iOS Testing

Test across device sizes (iPhone, iPad), OS versions, and consider landscape/portrait orientations. Test memory warnings and background state transitions.

## Android Testing

Device fragmentation is more severe on Android. Test across manufacturers (Samsung, Google, others), screen densities, and OS versions. Consider Android-specific behaviors like back button handling.

# Performance Testing

Mobile devices have limited resources. Test:

- App startup time
- Battery consumption
- Memory usage
- Network efficiency

Use profiling tools to identify performance bottlenecks before they reach users.

# Continuous Testing

Integrate mobile testing into CI/CD pipelines. Use cloud device farms for parallel testing across multiple devices. Run smoke tests on every commit, comprehensive suites before release.

Mobile testing is complex, but with the right strategy and tools, you can deliver high-quality apps that work reliably across the diverse mobile landscape.`,
  },
];

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const url = window.location.href;
    const text = post.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-sm font-medium">Share:</span>
                <button
                  onClick={() => handleShare('twitter')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Featured Image Placeholder */}
            <div className="mb-12 aspect-video bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl flex items-center justify-center">
              <span className="text-8xl font-bold text-primary-600 dark:text-primary-400">
                QA
              </span>
            </div>

            {/* Content */}
            <div className="mb-12">
              <BlogContent content={post.content || ''} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author */}
            <div className="mb-12">
              <BlogAuthor author={post.authorInfo} />
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </div>
        </div>
      </article>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to get the latest posts delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
