import React, { useState } from 'react';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

interface VerificationPageProps {
  email: string;
  onVerificationSuccess: () => void;
  onBackToAuth: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ email, onVerificationSuccess, onBackToAuth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const code = formData.get('code') as string;

    try {
      const { isSignUpComplete } = await confirmSignUp({ username: email, confirmationCode: code });
      if (isSignUpComplete) {
        onVerificationSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
        await resendSignUpCode({ username: email });
        alert('A new verification code has been sent to your email.');
    } catch (err: any) {
        setError(err.message || 'Error resending code. Please wait a moment and try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl font-bold text-center text-indigo-600">ProResume</h1>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Verify your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification code to <span className="font-medium text-gray-800">{email}</span>. Please enter it below.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}
          <div>
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
              Verification Code
            </label>
            <div className="mt-2">
              <input
                id="code"
                name="code"
                type="text"
                required
                disabled={isLoading}
                placeholder="Enter 6-digit code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 disabled:bg-slate-50"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Didn't get a code?{' '}
          <button onClick={handleResendCode} disabled={isLoading} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 disabled:text-indigo-400">
            Resend
          </button>
          {' or '}
           <button onClick={onBackToAuth} disabled={isLoading} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 disabled:text-indigo-400">
            Go Back
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;