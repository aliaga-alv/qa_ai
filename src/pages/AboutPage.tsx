import { TeamMember } from '@/components/features/about/TeamMember';
import { ValueCard } from '@/components/features/about/ValueCard';
import { StatCard } from '@/components/features/about/StatCard';
import { ROUTES } from '@/constants/routes';
import { companyValues, teamMembers } from '@/mocks';

const values = companyValues;
const team = teamMembers;

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Building the future of
              <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Quality Assurance
              </span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-400">
              We believe every development team deserves access to world-class testing tools. QA AI
              combines the power of artificial intelligence with intuitive design to make
              comprehensive testing accessible, fast, and reliable.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
                QA AI was born from a simple frustration: testing shouldn't be the bottleneck in
                software development. Our founders, Sarah and Michael, spent years leading QA teams
                at major tech companies and witnessed firsthand how manual testing processes slowed
                down releases and frustrated developers.
              </p>
              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
                In 2024, they decided to build the solution they wished existed - an AI-powered
                testing platform that could understand your application, generate comprehensive test
                cases, and catch bugs before they reach production. What started as a side project
                quickly grew into a mission to transform how teams approach quality assurance.
              </p>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                Today, QA AI is trusted by thousands of development teams worldwide, from startups
                to enterprises. We're proud to be helping teams ship faster, with confidence,
                knowing their code is thoroughly tested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard value="10K" label="Active Teams" suffix="+" />
              <StatCard value="50M" label="Tests Executed" suffix="+" />
              <StatCard value="99.9" label="Uptime SLA" suffix="%" />
              <StatCard value="4.9" label="Customer Rating" suffix="/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Our Values
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => (
                <ValueCard key={index} value={value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Meet Our Team
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
              The people building the future of QA
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <TeamMember key={index} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 py-20 dark:from-primary-900 dark:to-accent-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Join us on our mission</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            We're always looking for talented, passionate people to join our team. Check out our
            open positions or start using QA AI today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/careers"
              className="inline-flex transform items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 shadow-xl transition-all hover:scale-105 hover:bg-gray-50"
            >
              View Careers
            </a>
            <a
              href={ROUTES.REGISTER}
              className="inline-flex transform items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
