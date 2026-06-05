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
    title: 'Coconut activated carbon for export markets',
    description:
      'Black Opal Carbons carries forward the IndoCarb activated carbon legacy with coconut shell products built for purity, performance, service, and reliability.',
    seoTitle: 'Global Activated Carbon Supplier',
    seoDescription:
      'Global activated carbon supplier for industrial applications. Coconut shell granular, powder, impregnated, and catalytic carbon for water, gold, air, gas, and refinery use.',
    serviceType: 'Global activated carbon supply',
    introTitle: 'Controlled from coconut shell selection to final shipment',
    intro:
      'Black Opal works from selected coconut shell feedstock through controlled activation, sizing, packing, and final quality checks. The product range covers granular, powder, impregnated, and catalytic activated carbon for water treatment, gold recovery, air and gas, oil and gas, and specialty purification.',
    highlights: [
      'Coconut shell activated carbon manufactured and exported from India',
      'Raw material selection, activation, sizing, and final quality assurance controlled before shipment',
      'Granular, powder, impregnated, and catalytic activated carbon product families',
      'NSF 42, NSF 61, and Prop 65 aligned positioning for relevant water-treatment applications',
    ],
    buyerSignals: [
      {
        title: 'Coconut shell specialization',
        body: 'Selected coconut shells support high hardness, low ash, micropore structure, and attrition resistance for premium activated carbon.',
      },
      {
        title: 'Consistent quality',
        body: 'Quality control starts at raw material selection and continues through activation, handling, screening, packing, and final assurance.',
      },
      {
        title: 'Application-matched grades',
        body: 'Granular, powder, impregnated, and catalytic formats are matched to contaminant profile, contact time, and operating conditions.',
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
    label: 'Bulk Activated Carbon Supply',
    breadcrumbLabel: 'Bulk supply',
    title: 'Bulk activated carbon supply backed by manufacturing control',
    description:
      'Black Opal supports industrial buyers, distributors, treatment companies, mining operations, and project supply chains with repeat coconut shell activated carbon supply.',
    seoTitle: 'Bulk Activated Carbon Supplier',
    seoDescription:
      'Bulk activated carbon supplier for recurring procurement. Coconut shell granular, powder, impregnated, and catalytic grades for industrial, distributor, water, gas, refinery, and mining buyers.',
    serviceType: 'Bulk activated carbon supply',
    introTitle: 'Reliable supply starts with controlled production',
    intro:
      'Bulk activated carbon procurement depends on more than quoted price. Buyers need stable product quality, repeatable lot performance, clear documentation, practical packing, and a supplier who understands the application behind the order. Black Opal supports that requirement through coconut shell activated carbon manufacturing, product-family coverage, and export coordination.',
    highlights: [
      'Coconut shell activated carbon manufactured for repeat industrial supply',
      'Granular, powder, impregnated, and catalytic product families',
      'Support for distributors, treatment companies, mining operations, and project buyers',
      'Packing, documentation, shipment cadence, and destination-market coordination',
    ],
    buyerSignals: [
      {
        title: 'Repeat supply programs',
        body: 'For buyers planning monthly, quarterly, tender-based, or project-linked shipments, Black Opal can discuss volume, grade continuity, packing, and shipment cadence from the start.',
      },
      {
        title: 'Specification discipline',
        body: 'Commercial and technical review can be aligned around iodine number, hardness, mesh size, ash, pH, moisture, apparent density, and any application-specific test requirements.',
      },
      {
        title: 'Practical export coordination',
        body: 'Packing format, private-label needs, certificates, documentation, destination port, and delivery timing can be clarified early so the supply response matches the buying process.',
      },
    ],
    specificationNotes: [
      'Application: water treatment, gold recovery, air and gas purification, oil and gas, or another industrial purification process.',
      'Specification: particle size or mesh, iodine number, hardness, ash, moisture, pH, apparent density, and certification requirements where applicable.',
      'Supply plan: immediate or annual volume, packing format, destination port or market, shipment cadence, and required documentation.',
    ],
    productSlugs: ['granular', 'powder', 'impregnated', 'catalytic'],
    applicationSlugs: ['water-treatment', 'gold-recovery', 'air-gas', 'oil-gas'],
    ctaTitle: 'Discuss a bulk activated carbon supply program',
    ctaDescription:
      'Share the application, required grade or specification, volume, packing, destination market, and delivery timeline so the Black Opal team can respond with the right product direction.',
    ctaLabel: 'Discuss a bulk carbon requirement',
    areaServed: 'Global export markets',
  },
  {
    slug: 'coconut-shell-activated-carbon-supplier',
    label: 'Coconut Shell Activated Carbon Supply',
    breadcrumbLabel: 'Coconut shell carbon',
    title: 'Coconut shell activated carbon supply',
    description:
      'Black Opal Carbons supplies coconut shell activated carbon for buyers that need high hardness, low ash, reliable adsorption performance, and industrial application support.',
    seoTitle: 'Coconut Shell Activated Carbon Supplier',
    seoDescription:
      'Coconut shell activated carbon supplier for bulk buyers. Granular, powder, impregnated, and catalytic coconut carbon for water treatment, gold recovery, air, gas, and specialty purification.',
    serviceType: 'Coconut shell activated carbon supply',
    introTitle: 'Coconut shell carbon for demanding purification programs',
    intro:
      'Coconut shell activated carbon is selected when buyers need strong hardness, reliable pore structure, low ash positioning, and dependable performance across water, gas, precious metal recovery, and specialty purification systems.',
    highlights: [
      'Coconut shell feedstock focus with controlled activation and sizing',
      'Grades for liquid phase, vapor phase, mining, refinery, and specialty use',
      'Manufacturing heritage through the Black Opal Group and IndoCarb legacy',
      'Commercial support for bulk buyers and repeat supply programs',
    ],
    buyerSignals: [
      {
        title: 'Material origin',
        body: 'Buyers can discuss coconut shell carbon requirements where hardness, ash profile, attrition resistance, and adsorption performance are central to procurement.',
      },
      {
        title: 'Grade selection',
        body: 'The supplier conversation can start from application, particle size, activation profile, and required performance tests.',
      },
      {
        title: 'Industrial use',
        body: 'Common uses include drinking water, process water, gold recovery, solvent recovery, gas treatment, refinery streams, and odor control.',
      },
    ],
    specificationNotes: [
      'Mention whether the carbon is for a new installation, media replacement, pilot trial, or distributor stock.',
      'Include mesh size, iodine number, hardness, ash, moisture, pH, and any certification or documentation requirements.',
      'Share the application environment because liquid phase and vapor phase carbon needs can differ sharply.',
    ],
    productSlugs: ['granular', 'powder', 'impregnated', 'catalytic'],
    applicationSlugs: ['water-treatment', 'gold-recovery', 'air-gas', 'other-applications'],
    ctaTitle: 'Source coconut shell activated carbon',
    ctaDescription:
      'Share the application, grade target, volume, and delivery market to start a focused supplier discussion.',
    ctaLabel: 'Request coconut carbon pricing',
    areaServed: 'Global export markets',
  },
  {
    slug: 'granular-activated-carbon-supplier',
    label: 'Granular Activated Carbon Supply',
    breadcrumbLabel: 'Granular carbon',
    title: 'Granular activated carbon supply',
    description:
      'Black Opal Carbons supplies coconut shell granular activated carbon for water treatment, gas purification, gold recovery, refinery service, and industrial filtration systems.',
    seoTitle: 'Granular Activated Carbon Supplier',
    seoDescription:
      'Granular activated carbon supplier for bulk buyers. Coconut shell GAC for water treatment, gold recovery, air and gas purification, oil and gas, and industrial filtration.',
    serviceType: 'Granular activated carbon supply',
    introTitle: 'Granular activated carbon for fixed beds and process systems',
    intro:
      'Granular activated carbon is commonly specified for fixed-bed filters, contactors, cartridges, adsorption columns, and other systems that require flow control, adsorption capacity, mechanical strength, and manageable pressure drop.',
    highlights: [
      'Coconut shell GAC positioned for liquid phase and vapor phase systems',
      'Common use in water treatment, gold recovery, gas purification, and refinery service',
      'Bulk procurement support for replacement media and new installations',
      'Specification discussion around mesh size, hardness, ash, iodine number, and moisture',
    ],
    buyerSignals: [
      {
        title: 'Filter media replacement',
        body: 'Useful for buyers replacing exhausted media in carbon filters, pressure vessels, cartridges, and treatment trains.',
      },
      {
        title: 'Mechanical strength',
        body: 'Coconut shell GAC is often selected where hardness and attrition resistance matter for handling and service life.',
      },
      {
        title: 'Process matching',
        body: 'The right grade depends on contaminant profile, contact time, flow rate, particle size, and whether the system is liquid or vapor phase.',
      },
    ],
    specificationNotes: [
      'Include mesh size or particle size distribution, iodine number, hardness, ash, pH, moisture, and apparent density requirements.',
      'For water systems, state whether the carbon is for municipal, industrial, beverage, aquarium, or process water treatment.',
      'For vapor systems, share air or gas composition, target contaminants, humidity, and bed design context.',
    ],
    productSlugs: ['granular'],
    applicationSlugs: ['water-treatment', 'gold-recovery', 'air-gas', 'oil-gas'],
    ctaTitle: 'Request granular activated carbon supply',
    ctaDescription:
      'Send the mesh size, application, expected volume, and destination market for a GAC supplier response.',
    ctaLabel: 'Request GAC pricing',
    areaServed: 'Global export markets',
  },
  {
    slug: 'powdered-activated-carbon-supplier',
    label: 'Powdered Activated Carbon Supply',
    breadcrumbLabel: 'Powdered carbon',
    title: 'Powdered activated carbon supply',
    description:
      'Black Opal Carbons supplies powdered activated carbon for liquid treatment, process correction, decolorization, odor control, and specialty industrial purification needs.',
    seoTitle: 'Powdered Activated Carbon Supplier',
    seoDescription:
      'Powdered activated carbon supplier for bulk buyers. Coconut shell PAC for water treatment, decolorization, odor control, liquid processing, and specialty purification applications.',
    serviceType: 'Powdered activated carbon supply',
    introTitle: 'Powdered activated carbon for fast contact and process correction',
    intro:
      'Powdered activated carbon is selected where buyers need fine particle adsorption, fast contact, flexible dosing, and practical support for liquid treatment, decolorization, odor control, and process polishing.',
    highlights: [
      'PAC supply for liquid phase and specialty process applications',
      'Useful in dosing systems, batch treatment, process correction, and decolorization',
      'Commercial support for industrial users and distributors',
      'Specification discussion around fineness, iodine number, ash, pH, moisture, and application needs',
    ],
    buyerSignals: [
      {
        title: 'Dosing applications',
        body: 'PAC is often used where the process adds carbon directly into a stream or batch rather than relying on a fixed bed.',
      },
      {
        title: 'Fast adsorption',
        body: 'Fine particles can help when contact time is limited and the treatment goal is rapid contaminant removal or color reduction.',
      },
      {
        title: 'Process compatibility',
        body: 'The grade discussion should include filtration, separation, dosing rate, target contaminant, and downstream handling.',
      },
    ],
    specificationNotes: [
      'Share fineness requirements, iodine number, ash, pH, moisture, and whether the application needs food, water, or industrial documentation.',
      'Include target contaminant, dosage range, contact time, and whether the system is batch or continuous.',
      'Mention whether the buyer needs trial quantities, distributor stock, or recurring bulk supply.',
    ],
    productSlugs: ['powder'],
    applicationSlugs: ['water-treatment', 'other-applications'],
    ctaTitle: 'Request powdered activated carbon supply',
    ctaDescription:
      'Send application, fineness, target contaminant, quantity, and destination market for a PAC supplier response.',
    ctaLabel: 'Request PAC pricing',
    areaServed: 'Global export markets',
  },
  {
    slug: 'impregnated-activated-carbon-supplier',
    label: 'Impregnated Activated Carbon Supply',
    breadcrumbLabel: 'Impregnated carbon',
    title: 'Impregnated activated carbon supply',
    description:
      'Black Opal Carbons supplies impregnated activated carbon for targeted gas treatment, odor control, specialty purification, and contaminant-specific industrial applications.',
    seoTitle: 'Impregnated Activated Carbon Supplier',
    seoDescription:
      'Impregnated activated carbon supplier for targeted gas treatment, odor control, specialty purification, and contaminant-specific industrial applications.',
    serviceType: 'Impregnated activated carbon supply',
    introTitle: 'Impregnated activated carbon for targeted contaminant removal',
    intro:
      'Impregnated activated carbon is used when standard carbon adsorption needs chemical enhancement for specific contaminants. The buying conversation should start with the contaminant, stream conditions, safety requirements, and target removal performance.',
    highlights: [
      'Specialty carbon support for vapor phase and targeted treatment programs',
      'Application discussion around contaminant profile, humidity, temperature, and bed design',
      'Bulk and project supply support for industrial buyers',
      'Coordination with Black Opal product and technical teams for grade selection',
    ],
    buyerSignals: [
      {
        title: 'Targeted chemistry',
        body: 'Impregnation is relevant where buyers need carbon selected for a defined contaminant rather than broad adsorption only.',
      },
      {
        title: 'Gas treatment',
        body: 'Common RFQ context includes odor control, process gas treatment, industrial ventilation, and specialty purification systems.',
      },
      {
        title: 'Technical clarity',
        body: 'Supplier review depends on the contaminant, concentration, humidity, temperature, contact time, and regulatory or safety expectations.',
      },
    ],
    specificationNotes: [
      'Share the target contaminant, inlet concentration, temperature, humidity, flow rate, and required removal objective.',
      'Include bed design or equipment details when available so the supplier can understand contact conditions.',
      'Mention packaging, safety documentation, and destination market requirements early in the RFQ.',
    ],
    productSlugs: ['impregnated'],
    applicationSlugs: ['air-gas', 'other-applications'],
    ctaTitle: 'Discuss impregnated carbon requirements',
    ctaDescription:
      'Send the target contaminant, operating conditions, volume, and market so the team can review the correct carbon direction.',
    ctaLabel: 'Request impregnated carbon',
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
