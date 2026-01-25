import { MapPin, Briefcase, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { JobData } from '@/types/models';

interface JobCardProps {
  job: JobData;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{job.type}</span>
            </div>
          </div>
        </div>
        <Link
          to={`/careers/${job.id}`}
          className="flex-shrink-0 rounded-lg bg-primary-600 px-6 py-2 text-center font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Apply Now
        </Link>
      </div>
      <p className="leading-relaxed text-gray-600 dark:text-gray-400">{job.description}</p>
    </div>
  );
};
