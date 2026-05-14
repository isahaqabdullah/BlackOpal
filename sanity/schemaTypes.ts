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

export const officeEntry = {
  name: 'officeEntry',
  title: 'Office',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'address', title: 'Address Lines', type: 'array', of: [{ type: 'string' }] },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'note', title: 'Note', type: 'text', rows: 2 },
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
    { name: 'to', title: 'CTA Path', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'cta', title: 'CTA Label', type: 'string', validation: (Rule: any) => Rule.required() },
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
    { name: 'heroPrimaryCtaLabel', title: 'Hero Primary CTA Label', type: 'string' },
    { name: 'heroSecondaryCtaLabel', title: 'Hero Secondary CTA Label', type: 'string' },
    { name: 'heroLegacyLabel', title: 'Hero Legacy Label', type: 'string' },
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
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaPrimaryLabel',
      title: 'CTA Primary Label',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaSecondaryLabel',
      title: 'CTA Secondary Label',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'whyKicker', title: 'Why Section Kicker', type: 'string' },
    { name: 'whyTitle', title: 'Why Section Title', type: 'string' },
    { name: 'whyReasons', title: 'Why Section Cards', type: 'array', of: [{ type: 'featureCardEntry' }] },
    { name: 'featuredCapabilitiesLabel', title: 'Featured Capabilities Label', type: 'string' },
    { name: 'featuredCapabilitiesPreviousLabel', title: 'Featured Previous Button Label', type: 'string' },
    { name: 'featuredCapabilitiesNextLabel', title: 'Featured Next Button Label', type: 'string' },
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
    { name: 'contactTextBeforeEmail', title: 'Contact Text Before Email', type: 'text', rows: 2 },
    { name: 'contactTextAfterEmail', title: 'Contact Text After Email', type: 'string' },
    { name: 'contactButtonLabel', title: 'Contact Button Label', type: 'string' },
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
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        { name: 'logoAlt', title: 'Logo Alt Text', type: 'string' },
        { name: 'links', title: 'Links', type: 'array', of: [{ type: 'linkEntry' }] },
        { name: 'ctaLabel', title: 'CTA Label', type: 'string' },
      ],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        { name: 'logoAlt', title: 'Logo Alt Text', type: 'string' },
        { name: 'contactLinkLabel', title: 'Contact Link Label', type: 'string' },
        { name: 'companyColumnTitle', title: 'Company Column Title', type: 'string' },
        { name: 'companyLinks', title: 'Company Links', type: 'array', of: [{ type: 'linkEntry' }] },
        { name: 'productColumnTitle', title: 'Product Column Title', type: 'string' },
        { name: 'applicationColumnTitle', title: 'Application Column Title', type: 'string' },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          description: 'Use {year} where the current year should appear.',
          type: 'string',
        },
        { name: 'bottomLinks', title: 'Bottom Links', type: 'array', of: [{ type: 'linkEntry' }] },
      ],
    },
    {
      name: 'pageIntro',
      title: 'Shared Page Intro Labels',
      type: 'object',
      fields: [
        { name: 'homeLabel', title: 'Breadcrumb Home Label', type: 'string' },
        { name: 'backHomeLabel', title: 'Back Home Button Label', type: 'string' },
      ],
    },
    { name: 'websiteContact', title: 'Footer Contact Office', type: 'officeEntry' },
    { name: 'officeNetwork', title: 'Office Network', type: 'array', of: [{ type: 'officeEntry' }] },
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
        { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
        { name: 'highlightsLabel', title: 'Highlights Label', type: 'string' },
        { name: 'commonUsesLabel', title: 'Common Uses Label', type: 'string' },
        { name: 'referencedGradesLabel', title: 'Referenced Grades Label', type: 'string' },
        { name: 'detailCtaLabel', title: 'Detail CTA Label', type: 'string' },
        { name: 'quoteCtaLabel', title: 'Quote CTA Label', type: 'string' },
      ],
    },
    {
      name: 'productDetailPage',
      title: 'Product Detail Page',
      type: 'object',
      fields: [
        { name: 'introLabel', title: 'Intro Label', type: 'string' },
        { name: 'productsBreadcrumbLabel', title: 'Products Breadcrumb Label', type: 'string' },
        { name: 'overviewLabel', title: 'Overview Label', type: 'string' },
        { name: 'commonUsesLabel', title: 'Common Uses Label', type: 'string' },
        { name: 'ctaTitle', title: 'CTA Title', type: 'string' },
        { name: 'ctaDescription', title: 'CTA Description', type: 'text', rows: 3 },
        { name: 'allProductsCtaLabel', title: 'All Products CTA Label', type: 'string' },
        { name: 'quoteCtaLabel', title: 'Quote CTA Label', type: 'string' },
      ],
    },
    {
      name: 'applicationsPage',
      title: 'Applications Listing Page',
      type: 'object',
      fields: [
        { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
        { name: 'itemLabel', title: 'Item Label', type: 'string' },
        { name: 'keyPointsLabel', title: 'Key Points Label', type: 'string' },
        { name: 'recommendedProductsLabel', title: 'Recommended Products Label', type: 'string' },
        { name: 'detailCtaLabel', title: 'Detail CTA Label', type: 'string' },
        { name: 'discussCtaLabel', title: 'Discuss CTA Label', type: 'string' },
      ],
    },
    {
      name: 'applicationDetailPage',
      title: 'Application Detail Page',
      type: 'object',
      fields: [
        { name: 'introLabel', title: 'Intro Label', type: 'string' },
        { name: 'applicationsBreadcrumbLabel', title: 'Applications Breadcrumb Label', type: 'string' },
        { name: 'overviewLabel', title: 'Overview Label', type: 'string' },
        { name: 'referencedGradesLabel', title: 'Referenced Grades Label', type: 'string' },
        { name: 'recommendedProductsLabel', title: 'Recommended Products Label', type: 'string' },
        { name: 'recommendedProductsTitle', title: 'Recommended Products Title', type: 'string' },
        { name: 'recommendedProductsDescription', title: 'Recommended Products Description', type: 'text', rows: 3 },
        { name: 'discussCtaLabel', title: 'Discuss CTA Label', type: 'string' },
      ],
    },
    {
      name: 'newsroomPage',
      title: 'Newsroom Page',
      type: 'object',
      fields: [
        { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
        { name: 'featuredUpdateLabel', title: 'Featured Update Label', type: 'string' },
        { name: 'brandDetailsCtaLabel', title: 'Brand Details CTA Label', type: 'string' },
        { name: 'whyMattersLabel', title: 'Why It Matters Label', type: 'string' },
        { name: 'whyMattersBody', title: 'Why It Matters Body', type: 'text', rows: 3 },
        { name: 'resourcesTitle', title: 'Resources Title', type: 'string' },
        { name: 'resourcesDescription', title: 'Resources Description', type: 'text', rows: 3 },
        { name: 'resourceLabel', title: 'Resource Label', type: 'string' },
        { name: 'latestVersionCtaLabel', title: 'Latest Version CTA Label', type: 'string' },
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
        { name: 'resourceCenterCtaLabel', title: 'Resource Center CTA Label', type: 'string' },
        { name: 'pressReleaseLabel', title: 'Press Release Label', type: 'string' },
        { name: 'resourceLabel', title: 'Resource Label', type: 'string' },
        { name: 'brandUpdateCtaLabel', title: 'Brand Update CTA Label', type: 'string' },
        { name: 'requestResourceCtaLabel', title: 'Request Resource CTA Label', type: 'string' },
      ],
    },
    {
      name: 'pressReleasePage',
      title: 'Press Release Page',
      type: 'object',
      fields: [
        { name: 'introLabel', title: 'Intro Label', type: 'string' },
        { name: 'newsroomBreadcrumbLabel', title: 'Newsroom Breadcrumb Label', type: 'string' },
        { name: 'keyPointsLabel', title: 'Key Points Label', type: 'string' },
        { name: 'salesCoordinationCtaLabel', title: 'Sales Coordination CTA Label', type: 'string' },
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
    { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'heroImageUrl', title: 'External Hero Image URL', type: 'url' },
    { name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'string' },
    { name: 'storyTitle', title: 'Story Title', type: 'string' },
    { name: 'storyParagraphs', title: 'Story Paragraphs', type: 'array', of: [{ type: 'text' }] },
    { name: 'officeNetworkLabel', title: 'Office Network Label', type: 'string' },
    { name: 'metrics', title: 'Metrics', type: 'array', of: [{ type: 'labelValueEntry' }] },
    { name: 'cards', title: 'Feature Cards', type: 'array', of: [{ type: 'featureCardEntry' }] },
    { name: 'brandUpdateLabel', title: 'Brand Update Label', type: 'string' },
    { name: 'brandTransitionCtaLabel', title: 'Brand Transition CTA Label', type: 'string' },
    { name: 'productionCapabilityCtaLabel', title: 'Production Capability CTA Label', type: 'string' },
  ],
  preview: {
    select: { siteId: 'siteId' },
    prepare: ({ siteId }: { siteId?: string }) => ({
      title: siteId === 'black-opal-middle-east' ? 'About Page - Middle East' : 'About Page - India',
    }),
  },
};

export const contactPage = {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    siteIdField(),
    { name: 'intro', title: 'Page Intro', type: 'pageIntro' },
    { name: 'officesTitle', title: 'Offices Title', type: 'string' },
    { name: 'successTitle', title: 'Success Title', type: 'string' },
    { name: 'successMessage', title: 'Success Message', type: 'text', rows: 3 },
    { name: 'firstNameLabel', title: 'First Name Label', type: 'string' },
    { name: 'firstNamePlaceholder', title: 'First Name Placeholder', type: 'string' },
    { name: 'lastNameLabel', title: 'Last Name Label', type: 'string' },
    { name: 'lastNamePlaceholder', title: 'Last Name Placeholder', type: 'string' },
    { name: 'emailLabel', title: 'Email Label', type: 'string' },
    { name: 'emailPlaceholder', title: 'Email Placeholder', type: 'string' },
    { name: 'companyLabel', title: 'Company Label', type: 'string' },
    { name: 'companyPlaceholder', title: 'Company Placeholder', type: 'string' },
    { name: 'phoneLabel', title: 'Phone Label', type: 'string' },
    { name: 'subjectLabel', title: 'Subject Label', type: 'string' },
    { name: 'subjectPlaceholder', title: 'Subject Placeholder', type: 'string' },
    { name: 'applicationLabel', title: 'Application Label', type: 'string' },
    { name: 'applicationPlaceholder', title: 'Application Placeholder', type: 'string' },
    { name: 'applicationOptions', title: 'Application Options', type: 'array', of: [{ type: 'string' }] },
    { name: 'messageLabel', title: 'Message Label', type: 'string' },
    { name: 'messagePlaceholder', title: 'Message Placeholder', type: 'text', rows: 2 },
    { name: 'submitLabel', title: 'Submit Label', type: 'string' },
  ],
  preview: {
    select: { siteId: 'siteId' },
    prepare: ({ siteId }: { siteId?: string }) => ({
      title: siteId === 'black-opal-middle-east' ? 'Contact Page - Middle East' : 'Contact Page - India',
    }),
  },
};

export const schemaTypes = [
  contentSection,
  linkEntry,
  labelValueEntry,
  officeEntry,
  featureCardEntry,
  pageIntro,
  featuredCapabilityEntry,
  productionStepEntry,
  seoFields,
  homePage,
  siteSettings,
  pageCopy,
  aboutPage,
  productionPage,
  contactPage,
  product,
  application,
  newsroomItem,
];
