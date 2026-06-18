import {
  aboutPageContent,
  contactPageContent,
  homePageContent,
  applicationMap,
  applications,
  newsroomMap,
  pageCopyContent,
  products,
  productMap,
  productionPageContent,
  siteSettingsContent,
} from './content/siteContent';
import {
  resourceDetailPageMap,
  resourceHubCards,
  resourceHub,
  type ResourceDetailPage,
} from './content/resourcePages';
import {
  supplierLandingPageMap,
  supplierLandingPagePath,
  supplierLandingPages,
  type SupplierLandingPage,
} from './content/supplierLandingPages';
import type {
  AboutPageContent,
  ApplicationEntry,
  ContactPageContent,
  NewsroomItem,
  PageCopyContent,
  ProductEntry,
  ProductionPageContent,
  SeoFields,
  SiteSettingsContent,
} from './content/siteContent';
import { stegaClean } from '@sanity/client/stega';
import { companyDetails, siteConfig, siteUrl } from './config/siteConfig';
import { formatPhoneNumbers } from './utils/phone';

const SITE_NAME = siteConfig.siteName;
const DEFAULT_IMAGE_PATH = siteConfig.defaultImagePath;

type Breadcrumb = {
  name: string;
  path: string;
};

type SeoEntity =
  | { type: 'product'; item: ProductEntry }
  | { type: 'application'; item: ApplicationEntry }
  | { type: 'article'; item: NewsroomItem }
  | { type: 'resource'; item: ResourceDetailPage }
  | { type: 'supplierLanding'; item: SupplierLandingPage };

export type SeoContent = {
  homePage: typeof homePageContent;
  productionPage: ProductionPageContent;
  siteSettings: SiteSettingsContent;
  pageCopy: PageCopyContent;
  aboutPage: AboutPageContent;
  contactPage: ContactPageContent;
  products: ProductEntry[];
  applications: ApplicationEntry[];
  productMap: Record<string, ProductEntry>;
  applicationMap: Record<string, ApplicationEntry>;
  newsroomMap: Record<string, NewsroomItem>;
};

const fallbackSeoContent: SeoContent = {
  homePage: homePageContent,
  productionPage: productionPageContent,
  siteSettings: siteSettingsContent,
  pageCopy: pageCopyContent,
  aboutPage: aboutPageContent,
  contactPage: contactPageContent,
  products,
  applications,
  productMap,
  applicationMap,
  newsroomMap,
};

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

function cleanSeoText(value: string | undefined) {
  return value ? stegaClean(value).trim() : '';
}

function applyExplicitSeo(metadata: SeoMetadata, entity?: { seo?: SeoFields }) {
  const seo = entity?.seo;

  return {
    ...metadata,
    title: cleanSeoText(seo?.seoTitle) || metadata.title,
    description: cleanSeoText(seo?.seoDescription) || metadata.description,
    image: cleanSeoText(seo?.seoImage) || metadata.image,
    noindex: typeof seo?.noIndex === 'boolean' ? seo.noIndex : metadata.noindex,
  };
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '') || '/';
}

const defaultDescription =
  siteConfig.defaultDescription;
const originSeoNote = `Includes ${siteConfig.originDescription} for dependable regional and global supply.`;

type StaticPageMetadata = Omit<SeoMetadata, 'path' | 'breadcrumbs'> & {
  breadcrumbLabel: string;
  seo?: SeoFields;
};

