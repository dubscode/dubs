import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Outlet } from 'react-router-dom';

import { Dialog } from '@headlessui/react';
import { appConfig } from '../../app.config';
import { useState } from 'react';

const layoutConfig = appConfig.pages.layout;

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="px-6 lg:px-8">
        {/* Header */}
        <nav
          className="flex items-center justify-between pt-6"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{appConfig.appName}</span>
              <img
                className="h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=800"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className={`text-${appConfig.colorTextPrimary}-400 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {layoutConfig.navigation.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`text-${appConfig.colorTextPrimary}-900 text-sm font-semibold leading-6`}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/login"
              className={`text-${appConfig.colorTextPrimary}-900 text-sm font-semibold leading-6`}
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>

        {/* Mobile menu, show/hide based on mobile menu state. */}
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">{appConfig.appName}</span>
                <img
                  className="h-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt=""
                />
              </a>
              <button
                type="button"
                className={`text-${appConfig.colorTextPrimary}-400 -m-2.5 rounded-md p-2.5`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {layoutConfig.navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.path}
                      className={`text-${appConfig.colorTextPrimary}-900 -mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 hover:bg-gray-400/10`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className={`text-${appConfig.colorTextPrimary}-900 -mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 hover:bg-gray-400/10`}
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>

        <Outlet />
      </div>
    </div>
  );
}
