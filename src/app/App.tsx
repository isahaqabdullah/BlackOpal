import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SiteContentProvider } from './content/SiteContentProvider';

export default function App() {
  return (
    <SiteContentProvider>
      <RouterProvider router={router} />
    </SiteContentProvider>
  );
}
