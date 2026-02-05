import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '@/components/common/SEO';
import { useAuth } from '@/hooks/useAuth';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/schemas/auth';
import { ROUTES } from '@/constants/routes';

export const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const result = await forgotPassword(data.email);

    if (result.success) {
      setEmailSent(true);
      toast.success('OTP sent!', {
        description: 'Check your email for a 6-digit verification code.',
      });
    } else {
      toast.error('Failed to send OTP', {
        description: result.error || 'Please try again later.',
      });
    }
  };

  return (
    <>
      <SEO
        title="Forgot Password - QA AI"
        description="Reset your password"
        canonical={`${window.location.origin}${ROUTES.FORGOT_PASSWORD}`}
      />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link to="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                <span className="text-xl font-bold text-white">Q</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">QA AI</span>
            </Link>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Forgot password?
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {emailSent
                ? 'Check your email for the OTP'
                : "No worries! We'll send you a verification code."}
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {emailSent ? (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    Check your email
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We've sent a 6-digit OTP to{' '}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {getValues('email')}
                    </span>
                  </p>
                </div>

                <Link
                  to={ROUTES.RESET_PASSWORD}
                  state={{ email: getValues('email') }}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  Enter OTP
                </Link>

                <button
                  type="button"
                  onClick={() => setEmailSent(false)}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Didn't receive the email? Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send verification code'
                  )}
                </button>
              </form>
            )}

            {/* Back to Login */}
            <Link
              to={ROUTES.LOGIN}
              className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
