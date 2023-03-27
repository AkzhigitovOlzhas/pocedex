import { AppContainer } from '@components/AppContainer/AppContainer';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { appUrls } from './appUrls';

export const routers = createBrowserRouter([
  {
    element: <AppContainer />,
    children: [
      {
        path: appUrls.main,
        element: <App />,
      },
    ],
  },
]);
