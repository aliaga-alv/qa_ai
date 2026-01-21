import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// TODO: Replace with real API data
const mockData = [
  { name: 'Login Tests', duration: 2.3, status: 'fast' },
  { name: 'API Tests', duration: 1.8, status: 'fast' },
  { name: 'Payment Flow', duration: 4.5, status: 'medium' },
  { name: 'Checkout', duration: 3.2, status: 'medium' },
  { name: 'Integration', duration: 8.7, status: 'slow' },
];

const getColor = (status: string) => {
  switch (status) {
    case 'fast':
      return '#22c55e'; // brighter green
    case 'medium':
      return '#f97316'; // brighter orange
    case 'slow':
      return '#f43f5e'; // brighter red/rose
    default:
      return '#6b7280';
  }
};

export default function DurationChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Average Test Duration
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Performance by test suite
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis 
            type="number" 
            className="text-xs text-gray-700 dark:text-gray-300"
            stroke="currentColor"
            label={{ value: 'Seconds', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            type="category" 
            dataKey="name"
            width={120}
            className="text-sm text-gray-900 dark:text-white font-medium"
            stroke="currentColor"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(31 41 55)',
              border: '1px solid rgb(75 85 99)',
              borderRadius: '0.5rem',
            }}
            labelStyle={{
              color: 'rgb(243 244 246)',
              fontWeight: '600',
              fontSize: '14px',
              marginBottom: '4px',
            }}
            itemStyle={{
              color: 'rgb(209 213 219)',
              fontSize: '13px',
            }}
            formatter={(value: number | undefined) => [`${value ?? 0}s`, 'Duration']}
          />
          <Bar dataKey="duration" radius={[0, 8, 8, 0]}>
            {mockData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded bg-green-500 mr-2" />
          <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Fast (&lt;3s)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded bg-orange-500 mr-2" />
          <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Medium (3-5s)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded bg-rose-500 mr-2" />
          <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Slow (&gt;5s)</span>
        </div>
      </div>
    </div>
  );
}
