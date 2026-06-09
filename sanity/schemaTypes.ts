export const contentSection = {
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'body', title: 'Body', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    { name: 'bullets', title: 'Bullets', type: 'array', of: [{ type: 'string' }] },
  ],
};

export const linkEntry = {
  name: 'linkEntry',
  title: 'Link',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'to', title: 'Path or URL', type: 'string', validation: (Rule: any) => Rule.required() },
  ],
};

export const labelValueEntry = {
  name: 'labelValueEntry',
  title: 'Label + Value',
  type: 'object',
  fields: [
    { name: 'value', title: 'Value', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
  ],
};

export const featureCardEntry = {
  name: 'featureCardEntry',
  title: 'Feature Card',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Building', value: 'building-2' },
          { title: 'Factory', value: 'factory' },
          { title: 'Headphones', value: 'headphones' },
          { title: 'Layers', value: 'layers' },
          { title: 'Refresh', value: 'refresh-ccw' },
          { title: 'Shield Check', value: 'shield-check' },
          { title: 'Target', value: 'target' },
          { title: 'Tree Palm', value: 'tree-palm' },
          { title: 'Truck', value: 'truck' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'desc', title: 'Description', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
  ],
};

export const pageIntro = {
  name: 'pageIntro',
  title: 'Page Intro',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'breadcrumbLabel', title: 'Breadcrumb Label', type: 'string', validation: (Rule: any) => Rule.required() },
  ],
};

export const featuredCapabilityEntry = {
  name: 'featuredCapabilityEntry',
  title: 'Featured Capability',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'copy', title: 'Copy', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
    { name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'imageSource',
      title: 'Image Source',
      type: 'string',
      options: {
        list: [
          { title: 'Application image', value: 'application' },
          { title: 'Product image', value: 'product' },
          { title: 'URL', value: 'url' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'imageSlug', title: 'Product or Application Slug', type: 'string' },
    { name: 'imageUrl', title: 'Image URL', type: 'url' },
    { name: 'imageAlt', title: 'Image Alt Text', type: 'string', validation: (Rule: any) => Rule.required() },
  ],
};

export const productionStepEntry = {
  name: 'productionStepEntry',
  title: 'Production Step',
  type: 'object',
  fields: [
    { name: 'step', title: 'Step Number', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'body', title: 'Body', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
  ],
};

export const packagingMediaEntry = {
  name: 'packagingMediaEntry',
  title: 'Packaging Media',
  type: 'object',
  fields: [
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'caption', title: 'Caption', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
    {
      name: 'imageUrl',
      title: 'Image URL',
      description: 'Use a public path like /images/packaging/export-palletized-bags.jpeg or a full URL.',
      type: 'string',
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      description: 'Use a public path like /videos/packaging/export-packaging-video.mp4 or a full URL.',
      type: 'string',
    },
    { name: 'mediaAlt', title: 'Accessibility Label', type: 'string', validation: (Rule: any) => Rule.required() },
  ],
};

function siteIdField(title = 'Website') {
  return {
    name: 'siteId',
    title,
    description: 'Controls which deployed website uses this document.',
    type: 'string',
    options: {
      list: [
        { title: 'India website', value: 'black-opal-india' },
        { title: 'Middle East website', value: 'black-opal-middle-east' },
      ],
      layout: 'radio',
    },
    validation: (Rule: any) => Rule.required(),
  };
}

export const seoFields = {
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3 },
    { name: 'seoImage', title: 'SEO Image', type: 'image', options: { hotspot: true } },
    {
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    },
  ],
};

export const homePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'siteId',
      title: 'Website',
      description:
        'Locks this homepage to one deployed website. This is not a preview switcher; use the matching India or Middle East Studio to preview that site.',
      type: 'string',
      options: {
        list: [
          { title: 'India website', value: 'black-opal-india' },
          { title: 'Middle East website', value: 'black-opal-middle-east' },
        ],
        layout: 'radio',
      },
      readOnly: (context: { document?: { _id?: string } }) =>
        context.document?._id === 'homePage-black-opal-india' ||
        context.document?._id === 'homePage-black-opal-middle-east',
      validation: (Rule: any) =>
        Rule.custom((value: string | undefined, context: { document?: { _id?: string } }) => {
          if (context.document?._id === 'homePage') {
            return true;
          }

          if (context.document?._id === 'homePage-black-opal-india') {
            return value === 'black-opal-india' ? true : 'The India homepage must stay assigned to the India website.';
          }

          if (context.document?._id === 'homePage-black-opal-middle-east') {
            return value === 'black-opal-middle-east'
              ? true
              : 'The Middle East homepage must stay assigned to the Middle East website.';
          }

          return value ? true : 'Website is required.';
        }),
    },
    { name: 'seo', title: 'SEO', type: 'seoFields' },
    {
      name: 'heroLogoImage',
      title: 'Hero Logo Image URL',
      description: 'Use a public path like /images/black-opal-hero-logo-transparent.png or a full URL.',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'heroLogoAlt', title: 'Hero Logo Accessibility Label', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'heroKicker',
      title: 'Hero Kicker',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'heroLegacyLabel', title: 'Hero Legacy Label', type: 'string' },
    {
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      description: 'Use a public path like /images/blackopal-home-page-video.mp4 or a full URL.',
      type: 'string',
    },
    { name: 'heroVideoLabel', title: 'Hero Video Accessibility Label', type: 'string' },
    { name: 'heroVideoFallback', title: 'Hero Video Fallback Text', type: 'string' },
    {
      name: 'trustCertificationLabel',
      title: 'Trust Bar Certification Label',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trustCertificationValue',
      title: 'Trust Bar Certification Value',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trustEstablishedLabel',
      title: 'Trust Bar Established Label',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trustEstablishedValue',
      title: 'Trust Bar Established Value',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trustProductionLabel',
      title: 'Trust Bar Production Label',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trustProductionValue',
      title: 'Trust Bar Production Value',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trustCapacityLabel',
      title: 'Trust Bar Capacity Label',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trustCapacityValue',
      title: 'Trust Bar Capacity Value',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'productSectionKicker',
      title: 'Product Section Kicker',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'productSectionTitle',
      title: 'Product Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'applicationSectionKicker',
      title: 'Application Section Kicker',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'applicationSectionTitle',
      title: 'Application Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'companyImage',
      title: 'Company Section Image URL',
      description: 'Use a public path or full URL.',
      type: 'string',
    },
    { name: 'companyImageAlt', title: 'Company Section Image Alt Text', type: 'string' },
    {
      name: 'companyEyebrow',
      title: 'Company Eyebrow',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'companyTitle',
      title: 'Company Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'companyBodyPrimary',
      title: 'Company Body Primary',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'companyBodySecondary',
      title: 'Company Body Secondary',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'companyMetrics', title: 'Company Metrics', type: 'array', of: [{ type: 'labelValueEntry' }] },
    {
      name: 'ctaTitle',
      title: 'Closing Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaDescription',
      title: 'Closing Section Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'whyKicker', title: 'Why Section Kicker', type: 'string' },
    { name: 'whyTitle', title: 'Why Section Title', type: 'string' },
    { name: 'whyReasons', title: 'Why Section Cards', type: 'array', of: [{ type: 'featureCardEntry' }] },
    { name: 'featuredCapabilitiesLabel', title: 'Featured Capabilities Label', type: 'string' },
    {
      name: 'featuredCapabilities',
      title: 'Featured Capabilities',
      type: 'array',
      of: [{ type: 'featuredCapabilityEntry' }],
    },
  ],
  preview: {
    select: { siteId: 'siteId' },
    prepare: ({ siteId }: { siteId?: string }) => ({
      title: siteId === 'black-opal-middle-east' ? 'Home Page - Middle East' : 'Home Page - India',
    }),
  },
};

