import { appConfig } from '../app.config';
import { useRouteError } from 'react-router-dom';

type ErrorType = {
  data?: string;
  message?: string;
  status?: number;
  statusText?: string;
};

export const Error = () => {
  const error = useRouteError() as ErrorType;
  console.error(error);

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p
            className={`text-base font-semibold text-${appConfig.colorTextPrimary}-600`}
          >
            {error.status}
          </p>
          <h1
            className={`mt-4 text-3xl font-bold tracking-tight text-${appConfig.colorTextPrimary}-900 sm:text-5xl`}
          >
            {error.statusText}
          </h1>
          <p
            className={`mt-6 text-base leading-7 text-${appConfig.colorTextPrimary}-600`}
          >
            {error.data}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className={`rounded-md bg-${appConfig.colorPrimary}-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-${appConfig.colorPrimary}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${appConfig.colorPrimary}-600`}
            >
              Go back home
            </a>
            <a
              href={`mailto:${appConfig.appEmail}`}
              className={`text-sm font-semibold text-${appConfig.colorTextPrimary}-900`}
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};
