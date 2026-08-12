import { stegaClean } from '@sanity/client/stega';
import {
  applicationMap as fallbackApplicationMap,
  applications as fallbackApplications,
  aboutPageContent as fallbackAboutPageContent,
  contactPageContent as fallbackContactPageContent,
  homePageContent as fallbackHomePageContent,
  newsroomItems as fallbackNewsroomItems,
  newsroomMap as fallbackNewsroomMap,
  pageCopyContent as fallbackPageCopyContent,
  productMap as fallbackProductMap,
  products as fallbackProducts,
  productionPageContent as fallbackProductionPageContent,
  siteSettingsContent as fallbackSiteSettingsContent,
  type AboutPageContent,
  type ApplicationEntry,
  type ContactPageContent,
  type ContentSection,
  type FeaturedCapabilityEntry,
  type FeatureCardEntry,
  type HomePageContent,
  type LabelValueEntry,
  type NewsroomItem,
  type OfficeEntry,
  type PageCopyContent,
  type PageIntroContent,
  type PackagingMediaEntry,
  type ProductEntry,
  type ProductionStepEntry,
  type ProductionPageContent,
  type SeoFields,
  type SiteMetric,
  type SiteSettingsContent,
} from './siteContent';

export type SanitySiteContent = {
  homePage?: Partial<HomePageContent> | null;
  productionPage?: Partial<ProductionPageContent> | null;
  siteSettings?: Partial<SiteSettingsContent> | null;
  pageCopy?: Partial<PageCopyContent> | null;
  aboutPage?: Partial<AboutPageContent> | null;
  products?: Partial<ProductEntry>[];
  applications?: Partial<ApplicationEntry>[];
  newsroomItems?: Partial<NewsroomItem>[];
};

export type ContentInput = {
  homePage: HomePageContent;
  productionPage: ProductionPageContent;
  siteSettings: SiteSettingsContent;
  pageCopy: PageCopyContent;
  aboutPage: AboutPageContent;
  contactPage: ContactPageContent;
  products: ProductEntry[];
  applications: ApplicationEntry[];
  newsroomItems: NewsroomItem[];
};

export type SeoContentInput = ContentInput & {
  productMap: Record<string, ProductEntry>;
  applicationMap: Record<string, ApplicationEntry>;
  newsroomMap: Record<string, NewsroomItem>;
};

export const fallbackContentInput: ContentInput = {
  homePage: fallbackHomePageContent,
  productionPage: fallbackProductionPageContent,
  siteSettings: fallbackSiteSettingsContent,
  pageCopy: fallbackPageCopyContent,
  aboutPage: fallbackAboutPageContent,
  contactPage: fallbackContactPageContent,
  products: fallbackProducts,
  applications: fallbackApplications,
  newsroomItems: fallbackNewsroomItems,
};

function textValue(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function cleanTextValue(value: unknown, fallback = '') {
  return textValue(typeof value === 'string' ? stegaClean(value) : value, fallback);
}

function stringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const values = value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0,
  );
  return values.length ? values : fallback;
}

function cleanStringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const values = value
    .map((item) => (typeof item === 'string' ? stegaClean(item).trim() : ''))
    .filter(Boolean);

  return values.length ? values : fallback;
}

function plainStringArray(value: unknown, fallback: string[] = []) {
  return cleanStringArray(value, fallback);
}

function pageIntro(value: Partial<PageIntroContent> | undefined, fallback: PageIntroContent): PageIntroContent {
  return {
    label: textValue(value?.label, fallback.label),
    title: textValue(value?.title, fallback.title),
    description: textValue(value?.description, fallback.description),
    breadcrumbLabel: textValue(value?.breadcrumbLabel, fallback.breadcrumbLabel),
  };
}

function labelValueEntries(value: unknown, fallback: LabelValueEntry[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const entries = value
    .map((item): LabelValueEntry | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const entry = item as Partial<LabelValueEntry>;
      const label = textValue(entry.label);
      const itemValue = textValue(entry.value);

      return label && itemValue
        ? { _key: cleanTextValue(entry._key) || undefined, label, value: itemValue }
        : null;
    })
    .filter((item): item is LabelValueEntry => item !== null);

  return entries.length ? entries : fallback;
}

function metricEntries(value: unknown, fallback: SiteMetric[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const entries = value
    .map((item): SiteMetric | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const entry = item as Partial<SiteMetric>;
      const label = textValue(entry.label);
      const itemValue = textValue(entry.value);

      return label && itemValue
        ? { _key: cleanTextValue(entry._key) || undefined, label, value: itemValue }
        : null;
    })
    .filter((item): item is SiteMetric => item !== null);

  return entries.length ? entries : fallback;
}

