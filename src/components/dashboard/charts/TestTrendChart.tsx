import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// TODO: Replace with real API data
const mockData = [
  { date: 'Jan 15', total: 45, passed: 40, failed: 5 },
  { date: 'Jan 16', total: 52, passed: 48, failed: 4 },
  { date: 'Jan 17', total: 48, passed: 42, failed: 6 },
  { date: 'Jan 18', total: 61, passed: 58, failed: 3 },
  { date: 'Jan 19', total: 58, passed: 54, failed: 4 },
  { date: 'Jan 20', total: 67, passed: 63, failed: 4 },
  { date: 'Jan 21', total: 72, passed: 68, failed: 4 },
];

export default function TestTrendChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Test Execution Trends
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last 7 days performance
          </p>
        </div>
        <select className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis 
            dataKey="date" 
            className="text-xs text-gray-700 dark:text-gray-300"
            stroke="currentColor"
          />
          <YAxis 
            className="text-xs text-gray-700 dark:text-gray-300"
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
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            name="Total Tests"
            dot={{ fill: '#8b5cf6', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="passed" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Passed"
            dot={{ fill: '#10b981', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="failed" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Failed"
            dot={{ fill: '#ef4444', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
