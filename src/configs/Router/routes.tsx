import { type TypeRouter } from './router.types';

import paths from './paths';

import { Home, NotFound, Editor } from '@pages';

const routes: TypeRouter[] = [
  {
    path: paths.Home,
    element: <Home />,
    title: 'Home',
  },
  {
    path: '*',
    element: <NotFound />,
    title: 'NotFound',
  },
  {
    path: paths.Editor,
    element: <Editor />,
    title: 'Editor',
  },
];

export default routes;
