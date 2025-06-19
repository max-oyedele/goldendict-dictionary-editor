import { type TypeRouter } from './types';

import { Home, Editor } from '@pages';

const routes: TypeRouter[] = [
  {
    path: '/home',
    element: <Home />,
    title: 'Home',
  },
  {
    path: '/',
    element: <Editor />,
    title: 'Editor',
  },
];

export default routes;
