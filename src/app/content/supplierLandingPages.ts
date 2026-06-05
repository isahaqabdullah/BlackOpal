export type SupplierLandingPage = {
  slug: string;
  label: string;
  breadcrumbLabel: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  serviceType: string;
  introTitle: string;
  intro: string;
  highlights: string[];
  buyerSignals: Array<{
    title: string;
    body: string;
  }>;
  specificationNotes: string[];
  productSlugs: string[];
  applicationSlugs: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  areaServed?: string;
};

const supplierRoot = '/activated-carbon-suppliers';

export function supplierLandingPagePath(slug: string) {
  return `${supplierRoot}/${slug}`;
}

export const supplierLandingPages: SupplierLandingPage[] = [
  {
    slug: 'global-activated-carbon-supplier',
    label: 'Global Activated Carbon',
    breadcrumbLabel: 'Global',
    title: 'Global coconut activated carbon from company-owned manufacturing',
    description:
      'Black Opal Carbons, formerly INDOCARB AC, manufactures and exports coconut shell activated carbon from India for water treatment, gold recovery, air and gas, oil and gas, and industrial purification applications.',
    seoTitle: 'Global Activated Carbon Supplier | Black Opal Carbons',
    seoDescription:
      'Black Opal Carbons, formerly INDOCARB AC, supplies coconut shell activated carbon from company-owned Indian manufacturing for water, gold, air, gas, oil and industrial purification applications.',
    serviceType: 'Global activated carbon supply',
    introTitle: 'Established manufacturing continuity under the Black Opal name',
    intro:
      'The group behind Black Opal was established in 2010 through coconut shell activated carbon manufacturing and activated carbon field experience. The transition from INDOCARB AC to Black Opal Carbons was a global brand change; the products, factory, facilities, pricing, and support procedures remained in place. Today, Black Opal controls raw material selection, steam activation, particle sizing, packing, and final quality assurance before shipment.',
    highlights: [
      'Formerly INDOCARB AC, now operating under the Black Opal Carbons name',
      'Company-owned manufacturing with control over feedstock, activation, sizing, packing, and final quality assurance',
      '35000 metric tons annual coconut activated carbon capacity',
      'Granular, powder, impregnated, and catalytic activated carbon product families',
      'NSF 42 and NSF 61 listed coconut shell carbon grades for applicable water-treatment use',
    ],
    buyerSignals: [
      {
        title: 'Manufacturing continuity',
        body: 'The Black Opal transition kept the same product base, factory, facilities, pricing structure, and support procedures customers already worked with.',
      },
      {
        title: 'Coconut shell specialization',
        body: 'Selected coconut shells support high hardness, low ash, micropore structure, and attrition resistance for premium activated carbon.',
      },
      {
        title: 'Application-matched grades',
        body: 'Granular, powder, impregnated, and catalytic formats are matched to water treatment, gold recovery, air and gas, oil and gas, and specialty purification requirements.',
      },
    ],
    specificationNotes: [
      'Application: water treatment, gold recovery, air and gas, oil and gas, catalytic carbon, or specialty purification.',
      'Product family: granular, powder, impregnated, or catalytic activated carbon.',
      'Specification: particle size, pore structure, hardness, surface area, attrition resistance, packing, and documentation where applicable.',
    ],
    productSlugs: ['granular', 'powder', 'impregnated', 'catalytic'],
    applicationSlugs: ['water-treatment', 'gold-recovery', 'air-gas', 'oil-gas'],
    ctaTitle: 'Contact Black Opal for activated carbon requirements',
    ctaDescription:
      'Share the application, product family, grade requirement, volume, packing, and destination market with the Black Opal team.',
    ctaLabel: 'Contact Black Opal',
    areaServed: 'Global export markets',
  },
  {
    slug: 'bulk-activated-carbon-supplier',
    label: 'Bulk Activated Carbon',
    breadcrumbLabel: 'Bulk',
    title: 'Bulk coconut activated carbon from controlled Indian manufacturing',
    description:
      'Black Opal Carbons manufactures coconut shell activated carbon in granular, powder, impregnated, and catalytic formats for industrial purification applications that require scale, consistency, packing discipline, and export readiness.',
    seoTitle: 'Bulk Activated Carbon Supplier | Black Opal Carbons',
    seoDescription:
      'Bulk activated carbon supplier with company-owned Indian manufacturing. Coconut shell granular, powder, impregnated, and catalytic carbon for industrial purification applications.',
    serviceType: 'Bulk activated carbon supply',
    introTitle: 'Manufacturing scale for larger activated carbon requirements',
    intro:
      "Black Opal's company-owned manufacturing controls feedstock selection, steam activation, particle sizing, packing, and final quality assurance before shipment. With 35000 metric tons of annual coconut activated carbon capacity, the product range supports water treatment, gold recovery, air and gas, oil and gas, catalytic carbon, and specialty purification applications.",
    highlights: [
      '35000 metric tons annual coconut activated carbon capacity',
      'Company-owned manufacturing with controlled feedstock, activation, sizing, packing, and final quality assurance',
      'Granular, powder, impregnated, and catalytic activated carbon product families',
      'Coconut shell carbon manufactured and exported from India',
      'NSF 42 and NSF 61 listed grades for applicable water-treatment use',
    ],
    buyerSignals: [
      {
        title: 'Manufacturing control',
        body: 'Company-owned facilities keep raw material selection, activation, processing, packing, and final assurance under direct operating control.',
      },
      {
        title: 'Bulk product range',
        body: 'Granular, powder, impregnated, and catalytic activated carbon grades cover liquid-phase, vapor-phase, precious metal recovery, refinery, and specialty purification duties.',
      },
      {
        title: 'Export readiness',
        body: 'Packing format, product documentation, shipment planning, and destination-market requirements can be aligned before dispatch.',
      },
    ],
    specificationNotes: [
      'Product family: granular, powder, impregnated, or catalytic activated carbon.',
      'Application: water treatment, gold recovery, air and gas, oil and gas, catalytic carbon, or specialty purification.',
      'Specification: particle size, pore structure, hardness, surface area, attrition resistance, packing, and documentation where applicable.',
    ],
    productSlugs: ['granular', 'powder', 'impregnated', 'catalytic'],
    applicationSlugs: ['water-treatment', 'gold-recovery', 'air-gas', 'oil-gas'],
    ctaTitle: 'Contact Black Opal for bulk activated carbon requirements',
    ctaDescription:
      'Share the product family, application, grade requirement, volume, packing, and destination market with the Black Opal team.',
    ctaLabel: 'Contact Black Opal',
    areaServed: 'Global export markets',
  },
  {
    slug: 'coconut-shell-activated-carbon-supplier',
    label: 'Coconut Shell Activated Carbon',
    breadcrumbLabel: 'Coconut shell carbon',
    title: 'Coconut shell activated carbon for demanding purification systems',
    description:
      'Black Opal Carbons manufactures coconut shell activated carbon from selected feedstock for water treatment, gold recovery, air and gas, oil and gas, and specialty purification applications.',
    seoTitle: 'Coconut Shell Activated Carbon Supplier | Black Opal Carbons',
    seoDescription:
      'Coconut shell activated carbon supplier with company-owned Indian manufacturing. Granular, powder, impregnated, and catalytic coconut carbon for water, gold, air, gas, and industrial purification.',
    serviceType: 'Coconut shell activated carbon supply',
    introTitle: 'Selected coconut shell feedstock, steam activation, and controlled sizing',
    intro:
      'Selected coconut shells support high hardness, low ash, micropore structure, and attrition resistance. Black Opal controls feedstock selection, steam activation, sizing, packing, and final assurance before shipment, with granular, powder, impregnated, and catalytic formats available for application-specific requirements.',
    highlights: [
      'Selected coconut shell feedstock for high hardness, low ash, and attrition resistance',
      'Steam activation, particle-size control, packing, and final assurance before shipment',
      'Granular, powder, impregnated, and catalytic activated carbon product families',
      'Applications across water treatment, gold recovery, air and gas, oil and gas, and specialty purification',
      'NSF 42 and NSF 61 listed grades for applicable water-treatment use',
    ],
    buyerSignals: [
      {
        title: 'Coconut shell performance',
        body: 'Coconut shell carbon is valued for hardness, low ash, micropore structure, and attrition resistance across liquid-phase and vapor-phase purification duties.',
      },
      {
        title: 'Product family options',
        body: 'Granular, powder, impregnated, and catalytic formats allow the carbon selection to follow the application, contaminant profile, contact time, and operating conditions.',
      },
      {
        title: 'Application fit',
        body: 'Black Opal coconut shell activated carbon supports water treatment, gold recovery, air and gas purification, oil and gas, and specialty industrial purification systems.',
      },
    ],
    specificationNotes: [
      'Product family: granular, powder, impregnated, or catalytic activated carbon.',
      'Application: water treatment, gold recovery, air and gas, oil and gas, catalytic carbon, or specialty purification.',
      'Specification: particle size, pore structure, hardness, surface area, attrition resistance, packing, and documentation where applicable.',
    ],
    productSlugs: ['granular', 'powder', 'impregnated', 'catalytic'],
    applicationSlugs: ['water-treatment', 'gold-recovery', 'air-gas', 'other-applications'],
    ctaTitle: 'Contact Black Opal for coconut shell activated carbon requirements',
    ctaDescription:
      'Share the product family, application, grade requirement, volume, packing, and destination market with the Black Opal team.',
    ctaLabel: 'Contact Black Opal',
    areaServed: 'Global export markets',
  },
  {
    slug: 'granular-activated-carbon-supplier',
    label: 'Granular Activated Carbon',
    breadcrumbLabel: 'Granular carbon',
    title: 'Coconut shell granular activated carbon for fixed-bed and process systems',
    description:
      'Black Opal Carbons manufactures high-hardness coconut shell granular activated carbon for water treatment, gold recovery, solvent recovery, condensate polishing, gas purification, refinery service, and industrial filtration systems.',
    seoTitle: 'Granular Activated Carbon Supplier | Black Opal Carbons',
    seoDescription:
      'Granular activated carbon supplier with company-owned Indian manufacturing. High-hardness coconut shell GAC for water treatment, gold recovery, gas purification, refinery service, and industrial filtration.',
    serviceType: 'Granular activated carbon supply',
    introTitle: 'High-hardness GAC with mesh-size and pore-structure control',
    intro:
      'Black Opal granular activated carbon is produced from selected coconut shell feedstock and engineered so particle size and pore structure support adsorption performance in fixed-bed filters, cartridges, pressure vessels, adsorption columns, and process systems. Grades can be matched by mesh size, adsorption level, washing, pH adjustment, hardness, surface area, and documentation requirements.',
    highlights: [
      'High-hardness coconut shell GAC for water treatment, gold recovery, solvent recovery, condensate polishing, and gas-phase service',
      'Produced from selected coconut shell feedstock with controls for hardness, surface area, and attrition resistance',
      'Mesh size, adsorption level, washing, and pH-adjusted variants available',
      'Suitable for fixed-bed filters, cartridges, pressure vessels, adsorption columns, and process systems',
      'NSF 42 and NSF 61 listed grades for applicable water-treatment use',
    ],
    buyerSignals: [
      {
        title: 'Fixed-bed and cartridge systems',
        body: 'Granular activated carbon supports filtration systems where flow control, contact time, adsorption capacity, mechanical strength, and pressure drop matter.',
      },
      {
        title: 'Mechanical strength',
        body: 'Coconut shell GAC is valued for hardness, abrasion resistance, attrition resistance, and durable performance through handling and service cycles.',
      },
      {
        title: 'Application fit',
        body: 'Black Opal granular activated carbon supports water treatment, gold recovery, solvent recovery, condensate polishing, hydrogen sulfide removal, gas purification, and refinery service.',
      },
    ],
    specificationNotes: [
      'Particle size or mesh size, adsorption level, hardness, ash, pH, moisture, apparent density, and documentation where applicable.',
      'Application: water treatment, gold recovery, solvent recovery, condensate polishing, air and gas, oil and gas, refinery service, or industrial filtration.',
      'System context: fixed-bed filter, cartridge, pressure vessel, contactor, adsorption column, or process system.',
    ],
    productSlugs: ['granular'],
    applicationSlugs: ['water-treatment', 'gold-recovery', 'air-gas', 'oil-gas'],
    ctaTitle: 'Contact Black Opal for granular activated carbon requirements',
    ctaDescription:
      'Share the application, mesh size, grade requirement, volume, packing, and destination market with the Black Opal team.',
    ctaLabel: 'Contact Black Opal',
    areaServed: 'Global export markets',
  },
  {
    slug: 'powdered-activated-carbon-supplier',
    label: 'Powder Activated Carbon',
    breadcrumbLabel: 'Powdered carbon',
    title: 'Powdered activated carbon for dosing and batch treatment',
    description:
      'Black Opal Carbons manufactures virgin powdered activated carbon for drinking water, wastewater, odor control, food-grade, decolorization, and specialty process applications.',
    seoTitle: 'Powdered Activated Carbon Supplier | Black Opal Carbons',
    seoDescription:
      'Powdered activated carbon supplier with company-owned Indian manufacturing. Virgin PAC for drinking water, wastewater, odor control, food-grade, decolorization, and remediation applications.',
    serviceType: 'Powdered activated carbon',
    introTitle: 'Fast-response PAC for inline dosing and batch addition',
    intro:
      'Powder activated carbon gives treatment systems a fast-response format where rapid contact and flexible dosing matter more than fixed-bed operation. Black Opal PAC is used for inline dosing, batch addition, water and wastewater treatment, odor removal, brewery and winery applications, food-related processes, remediation, color reduction, and organic control.',
    highlights: [
      'Virgin powdered activated carbon for drinking water, food-grade, wastewater, and odor-control programs',
      'Used in water treatment, wastewater treatment, odor removal, and brewery or winery applications',
      'Applied for chloramines, pesticides, herbicides, groundwater remediation, and disinfection by-product reduction',
      'Fine-particle format for inline dosing, batch addition, decolorization, and process polishing',
      'Grade alignment around fineness, iodine number, ash, pH, moisture, packing, and documentation',
    ],
    buyerSignals: [
      {
        title: 'Inline dosing and batch addition',
        body: 'Powdered carbon fits treatment programs where carbon is added directly into a process stream or batch rather than used as a cartridge or pressure-vessel media.',
      },
      {
        title: 'Rapid contact',
        body: 'Fine particle size supports fast contact where color, odor, organic control, or contaminant reduction has to happen quickly.',
      },
      {
        title: 'Application range',
        body: 'Black Opal powder activated carbon supports drinking water, wastewater, odor removal, brewery and winery use, food-related processes, remediation, decolorization, and process polishing.',
      },
    ],
    specificationNotes: [
      'Fineness, iodine number, ash, pH, moisture, packing, and documentation where applicable.',
      'Application: drinking water, wastewater, odor removal, food-grade, brewery or winery, groundwater remediation, decolorization, or process polishing.',
      'System context: inline dosing, batch addition, contact time, dosage range, filtration, separation, and downstream handling.',
    ],
    productSlugs: ['powder'],
    applicationSlugs: ['water-treatment', 'other-applications'],
    ctaTitle: 'Contact Black Opal for powder activated carbon requirements',
    ctaDescription:
      'Share the application, fineness, grade requirement, dosage or contact-time context, volume, packing, and destination market with the Black Opal team.',
    ctaLabel: 'Contact Black Opal',
    areaServed: 'Global export markets',
  },
  {
    slug: 'impregnated-activated-carbon-supplier',
    label: 'Impregnated Activated Carbon',
    breadcrumbLabel: 'Impregnated carbon',
    title: 'Impregnated activated carbon for targeted gas and water systems',
    description:
      'Black Opal Carbons provides chemically enhanced coconut shell activated carbon for targeted gas-stream, bacteriostatic, mercury-removal, and specialty purification duties.',
    seoTitle: 'Impregnated Activated Carbon Supplier | Black Opal Carbons',
    seoDescription:
      'Impregnated activated carbon supplier with company-owned Indian manufacturing. Chemically enhanced coconut shell carbon for gas purification, mercury removal, bacteriostatic water systems, and specialty contaminants.',
    serviceType: 'Impregnated activated carbon',
    introTitle: 'Chemically enhanced carbon for contaminant-specific performance',
    intro:
      'Impregnation extends standard activated carbon performance through the interaction between the chemical additive and the coconut shell carbon substrate. Black Opal impregnated carbon is used where the application is defined by a specific contaminant, stream condition, bacteriostatic requirement, or specialty purification duty.',
    highlights: [
      'Chemically enhanced coconut shell carbon for targeted gas-stream, bacteriostatic, and specialty purification duties',
      'Silver-impregnated carbon for bacteriostatic protection in drinking-water filters and water systems',
      'Sulfur-impregnated carbon for mercury removal in natural gas, air, hydrogen, and other gas streams',
      'Targeted impregnation for acid gases, ammonia, amines, and other specialty contaminants',
      'Applicable across gas purification, protective equipment, mercury removal, and bacteriostatic drinking-water systems',
    ],
    buyerSignals: [
      {
        title: 'Targeted chemistry',
        body: 'Impregnation is used when untreated activated carbon alone is not the right direction for a contaminant-specific removal requirement.',
      },
      {
        title: 'Water and gas examples',
        body: 'Silver-impregnated carbon supports point-of-use water filters, while sulfur-impregnated carbon supports mercury capture in gas service.',
      },
      {
        title: 'Operating context',
        body: 'Grade selection depends on the contaminant, concentration, humidity, temperature, flow rate, contact time, safety requirements, and equipment design.',
      },
    ],
    specificationNotes: [
      'Target contaminant or duty: mercury, acid gases, ammonia, amines, bacteriostatic water systems, gas purification, protective equipment, or specialty purification.',
      'Operating data: inlet concentration, temperature, humidity, flow rate, contact time, and required removal objective.',
      'System context: bed design, equipment details, packing, safety documentation, and destination-market requirements where applicable.',
    ],
    productSlugs: ['impregnated'],
    applicationSlugs: ['air-gas', 'other-applications'],
    ctaTitle: 'Contact Black Opal for impregnated activated carbon requirements',
    ctaDescription:
      'Share the target contaminant, operating conditions, grade requirement, volume, packing, and destination market with the Black Opal team.',
    ctaLabel: 'Contact Black Opal',
    areaServed: 'Global export markets',
  },
  {
    slug: 'catalytic-activated-carbon-supplier',
    label: 'Catalytic Activated Carbon Supply',
    breadcrumbLabel: 'Catalytic carbon',
    title: 'Catalytic activated carbon supply',
    description:
      'Black Opal Carbons supplies catalytic activated carbon for applications requiring enhanced reaction-assisted adsorption and specialty treatment performance.',
    seoTitle: 'Catalytic Activated Carbon Supplier',
    seoDescription:
      'Catalytic activated carbon supplier for bulk buyers. Coconut shell catalytic carbon for water, gas, specialty purification, and reaction-assisted treatment applications.',
    serviceType: 'Catalytic activated carbon supply',
    introTitle: 'Catalytic carbon for enhanced treatment performance',
    intro:
      'Catalytic activated carbon is selected for applications where carbon surface activity and reaction-assisted treatment are central to performance. Buyers should define the target chemistry, operating conditions, and expected service environment clearly.',
    highlights: [
      'Specialty catalytic carbon supply for industrial treatment applications',
      'Useful where standard adsorption may not be the only performance mechanism',
      'Application review around water, gas, and specialty purification needs',
      'Commercial support for trials, projects, and recurring supply programs',
    ],
    buyerSignals: [
      {
        title: 'Enhanced activity',
        body: 'Catalytic carbon can be relevant when the application needs more than conventional adsorption behavior.',
      },
      {
        title: 'Defined operating context',
        body: 'Supplier review should include water or gas chemistry, target species, flow rate, contact time, and regeneration or replacement expectations.',
      },
      {
        title: 'Specialty procurement',
        body: 'Best suited for buyers with a defined application, not generic spot purchasing without performance context.',
      },
    ],
    specificationNotes: [
      'Share target chemistry, operating medium, contact time, flow rate, and required treatment objective.',
      'Include existing carbon grade or performance issue if the inquiry is for replacement or improvement.',
      'Mention volume, delivery market, packaging, and documentation requirements for pricing.',
    ],
    productSlugs: ['catalytic'],
    applicationSlugs: ['catalytic-carbon', 'water-treatment', 'air-gas'],
    ctaTitle: 'Request catalytic activated carbon support',
    ctaDescription:
      'Send the treatment objective, operating conditions, volume, and target market for a focused catalytic carbon response.',
    ctaLabel: 'Request catalytic carbon',
    areaServed: 'Global export markets',
  },
  {
    slug: 'activated-carbon-for-water-treatment',
    label: 'Activated Carbon For Water Treatment',
    breadcrumbLabel: 'Water treatment',
    title: 'Activated carbon supply for water treatment',
    description:
      'Black Opal Carbons supplies coconut shell activated carbon for drinking water, process water, industrial filtration, polishing, taste, odor, and contaminant control programs.',
    seoTitle: 'Activated Carbon Supplier for Water Treatment',
    seoDescription:
      'Activated carbon supplier for water treatment. Coconut shell GAC and PAC for drinking water, process water, industrial filtration, taste, odor, polishing, and contaminant control.',
    serviceType: 'Activated carbon supply for water treatment',
    introTitle: 'Water treatment carbon for filtration and polishing systems',
    intro:
      'Water treatment buyers need activated carbon selected around contaminant profile, contact time, filtration design, compliance needs, and replacement schedule. Black Opal supports GAC and PAC supply for industrial and water-treatment procurement programs.',
    highlights: [
      'Coconut shell GAC and PAC for water treatment systems',
      'Use cases include taste, odor, color, organic contaminant reduction, and polishing',
      'NSF 42, NSF 61, and Prop 65 aligned positioning for relevant water-treatment applications',
      'Bulk support for plants, distributors, EPC projects, and replacement media programs',
    ],
    buyerSignals: [
      {
        title: 'Filtration design',
        body: 'Carbon selection should consider vessel design, empty bed contact time, flow rate, influent profile, and expected changeout schedule.',
      },
      {
        title: 'Compliance context',
        body: 'Water buyers often need documentation, certifications, and clear product identification in addition to adsorption performance.',
      },
      {
        title: 'Media replacement',
        body: 'Recurring replacement programs benefit from consistent product quality, clear specifications, and predictable commercial support.',
      },
    ],
    specificationNotes: [
      'Share whether the system uses GAC, PAC, cartridges, pressure vessels, gravity filters, or dosing.',
      'Include target contaminant, water source, flow rate, bed depth, contact time, and required documentation.',
      'Mention volume, packing, delivery market, and replacement schedule for bulk pricing.',
    ],
    productSlugs: ['granular', 'powder', 'catalytic'],
    applicationSlugs: ['water-treatment'],
    ctaTitle: 'Source water treatment activated carbon',
    ctaDescription:
      'Send your water application, product format, specification, volume, and destination market for supplier support.',
    ctaLabel: 'Request water carbon pricing',
    areaServed: 'Global export markets',
  },
  {
    slug: 'activated-carbon-for-gold-recovery',
    label: 'Activated Carbon For Gold Recovery',
    breadcrumbLabel: 'Gold recovery',
    title: 'Activated carbon supply for gold recovery',
    description:
      'Black Opal Carbons supplies coconut shell activated carbon for gold recovery buyers focused on hardness, adsorption performance, attrition resistance, and operational consistency.',
    seoTitle: 'Activated Carbon Supplier for Gold Recovery',
    seoDescription:
      'Activated carbon supplier for gold recovery. Coconut shell granular activated carbon for mining buyers focused on hardness, adsorption, attrition resistance, and consistent supply.',
    serviceType: 'Activated carbon supply for gold recovery',
    introTitle: 'Gold recovery carbon for adsorption circuits',
    intro:
      'Gold recovery buyers typically evaluate activated carbon on hardness, adsorption performance, attrition resistance, particle size, ash, and consistency across shipments. Black Opal supports mining and metallurgical buyers with coconut shell granular carbon supply discussions.',
    highlights: [
      'Coconut shell GAC positioned for gold recovery and precious metal adsorption',
      'Supplier review around hardness, attrition, adsorption performance, and ash profile',
      'Bulk support for mine sites, distributors, and project procurement',
      'Application context for carbon-in-leach, carbon-in-pulp, and related recovery systems',
    ],
    buyerSignals: [
      {
        title: 'Mining performance',
        body: 'The buying decision should reflect adsorption behavior, mechanical strength, handling losses, and circuit operating conditions.',
      },
      {
        title: 'Lot consistency',
        body: 'Repeat supply programs need consistent specification control and practical communication around shipment schedules.',
      },
      {
        title: 'Operational context',
        body: 'Carbon selection can be shaped by ore body, slurry conditions, elution process, and current media performance.',
      },
    ],
    specificationNotes: [
      'Share current carbon grade, mesh size, hardness, attrition, ash, iodine number, and target volume.',
      'Mention whether the inquiry is for CIL, CIP, CIC, replacement media, trialing, or distributor supply.',
      'Include destination market, packing format, shipment cadence, and documentation needs.',
    ],
    productSlugs: ['granular'],
    applicationSlugs: ['gold-recovery'],
    ctaTitle: 'Request gold recovery carbon supply',
    ctaDescription:
      'Send the circuit context, specification target, volume, and destination market for a mining-focused supplier response.',
    ctaLabel: 'Request gold carbon pricing',
    areaServed: 'Global export markets',
  },
  {
    slug: 'activated-carbon-for-air-and-gas',
    label: 'Activated Carbon For Air And Gas',
    breadcrumbLabel: 'Air and gas',
    title: 'Activated carbon supply for air and gas purification',
    description:
      'Black Opal Carbons supplies activated carbon for air and gas purification, odor control, solvent recovery, industrial ventilation, and vapor phase treatment applications.',
    seoTitle: 'Activated Carbon Supplier for Air and Gas Purification',
    seoDescription:
      'Activated carbon supplier for air and gas purification. Coconut shell granular and impregnated activated carbon for odor control, vapor treatment, solvent recovery, and industrial gas applications.',
    serviceType: 'Activated carbon supply for air and gas purification',
    introTitle: 'Carbon supply for vapor phase treatment programs',
    intro:
      'Air and gas purification projects require activated carbon selected around contaminant chemistry, humidity, temperature, flow rate, contact time, and bed design. Black Opal supports vapor phase supply discussions across standard and specialty carbon needs.',
    highlights: [
      'Granular and impregnated carbon for vapor phase systems',
      'Use cases include odor control, solvent recovery, gas polishing, and industrial ventilation',
      'Application review around humidity, flow rate, contaminant profile, and bed design',
      'Bulk support for industrial users, equipment suppliers, and project contractors',
    ],
    buyerSignals: [
      {
        title: 'Stream conditions',
        body: 'Supplier review should start with contaminant type, concentration, temperature, humidity, and airflow or gas flow.',
      },
      {
        title: 'Bed performance',
        body: 'Particle size, pressure drop, contact time, adsorption capacity, and media replacement schedule affect the buying decision.',
      },
      {
        title: 'Specialty options',
        body: 'Some streams may need impregnated or catalytic carbon rather than a standard granular grade.',
      },
    ],
    specificationNotes: [
      'Share target contaminants, concentration, gas flow, temperature, humidity, and desired removal objective.',
      'Include equipment type, bed depth, particle size requirements, pressure drop limits, and replacement schedule.',
      'Mention volume, packing, destination market, and any safety or documentation requirements.',
    ],
    productSlugs: ['granular', 'impregnated', 'catalytic'],
    applicationSlugs: ['air-gas', 'other-applications'],
    ctaTitle: 'Discuss air and gas carbon supply',
    ctaDescription:
      'Send stream conditions, target contaminants, specification, volume, and delivery market for supplier review.',
    ctaLabel: 'Request vapor phase carbon',
    areaServed: 'Global export markets',
  },
  {
    slug: 'activated-carbon-for-oil-and-gas',
    label: 'Activated Carbon For Oil And Gas',
    breadcrumbLabel: 'Oil and gas',
    title: 'Activated carbon supply for oil and gas applications',
    description:
      'Black Opal Carbons supplies activated carbon for oil and gas, refinery, petrochemical, process purification, vapor treatment, and specialty industrial applications.',
    seoTitle: 'Activated Carbon Supplier for Oil and Gas',
    seoDescription:
      'Activated carbon supplier for oil and gas, refinery, and petrochemical applications. Coconut shell granular, impregnated, and specialty activated carbon for process purification.',
    serviceType: 'Activated carbon supply for oil and gas applications',
    introTitle: 'Activated carbon supply for refinery and process purification',
    intro:
      'Oil and gas and petrochemical buyers usually need activated carbon selected around process chemistry, contaminant profile, operating conditions, and documentation requirements. Black Opal supports supply discussions for refinery, gas, and specialty process applications.',
    highlights: [
      'Coconut shell carbon supply for oil, gas, refinery, and petrochemical contexts',
      'Granular, impregnated, and specialty carbon directions depending on stream chemistry',
      'Supplier discussion around process conditions, contaminant targets, and documentation',
      'Bulk procurement support for industrial users, contractors, and distributor channels',
    ],
    buyerSignals: [
      {
        title: 'Process specificity',
        body: 'The right carbon depends on whether the stream is liquid, vapor, refinery-related, petrochemical, or specialty process gas.',
      },
      {
        title: 'Operating conditions',
        body: 'Temperature, pressure, humidity, flow rate, contaminants, and safety requirements shape product selection.',
      },
      {
        title: 'Commercial discipline',
        body: 'Project buyers often need consistent response on documentation, packing, shipment timing, and long-term supply support.',
      },
    ],
    specificationNotes: [
      'Share stream type, target contaminants, operating conditions, and current carbon grade if replacement is involved.',
      'Include particle size, iodine number, hardness, ash, moisture, pH, and any specialty treatment needs.',
      'Mention destination market, volume, packing, safety documentation, and timeline for pricing.',
    ],
    productSlugs: ['granular', 'impregnated', 'catalytic'],
    applicationSlugs: ['oil-gas', 'air-gas', 'other-applications'],
    ctaTitle: 'Request oil and gas activated carbon supply',
    ctaDescription:
      'Send process context, target specification, quantity, and destination market for a focused supplier response.',
    ctaLabel: 'Request process carbon',
    areaServed: 'Global export markets',
  },
  {
    slug: 'industrial-activated-carbon-supplier',
    label: 'Industrial Activated Carbon Supply',
    breadcrumbLabel: 'Industrial supply',
    title: 'Industrial activated carbon supply',
    description:
      'Black Opal Carbons supplies industrial activated carbon for water treatment, mining, air and gas purification, refinery, chemical processing, odor control, and specialty purification.',
    seoTitle: 'Industrial Activated Carbon Supplier',
    seoDescription:
      'Industrial activated carbon supplier for bulk buyers. Coconut shell granular, powder, impregnated, and catalytic activated carbon for water, mining, gas, refinery, and specialty purification.',
    serviceType: 'Industrial activated carbon supply',
    introTitle: 'Industrial activated carbon supply across purification markets',
    intro:
      'Industrial activated carbon buying depends on application fit, reliable specifications, documentation, and supplier responsiveness. Black Opal Carbons supports buyers across water, mining, vapor phase, refinery, chemical processing, and specialty purification programs.',
    highlights: [
      'Industrial carbon supply for liquid phase and vapor phase purification',
      'Product range across GAC, PAC, impregnated carbon, and catalytic carbon',
      'Application support for procurement teams comparing long-term suppliers',
      'Global export market support through the Black Opal office network',
    ],
    buyerSignals: [
      {
        title: 'Industrial coverage',
        body: 'Relevant for buyers managing multiple applications, multiple plants, or distributor demand across several purification categories.',
      },
      {
        title: 'Specification discipline',
        body: 'Activated carbon should be bought against application-linked performance requirements rather than generic names alone.',
      },
      {
        title: 'Supplier continuity',
        body: 'The strongest fit is recurring procurement where reliability, communication, and repeatable quality affect operational risk.',
      },
    ],
    specificationNotes: [
      'Share the application category, product family, required tests, quantity, packing, and delivery market.',
      'For multi-site programs, include expected annual volume and whether product standardization is required.',
      'For distributor inquiries, mention target segments, stock-keeping needs, documentation, and private-label expectations.',
    ],
    productSlugs: ['granular', 'powder', 'impregnated', 'catalytic'],
    applicationSlugs: ['water-treatment', 'gold-recovery', 'air-gas', 'oil-gas', 'other-applications'],
    ctaTitle: 'Build an industrial activated carbon supply program',
    ctaDescription:
      'Send your application mix, volumes, specification targets, and delivery markets for a practical supplier response.',
    ctaLabel: 'Request industrial pricing',
    areaServed: 'Global export markets',
  },
];

export const supplierLandingPageMap = supplierLandingPages.reduce<Record<string, SupplierLandingPage>>(
  (map, page) => {
    map[page.slug] = page;
    return map;
  },
  {},
);

export const supplierLandingPagePaths = supplierLandingPages.map((page) => supplierLandingPagePath(page.slug));
