import { cn } from '@/lib/utils';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-6 text-center">
          <h1
            className={cn(
              'text-4xl font-bold sm:text-5xl lg:text-6xl',
              'bg-linear-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent'
            )}
          >
            QA AI Automation Tool
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            A modern, futuristic web platform that empowers QA engineers with AI-powered automation
            tools.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className={cn(
                'rounded-lg px-6 py-3 font-medium',
                'bg-primary-500 text-white',
                'transition-colors hover:bg-primary-600',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              )}
            >
              Get Started
            </button>
            <button
              className={cn(
                'rounded-lg px-6 py-3 font-medium',
                'bg-white dark:bg-dark-surface',
                'border border-gray-300 dark:border-gray-700',
                'text-gray-700 dark:text-gray-300',
                'transition-colors hover:bg-gray-50 dark:hover:bg-dark-elevated',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              )}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
