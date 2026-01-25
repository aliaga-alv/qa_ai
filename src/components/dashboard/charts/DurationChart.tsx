import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { mockDurationChartData } from '@/mocks';

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
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Average Test Duration
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Performance by test suite</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockDurationChartData} layout="vertical">
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
            className="text-sm font-medium text-gray-900 dark:text-white"
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
            {mockDurationChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded bg-green-500" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Fast (&lt;3s)
          </span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded bg-orange-500" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Medium (3-5s)
          </span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded bg-rose-500" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Slow (&gt;5s)
          </span>
        </div>
      </div>
    </div>
  );
}
