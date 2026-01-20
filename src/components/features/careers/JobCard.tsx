import { MapPin, Briefcase, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface JobData {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

interface JobCardProps {
  job: JobData;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
          </div>
        </div>
        <Link
          to={`/careers/${job.id}`}
          className="flex-shrink-0 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors text-center"
        >
          Apply Now
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {job.description}
      </p>
    </div>
  );
};