export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'sortOrder', title: 'Sort Order', type: 'number' },
    { name: 'seo', title: 'SEO', type: 'seoFields' },
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'shortName', title: 'Short Name', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
    { name: 'intro', title: 'Intro', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    { name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] },
    { name: 'commonUses', title: 'Common Uses', type: 'array', of: [{ type: 'string' }] },
    { name: 'grades', title: 'Referenced Grades', type: 'array', of: [{ type: 'string' }] },
    { name: 'sections', title: 'Sections', type: 'array', of: [{ type: 'contentSection' }] },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    {
      name: 'imageUrl',
      title: 'External Image URL',
      description: 'Optional fallback for existing remote images. Sanity image uploads are preferred.',
      type: 'url',
    },
  ],
};

export const productionPage = {
  name: 'productionPage',
  title: 'Production Page',
  type: 'document',
  fields: [
    { name: 'seo', title: 'SEO', type: 'seoFields' },
    { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
    { name: 'glanceLabel', title: 'Glance Section Label', type: 'string' },
    { name: 'glanceItems', title: 'Glance Items', type: 'array', of: [{ type: 'labelValueEntry' }] },
    {
      name: 'overviewTitle',
      title: 'Overview Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'overviewBody', title: 'Overview Body', type: 'text', rows: 4 },
    { name: 'image', title: 'Production Image', type: 'image', options: { hotspot: true } },
    {
      name: 'imageUrl',
      title: 'External Production Image URL',
      description: 'Optional fallback for existing remote or public images. Sanity image uploads are preferred.',
      type: 'string',
    },
    { name: 'imageAlt', title: 'Production Image Alt Text', type: 'string' },
    { name: 'qualityKicker', title: 'Quality Section Kicker', type: 'string' },
    { name: 'qualityTitle', title: 'Quality Section Title', type: 'string' },
    { name: 'qualityParagraphs', title: 'Quality Paragraphs', type: 'array', of: [{ type: 'text' }] },
    { name: 'activationKicker', title: 'Activation Section Kicker', type: 'string' },
    { name: 'activationSteps', title: 'Activation Steps', type: 'array', of: [{ type: 'productionStepEntry' }] },
    { name: 'activationNote', title: 'Activation Note', type: 'text', rows: 3 },
    { name: 'packagingKicker', title: 'Packaging Section Kicker', type: 'string' },
    { name: 'packagingTitle', title: 'Packaging Section Title', type: 'string' },
    { name: 'packagingBody', title: 'Packaging Section Body', type: 'text', rows: 3 },
    { name: 'packagingMedia', title: 'Packaging Media', type: 'array', of: [{ type: 'packagingMediaEntry' }] },
    { name: 'packagingDocumentLabel', title: 'Packaging Document Label', type: 'string' },
    {
      name: 'packagingDocumentUrl',
      title: 'Packaging Document URL',
      description: 'Use a public path like /documents/packaging/packaging-options.pdf or a full URL.',
      type: 'string',
    },
    { name: 'contactTextBeforeEmail', title: 'Contact Text Before Email', type: 'text', rows: 2 },
    { name: 'contactTextAfterEmail', title: 'Contact Text After Email', type: 'string' },
  ],
  preview: {
    prepare: () => ({ title: 'Production Page' }),
  },
};

export const application = {
  name: 'application',
  title: 'Application',
  type: 'document',
  fields: [
    { name: 'sortOrder', title: 'Sort Order', type: 'number' },
    { name: 'seo', title: 'SEO', type: 'seoFields' },
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
    { name: 'intro', title: 'Intro', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    { name: 'keyPoints', title: 'Key Points', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'recommendedProducts',
      title: 'Recommended Product Slugs',
      description: 'Use product slugs like granular, powder, impregnated, or catalytic.',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'grades', title: 'Referenced Grades', type: 'array', of: [{ type: 'string' }] },
    { name: 'sections', title: 'Sections', type: 'array', of: [{ type: 'contentSection' }] },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    {
      name: 'imageUrl',
      title: 'External Image URL',
      description: 'Optional fallback for existing remote images. Sanity image uploads are preferred.',
      type: 'url',
    },
  ],
};

export const newsroomItem = {
  name: 'newsroomItem',
  title: 'Newsroom Item',
  type: 'document',
  fields: [
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'seo', title: 'SEO', type: 'seoFields' },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Press Release', value: 'press-release' },
          { title: 'Resource', value: 'resource' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
    { name: 'detail', title: 'Detail Paragraphs', type: 'array', of: [{ type: 'text' }] },
    { name: 'bullets', title: 'Bullets', type: 'array', of: [{ type: 'string' }] },
  ],
};

export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    siteIdField(),
    {
      name: 'pageIntro',
      title: 'Shared Page Intro Labels',
      type: 'object',
      fields: [
        { name: 'breadcrumbAriaLabel', title: 'Breadcrumb Accessibility Label', type: 'string' },
        { name: 'homeLabel', title: 'Breadcrumb Home Label', type: 'string' },
        { name: 'homePath', title: 'Breadcrumb Home Path', type: 'string' },
      ],
    },
  ],
  preview: {
    select: { siteId: 'siteId' },
    prepare: ({ siteId }: { siteId?: string }) => ({
      title: siteId === 'black-opal-middle-east' ? 'Site Settings - Middle East' : 'Site Settings - India',
    }),
  },
};

export const pageCopy = {
  name: 'pageCopy',
  title: 'Page Framing Copy',
  type: 'document',
  fields: [
    {
      name: 'productsPage',
      title: 'Products Listing Page',
      type: 'object',
      fields: [
        { name: 'seo', title: 'SEO', type: 'seoFields' },
        { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
        { name: 'highlightsLabel', title: 'Highlights Label', type: 'string' },
        { name: 'commonUsesLabel', title: 'Common Uses Label', type: 'string' },
        { name: 'referencedGradesLabel', title: 'Referenced Grades Label', type: 'string' },
      ],
    },
    {
      name: 'productDetailPage',
      title: 'Product Detail Page',
      type: 'object',
      fields: [
        { name: 'introLabel', title: 'Intro Label', type: 'string' },
        { name: 'productsPath', title: 'Products Path', type: 'string' },
        { name: 'productsBreadcrumbLabel', title: 'Products Breadcrumb Label', type: 'string' },
        { name: 'overviewLabel', title: 'Overview Label', type: 'string' },
        { name: 'commonUsesLabel', title: 'Common Uses Label', type: 'string' },
        { name: 'ctaTitle', title: 'Closing Section Title', type: 'string' },
        { name: 'ctaDescription', title: 'Closing Section Description', type: 'text', rows: 3 },
      ],
    },
    {
      name: 'applicationsPage',
      title: 'Applications Listing Page',
      type: 'object',
      fields: [
        { name: 'seo', title: 'SEO', type: 'seoFields' },
        { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
        { name: 'itemLabel', title: 'Item Label', type: 'string' },
        { name: 'keyPointsLabel', title: 'Key Points Label', type: 'string' },
        { name: 'recommendedProductsLabel', title: 'Recommended Products Label', type: 'string' },
      ],
    },
    {
      name: 'applicationDetailPage',
      title: 'Application Detail Page',
      type: 'object',
      fields: [
        { name: 'introLabel', title: 'Intro Label', type: 'string' },
        { name: 'applicationsPath', title: 'Applications Path', type: 'string' },
        { name: 'applicationsBreadcrumbLabel', title: 'Applications Breadcrumb Label', type: 'string' },
        { name: 'overviewLabel', title: 'Overview Label', type: 'string' },
        { name: 'referencedGradesLabel', title: 'Referenced Grades Label', type: 'string' },
        { name: 'recommendedProductsLabel', title: 'Recommended Products Label', type: 'string' },
        { name: 'recommendedProductsTitle', title: 'Recommended Products Title', type: 'string' },
        { name: 'recommendedProductsDescription', title: 'Recommended Products Description', type: 'text', rows: 3 },
      ],
    },
    {
      name: 'newsroomPage',
      title: 'Newsroom Page',
      type: 'object',
      fields: [
        { name: 'seo', title: 'SEO', type: 'seoFields' },
        { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
        { name: 'featuredUpdateLabel', title: 'Featured Update Label', type: 'string' },
        { name: 'whyMattersLabel', title: 'Why It Matters Label', type: 'string' },
        { name: 'whyMattersBody', title: 'Why It Matters Body', type: 'text', rows: 3 },
        { name: 'resourcesTitle', title: 'Resources Title', type: 'string' },
        { name: 'resourcesDescription', title: 'Resources Description', type: 'text', rows: 3 },
        { name: 'resourceLabel', title: 'Resource Label', type: 'string' },
      ],
    },
    {
      name: 'newsroomPreview',
      title: 'Homepage Newsroom Preview',
      type: 'object',
      fields: [
        { name: 'kicker', title: 'Kicker', type: 'string' },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'pressReleaseLabel', title: 'Press Release Label', type: 'string' },
        { name: 'resourceLabel', title: 'Resource Label', type: 'string' },
      ],
    },
    {
      name: 'pressReleasePage',
      title: 'Press Release Page',
      type: 'object',
      fields: [
        { name: 'introLabel', title: 'Intro Label', type: 'string' },
        { name: 'newsroomPath', title: 'Newsroom Path', type: 'string' },
        { name: 'newsroomBreadcrumbLabel', title: 'Newsroom Breadcrumb Label', type: 'string' },
        { name: 'keyPointsLabel', title: 'Key Points Label', type: 'string' },
      ],
    },
    {
      name: 'notFoundPage',
      title: 'Not Found Page',
      type: 'object',
      fields: [
        { name: 'seo', title: 'SEO', type: 'seoFields' },
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: 'Page Framing Copy' }),
  },
};

export const aboutPage = {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    siteIdField(),
    { name: 'seo', title: 'SEO', type: 'seoFields' },
    { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
    { name: 'titleLogoImage', title: 'Page Title Logo Image URL', type: 'string' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'heroImageUrl', title: 'External Hero Image URL', type: 'url' },
    { name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'string' },
    { name: 'storyTitle', title: 'Story Title', type: 'string' },
    { name: 'storyParagraphs', title: 'Story Paragraphs', type: 'array', of: [{ type: 'text' }] },
    { name: 'officeNetworkLabel', title: 'Office Network Label', type: 'string' },
    { name: 'metrics', title: 'Metrics', type: 'array', of: [{ type: 'labelValueEntry' }] },
    { name: 'cards', title: 'Feature Cards', type: 'array', of: [{ type: 'featureCardEntry' }] },
    { name: 'brandUpdateLabel', title: 'Brand Update Label', type: 'string' },
  ],
  preview: {
    select: { siteId: 'siteId' },
    prepare: ({ siteId }: { siteId?: string }) => ({
      title: siteId === 'black-opal-middle-east' ? 'About Page - Middle East' : 'About Page - India',
    }),
  },
};

export const schemaTypes = [
  contentSection,
  linkEntry,
  labelValueEntry,
  featureCardEntry,
  pageIntro,
  featuredCapabilityEntry,
  productionStepEntry,
  packagingMediaEntry,
  seoFields,
  homePage,
  siteSettings,
  pageCopy,
  aboutPage,
  productionPage,
  product,
  application,
  newsroomItem,
];