function officeEntry(value: Partial<OfficeEntry> | undefined, fallback: OfficeEntry): OfficeEntry {
  return {
    _key: cleanTextValue(value?._key, fallback._key) || undefined,
    label: textValue(value?.label, fallback.label),
    name: textValue(value?.name, fallback.name),
    address: plainStringArray(value?.address, fallback.address),
    phone: textValue(value?.phone, fallback.phone),
    email: textValue(value?.email, fallback.email),
    note: textValue(value?.note, fallback.note),
  };
}

function officeEntries(value: unknown, fallback: OfficeEntry[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const entries = value
    .map((item, index): OfficeEntry | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const fallbackItem = fallback[index] ?? fallback[0];

      if (!fallbackItem) {
        return null;
      }

      const office = officeEntry(item as Partial<OfficeEntry>, fallbackItem);
      return office.label && office.name && office.address.length ? office : null;
    })
    .filter((item): item is OfficeEntry => item !== null);

  return entries.length ? entries : fallback;
}

function featureCards(value: unknown, fallback: FeatureCardEntry[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const entries = value
    .map((item, index): FeatureCardEntry | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const entry = item as Partial<FeatureCardEntry>;
      const fallbackItem = fallback[index];
      const icon = cleanTextValue(entry.icon, fallbackItem?.icon) as FeatureCardEntry['icon'];
      const title = textValue(entry.title, fallbackItem?.title);
      const desc = textValue(entry.desc, fallbackItem?.desc);

      return icon && title && desc
        ? { _key: cleanTextValue(entry._key) || undefined, icon, title, desc }
        : null;
    })
    .filter((item): item is FeatureCardEntry => item !== null);

  return entries.length ? entries : fallback;
}

function featuredCapabilities(value: unknown, fallback: FeaturedCapabilityEntry[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const entries = value
    .map((item, index): FeaturedCapabilityEntry | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const entry = item as Partial<FeaturedCapabilityEntry>;
      const fallbackItem = fallback[index];
      const imageSource = cleanTextValue(entry.imageSource, fallbackItem?.imageSource);
      const label = textValue(entry.label, fallbackItem?.label);
      const title = textValue(entry.title, fallbackItem?.title);
      const copy = textValue(entry.copy, fallbackItem?.copy);
      const imageAlt = textValue(entry.imageAlt, fallbackItem?.imageAlt);
      const to = fallbackItem?.to;
      const cta = fallbackItem?.cta;

      if (
        !label ||
        !title ||
        !copy ||
        !imageAlt ||
        !to ||
        !cta ||
        !['application', 'product', 'url'].includes(imageSource)
      ) {
        return null;
      }

      return {
        _key: cleanTextValue(entry._key) || undefined,
        label,
        title,
        copy,
        highlights: plainStringArray(entry.highlights, fallbackItem?.highlights),
        imageSource: imageSource as FeaturedCapabilityEntry['imageSource'],
        imageSlug: cleanTextValue(entry.imageSlug, fallbackItem?.imageSlug),
        imageUrl: cleanTextValue(entry.imageUrl, fallbackItem?.imageUrl),
        imageAlt,
        to,
        cta,
      };
    })
    .filter((item): item is FeaturedCapabilityEntry => item !== null);

  return entries.length ? entries : fallback;
}

function productionSteps(value: unknown, fallback: ProductionStepEntry[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const entries = value
    .map((item, index): ProductionStepEntry | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const entry = item as Partial<ProductionStepEntry>;
      const fallbackItem = fallback[index];
      const step = textValue(entry.step, fallbackItem?.step);
      const title = textValue(entry.title, fallbackItem?.title);
      const body = textValue(entry.body, fallbackItem?.body);

      return step && title && body
        ? { _key: cleanTextValue(entry._key) || undefined, step, title, body }
        : null;
    })
    .filter((item): item is ProductionStepEntry => item !== null);

  return entries.length ? entries : fallback;
}

