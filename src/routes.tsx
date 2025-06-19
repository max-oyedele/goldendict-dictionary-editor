import { Home, Editor } from '@pages';
import { type TypeRouter } from '@types';

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
