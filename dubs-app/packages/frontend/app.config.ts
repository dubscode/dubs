import colors from 'tailwindcss/colors';

interface PageOptions {
  heading: string;
}

interface AppConfig {
  appEmail: string;
  appName: string;
  colorPrimary: keyof typeof colors;
  colorSecondary: keyof typeof colors;
  colorTextPrimary: keyof typeof colors;
  colorTextSecondary: keyof typeof colors;
  pages: {
    layout: {
      navigation: {
        name: string;
        path: string;
      }[];
    };
    home: PageOptions;
    login: PageOptions;
  };
}

export const appConfig: AppConfig = {
  appEmail: 'help@example.com',
  appName: 'Dubs App',
  colorPrimary: 'sky',
  colorSecondary: 'teal',
  colorTextPrimary: 'gray',
  colorTextSecondary: 'sky',
  pages: {
    layout: {
      navigation: [
        { name: 'Product', path: '/product' },
        { name: 'Features', path: '/features' },
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'Company', path: '/company' },
      ],
    },
    home: {
      heading: 'Welcome to Dubs App',
    },
    login: {
      heading: 'Enter your email to log in or signup.',
    },
  },
};
