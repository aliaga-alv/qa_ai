import { JobCard } from '@/components/features/careers/JobCard';
import { BenefitCard } from '@/components/features/careers/BenefitCard';
import { jobs, benefits } from '@/mocks';

export const CareersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Join us in transforming
              <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Software Quality
              </span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-400">
              We're building the future of QA with AI. Join a team of passionate engineers,
              designers, and problem-solvers working on technology that impacts millions of
              developers.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#open-positions"
                className="inline-flex transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-primary-700 hover:to-accent-700"
              >
                View Open Positions
              </a>
              <a
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-8 py-4 font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Learn About Benefits
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Our Culture
            </h2>
            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 text-4xl">🚀</div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Move Fast</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We ship quickly, iterate based on feedback, and aren't afraid to experiment.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-4xl">🤝</div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Collaborate
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Great ideas come from anywhere. We value diverse perspectives and open
                  communication.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-4xl">💡</div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Own It</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Take ownership of your work and see the direct impact of your contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-gray-50 py-20 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Benefits & Perks
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
              We take care of our team so you can do your best work
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="bg-white py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Open Positions
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
              {jobs.length} open roles across Engineering, Design, and more
            </p>
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 py-20 dark:from-primary-900 dark:to-accent-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Don't see the right role?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            We're always looking for talented people. Send us your resume and let us know what
            you're passionate about.
          </p>
          <a
            href="/contact"
            className="inline-flex transform items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 shadow-xl transition-all hover:scale-105 hover:bg-gray-50"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};
