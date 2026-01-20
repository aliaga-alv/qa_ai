import { Heart, Umbrella, Plane, GraduationCap, Home, Zap } from 'lucide-react';
import { JobCard, type JobData } from '@/components/features/careers/JobCard';
import { BenefitCard, type BenefitData } from '@/components/features/careers/BenefitCard';

const jobs: JobData[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    description: 'Build beautiful, performant user interfaces for our AI-powered testing platform. Work with React, TypeScript, and cutting-edge web technologies.',
  },
  {
    id: '2',
    title: 'Machine Learning Engineer',
    department: 'AI Research',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Develop and improve our AI models for intelligent test generation and analysis. Work with large-scale datasets and state-of-the-art ML techniques.',
  },
  {
    id: '3',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design intuitive experiences that help developers test their applications more effectively. Own the end-to-end design process from research to implementation.',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and maintain the infrastructure that powers millions of test executions. Work with Kubernetes, AWS, and modern DevOps tools.',
  },
  {
    id: '5',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    description: 'Help our customers succeed with QA AI. Build relationships, provide guidance, and ensure teams get maximum value from our platform.',
  },
  {
    id: '6',
    title: 'Content Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create compelling content that educates developers about testing best practices and showcases our platform. Own our blog, case studies, and technical content.',
  },
];

const benefits: BenefitData[] = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health, dental, and vision insurance for you and your family. Plus mental health support and wellness programs.',
  },
  {
    icon: Umbrella,
    title: 'Work-Life Balance',
    description: 'Flexible work hours, unlimited PTO, and remote-first culture. We trust you to do your best work on your own schedule.',
  },
  {
    icon: Plane,
    title: 'Team Retreats',
    description: 'Annual company retreats and quarterly team offsites. Connect with colleagues and explore new places together.',
  },
  {
    icon: GraduationCap,
    title: 'Learning & Growth',
    description: '$2,000 annual learning budget for courses, conferences, and books. Plus regular internal knowledge sharing sessions.',
  },
  {
    icon: Home,
    title: 'Remote Setup',
    description: '$1,500 home office stipend and monthly coworking allowance. Get the equipment and workspace you need.',
  },
  {
    icon: Zap,
    title: 'Equity & Bonuses',
    description: 'Competitive equity packages and performance bonuses. Share in our success as we grow.',
  },
];

export const CareersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Join us in transforming
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                Software Quality
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              We're building the future of QA with AI. Join a team of passionate engineers, 
              designers, and problem-solvers working on technology that impacts millions of developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-positions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all shadow-lg"
              >
                View Open Positions
              </a>
              <a
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all"
              >
                Learn About Benefits
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Our Culture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Move Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We ship quickly, iterate based on feedback, and aren't afraid to experiment.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Collaborate
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Great ideas come from anywhere. We value diverse perspectives and open communication.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Own It
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Take ownership of your work and see the direct impact of your contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Benefits & Perks
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
              We take care of our team so you can do your best work
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
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
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-900 dark:to-accent-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don't see the right role?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and let us know 
            what you're passionate about.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};
