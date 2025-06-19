import { Route, Routes } from 'react-router-dom';

import routes from 'routes';
import MainLayout from './MainLayout';
import { TypeRouter } from './types';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes.map(({ path, title, element }: TypeRouter) => {
          return <Route key={title} path={path} element={element} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