function packagingMediaEntries(value: unknown, fallback: PackagingMediaEntry[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const entries = value
    .map((item, index): PackagingMediaEntry | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const entry = item as Partial<PackagingMediaEntry>;
      const fallbackItem = fallback[index];
      const mediaType = cleanTextValue(entry.mediaType, fallbackItem?.mediaType) as PackagingMediaEntry['mediaType'];
      const title = textValue(entry.title, fallbackItem?.title);
      const caption = textValue(entry.caption, fallbackItem?.caption);
      const imageUrl = cleanTextValue(entry.imageUrl, fallbackItem?.imageUrl);
      const videoUrl = cleanTextValue(entry.videoUrl, fallbackItem?.videoUrl);
      const mediaAlt = textValue(entry.mediaAlt, fallbackItem?.mediaAlt);

      if (!title || !caption || !mediaAlt || !['image', 'video'].includes(mediaType)) {
        return null;
      }

      if (mediaType === 'image' && !imageUrl) {
        return null;
      }

      if (mediaType === 'video' && !videoUrl) {
        return null;
      }

      return {
        _key: cleanTextValue(entry._key) || undefined,
        mediaType,
        title,
        caption,
        imageUrl: imageUrl || undefined,
        videoUrl: videoUrl || undefined,
        mediaAlt,
      };
    })
    .filter((item): item is PackagingMediaEntry => item !== null);

  return entries.length ? entries : fallback;
}

function normalizeSeo(value?: Partial<SeoFields>, fallback?: SeoFields): SeoFields | undefined {
  const seo = {
    seoTitle: cleanTextValue(value?.seoTitle, fallback?.seoTitle),
    seoDescription: cleanTextValue(value?.seoDescription, fallback?.seoDescription),
    seoImage: cleanTextValue(value?.seoImage, fallback?.seoImage),
    noIndex: typeof value?.noIndex === 'boolean' ? value.noIndex : fallback?.noIndex,
  };

  return seo.seoTitle || seo.seoDescription || seo.seoImage || seo.noIndex !== undefined ? seo : undefined;
}