function staticPageMetadata(path: string, content: SeoContent): StaticPageMetadata | undefined {
  if (path === '/') {
    return {
      title: siteConfig.homeTitle,
      description: defaultDescription,
      imageAlt: content.homePage.heroLogoAlt,
      breadcrumbLabel: content.siteSettings.pageIntro.homeLabel,
      seo: content.homePage.seo,
    };
  }

  if (path === '/products') {
    const page = content.pageCopy.productsPage;
    return {
      title: pageTitle(page.intro.title),
      description: page.intro.description || page.seo?.seoDescription || defaultDescription,
      imageAlt: page.intro.title,
      breadcrumbLabel: page.intro.breadcrumbLabel,
      seo: page.seo,
    };
  }

  if (path === '/activated-carbon-suppliers') {
    return {
      title: pageTitle('Coconut Shell Activated Carbon Manufacturer'),
      description:
        'Black Opal Carbons manufactures high-performance coconut shell activated carbon, including granular, powder, impregnated, and catalytic grades, for water, gold recovery, air, gas, refinery, and specialty applications.',
      imageAlt: 'Coconut shell activated carbon manufacturer',
      breadcrumbLabel: 'Activated carbon manufacturers',
    };
  }

  if (path === '/applications') {
    const page = content.pageCopy.applicationsPage;
    return {
      title: pageTitle(page.intro.title),
      description: page.intro.description || page.seo?.seoDescription || defaultDescription,
      imageAlt: page.intro.title,
      breadcrumbLabel: page.intro.breadcrumbLabel,
      seo: page.seo,
    };
  }

  if (path === '/production') {
    const page = content.productionPage;
    return {
      title: pageTitle(page.intro.title),
      description: page.intro.description || page.seo?.seoDescription || defaultDescription,
      imageAlt: page.imageAlt,
      breadcrumbLabel: page.intro.breadcrumbLabel,
      seo: page.seo,
    };
  }

  if (path === '/resources') {
    return {
      title: pageTitle(resourceHub.seoTitle),
      description: resourceHub.seoDescription,
      imageAlt: resourceHub.title,
      breadcrumbLabel: resourceHub.label,
    };
  }

  if (path === '/about') {
    const page = content.aboutPage;
    return {
      title: pageTitle(page.intro.title),
      description: page.intro.description || page.seo?.seoDescription || defaultDescription,
      imageAlt: page.heroImageAlt,
      breadcrumbLabel: page.intro.breadcrumbLabel,
      seo: page.seo,
    };
  }

  if (path === '/newsroom') {
    const page = content.pageCopy.newsroomPage;
    return {
      title: pageTitle(page.intro.title),
      description: page.intro.description || page.seo?.seoDescription || defaultDescription,
      imageAlt: page.intro.title,
      breadcrumbLabel: page.intro.breadcrumbLabel,
      seo: page.seo,
    };
  }

  if (path === '/contact') {
    const page = content.contactPage;
    return {
      title: pageTitle(page.intro.title),
      description: page.intro.description || page.seo?.seoDescription || defaultDescription,
      imageAlt: page.intro.title,
      breadcrumbLabel: page.intro.breadcrumbLabel,
      seo: page.seo,
    };
  }

  return undefined;
}

function baseBreadcrumb(path: string, label: string, content: SeoContent = fallbackSeoContent): Breadcrumb[] {
  return [
    { name: content.siteSettings.pageIntro.homeLabel, path: content.siteSettings.pageIntro.homePath },
    { name: label, path },
  ];
}

