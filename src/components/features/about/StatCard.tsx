interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
}

export const StatCard = ({ value, label, suffix = '' }: StatCardProps) => {
  return (
    <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 mb-2">
        {value}{suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );
};
