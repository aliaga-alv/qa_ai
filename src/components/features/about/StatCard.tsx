interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
}

export const StatCard = ({ value, label, suffix = '' }: StatCardProps) => {
  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800">
      <div className="mb-2 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
        {value}
        {suffix}
      </div>
      <div className="font-medium text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
};
