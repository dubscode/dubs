import { appConfig } from '../../app.config';

const homeConfig = appConfig.pages.home;

export function Home() {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      {/* Announcement banner. Hidden on smallest screens */}
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div
          className={`hover:ring-gray/20 text-${appConfig.colorTextPrimary}-600 relative rounded-full py-1 px-3 text-sm leading-6 ring-1 ring-gray-900/10`}
        >
          Announcing our next round of funding.{' '}
          <a
            href="#"
            className={`text-${appConfig.colorTextPrimary}-900 font-semibold`}
          >
            <span className="absolute inset-0" aria-hidden="true" />
            Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="text-center">
        <h1
          className={`text-${appConfig.colorTextPrimary}-900 text-4xl font-bold tracking-tight sm:text-6xl`}
        >
          {homeConfig.heading}
        </h1>
        <p
          className={`text-${appConfig.colorTextPrimary}-900 mt-6 text-lg leading-8`}
        >
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className={`rounded-md bg-${appConfig.colorPrimary}-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-${appConfig.colorPrimary}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${appConfig.colorPrimary}-400`}
          >
            Get started
          </a>
          <a
            href="#"
            className={`text-${appConfig.colorTextPrimary}-900 text-sm font-semibold leading-6`}
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