function contentSections(value: unknown, fallback: ContentSection[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const sections = value
    .map((section): ContentSection | null => {
      if (!section || typeof section !== 'object') {
        return null;
      }

      const item = section as Partial<ContentSection>;
      const title = textValue(item.title);
      const body = textValue(item.body);

      if (!title || !body) {
        return null;
      }

      return {
        _key: cleanTextValue(item._key) || undefined,
        title,
        body,
        bullets: stringArray(item.bullets),
      };
    })
    .filter((section): section is ContentSection => section !== null);

  return sections.length ? sections : fallback;
}

const legacyProductImageMarkers: Record<string, string[]> = {
  powder: ['photo-1581092160607-ee22621dd758', 'photo-1534259434801-e3d2427ae102'],
  impregnated: ['photo-1611284446314-60a58ac0deb9'],
  catalytic: ['photo-1774789599304-cca1e1ffbb95'],
};

function normalizeProductImage(slug: string, image: string) {
  const replacement = fallbackProductMap[slug]?.image;
  const legacyMarkers = legacyProductImageMarkers[slug] ?? [];

  if (replacement && legacyMarkers.some((marker) => image.includes(marker))) {
    return replacement;
  }

  return image;
}

function normalizeProduct(value: Partial<ProductEntry>, fallback?: ProductEntry) {
  const slug = cleanTextValue(value.slug, fallback?.slug);
  const name = textValue(value.name, fallback?.name);
  const shortName = textValue(value.shortName, fallback?.shortName || name);
  const summary = textValue(value.summary, fallback?.summary);
  const intro = textValue(value.intro, fallback?.intro);
  const resolvedImage = cleanTextValue(value.image, fallback?.image);
  const image = slug && resolvedImage ? normalizeProductImage(slug, resolvedImage) : resolvedImage;

  if (!slug || !name || !summary || !intro || !image) {
    return null;
  }

  return {
    _id: cleanTextValue(value._id),
    _type: value._type === 'product' ? value._type : undefined,
    seo: normalizeSeo(value.seo, fallback?.seo),
    slug,
    name,
    shortName,
    summary,
    intro,
    highlights: stringArray(value.highlights, fallback?.highlights),
    commonUses: stringArray(value.commonUses, fallback?.commonUses),
    grades: stringArray(value.grades, fallback?.grades),
    sections: contentSections(value.sections, fallback?.sections),
    image,
  } satisfies ProductEntry;
}

function normalizeApplication(value: Partial<ApplicationEntry>, fallback?: ApplicationEntry) {
  const slug = cleanTextValue(value.slug, fallback?.slug);
  const name = textValue(value.name, fallback?.name);
  const summary = textValue(value.summary, fallback?.summary);
  const intro = textValue(value.intro, fallback?.intro);
  const image = cleanTextValue(value.image, fallback?.image);

  if (!slug || !name || !summary || !intro || !image) {
    return null;
  }

  return {
    _id: cleanTextValue(value._id),
    _type: value._type === 'application' ? value._type : undefined,
    seo: normalizeSeo(value.seo, fallback?.seo),
    slug,
    name,
    summary,
    intro,
    keyPoints: stringArray(value.keyPoints, fallback?.keyPoints),
    recommendedProducts: cleanStringArray(value.recommendedProducts, fallback?.recommendedProducts),
    grades: stringArray(value.grades, fallback?.grades),
    sections: contentSections(value.sections, fallback?.sections),
    image,
  } satisfies ApplicationEntry;
}

function normalizeNewsroomItem(value: Partial<NewsroomItem>, fallback?: NewsroomItem) {
  const slug = cleanTextValue(value.slug, fallback?.slug);
  const title = textValue(value.title, fallback?.title);
  const summary = textValue(value.summary, fallback?.summary);
  const rawType = cleanTextValue(value.type, fallback?.type);
  const type = rawType === 'press-release' || rawType === 'resource' ? rawType : fallback?.type;
  const documentUrl = cleanTextValue(value.documentUrl, fallback?.documentUrl);
  const documentLabel = cleanTextValue(value.documentLabel, fallback?.documentLabel);

  if (!slug || !title || !summary || !type) {
    return null;
  }

  return {
    _id: cleanTextValue(value._id),
    _type: value._type === 'newsroomItem' ? value._type : undefined,
    seo: normalizeSeo(value.seo, fallback?.seo),
    slug,
    title,
    type,
    summary,
    detail: stringArray(value.detail, fallback?.detail),
    bullets: stringArray(value.bullets, fallback?.bullets),
    documentUrl,
    documentLabel,
  } satisfies NewsroomItem;
}

function normalizeHomePage(value?: Partial<HomePageContent> | null): HomePageContent {
  const fallback = fallbackHomePageContent;
  const id = cleanTextValue(value?._id);

  return {
    _id: id || undefined,
    _type: value?._type === 'homePage' ? value._type : undefined,
    seo: normalizeSeo(value?.seo, fallback.seo),
    siteId: cleanTextValue(value?.siteId, fallback.siteId),
    heroLogoImage: fallback.heroLogoImage,
    heroLogoAlt: textValue(value?.heroLogoAlt, fallback.heroLogoAlt),
    heroKicker: textValue(value?.heroKicker, fallback.heroKicker),
    heroTitle: textValue(value?.heroTitle, fallback.heroTitle),
    heroDescription: textValue(value?.heroDescription, fallback.heroDescription),
    heroPrimaryCtaPath: fallback.heroPrimaryCtaPath,
    heroPrimaryCtaLabel: fallback.heroPrimaryCtaLabel,
    heroSecondaryCtaPath: fallback.heroSecondaryCtaPath,
    heroSecondaryCtaLabel: fallback.heroSecondaryCtaLabel,
    heroLegacyLabel: textValue(value?.heroLegacyLabel, fallback.heroLegacyLabel),
    heroVideoUrl: cleanTextValue(value?.heroVideoUrl, fallback.heroVideoUrl),
    heroVideoLabel: textValue(value?.heroVideoLabel, fallback.heroVideoLabel),
    heroVideoFallback: textValue(value?.heroVideoFallback, fallback.heroVideoFallback),
    trustCertificationLabel: textValue(value?.trustCertificationLabel, fallback.trustCertificationLabel),
    trustCertificationValue: textValue(value?.trustCertificationValue, fallback.trustCertificationValue),
    trustCertificationLinkLabel: textValue(value?.trustCertificationLinkLabel, fallback.trustCertificationLinkLabel),
    trustCertificationLinkUrl: cleanTextValue(value?.trustCertificationLinkUrl, fallback.trustCertificationLinkUrl),
    trustEstablishedLabel: textValue(value?.trustEstablishedLabel, fallback.trustEstablishedLabel),
    trustEstablishedValue: textValue(value?.trustEstablishedValue, fallback.trustEstablishedValue),
    trustProductionLabel: textValue(value?.trustProductionLabel, fallback.trustProductionLabel),
    trustProductionValue: textValue(value?.trustProductionValue, fallback.trustProductionValue),
    trustCapacityLabel: textValue(value?.trustCapacityLabel, fallback.trustCapacityLabel),
    trustCapacityValue: textValue(value?.trustCapacityValue, fallback.trustCapacityValue),
    productSectionKicker: textValue(value?.productSectionKicker, fallback.productSectionKicker),
    productSectionTitle: textValue(value?.productSectionTitle, fallback.productSectionTitle),
    applicationSectionKicker: textValue(value?.applicationSectionKicker, fallback.applicationSectionKicker),
    applicationSectionTitle: textValue(value?.applicationSectionTitle, fallback.applicationSectionTitle),
    productCardCtaLabel: fallback.productCardCtaLabel,
    applicationCardCtaLabel: fallback.applicationCardCtaLabel,
    companyImage: cleanTextValue(value?.companyImage, fallback.companyImage),
    companyImageAlt: textValue(value?.companyImageAlt, fallback.companyImageAlt),
    companyEyebrow: textValue(value?.companyEyebrow, fallback.companyEyebrow),
    companyTitle: textValue(value?.companyTitle, fallback.companyTitle),
    companyBodyPrimary: textValue(value?.companyBodyPrimary, fallback.companyBodyPrimary),
    companyBodySecondary: textValue(value?.companyBodySecondary, fallback.companyBodySecondary),
    companyMetrics: metricEntries(value?.companyMetrics, fallback.companyMetrics),
    companyAboutCtaPath: fallback.companyAboutCtaPath,
    companyAboutCtaLabel: fallback.companyAboutCtaLabel,
    companyProductionCtaPath: fallback.companyProductionCtaPath,
    companyProductionCtaLabel: fallback.companyProductionCtaLabel,
    ctaTitle: textValue(value?.ctaTitle, fallback.ctaTitle),
    ctaDescription: textValue(value?.ctaDescription, fallback.ctaDescription),
    ctaPrimaryPath: fallback.ctaPrimaryPath,
    ctaPrimaryLabel: fallback.ctaPrimaryLabel,
    ctaSecondaryPath: fallback.ctaSecondaryPath,
    ctaSecondaryLabel: fallback.ctaSecondaryLabel,
    whyKicker: textValue(value?.whyKicker, fallback.whyKicker),
    whyTitle: textValue(value?.whyTitle, fallback.whyTitle),
    whyReasons: featureCards(value?.whyReasons, fallback.whyReasons),
    featuredCapabilitiesLabel: textValue(value?.featuredCapabilitiesLabel, fallback.featuredCapabilitiesLabel),
    featuredCapabilitiesPreviousLabel: fallback.featuredCapabilitiesPreviousLabel,
    featuredCapabilitiesNextLabel: fallback.featuredCapabilitiesNextLabel,
    featuredCapabilitiesShowLabelPrefix: fallback.featuredCapabilitiesShowLabelPrefix,
    featuredCapabilities: featuredCapabilities(value?.featuredCapabilities, fallback.featuredCapabilities),
  };
}

function normalizeProductionPage(value?: Partial<ProductionPageContent> | null): ProductionPageContent {
  const fallback = fallbackProductionPageContent;
  const id = cleanTextValue(value?._id);

  return {
    _id: id || undefined,
    _type: value?._type === 'productionPage' ? value._type : undefined,
    seo: normalizeSeo(value?.seo, fallback.seo),
    intro: pageIntro(value?.intro, fallback.intro),
    glanceLabel: textValue(value?.glanceLabel, fallback.glanceLabel),
    glanceItems: labelValueEntries(value?.glanceItems, fallback.glanceItems),
    overviewTitle: textValue(value?.overviewTitle, fallback.overviewTitle),
    overviewBody: textValue(value?.overviewBody, fallback.overviewBody),
    image: cleanTextValue(value?.image, fallback.image),
    imageAlt: textValue(value?.imageAlt, fallback.imageAlt),
    qualityKicker: textValue(value?.qualityKicker, fallback.qualityKicker),
    qualityTitle: textValue(value?.qualityTitle, fallback.qualityTitle),
    qualityParagraphs: plainStringArray(value?.qualityParagraphs, fallback.qualityParagraphs),
    activationKicker: textValue(value?.activationKicker, fallback.activationKicker),
    activationSteps: productionSteps(value?.activationSteps, fallback.activationSteps),
    activationNote: textValue(value?.activationNote, fallback.activationNote),
    packagingKicker: textValue(value?.packagingKicker, fallback.packagingKicker),
    packagingTitle: textValue(value?.packagingTitle, fallback.packagingTitle),
    packagingBody: textValue(value?.packagingBody, fallback.packagingBody),
    packagingMedia: packagingMediaEntries(value?.packagingMedia, fallback.packagingMedia),
    packagingDocumentLabel: textValue(value?.packagingDocumentLabel, fallback.packagingDocumentLabel),
    packagingDocumentUrl: cleanTextValue(value?.packagingDocumentUrl, fallback.packagingDocumentUrl),
    contactTextBeforeEmail: textValue(value?.contactTextBeforeEmail, fallback.contactTextBeforeEmail),
    contactTextAfterEmail: textValue(value?.contactTextAfterEmail, fallback.contactTextAfterEmail),
    contactButtonLabel: fallback.contactButtonLabel,
  };
}

function normalizeSiteSettings(value?: Partial<SiteSettingsContent> | null): SiteSettingsContent {
  const fallback = fallbackSiteSettingsContent;
  const id = cleanTextValue(value?._id);
  const pageIntroValue = value?.pageIntro;

  return {
    _id: id || undefined,
    _type: value?._type === 'siteSettings' ? value._type : undefined,
    siteId: cleanTextValue(value?.siteId, fallback.siteId),
    navigation: fallback.navigation,
    footer: fallback.footer,
    pageIntro: {
      breadcrumbAriaLabel: textValue(pageIntroValue?.breadcrumbAriaLabel, fallback.pageIntro.breadcrumbAriaLabel),
      homeLabel: textValue(pageIntroValue?.homeLabel, fallback.pageIntro.homeLabel),
      homePath: cleanTextValue(pageIntroValue?.homePath, fallback.pageIntro.homePath),
      backHomeLabel: fallback.pageIntro.backHomeLabel,
      backHomePath: fallback.pageIntro.backHomePath,
    },
    websiteContact: fallback.websiteContact,
    officeNetwork: fallback.officeNetwork,
  };
}

function normalizePageCopy(value?: Partial<PageCopyContent> | null): PageCopyContent {
  const fallback = fallbackPageCopyContent;
  const id = cleanTextValue(value?._id);
  const productsPage = value?.productsPage;
  const productDetailPage = value?.productDetailPage;
  const applicationsPage = value?.applicationsPage;
  const applicationDetailPage = value?.applicationDetailPage;
  const newsroomPage = value?.newsroomPage;
  const newsroomPreview = value?.newsroomPreview;
  const pressReleasePage = value?.pressReleasePage;

  return {
    _id: id || undefined,
    _type: value?._type === 'pageCopy' ? value._type : undefined,
    productsPage: {
      seo: normalizeSeo(productsPage?.seo, fallback.productsPage.seo),
      intro: pageIntro(productsPage?.intro, fallback.productsPage.intro),
      highlightsLabel: textValue(productsPage?.highlightsLabel, fallback.productsPage.highlightsLabel),
      commonUsesLabel: textValue(productsPage?.commonUsesLabel, fallback.productsPage.commonUsesLabel),
      applicationsLabel: textValue(productsPage?.applicationsLabel, fallback.productsPage.applicationsLabel),
      referencedGradesLabel: textValue(productsPage?.referencedGradesLabel, fallback.productsPage.referencedGradesLabel),
      detailCtaLabel: fallback.productsPage.detailCtaLabel,
      quoteCtaPath: fallback.productsPage.quoteCtaPath,
      quoteCtaLabel: fallback.productsPage.quoteCtaLabel,
    },
    productDetailPage: {
      introLabel: textValue(productDetailPage?.introLabel, fallback.productDetailPage.introLabel),
      productsPath: cleanTextValue(productDetailPage?.productsPath, fallback.productDetailPage.productsPath),
      productsBreadcrumbLabel: textValue(
        productDetailPage?.productsBreadcrumbLabel,
        fallback.productDetailPage.productsBreadcrumbLabel,
      ),
      overviewLabel: textValue(productDetailPage?.overviewLabel, fallback.productDetailPage.overviewLabel),
      commonUsesLabel: textValue(productDetailPage?.commonUsesLabel, fallback.productDetailPage.commonUsesLabel),
      applicationsLabel: textValue(
        productDetailPage?.applicationsLabel,
        fallback.productDetailPage.applicationsLabel,
      ),
      ctaTitle: textValue(productDetailPage?.ctaTitle, fallback.productDetailPage.ctaTitle),
      ctaDescription: textValue(productDetailPage?.ctaDescription, fallback.productDetailPage.ctaDescription),
      allProductsCtaPath: fallback.productDetailPage.allProductsCtaPath,
      allProductsCtaLabel: fallback.productDetailPage.allProductsCtaLabel,
      quoteCtaPath: fallback.productDetailPage.quoteCtaPath,
      quoteCtaLabel: fallback.productDetailPage.quoteCtaLabel,
    },
    applicationsPage: {
      seo: normalizeSeo(applicationsPage?.seo, fallback.applicationsPage.seo),
      intro: pageIntro(applicationsPage?.intro, fallback.applicationsPage.intro),
      itemLabel: textValue(applicationsPage?.itemLabel, fallback.applicationsPage.itemLabel),
      keyPointsLabel: textValue(applicationsPage?.keyPointsLabel, fallback.applicationsPage.keyPointsLabel),
      recommendedProductsLabel: textValue(
        applicationsPage?.recommendedProductsLabel,
        fallback.applicationsPage.recommendedProductsLabel,
      ),
      detailCtaLabel: fallback.applicationsPage.detailCtaLabel,
      discussCtaPath: fallback.applicationsPage.discussCtaPath,
      discussCtaLabel: fallback.applicationsPage.discussCtaLabel,
    },
    applicationDetailPage: {
      introLabel: textValue(applicationDetailPage?.introLabel, fallback.applicationDetailPage.introLabel),
      applicationsPath: cleanTextValue(
        applicationDetailPage?.applicationsPath,
        fallback.applicationDetailPage.applicationsPath,
      ),
      applicationsBreadcrumbLabel: textValue(
        applicationDetailPage?.applicationsBreadcrumbLabel,
        fallback.applicationDetailPage.applicationsBreadcrumbLabel,
      ),
      overviewLabel: textValue(applicationDetailPage?.overviewLabel, fallback.applicationDetailPage.overviewLabel),
      referencedGradesLabel: textValue(
        applicationDetailPage?.referencedGradesLabel,
        fallback.applicationDetailPage.referencedGradesLabel,
      ),
      recommendedProductsLabel: textValue(
        applicationDetailPage?.recommendedProductsLabel,
        fallback.applicationDetailPage.recommendedProductsLabel,
      ),
      recommendedProductsTitle: textValue(
        applicationDetailPage?.recommendedProductsTitle,
        fallback.applicationDetailPage.recommendedProductsTitle,
      ),
      recommendedProductsDescription: textValue(
        applicationDetailPage?.recommendedProductsDescription,
        fallback.applicationDetailPage.recommendedProductsDescription,
      ),
      discussCtaPath: fallback.applicationDetailPage.discussCtaPath,
      discussCtaLabel: fallback.applicationDetailPage.discussCtaLabel,
    },
    newsroomPage: {
      seo: normalizeSeo(newsroomPage?.seo, fallback.newsroomPage.seo),
      intro: pageIntro(newsroomPage?.intro, fallback.newsroomPage.intro),
      featuredUpdateLabel: textValue(newsroomPage?.featuredUpdateLabel, fallback.newsroomPage.featuredUpdateLabel),
      brandDetailsCtaLabel: fallback.newsroomPage.brandDetailsCtaLabel,
      whyMattersLabel: textValue(newsroomPage?.whyMattersLabel, fallback.newsroomPage.whyMattersLabel),
      whyMattersBody: textValue(newsroomPage?.whyMattersBody, fallback.newsroomPage.whyMattersBody),
      resourcesTitle: textValue(newsroomPage?.resourcesTitle, fallback.newsroomPage.resourcesTitle),
      resourcesDescription: textValue(newsroomPage?.resourcesDescription, fallback.newsroomPage.resourcesDescription),
      resourceLabel: textValue(newsroomPage?.resourceLabel, fallback.newsroomPage.resourceLabel),
      latestVersionCtaPath: fallback.newsroomPage.latestVersionCtaPath,
      latestVersionCtaLabel: fallback.newsroomPage.latestVersionCtaLabel,
    },
    newsroomPreview: {
      kicker: textValue(newsroomPreview?.kicker, fallback.newsroomPreview.kicker),
      title: textValue(newsroomPreview?.title, fallback.newsroomPreview.title),
      description: textValue(newsroomPreview?.description, fallback.newsroomPreview.description),
      resourceCenterCtaPath: fallback.newsroomPreview.resourceCenterCtaPath,
      resourceCenterCtaLabel: fallback.newsroomPreview.resourceCenterCtaLabel,
      pressReleaseLabel: textValue(newsroomPreview?.pressReleaseLabel, fallback.newsroomPreview.pressReleaseLabel),
      resourceLabel: textValue(newsroomPreview?.resourceLabel, fallback.newsroomPreview.resourceLabel),
      brandUpdateCtaLabel: fallback.newsroomPreview.brandUpdateCtaLabel,
      requestResourceCtaPath: fallback.newsroomPreview.requestResourceCtaPath,
      requestResourceCtaLabel: fallback.newsroomPreview.requestResourceCtaLabel,
    },
    pressReleasePage: {
      introLabel: textValue(pressReleasePage?.introLabel, fallback.pressReleasePage.introLabel),
      newsroomPath: cleanTextValue(pressReleasePage?.newsroomPath, fallback.pressReleasePage.newsroomPath),
      newsroomBreadcrumbLabel: textValue(
        pressReleasePage?.newsroomBreadcrumbLabel,
        fallback.pressReleasePage.newsroomBreadcrumbLabel,
      ),
      keyPointsLabel: textValue(pressReleasePage?.keyPointsLabel, fallback.pressReleasePage.keyPointsLabel),
      salesCoordinationCtaPath: fallback.pressReleasePage.salesCoordinationCtaPath,
      salesCoordinationCtaLabel: fallback.pressReleasePage.salesCoordinationCtaLabel,
    },
    notFoundPage: {
      seo: normalizeSeo(value?.notFoundPage?.seo, fallback.notFoundPage.seo),
      label: textValue(value?.notFoundPage?.label, fallback.notFoundPage.label),
      title: textValue(value?.notFoundPage?.title, fallback.notFoundPage.title),
      description: textValue(value?.notFoundPage?.description, fallback.notFoundPage.description),
      homeCtaPath: fallback.notFoundPage.homeCtaPath,
      homeCtaLabel: fallback.notFoundPage.homeCtaLabel,
      secondaryCtaPath: fallback.notFoundPage.secondaryCtaPath,
      secondaryCtaLabel: fallback.notFoundPage.secondaryCtaLabel,
    },
  };
}

function normalizeAboutPage(value?: Partial<AboutPageContent> | null): AboutPageContent {
  const fallback = fallbackAboutPageContent;
  const id = cleanTextValue(value?._id);

  return {
    _id: id || undefined,
    _type: value?._type === 'aboutPage' ? value._type : undefined,
    siteId: cleanTextValue(value?.siteId, fallback.siteId),
    seo: normalizeSeo(value?.seo, fallback.seo),
    intro: pageIntro(value?.intro, fallback.intro),
    titleLogoImage: cleanTextValue(value?.titleLogoImage, fallback.titleLogoImage),
    heroImage: cleanTextValue(value?.heroImage, fallback.heroImage),
    heroImageAlt: textValue(value?.heroImageAlt, fallback.heroImageAlt),
    storyTitle: textValue(value?.storyTitle, fallback.storyTitle),
    storyParagraphs: plainStringArray(value?.storyParagraphs, fallback.storyParagraphs),
    officeNetworkLabel: textValue(value?.officeNetworkLabel, fallback.officeNetworkLabel),
    metrics: metricEntries(value?.metrics, fallback.metrics),
    cards: featureCards(value?.cards, fallback.cards),
    brandUpdateLabel: textValue(value?.brandUpdateLabel, fallback.brandUpdateLabel),
    brandTransitionCtaLabel: fallback.brandTransitionCtaLabel,
    productionCapabilityCtaLabel: fallback.productionCapabilityCtaLabel,
  };
}

function normalizeContactPage(): ContactPageContent {
  return fallbackContactPageContent;
}

function mergeBySlug<T extends { slug: string }>(
  cmsItems: Partial<T>[] | undefined,
  fallbackItems: T[],
  fallbackMap: Record<string, T>,
  normalize: (value: Partial<T>, fallback?: T) => T | null,
) {
  if (!cmsItems?.length) {
    return fallbackItems;
  }

  const seen = new Set<string>();
  const normalized = cmsItems
    .map((item) => normalize(item, fallbackMap[cleanTextValue(item.slug)]))
    .filter((item): item is T => Boolean(item))
    .filter((item) => {
      if (seen.has(item.slug)) {
        return false;
      }

      seen.add(item.slug);
      return true;
    });

  if (!normalized.length) {
    return fallbackItems;
  }

  return [...normalized, ...fallbackItems.filter((item) => !seen.has(item.slug))];
}

export function mapBySlug<T extends { slug: string }>(items: T[]) {
  return Object.fromEntries(items.map((item) => [item.slug, item])) as Record<string, T>;
}

export function mergeSanityContent(content?: SanitySiteContent | null): ContentInput {
  if (!content) {
    return fallbackContentInput;
  }

  return {
    homePage: normalizeHomePage(content.homePage),
    productionPage: normalizeProductionPage(content.productionPage),
    siteSettings: normalizeSiteSettings(content.siteSettings),
    pageCopy: normalizePageCopy(content.pageCopy),
    aboutPage: normalizeAboutPage(content.aboutPage),
    contactPage: normalizeContactPage(),
    products: mergeBySlug(content.products, fallbackProducts, fallbackProductMap, normalizeProduct),
    applications: mergeBySlug(
      content.applications,
      fallbackApplications,
      fallbackApplicationMap,
      normalizeApplication,
    ),
    newsroomItems: mergeBySlug(
      content.newsroomItems,
      fallbackNewsroomItems,
      fallbackNewsroomMap,
      normalizeNewsroomItem,
    ),
  };
}

export function toSeoContent(content: ContentInput): SeoContentInput {
  return {
    ...content,
    productMap: mapBySlug(content.products),
    applicationMap: mapBySlug(content.applications),
    newsroomMap: mapBySlug(content.newsroomItems),
  };
}