export function resolveSeo(pathname: string, content: SeoContent = fallbackSeoContent): SeoMetadata {
  const path = normalizePath(pathname);
  const staticPage = staticPageMetadata(path, content);

  if (staticPage) {
    const { breadcrumbLabel, seo, ...pageMetadata } = staticPage;

    const resolved = {
      ...pageMetadata,
      path,
      image: absoluteUrl(DEFAULT_IMAGE_PATH),
      breadcrumbs:
        path === '/'
          ? [{ name: content.siteSettings.pageIntro.homeLabel, path: content.siteSettings.pageIntro.homePath }]
          : baseBreadcrumb(path, breadcrumbLabel, content),
    };

    return applyExplicitSeo(resolved, { seo });
  }

  const supplierLandingMatch = path.match(/^\/activated-carbon-suppliers\/([^/]+)$/);
  if (supplierLandingMatch) {
    const page = supplierLandingPageMap[supplierLandingMatch[1]];

    if (page) {
      return {
        title: pageTitle(page.seoTitle),
        description: page.seoDescription,
        path,
        image: absoluteUrl(DEFAULT_IMAGE_PATH),
        imageAlt: page.title,
        breadcrumbs: [
          { name: content.siteSettings.pageIntro.homeLabel, path: content.siteSettings.pageIntro.homePath },
          { name: 'Activated carbon manufacturers', path: '/activated-carbon-suppliers' },
          { name: page.breadcrumbLabel, path },
        ],
        entity: { type: 'supplierLanding', item: page },
      };
    }
  }

  const resourceMatch = path.match(/^\/resources\/([^/]+)$/);
  if (resourceMatch) {
    const page = resourceDetailPageMap[resourceMatch[1]];

    if (page) {
      return {
        title: pageTitle(page.seoTitle),
        description: page.seoDescription,
        path,
        image: absoluteUrl(DEFAULT_IMAGE_PATH),
        imageAlt: page.title,
        breadcrumbs: [
          { name: content.siteSettings.pageIntro.homeLabel, path: content.siteSettings.pageIntro.homePath },
          { name: resourceHub.label, path: resourceHub.path },
          { name: page.title, path },
        ],
        entity: { type: 'resource', item: page },
      };
    }
  }

  const productMatch = path.match(/^\/products\/([^/]+)$/);
  if (productMatch) {
    const product = content.productMap[productMatch[1]];

    if (product) {
      return applyExplicitSeo({
        title: pageTitle(product.name),
        description: `${product.summary} ${originSeoNote}`,
        path,
        image: product.image,
        imageAlt: product.name,
        breadcrumbs: [
          { name: content.siteSettings.pageIntro.homeLabel, path: content.siteSettings.pageIntro.homePath },
          { name: content.pageCopy.productDetailPage.productsBreadcrumbLabel, path: content.pageCopy.productDetailPage.productsPath },
          { name: product.name, path },
        ],
        entity: { type: 'product', item: product },
      }, product);
    }
  }

  const applicationMatch = path.match(/^\/applications\/([^/]+)$/);
  if (applicationMatch) {
    const application = content.applicationMap[applicationMatch[1]];

    if (application) {
      return applyExplicitSeo({
        title: pageTitle(`${application.name} Activated Carbon Applications`),
        description: `${application.summary} ${originSeoNote}`,
        path,
        image: application.image,
        imageAlt: application.name,
        breadcrumbs: [
          { name: content.siteSettings.pageIntro.homeLabel, path: content.siteSettings.pageIntro.homePath },
          { name: content.pageCopy.applicationDetailPage.applicationsBreadcrumbLabel, path: content.pageCopy.applicationDetailPage.applicationsPath },
          { name: application.name, path },
        ],
        entity: { type: 'application', item: application },
      }, application);
    }
  }

  const newsroomMatch = path.match(/^\/newsroom\/([^/]+)$/);
  if (newsroomMatch) {
    const story = content.newsroomMap[newsroomMatch[1]];

    if (story?.type === 'press-release') {
      return applyExplicitSeo({
        title: pageTitle(story.title),
        description: story.summary,
        path,
        type: 'article',
        image: absoluteUrl(DEFAULT_IMAGE_PATH),
        imageAlt: story.title,
        breadcrumbs: [
          { name: content.siteSettings.pageIntro.homeLabel, path: content.siteSettings.pageIntro.homePath },
          { name: content.pageCopy.pressReleasePage.newsroomBreadcrumbLabel, path: content.pageCopy.pressReleasePage.newsroomPath },
          { name: story.title, path },
        ],
        entity: { type: 'article', item: story },
      }, story);
    }
  }

  return applyExplicitSeo({
    title: pageTitle(content.pageCopy.notFoundPage.title),
    description: content.pageCopy.notFoundPage.description,
    path,
    image: absoluteUrl(DEFAULT_IMAGE_PATH),
    imageAlt: content.homePage.heroLogoAlt,
    noindex: content.pageCopy.notFoundPage.seo?.noIndex ?? true,
    breadcrumbs: [{ name: content.siteSettings.pageIntro.homeLabel, path: content.siteSettings.pageIntro.homePath }],
  }, { seo: content.pageCopy.notFoundPage.seo });
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

function productFamilyListItem(product: ProductEntry, index: number) {
  return {
    '@type': 'ListItem',
    position: index + 1,
    name: product.name,
    description: product.summary,
    url: absoluteUrl(`/products/${product.slug}`),
  };
}

function organizationSchema(content: SeoContent) {
  const websiteContact = content.siteSettings.websiteContact;
  const [streetAddress = '', addressLine = ''] = websiteContact.address;
  const phoneNumbers = formatPhoneNumbers(websiteContact.phone).map((phone) => phone.display);
  const telephone = phoneNumbers.length > 1 ? phoneNumbers : phoneNumbers[0] ?? websiteContact.phone;

  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: SITE_NAME,
    alternateName: companyDetails.legacyName,
    description: siteConfig.defaultDescription,
    url: siteUrl,
    email: websiteContact.email,
    telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: addressLine,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone,
        email: websiteContact.email,
        contactType: 'sales',
        areaServed: siteConfig.serviceArea,
      },
    ],
    location: content.siteSettings.officeNetwork.map((office) => ({
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

function entitySchema(metadata: SeoMetadata, content: SeoContent = fallbackSeoContent) {
  const url = absoluteUrl(metadata.path);

  if (metadata.entity?.type === 'product') {
    const product = metadata.entity.item;

    return {
      '@type': 'DefinedTerm',
      name: product.name,
      description: product.summary,
      image: product.image,
      url,
      termCode: product.slug,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Activated carbon product families',
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

  if (metadata.entity?.type === 'resource') {
    const resource = metadata.entity.item;

    return {
      '@type': 'TechArticle',
      headline: resource.title,
      description: metadata.description,
      url,
      mainEntityOfPage: url,
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      about: 'Activated carbon technical documentation and grade matching',
    };
  }

  if (metadata.entity?.type === 'supplierLanding') {
    const page = metadata.entity.item;
    const offeredProducts = page.productSlugs
      .map((slug) => content.productMap[slug])
      .filter((product): product is ProductEntry => Boolean(product));

    return {
      '@type': 'Service',
      name: page.title,
      description: metadata.description,
      serviceType: page.serviceType,
      category: 'Activated Carbon',
      url,
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      areaServed: page.areaServed || siteConfig.serviceArea,
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Industrial distributors, treatment companies, EPC teams, mining operations, and process industries',
      },
      subjectOf: {
        '@type': 'ItemList',
        name: `${page.label} product match`,
        itemListElement: offeredProducts.map(productFamilyListItem),
      },
    };
  }

  return null;
}

export function buildJsonLd(metadata: SeoMetadata, content: SeoContent = fallbackSeoContent) {
  const pageUrl = absoluteUrl(metadata.path);
  const schemas: Array<Record<string, unknown>> = [
    organizationSchema(content),
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

  const entity = entitySchema(metadata, content);
  if (entity) {
    schemas.push(entity);
  }

  if (metadata.path === '/products') {
    schemas.push({
      '@type': 'ItemList',
      name: content.pageCopy.productsPage.intro.title,
      itemListElement: content.products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: absoluteUrl(`/products/${product.slug}`),
      })),
    });
  }

  if (metadata.path === '/activated-carbon-suppliers') {
    schemas.push({
      '@type': 'Service',
      name: 'Activated carbon manufacturer and export support',
      description: metadata.description,
      serviceType: 'Activated carbon manufacturing and export support',
      category: 'Activated Carbon',
      url: absoluteUrl(metadata.path),
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      areaServed: siteConfig.serviceArea,
      subjectOf: {
        '@type': 'ItemList',
        name: 'Activated carbon product families',
        itemListElement: content.products.map(productFamilyListItem),
      },
    });

    schemas.push({
      '@type': 'ItemList',
      name: 'Activated carbon product and application pathways',
      itemListElement: supplierLandingPages.map((page, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: page.title,
        url: absoluteUrl(supplierLandingPagePath(page.slug)),
      })),
    });
  }

  if (metadata.path === '/resources') {
    schemas.push({
      '@type': 'ItemList',
      name: resourceHub.title,
      itemListElement: resourceHubCards.map((card, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: card.title,
        url: absoluteUrl(card.href),
      })),
    });
  }

  if (metadata.path === '/applications') {
    schemas.push({
      '@type': 'ItemList',
      name: content.pageCopy.applicationsPage.intro.title,
      itemListElement: content.applications.map((application, index) => ({
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
