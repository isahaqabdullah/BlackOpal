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
    {
      name: 'overviewTitle',
      title: 'Overview Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
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

export const schemaTypes = [contentSection, seoFields, homePage, productionPage, product, application, newsroomItem];
