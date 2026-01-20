import { cn } from '@/lib/utils';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className={cn(
            "text-4xl sm:text-5xl lg:text-6xl font-bold",
            "bg-linear-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
          )}>
            QA AI Automation Tool
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A modern, futuristic web platform that empowers QA engineers with AI-powered automation tools.
          </p>
          <div className="flex justify-center gap-4">
            <button className={cn(
              "px-6 py-3 rounded-lg font-medium",
              "bg-primary-500 text-white",
              "hover:bg-primary-600 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            )}>
              Get Started
            </button>
            <button className={cn(
              "px-6 py-3 rounded-lg font-medium",
              "bg-white dark:bg-dark-surface",
              "border border-gray-300 dark:border-gray-700",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            )}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
