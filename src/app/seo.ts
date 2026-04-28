import {
  applicationMap,
  applications,
  newsroomMap,
  products,
  productMap,
} from './content/siteContent';
import type { ApplicationEntry, NewsroomItem, ProductEntry } from './content/siteContent';
import { companyDetails, siteConfig, siteUrl } from './config/siteConfig';

const SITE_NAME = siteConfig.siteName;
const DEFAULT_IMAGE_PATH = siteConfig.defaultImagePath;

type Breadcrumb = {
  name: string;
  path: string;
};

type SeoEntity =
  | { type: 'product'; item: ProductEntry }
  | { type: 'application'; item: ApplicationEntry }
  | { type: 'article'; item: NewsroomItem };

export type SeoMetadata = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  breadcrumbs: Breadcrumb[];
  entity?: SeoEntity;
};

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteUrl}${path}`;
}

function pageTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '') || '/';
}

const defaultDescription =
  siteConfig.defaultDescription;

type StaticPageMetadata = Omit<SeoMetadata, 'path' | 'breadcrumbs'> & {
  breadcrumbLabel: string;
};

const staticPages: Record<string, StaticPageMetadata> = {
  '/': {
    title: siteConfig.homeTitle,
    description: defaultDescription,
    imageAlt: `${SITE_NAME} activated carbon supplier`,
    breadcrumbLabel: 'Home',
  },
  '/products': {
    title: pageTitle('Activated Carbon Products'),
    description:
      'Explore Black Opal granular, powder, impregnated, and catalytic activated carbon products for industrial and water-treatment applications.',
    imageAlt: `Activated carbon products from ${SITE_NAME}`,
    breadcrumbLabel: 'Products',
  },
  '/applications': {
    title: pageTitle('Activated Carbon Applications'),
    description:
      'Activated carbon solutions for water treatment, gold recovery, air and gas purification, oil and gas, chloramine removal, and specialty industrial processes.',
    imageAlt: 'Industrial activated carbon application areas',
    breadcrumbLabel: 'Applications',
  },
  '/production': {
    title: pageTitle('Activated Carbon Production and Quality Control'),
    description:
      `Learn about ${SITE_NAME} manufacturing scale, coconut shell raw-material control, particle-size screening, and quality assurance process.`,
    imageAlt: 'Coconut shell activated carbon production and quality control',
    breadcrumbLabel: 'Production',
  },
  '/about': {
    title: pageTitle(`About ${SITE_NAME}`),
    description:
      `${SITE_NAME}${companyDetails.legacyName ? `, formerly ${companyDetails.legacyName},` : ''} supplies coconut shell activated carbon through company-owned manufacturing and a regional commercial base.`,
    imageAlt: `${SITE_NAME} company profile`,
    breadcrumbLabel: 'About',
  },
  '/newsroom': {
    title: pageTitle('Newsroom and Resources'),
    description:
      `Read ${SITE_NAME} company updates and request current activated carbon collateral for water treatment, gold recovery, and catalytic carbon.`,
    imageAlt: `${SITE_NAME} newsroom and resources`,
    breadcrumbLabel: 'Newsroom',
  },
  '/contact': {
    title: pageTitle('Request a Quote'),
    description:
      `Contact ${SITE_NAME} for activated carbon pricing, technical recommendations, product availability, and application-specific grade matching.`,
    imageAlt: `Contact ${SITE_NAME} for activated carbon quotes`,
    breadcrumbLabel: 'Contact',
  },
};

function baseBreadcrumb(path: string, label: string): Breadcrumb[] {
  return [
    { name: 'Home', path: '/' },
    { name: label, path },
  ];
}

export function resolveSeo(pathname: string): SeoMetadata {
  const path = normalizePath(pathname);

  if (path in staticPages) {
    const metadata = staticPages[path];
    const { breadcrumbLabel, ...pageMetadata } = metadata;

    return {
      ...pageMetadata,
      path,
      image: absoluteUrl(DEFAULT_IMAGE_PATH),
      breadcrumbs: path === '/' ? [{ name: 'Home', path: '/' }] : baseBreadcrumb(path, breadcrumbLabel),
    };
  }

  const productMatch = path.match(/^\/products\/([^/]+)$/);
  if (productMatch) {
    const product = productMap[productMatch[1]];

    if (product) {
      return {
        title: pageTitle(product.name),
        description: product.summary,
        path,
        image: product.image,
        imageAlt: product.name,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path },
        ],
        entity: { type: 'product', item: product },
      };
    }
  }

  const applicationMatch = path.match(/^\/applications\/([^/]+)$/);
  if (applicationMatch) {
    const application = applicationMap[applicationMatch[1]];

    if (application) {
      return {
        title: pageTitle(`${application.name} Activated Carbon Applications`),
        description: application.summary,
        path,
        image: application.image,
        imageAlt: application.name,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Applications', path: '/applications' },
          { name: application.name, path },
        ],
        entity: { type: 'application', item: application },
      };
    }
  }

  const newsroomMatch = path.match(/^\/newsroom\/([^/]+)$/);
  if (newsroomMatch) {
    const story = newsroomMap[newsroomMatch[1]];

    if (story?.type === 'press-release') {
      return {
        title: pageTitle(story.title),
        description: story.summary,
        path,
        type: 'article',
        image: absoluteUrl(DEFAULT_IMAGE_PATH),
        imageAlt: story.title,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Newsroom', path: '/newsroom' },
          { name: story.title, path },
        ],
        entity: { type: 'article', item: story },
      };
    }
  }

  return {
    title: pageTitle('Page Not Found'),
    description: `The requested ${SITE_NAME} page could not be found.`,
    path,
    image: absoluteUrl(DEFAULT_IMAGE_PATH),
    imageAlt: SITE_NAME,
    noindex: true,
    breadcrumbs: [{ name: 'Home', path: '/' }],
  };
}

function breadcrumbSchema(breadcrumbs: Breadcrumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: absoluteUrl(breadcrumb.path),
    })),
  };
}

function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: SITE_NAME,
    alternateName: companyDetails.legacyName,
    url: siteUrl,
    email: companyDetails.infoEmail,
    telephone: companyDetails.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyDetails.headquarters.line1,
      addressLocality: companyDetails.headquarters.locality,
      addressRegion: companyDetails.headquarters.region,
      postalCode: companyDetails.headquarters.postalCode,
      addressCountry: companyDetails.headquarters.countryCode,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: companyDetails.phoneDisplay,
        email: companyDetails.salesEmail,
        contactType: 'sales',
        areaServed: siteConfig.serviceArea,
      },
    ],
    location: companyDetails.additionalOffices.map((office) => ({
      '@type': 'Place',
      name: office.name,
      description: office.label,
      address: {
        '@type': 'PostalAddress',
        streetAddress: office.address.join(', '),
      },
    })),
  };
}

function entitySchema(metadata: SeoMetadata) {
  const url = absoluteUrl(metadata.path);

  if (metadata.entity?.type === 'product') {
    const product = metadata.entity.item;

    return {
      '@type': 'Product',
      name: product.name,
      description: product.summary,
      image: product.image,
      url,
      category: 'Activated Carbon',
      brand: {
        '@id': `${siteUrl}/#organization`,
      },
    };
  }

  if (metadata.entity?.type === 'application') {
    const application = metadata.entity.item;

    return {
      '@type': 'Service',
      name: `${application.name} Activated Carbon Solutions`,
      description: application.summary,
      serviceType: application.name,
      url,
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      areaServed: siteConfig.serviceArea,
    };
  }

  if (metadata.entity?.type === 'article') {
    const article = metadata.entity.item;

    return {
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.summary,
      url,
      mainEntityOfPage: url,
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    };
  }

  return null;
}

export function buildJsonLd(metadata: SeoMetadata) {
  const pageUrl = absoluteUrl(metadata.path);
  const schemas: Array<Record<string, unknown>> = [
    organizationSchema(),
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: SITE_NAME,
      url: siteUrl,
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      name: metadata.title,
      description: metadata.description,
      url: pageUrl,
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
    },
    breadcrumbSchema(metadata.breadcrumbs),
  ];

  const entity = entitySchema(metadata);
  if (entity) {
    schemas.push(entity);
  }

  if (metadata.path === '/products') {
    schemas.push({
      '@type': 'ItemList',
      name: 'Activated Carbon Products',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: absoluteUrl(`/products/${product.slug}`),
      })),
    });
  }

  if (metadata.path === '/applications') {
    schemas.push({
      '@type': 'ItemList',
      name: 'Activated Carbon Applications',
      itemListElement: applications.map((application, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: application.name,
        url: absoluteUrl(`/applications/${application.slug}`),
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}
