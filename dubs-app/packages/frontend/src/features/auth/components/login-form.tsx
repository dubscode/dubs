import { RequestStatus, useAuth } from '../hooks/use-auth';
import { SubmitHandler, useForm } from 'react-hook-form';

import { HiMail } from 'react-icons/hi';
import { appConfig } from '../../../../app.config';

type Inputs = {
  email: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { login, status } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (data.email) {
      login(data.email);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <label
          htmlFor="email"
          className={`block text-sm font-medium text-${appConfig.colorTextPrimary}-700`}
        >
          Email
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center pt-3 pl-3 md:pt-2">
            <HiMail
              className={`h-5 w-5 text-${appConfig.colorTextPrimary}-400`}
              aria-hidden="true"
            />
          </div>
          <input
            type="email"
            id="email"
            className={`block w-full rounded-md border-gray-300 pl-10 focus:border-sky-500 focus:ring-sky-500 sm:text-sm`}
            placeholder="Enter your email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className={`mt-1 text-xs text-red-700`}>
              Email field is required
            </span>
          )}
          {status === RequestStatus.FETCHING && (
            <span className={`mt-1 text-xs text-sky-800`}>Submitting...</span>
          )}
          {status === RequestStatus.SUCCESS && (
            <span className={`mt-1 text-xs text-teal-700`}>
              Check your email for a login link
            </span>
          )}
          <div>
            <button
              type="submit"
              className={`mt-2 flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2`}
            >
              Send Link
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
