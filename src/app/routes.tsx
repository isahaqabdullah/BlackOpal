import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ApplicationsPage } from './components/ApplicationsPage';
import { ApplicationDetailPage } from './components/ApplicationDetailPage';
import { AboutPage } from './components/About';
import { ProductionPage } from './components/ProductionPage';
import { NewsroomPage } from './components/NewsroomPage';
import { PressReleasePage } from './components/PressReleasePage';
import { ContactPage } from './components/Contact';
import { NotFoundPage } from './components/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'products', Component: ProductsPage },
      { path: 'products/:productSlug', Component: ProductDetailPage },
      { path: 'applications', Component: ApplicationsPage },
      { path: 'applications/:applicationSlug', Component: ApplicationDetailPage },
      { path: 'production', Component: ProductionPage },
      { path: 'about', Component: AboutPage },
      { path: 'newsroom', Component: NewsroomPage },
      { path: 'newsroom/:storySlug', Component: PressReleasePage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
