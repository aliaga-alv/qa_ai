import { useState } from 'react';
import { Users, Save, Upload, AlertCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TeamSettingsPage() {
  const [teamData, setTeamData] = useState({
    teamName: 'Tech Corp QA Team',
    workspaceName: 'techcorp-qa',
    description: 'Quality assurance team for all product testing and automation',
    website: 'https://techcorp.com',
    size: '10-50',
    industry: 'Technology',
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [testRetention, setTestRetention] = useState('90');
  const [autoArchive, setAutoArchive] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [allowGuestAccess, setAllowGuestAccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('Logo updated', {
        description: 'Your team logo has been changed.',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to update team settings
    toast.success('Team settings updated', {
      description: 'Your team settings have been saved successfully.',
    });
  };

  const handleDeleteTeam = () => {
    if (window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      toast.error('Team deleted', {
        description: 'Your team has been permanently deleted.',
      });
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your team workspace, preferences, and collaboration settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Team Branding */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Branding</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-semibold overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Team Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Users className="h-12 w-12" />
                  )}
                </div>
                <label
                  htmlFor="logo-upload"
                  className="absolute bottom-0 right-0 p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full cursor-pointer transition-colors shadow-lg"
                >
                  <Upload className="h-4 w-4" />
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Team Logo</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  JPG, PNG or SVG. Max size 2MB. Recommended size 256x256px.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Team Name
              </label>
              <input
                type="text"
                name="teamName"
                value={teamData.teamName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Workspace URL
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-200 dark:border-gray-600 rounded-l-lg text-sm text-gray-600 dark:text-gray-400">
                  qaai.app/
                </span>
                <input
                  type="text"
                  name="workspaceName"
                  value={teamData.workspaceName}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-r-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Lowercase letters, numbers, and hyphens only
              </p>
            </div>
          </div>
        </div>

        {/* Team Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={teamData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder="Brief description of your team..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={teamData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Team Size
                </label>
                <select
                  name="size"
                  value={teamData.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="1-10">1-10 people</option>
                  <option value="10-50">10-50 people</option>
                  <option value="50-200">50-200 people</option>
                  <option value="200+">200+ people</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry
                </label>
                <select
                  name="industry"
                  value={teamData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Workspace Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Test Data Retention
              </label>
              <select
                value={testRetention}
                onChange={(e) => setTestRetention(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
                <option value="-1">Forever</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                How long to keep test execution history and artifacts
              </p>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Auto-archive inactive tests
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Automatically archive tests that haven't run in 90 days
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAutoArchive(!autoArchive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoArchive ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoArchive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Require approval for test deletion
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Admins must approve before tests are permanently deleted
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRequireApproval(!requireApproval)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  requireApproval ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    requireApproval ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Allow guest access
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Enable read-only access for external stakeholders
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAllowGuestAccess(!allowGuestAccess)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  allowGuestAccess ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    allowGuestAccess ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleDeleteTeam}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Team</span>
          </button>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg font-medium transition-all"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>

      {/* Warning Notice */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-orange-900 dark:text-orange-200">
              Team Owner Permissions Required
            </p>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
              Only team owners can modify these settings. Changes will affect all team members.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
