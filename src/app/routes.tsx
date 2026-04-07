import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ApplicationsPage } from './components/ApplicationsPage';
import { AboutPage } from './components/About';
import { ContactPage } from './components/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'products', Component: ProductsPage },
      { path: 'applications', Component: ApplicationsPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: HomePage },
    ],
  },
]);
