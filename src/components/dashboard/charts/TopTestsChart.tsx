import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// TODO: Replace with real API data
const mockData = [
  { name: 'User Login', runs: 342 },
  { name: 'Product Search', runs: 287 },
  { name: 'Add to Cart', runs: 256 },
  { name: 'Checkout Flow', runs: 198 },
  { name: 'Payment Process', runs: 176 },
  { name: 'Profile Update', runs: 143 },
  { name: 'Reset Password', runs: 121 },
  { name: 'Email Verify', runs: 98 },
];

export default function TopTestsChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Most Run Tests
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Top 8 most executed tests
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis 
            type="number"
            className="text-xs text-gray-700 dark:text-gray-300"
            stroke="currentColor"
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
            formatter={(value: number | undefined) => [`${value ?? 0} runs`, 'Executions']}
          />
          <Bar 
            dataKey="runs" 
            fill="url(#colorGradient)" 
            radius={[0, 8, 8, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
