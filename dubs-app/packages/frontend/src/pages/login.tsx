import { LoginForm } from '../features/auth/components/login-form';
import { appConfig } from '../../app.config';

export const Login = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-200 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2
            className={`mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-${appConfig.colorTextSecondary}-800 sm:text-4xl`}
          >
            Enter your email to login or signup.
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
