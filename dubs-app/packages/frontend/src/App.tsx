import { Layout } from './pages/layout';
import { appConfig } from '../app.config';

export const App = () => {
  document.title = appConfig.appName;

  return (
    <div>
      <Layout />
    </div>
  );
};
