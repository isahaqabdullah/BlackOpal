# Supplier Page Content Approval

This document is for approval before any website change is applied.

## Objective

Make the newly added supplier pages read like Black Opal brand pages for serious industrial buyers, not like pages written for search engines.

The visible page language should stay close to Black Opal's existing narrative:

- coconut shell activated carbon
- controlled manufacturing
- quality, service, reliability, and application support
- grade selection based on real industrial requirements
- export-ready documentation, packing, and shipment planning
- granular, powder, impregnated, and catalytic activated carbon

## Step 1 Scope

This first step only changes the shared language and layout on individual supplier pages.

It does not rewrite each page fully yet.
It does not change CMS content.
It does not change metadata until separately approved.
It does not remove the main `/activated-carbon-suppliers` hub page.

## Remove From Individual Supplier Pages

Remove the full bottom card grid currently shown as:

```text
Related supply capabilities
Explore product and application supply paths
```

Reason:

The section feels forced, repeats similar titles and descriptions, and makes the page look like a keyword cluster. These links should live on the main supplier hub page instead.

## Shared Visible Copy Replacements

Use the following replacements across individual supplier pages.

| Current visible copy | Proposed visible copy |
| --- | --- |
| Supply capability | Manufacturing focus |
| Supply overview | View product range |
| Manufacturing and export support | Quality and export readiness |
| Bulk program fit | Industrial requirements |
| Built for repeat industrial supply | Built around industrial requirements and specification control |
| Black Opal supports procurement teams that need stable lots, clear specifications, practical packing, export documentation, and continuity across repeat shipments. | Black Opal supports industrial requirements that depend on consistent lots, clear specifications, practical packing, export documentation, and dependable shipment planning. |
| Specification inputs | Grade selection |
| Details that shape the right carbon recommendation | Technical details needed for grade selection |
| Application fit | Applications |
| Where this supply capability is used | Common applications for this carbon range |
| Related supply capabilities | Remove this section |
| Explore product and application supply paths | Remove this section |
| View capability | Remove from child-page related cards |

## Office Card Adjustment

Current office cards repeat company names as headings:

```text
Black Opal Carbons
Black Opal Private Limited
Black Opal Carbons
```

Proposed visible structure:

```text
Middle East office
Black Opal Carbons

India office
Black Opal Private Limited

Group headquarters
Black Opal Carbons
```

Reason:

This reads more naturally and avoids repeated brand names as card headings.

## Bulk Page CTA Label

Current:

```text
Request bulk pricing
```

Proposed:

```text
Discuss a bulk carbon requirement
```

Reason:

This sounds more appropriate for industrial buyers than a generic pricing button.

## What Stays For Now

The following will stay unchanged in Step 1:

- page URLs
- sitemap entries
- canonical URLs
- structured data
- SEO titles containing `Supplier`
- the main supplier hub page card grid
- individual page intro text
- individual page buyer cards
- product cards
- application cards

Those need separate review because they affect the full content strategy of each page.

## Approval Needed

Please approve, reject, or edit the proposed Step 1 copy above before implementation.

If approved, the next implementation will:

1. Patch the shared supplier page component.
2. Remove the forced related-card grid from individual supplier pages.
3. Adjust office card headings.
4. Change the bulk page CTA label.
5. Run build and verify the rendered page.
6. Commit and push only after the approved changes pass verification.

---

# Step 2 Draft: Global Activated Carbon Page

Status: approved and implemented.

This replacement draft is intentionally limited to the existing Black Opal website narrative and facts already present on `blackopalcarbons.com`, `blackopalcarbonsme.com`, or the current site content files.

Page:

```text
/activated-carbon-suppliers/global-activated-carbon-supplier
```

## Source Basis

Use only these established points:

- Black Opal is a Black Opal Group company.
- Black Opal / IndoCarb is associated with coconut activated carbon.
- The brand position is quality, innovation, service, and reliability.
- Company-owned and operated manufacturing facilities support higher quality standards, reliability, and consistency.
- The India factory supports coconut activated carbon for export markets.
- Current Middle East production page states `35000 metric tons` annual capacity.
- Raw material selection, activation, sizing, and final quality assurance are controlled before shipment.
- Product families are granular, powder, impregnated, and catalytic activated carbon.
- Applications include water treatment, gold recovery, air and gas, oil and gas, catalytic carbon, and other industrial applications.
- Existing certification language includes NSF 42, NSF 61, and Prop 65 where relevant.

## Words To Avoid In Visible Copy

- buyers
- buyer
- supplier response
- procurement alignment
- RFQ
- supply paths
- usually need
- more than a product list
- repeat supply
- AI-style explanations about what customers need

## Proposed Visible Copy

### Page Label

```text
Global Activated Carbon
```

### Breadcrumb Label

```text
Global
```

### Page Heading

```text
Coconut activated carbon for export markets
```

### Page Description

```text
Black Opal Carbons carries forward the IndoCarb activated carbon legacy with coconut shell products built for purity, performance, service, and reliability.
```

Source basis:

- Existing supplier hub copy: `Black Opal Carbons carries forward the IndoCarb activated carbon legacy...`
- Existing home/about narrative: quality, innovation, service, reliability.

### Intro Heading

```text
Controlled from coconut shell selection to final shipment
```

Source basis:

- Existing site config/company section uses this phrase.

### Intro Body

```text
Black Opal works from selected coconut shell feedstock through controlled activation, sizing, packing, and final quality checks. The product range covers granular, powder, impregnated, and catalytic activated carbon for water treatment, gold recovery, air and gas, oil and gas, and specialty purification.
```

Source basis:

- Existing home/company copy: selected coconut shell feedstock, controlled activation, sizing, final quality checks.
- Existing products/applications copy: granular, powder, impregnated, catalytic; water, gold, air and gas, oil and gas, specialty purification.

### Highlight Bullets

```text
Coconut shell activated carbon manufactured and exported from India
Raw material selection, activation, sizing, and final quality assurance controlled before shipment
Granular, powder, impregnated, and catalytic activated carbon product families
NSF 42, NSF 61, and Prop 65 aligned positioning for relevant water-treatment applications
```

Source basis:

- Existing production page and homepage.

### Three Content Cards

```text
Coconut shell specialization
Selected coconut shells support high hardness, low ash, micropore structure, and attrition resistance for premium activated carbon.

Consistent quality
Quality control starts at raw material selection and continues through activation, handling, screening, packing, and final assurance.

Application-matched grades
Granular, powder, impregnated, and catalytic formats are matched to contaminant profile, contact time, and operating conditions.
```

Source basis:

- Existing homepage `Why Black Opal Carbons` section.

### Grade Selection Notes

```text
Application: water treatment, gold recovery, air and gas, oil and gas, catalytic carbon, or specialty purification.
Product family: granular, powder, impregnated, or catalytic activated carbon.
Specification: particle size, pore structure, hardness, surface area, attrition resistance, packing, and documentation where applicable.
```

Source basis:

- Existing product and application pages.

### CTA Heading

```text
Contact Black Opal for activated carbon requirements
```

### CTA Body

```text
Share the application, product family, grade requirement, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

## Metadata

Metadata can keep search wording, but visible page copy should follow the brand narrative.

SEO title remains:

```text
Global Activated Carbon Supplier
```

Proposed meta description:

```text
Global activated carbon supplier for industrial applications. Coconut shell granular, powder, impregnated, and catalytic carbon for water, gold, air, gas, and refinery use.
```

Reason:

This keeps the search term in metadata, but removes the weak visible-page wording.

## Approval Needed

Approve, reject, or edit this Step 2 draft before implementation.

---

# Step 3 Approved: Global Page Authority Revision

Status: approved and implemented.

This revision strengthens the previously approved global page by using public Black Opal / INDOCARB AC authority claims found across Black Opal websites, WQA 2026 exhibitor information, NSF listings, and the Black Opal name-change press release.

## Source Basis

- Black Opal ME states formerly `INDOCARB AC LLC`, established since 2010, 3 manufacturing facilities, 35000 metric tons/year, NSF 42, NSF 61, and Prop 65.
- Black Opal US and Black Opal Group describe company-owned manufacturing, Black Opal / INDOCARB continuity, and activated carbon field experience.
- WQA 2026 lists `INDOCARB AC (BLACK OPAL)` and references NSF 42, NSF 61, ISO 9001, ISO 14001, ISO 45001, India manufacturing, and sales office/warehouse coverage.
- NSF lists Indocarb AC LLC coconut shell carbon media under NSF/ANSI 42 and NSF/ANSI/CAN 61.
- The Black Opal name-change press release states that products, factory, facilities, pricing, support procedures, and team continuity remained in place through the transition.

## Approved Visible Copy

### Page Heading

```text
Global coconut activated carbon from company-owned manufacturing
```

### Page Description

```text
Black Opal Carbons, formerly INDOCARB AC, manufactures and exports coconut shell activated carbon from India for water treatment, gold recovery, air and gas, oil and gas, and industrial purification applications.
```

### Intro Heading

```text
Established manufacturing continuity under the Black Opal name
```

### Intro Body

```text
The group behind Black Opal was established in 2010 through coconut shell activated carbon manufacturing and activated carbon field experience. The transition from INDOCARB AC to Black Opal Carbons was a global brand change; the products, factory, facilities, pricing, and support procedures remained in place. Today, Black Opal controls raw material selection, steam activation, particle sizing, packing, and final quality assurance before shipment.
```

### Highlight Bullets

```text
Formerly INDOCARB AC, now operating under the Black Opal Carbons name
Company-owned manufacturing with control over feedstock, activation, sizing, packing, and final quality assurance
35000 metric tons annual coconut activated carbon capacity
Granular, powder, impregnated, and catalytic activated carbon product families
NSF 42 and NSF 61 listed coconut shell carbon grades for applicable water-treatment use
```

### Three Content Cards

```text
Manufacturing continuity
The Black Opal transition kept the same product base, factory, facilities, pricing structure, and support procedures customers already worked with.

Coconut shell specialization
Selected coconut shells support high hardness, low ash, micropore structure, and attrition resistance for premium activated carbon.

Application-matched grades
Granular, powder, impregnated, and catalytic formats are matched to water treatment, gold recovery, air and gas, oil and gas, and specialty purification requirements.
```

## Metadata

SEO title:

```text
Global Activated Carbon Supplier | Black Opal Carbons
```

Meta description:

```text
Black Opal Carbons, formerly INDOCARB AC, supplies coconut shell activated carbon from company-owned Indian manufacturing for water, gold, air, gas, oil and industrial purification applications.
```

## CMS Impact

No CMS change. This supplier landing page content is code-backed in `src/app/content/supplierLandingPages.ts`.

---

# Step 12 Approved: Remaining Supplier Page Revisions

Status: approved and implemented.

This revision completes the remaining supplier pages in the same approved style: application-led, Black Opal narrative, no weak `buyers`, `procurement`, `supplier review`, `supplier response`, or pricing-style CTA language. The pages are still code-backed in `src/app/content/supplierLandingPages.ts`.

## Shared Template Cleanup

Live verification found that shared product, resource, template, and JSON-LD strings were also rendered inside supplier-page HTML. Those shared strings were updated so the finished pages do not carry the older buyer/procurement/pricing wording:

- JSON-LD audience text now names distributors, treatment companies, EPC teams, mining operations, and process industries.
- Shared supplier-page CTA changed from `Request pricing` to `Contact Black Opal`.
- Shared related-page heading changed from `Product and application supply paths` to `Product and application pathways`.
- Shared application heading changed from `Common activated carbon supply programs` to `Activated carbon by application`.
- Granular product intro, oil-and-gas application text, newsroom resource text, and default site descriptions now use application/manufacturing language instead of buyer/procurement language.

## CMS And Env Cleanup

Final rendered-page verification showed older buyer/procurement/pricing wording coming from shared Sanity documents and Vercel build-time env values, not from the supplier landing-page copy itself. The cleanup was applied in three places:

- Source fallbacks and supplier templates: removed old buyer/procurement/pricing wording from shared product, application, newsroom, contact, JSON-LD, and supplier-page strings.
- Sanity CMS: updated 13 published documents with the same wording cleanup and pulled the new production snapshot after the write.
- Vercel env: updated `NEXT_PUBLIC_SITE_DESCRIPTION` and `NEXT_PUBLIC_CONTACT_TITLE` for both `black-opal` and `black-opal-india` in production and preview.

The final local rendered HTML check passed for the supplier overview plus air/gas, oil/gas, and industrial supplier pages with the old weak phrases absent.

## Page 1: Air And Gas

Page:

```text
/activated-carbon-suppliers/activated-carbon-for-air-and-gas
```

### Page Heading

```text
Coconut shell activated carbon for air and gas purification
```

### Page Description

```text
Black Opal Carbons manufactures coconut shell and impregnated activated carbon grades for indoor air quality, protective equipment, flue gas, odor control, emission control, solvent recovery, and vapor-phase filtration.
```

### Intro Heading

```text
Coconut shell and impregnated grades for vapor-phase duties
```

### Intro Body

```text
Air and gas purification depends on hardness and retentivity, making coconut shell carbon a strong base media for demanding filtration duties. Black Opal standard and impregnated grades fit vapor-phase service because of their microporous structure, toughness, and application range across industrial and protective environments.
```

### Highlight Bullets

```text
Coconut shell and impregnated grades for indoor air quality, protective equipment, flue gas, and odor control
Microporous coconut shell carbon for air and gas service where hardness and retentivity matter
Standard and impregnated grades for industrial and protective environments
Filters and adsorbers for indoor air quality, cabin air filtration, emission control, odor control, mines, chemical facilities, nuclear power stations, and manufacturing plants
Vapor-phase treatment support for solvent recovery, gas polishing, industrial ventilation, and odor-control duties
```

### Three Content Cards

```text
Protective equipment
IndoCarb VP granular activated carbon filters are used in respirators and gas masks for protection against acid gases, organic vapors, ammonia, mercury vapor, formaldehyde, and radioactive iodides.

Industrial filtration
Air and gas applications include filters and adsorbers for indoor air quality, cabin air filtration, emission control, odor control, mines, chemical facilities, nuclear power stations, and manufacturing plants.

Stream conditions
Grade selection depends on contaminant type, concentration, temperature, humidity, airflow or gas flow, pressure drop, contact time, and bed design.
```

### Grade Selection Notes

```text
Target contaminant or duty: acid gases, organic vapors, ammonia, mercury vapor, formaldehyde, radioactive iodides, odor control, solvent recovery, emission control, or gas polishing.
Operating data: concentration, air or gas flow, temperature, humidity, pressure drop limit, contact time, and desired removal objective.
System context: filter, adsorber, respirator, gas mask, cabin air unit, industrial ventilation system, packing, safety documentation, and destination-market requirements.
```

### CTA

```text
Contact Black Opal for air and gas activated carbon requirements
```

### CTA Body

```text
Share the stream conditions, target contaminants, grade requirement, volume, packing, safety documentation, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

### Metadata

SEO title:

```text
Activated Carbon Supplier for Air and Gas Purification | Black Opal Carbons
```

Meta description:

```text
Activated carbon supplier for air and gas purification with company-owned Indian manufacturing. Coconut shell and impregnated grades for indoor air quality, protective equipment, flue gas, odor control, solvent recovery, and vapor-phase treatment.
```

## Page 2: Oil And Gas

Page:

```text
/activated-carbon-suppliers/activated-carbon-for-oil-and-gas
```

### Page Heading

```text
Activated carbon for refinery, oil, and gas purification
```

### Page Description

```text
Black Opal Carbons manufactures coconut shell granular and impregnated activated carbon for vapor recovery, hydrogen sulfide removal, condensate polishing, low-silica boiler-feed protection, and refinery process purification.
```

### Intro Heading

```text
Petro-grade carbon for vapor recovery and condensate polishing
```

### Intro Body

```text
Oil and gas applications include refinery vapor recovery, hydrogen sulfide removal, and high-purity condensate boiler-feed water treatment. Black Opal activated carbon adsorbs gasoline vapors, benzene, solvents, and hydrogen sulfide during refining, while treated grades support condensate polishing and refinery water-service requirements.
```

### Highlight Bullets

```text
Activated carbon for vapor recovery, H2S removal, condensate polishing, and low-silica boiler-feed protection
Granular and impregnated grades for refinery, gas cleanup, and process purification duties
Adsorption of gasoline vapors, benzene, solvents, and hydrogen sulfide during refining
Treated activated carbons for contaminant removal, de-oiling condensate, and protecting downstream ion-exchange resins, boiler tubes, and turbine blades
Refinery water-service positioning around extremely low silica leaching and nil ash
```

### Three Content Cards

```text
Refinery recovery and gas cleanup
Activated carbon supports recovery of economically valuable vapors and removal of hydrogen sulfide during oil refining.

Condensate and boiler-feed water
Treated activated carbons remove contaminants, de-oil condensate, and help protect downstream ion-exchange resins, boiler tubes, and turbine blades from fouling and deterioration.

Operating context
Grade selection depends on stream type, target contaminants, temperature, pressure, humidity, flow rate, safety requirements, and current media performance.
```

### Grade Selection Notes

```text
Application: refinery vapor recovery, hydrogen sulfide removal, gas cleanup, process purification, condensate polishing, boiler-feed water, or refinery water service.
Operating data: stream type, target contaminants, temperature, pressure, humidity, flow rate, current carbon grade, and required treatment objective.
Specification: particle size, iodine number, hardness, ash, moisture, pH, silica-leaching requirement, packing, safety documentation, and destination-market requirements.
```

### CTA

```text
Contact Black Opal for oil and gas activated carbon requirements
```

### CTA Body

```text
Share the stream type, target contaminants, operating conditions, grade requirement, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

### Metadata

SEO title:

```text
Activated Carbon Supplier for Oil and Gas | Black Opal Carbons
```

Meta description:

```text
Activated carbon supplier for oil and gas with company-owned Indian manufacturing. Coconut shell granular and impregnated grades for refinery vapor recovery, H2S removal, condensate polishing, boiler-feed protection, and process purification.
```

## Page 3: Industrial Activated Carbon

Page:

```text
/activated-carbon-suppliers/industrial-activated-carbon-supplier
```

### Page Heading

```text
Industrial coconut shell activated carbon for purification applications
```

### Page Description

```text
Black Opal Carbons manufactures granular, powder, impregnated, and catalytic activated carbon for water treatment, gold recovery, air and gas purification, refinery, chemical processing, solvent recovery, food and beverage purification, odor control, and specialty industrial processes.
```

### Intro Heading

```text
Product families matched to industrial purification duties
```

### Intro Body

```text
Granular, powder, impregnated, and catalytic grades cover fixed-bed filtration, fast-response dosing, targeted gas treatment, chloramine reduction, solvent recovery, refinery service, and specialty process duties. Water, gold recovery, air, gas, refinery, and specialty industrial applications each place different demands on hardness, pore structure, activity, and purity.
```

### Highlight Bullets

```text
Granular, powder, impregnated, and catalytic activated carbon product families
Applications across water treatment, gold recovery, air and gas purification, oil and gas, chloramine removal, and specialty industrial processes
Solvent recovery for printing, dry cleaning, paint, and related industrial applications
Food and beverage purification for taste and odor control, CO2 purification, and edible-oil decolorization
Company-owned manufacturing with controlled feedstock selection, steam activation, sizing, packing, and final assurance before shipment
```

### Three Content Cards

```text
Application range
Industrial applications include water treatment, mining, air and gas purification, refinery service, chemical processing, solvent recovery, odor control, food and beverage purification, and specialty purification.

Product format
Granular, powder, impregnated, and catalytic formats allow the carbon selection to follow the application, contaminant profile, contact time, and operating conditions.

Specialty processes
Solvent recovery, food and beverage purification, edible-oil decolorization, chloramine removal, and refinery duties extend the portfolio beyond the main water, mining, gas, and refinery categories.
```

### Grade Selection Notes

```text
Application category: water treatment, gold recovery, air and gas, oil and gas, solvent recovery, food and beverage, refinery, chemical processing, odor control, or specialty purification.
Product family: granular, powder, impregnated, catalytic, acid or water-washed, pH-adjusted, or specialty activated carbon.
Specification: particle size, hardness, surface area, attrition resistance, ash, pH, moisture, contaminant profile, packing, and documentation where applicable.
```

### CTA

```text
Contact Black Opal for industrial activated carbon requirements
```

### CTA Body

```text
Share the application mix, product family, specification targets, volume, packing, documentation, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

### Metadata

SEO title:

```text
Industrial Activated Carbon Supplier | Black Opal Carbons
```

Meta description:

```text
Industrial activated carbon supplier with company-owned Indian manufacturing. Coconut shell granular, powder, impregnated, and catalytic carbon for water, mining, air, gas, refinery, solvent recovery, food and beverage, odor control, and specialty purification.
```

## CMS Impact

No CMS change. These supplier landing page contents are code-backed in `src/app/content/supplierLandingPages.ts`.

---

# Step 11 Approved: Gold Recovery Activated Carbon Page Revision

Status: approved and implemented.

This revision follows the same wording style as the previously approved supplier pages: application-led, Black Opal narrative, no weak `buyers`, `procurement`, `supplier response`, or pricing-style CTA language. The copy uses existing site facts for gold recovery: GC grades, microporous coconut shell carbon, CIP, CIC, tank-adsorbed precious-metal recovery systems, adsorption of metal and cyanide complexes, high hardness, low dust, low platelets, adsorption kinetics, loading capacity, and attrition resistance.

## Approved Visible Copy

Page:

```text
/activated-carbon-suppliers/activated-carbon-for-gold-recovery
```

### Page Label

```text
Activated Carbon For Gold Recovery
```

### Breadcrumb Label

```text
Gold recovery
```

### Page Heading

```text
High-hardness coconut shell activated carbon for gold recovery
```

### Page Description

```text
Black Opal Carbons manufactures microporous coconut shell granular activated carbon grades for CIP, CIC, and tank-adsorbed precious-metal recovery systems where hardness, adsorption kinetics, low dust, and attrition resistance directly affect recovery.
```

### Intro Heading

```text
GC grades for CIP, CIC, and tank-adsorbed systems
```

### Intro Body

```text
Black Opal GC grades are built for Carbon-in-Pulp, Carbon-in-Column, and tank-adsorbed systems where adsorption of metal and cyanide complexes has to happen quickly and cleanly. The particle size and pore structure are engineered for precious-metal adsorption while maintaining the hardness needed to resist attrition in mining circuits.
```

### Highlight Bullets

```text
Microporous coconut shell carbon grades for CIP, CIC, and tank-adsorbed precious-metal recovery systems
High-hardness GC grades with excellent attrition resistance for repeated mining service
Strong gold adsorption rates for high-throughput circuits
Higher gold adsorption capacities for maximum loading
Low dust and clean operation for recovery circuits
```

### Three Content Cards

```text
Circuit performance
Gold recovery is a specialist performance application where hardness, low platelets, low dust, and adsorption kinetics directly affect metal loading and carbon loss.

Precious-metal adsorption
The particle size and pore structure are engineered for adsorption of metal and cyanide complexes while maintaining mechanical strength in mining circuits.

Mining service durability
Coconut shell carbon provides the hardness, abrasion resistance, attrition resistance, and clean handling profile required for repeated mining service.
```

### Grade Selection Notes

```text
Application: CIP, CIC, tank-adsorbed system, carbon-in-leach, carbon-in-pulp, or precious-metal adsorption circuit.
Specification: mesh size, hardness, attrition, ash, iodine number, adsorption rate, loading target, moisture, and documentation where applicable.
System context: ore body, slurry conditions, elution process, current media performance, packing, volume, and destination-market requirements.
```

### CTA

```text
Contact Black Opal for gold recovery activated carbon requirements
```

### CTA Body

```text
Share the recovery circuit, current carbon grade, specification target, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

## Metadata

SEO title:

```text
Activated Carbon Supplier for Gold Recovery | Black Opal Carbons
```

Meta description:

```text
Activated carbon supplier for gold recovery with company-owned Indian manufacturing. High-hardness microporous coconut shell GC grades for CIP, CIC, tank-adsorbed systems, gold adsorption, loading capacity, low dust, and attrition resistance.
```

## CMS Impact

No CMS change. This supplier landing page content is code-backed in `src/app/content/supplierLandingPages.ts`.

---

# Step 10 Approved: Water Treatment Activated Carbon Page Revision

Status: approved and implemented.

This revision follows the same wording style as the previously approved supplier pages: application-led, Black Opal narrative, no weak `buyers`, `procurement`, `bulk pricing`, `supplier support`, or pricing-style CTA language. The copy uses existing site facts for water treatment: GAC, PAC, impregnated, acid or water-washed, and catalytic grades; drinking water; process water; municipal systems; groundwater remediation; wastewater polishing; NSF 42 and NSF 61 listed grades; VOCs; pesticides; solvents; THMs; chlorine; chloramine; taste; odor; and color removal.

## Approved Visible Copy

Page:

```text
/activated-carbon-suppliers/activated-carbon-for-water-treatment
```

### Page Label

```text
Activated Carbon For Water Treatment
```

### Breadcrumb Label

```text
Water treatment
```

### Page Heading

```text
Coconut shell activated carbon for water treatment systems
```

### Page Description

```text
Black Opal Carbons manufactures coconut shell activated carbon grades for drinking water, process water, municipal systems, groundwater remediation, wastewater polishing, taste and odor control, and contaminant-specific filtration.
```

### Intro Heading

```text
GAC, PAC, impregnated, and catalytic grades for water purification
```

### Intro Body

```text
Black Opal manufactures granular, powder, impregnated, and catalytic activated carbon for drinking water, industrial process water, municipal systems, groundwater remediation, and wastewater polishing. Coconut shell carbon supports chlorine reduction and adsorption of VOCs, pesticides, solvents, THMs, and other organics, with specialty options for bacteriostatic and chloramine duties.
```

### Highlight Bullets

```text
Granular, powder, impregnated, and catalytic grades for drinking water, municipal systems, industrial process water, and wastewater purification
NSF 42 and NSF 61 listed grades for applicable water-treatment use
Coconut shell GAC and PAC for filtration, dosing, polishing, taste and odor control, and contaminant-specific treatment
Catalytic CATCARB grades for chloramine and hydrogen sulfide decomposition where required
Application fit across drinking water, process water, groundwater remediation, wastewater polishing, and specialty water treatment
```

### Three Content Cards

```text
Water-treatment range
The water-treatment range includes GAC, PAC, impregnated, acid or water-washed, and specialty catalytic grades.

Contaminant profile
Municipal and industrial systems use activated carbon for taste, odor, and color removal, plus adsorption of VOCs, pesticides, disinfectant by-products, chlorinated hydrocarbons, and inhibitory compounds.

Wastewater and remediation
Activated carbon is an efficient and cost-effective option for industrial and municipal wastewater, contaminated ground and groundwater, and wastewater polishing.
```

### Grade Selection Notes

```text
Product format: GAC, PAC, impregnated, acid or water-washed, or catalytic activated carbon.
Application: drinking water, process water, municipal system, groundwater remediation, wastewater polishing, taste, odor, color, VOC, pesticide, solvent, THM, chlorine, or chloramine reduction.
System context: cartridge, pressure vessel, gravity filter, dosing system, flow rate, bed depth, contact time, influent profile, packing, and documentation where applicable.
```

### CTA

```text
Contact Black Opal for water treatment activated carbon requirements
```

### CTA Body

```text
Share the water application, product format, target contaminant, grade requirement, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

## Metadata

SEO title:

```text
Activated Carbon Supplier for Water Treatment | Black Opal Carbons
```

Meta description:

```text
Activated carbon supplier for water treatment with company-owned Indian manufacturing. Coconut shell GAC, PAC, impregnated, and catalytic grades for drinking water, process water, wastewater, taste, odor, VOC, pesticide, THM, and chloramine applications.
```

## CMS Impact

No CMS change. This supplier landing page content is code-backed in `src/app/content/supplierLandingPages.ts`.

---

# Step 9 Approved: Catalytic Activated Carbon Page Revision

Status: approved and implemented.

This revision follows the same wording style as the previously approved supplier pages: product-led, Black Opal narrative, no weak `buyers`, `supplier review`, `specialty procurement`, `response`, or pricing-style CTA language. The copy uses existing site facts for Catalytic Activated Carbon: CATCARB, surface-modified coconut shell carbon, chloramine reduction, hydrogen sulfide decomposition, difficult water-treatment contaminants, and retained hardness, surface area, and attrition resistance.

## Approved Visible Copy

Page:

```text
/activated-carbon-suppliers/catalytic-activated-carbon-supplier
```

### Page Label

```text
Catalytic Activated Carbon
```

### Breadcrumb Label

```text
Catalytic carbon
```

### Page Heading

```text
Catalytic activated carbon for chloramine and hydrogen sulfide control
```

### Page Description

```text
Black Opal Carbons provides surface-modified coconut shell catalytic activated carbon for chloramine reduction, hydrogen sulfide decomposition, taste and odor reduction, and specialty water-treatment applications.
```

### Intro Heading

```text
CATCARB for difficult water-treatment contaminants
```

### Intro Body

```text
Black Opal CATCARB is surface modified, with particle size and pore structure tuned for adsorption while maintaining the hardness, surface area, and attrition resistance associated with high-quality coconut shell carbon. It is engineered for water-treatment applications requiring rapid chloramine and H2S decomposition.
```

### Highlight Bullets

```text
Surface-modified coconut shell carbon for chloramine, hydrogen sulfide, and difficult water-treatment contaminants
CATCARB catalytic grades for water-treatment applications requiring rapid chloramine and H2S decomposition
Used for chloramines, hydrogen sulfide, hydrogen peroxide, THMs, TCE, PCE, detergents, pesticides, phenols, and taste and odor compounds
Supports chloramine reduction in drinking-water systems moving away from free chlorine
Maintains hardness, surface area, and attrition resistance associated with high-quality coconut shell carbon
```

### Three Content Cards

```text
Why catalytic grades matter
Standard activated carbon filters sized for chlorine removal have limited capacity for chloramine reduction at normal flow rates, which is where catalytic grades become important.

How CATCARB works
Surface modification enhances the media's natural ability to chemically change difficult contaminants while the coconut shell carbon structure supports adsorption performance.

Water-treatment use
CATCARB is built for chloramine-heavy drinking-water programs and is also suited for hydrogen sulfide decomposition, taste and odor reduction, and specialty water treatment.
```

### Grade Selection Notes

```text
Target contaminant or duty: chloramine, hydrogen sulfide, hydrogen peroxide, THMs, TCE, PCE, detergents, pesticides, phenols, taste and odor, or specialty water treatment.
Operating data: water chemistry, flow rate, contact time, system design, and required treatment objective.
System context: existing media, filtration design, equipment details, packing, documentation, and destination-market requirements where applicable.
```

### CTA

```text
Contact Black Opal for catalytic activated carbon requirements
```

### CTA Body

```text
Share the treatment objective, operating conditions, grade requirement, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

## Metadata

SEO title:

```text
Catalytic Activated Carbon Supplier | Black Opal Carbons
```

Meta description:

```text
Catalytic activated carbon supplier with company-owned Indian manufacturing. CATCARB surface-modified coconut shell carbon for chloramine, hydrogen sulfide, taste and odor, and specialty water treatment.
```

## CMS Impact

No CMS change. This supplier landing page content is code-backed in `src/app/content/supplierLandingPages.ts`.

---

# Step 8 Approved: Impregnated Activated Carbon Page Revision

Status: approved and implemented.

This revision follows the same wording style as the previously approved supplier pages: product-led, Black Opal narrative, no weak `buyers`, `RFQ`, `supplier response`, or pricing-style CTA language. The copy uses existing site facts for Impregnated Activated Carbon: chemically enhanced coconut shell carbon, silver-impregnated carbon for bacteriostatic water systems, sulfur-impregnated carbon for mercury removal, and targeted impregnation for acid gases, ammonia, amines, gas purification, protective equipment, and specialty purification.

## Approved Visible Copy

Page:

```text
/activated-carbon-suppliers/impregnated-activated-carbon-supplier
```

### Page Label

```text
Impregnated Activated Carbon
```

### Breadcrumb Label

```text
Impregnated carbon
```

### Page Heading

```text
Impregnated activated carbon for targeted gas and water systems
```

### Page Description

```text
Black Opal Carbons provides chemically enhanced coconut shell activated carbon for targeted gas-stream, bacteriostatic, mercury-removal, and specialty purification duties.
```

### Intro Heading

```text
Chemically enhanced carbon for contaminant-specific performance
```

### Intro Body

```text
Impregnation extends standard activated carbon performance through the interaction between the chemical additive and the coconut shell carbon substrate. Black Opal impregnated carbon is used where the application is defined by a specific contaminant, stream condition, bacteriostatic requirement, or specialty purification duty.
```

### Highlight Bullets

```text
Chemically enhanced coconut shell carbon for targeted gas-stream, bacteriostatic, and specialty purification duties
Silver-impregnated carbon for bacteriostatic protection in drinking-water filters and water systems
Sulfur-impregnated carbon for mercury removal in natural gas, air, hydrogen, and other gas streams
Targeted impregnation for acid gases, ammonia, amines, and other specialty contaminants
Applicable across gas purification, protective equipment, mercury removal, and bacteriostatic drinking-water systems
```

### Three Content Cards

```text
Targeted chemistry
Impregnation is used when untreated activated carbon alone is not the right direction for a contaminant-specific removal requirement.

Water and gas examples
Silver-impregnated carbon supports point-of-use water filters, while sulfur-impregnated carbon supports mercury capture in gas service.

Operating context
Grade selection depends on the contaminant, concentration, humidity, temperature, flow rate, contact time, safety requirements, and equipment design.
```

### Grade Selection Notes

```text
Target contaminant or duty: mercury, acid gases, ammonia, amines, bacteriostatic water systems, gas purification, protective equipment, or specialty purification.
Operating data: inlet concentration, temperature, humidity, flow rate, contact time, and required removal objective.
System context: bed design, equipment details, packing, safety documentation, and destination-market requirements where applicable.
```

### CTA

```text
Contact Black Opal for impregnated activated carbon requirements
```

### CTA Body

```text
Share the target contaminant, operating conditions, grade requirement, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

## Metadata

SEO title:

```text
Impregnated Activated Carbon Supplier | Black Opal Carbons
```

Meta description:

```text
Impregnated activated carbon supplier with company-owned Indian manufacturing. Chemically enhanced coconut shell carbon for gas purification, mercury removal, bacteriostatic water systems, and specialty contaminants.
```

## CMS Impact

No CMS change. This supplier landing page content is code-backed in `src/app/content/supplierLandingPages.ts`.

---

# Step 7 Approved: Powdered Activated Carbon Page Revision

Status: approved and implemented.

This revision follows the same wording style as the previously approved supplier pages: product-led, Black Opal narrative, no weak `buyers`, `supplier response`, or pricing-style CTA language. The copy uses existing site facts for Powder Activated Carbon: virgin PAC, drinking water, food-grade, wastewater, odor-control programs, inline dosing, batch addition, decolorization, remediation, and process polishing.

## Approved Visible Copy

Page:

```text
/activated-carbon-suppliers/powdered-activated-carbon-supplier
```

### Page Label

```text
Powder Activated Carbon
```

### Breadcrumb Label

```text
Powdered carbon
```

### Page Heading

```text
Powdered activated carbon for dosing and batch treatment
```

### Page Description

```text
Black Opal Carbons manufactures virgin powdered activated carbon for drinking water, wastewater, odor control, food-grade, decolorization, and specialty process applications.
```

### Intro Heading

```text
Fast-response PAC for inline dosing and batch addition
```

### Intro Body

```text
Powder activated carbon gives treatment systems a fast-response format where rapid contact and flexible dosing matter more than fixed-bed operation. Black Opal PAC is used for inline dosing, batch addition, water and wastewater treatment, odor removal, brewery and winery applications, food-related processes, remediation, color reduction, and organic control.
```

### Highlight Bullets

```text
Virgin powdered activated carbon for drinking water, food-grade, wastewater, and odor-control programs
Used in water treatment, wastewater treatment, odor removal, and brewery or winery applications
Applied for chloramines, pesticides, herbicides, groundwater remediation, and disinfection by-product reduction
Fine-particle format for inline dosing, batch addition, decolorization, and process polishing
Grade alignment around fineness, iodine number, ash, pH, moisture, packing, and documentation
```

### Three Content Cards

```text
Inline dosing and batch addition
Powdered carbon fits treatment programs where carbon is added directly into a process stream or batch rather than used as a cartridge or pressure-vessel media.

Rapid contact
Fine particle size supports fast contact where color, odor, organic control, or contaminant reduction has to happen quickly.

Application range
Black Opal powder activated carbon supports drinking water, wastewater, odor removal, brewery and winery use, food-related processes, remediation, decolorization, and process polishing.
```

### Grade Selection Notes

```text
Fineness, iodine number, ash, pH, moisture, packing, and documentation where applicable.
Application: drinking water, wastewater, odor removal, food-grade, brewery or winery, groundwater remediation, decolorization, or process polishing.
System context: inline dosing, batch addition, contact time, dosage range, filtration, separation, and downstream handling.
```

### CTA

```text
Contact Black Opal for powder activated carbon requirements
```

### CTA Body

```text
Share the application, fineness, grade requirement, dosage or contact-time context, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

## Metadata

SEO title:

```text
Powdered Activated Carbon Supplier | Black Opal Carbons
```

Meta description:

```text
Powdered activated carbon supplier with company-owned Indian manufacturing. Virgin PAC for drinking water, wastewater, odor control, food-grade, decolorization, and remediation applications.
```

## CMS Impact

No CMS change. This supplier landing page content is code-backed in `src/app/content/supplierLandingPages.ts`.

---

# Step 6 Approved: Granular Activated Carbon Page Revision

Status: approved and implemented.

This revision replaces the older granular supplier-page copy that used weak terms such as `bulk buyers`, `procurement`, `supplier response`, and generic pricing language. The approved copy stays inside the Black Opal narrative: high-hardness coconut shell GAC, selected coconut shell feedstock, mesh-size control, pore-structure control, attrition resistance, fixed-bed and cartridge systems, and application fit.

## Approved Visible Copy

Page:

```text
/activated-carbon-suppliers/granular-activated-carbon-supplier
```

### Page Label

```text
Granular Activated Carbon
```

### Breadcrumb Label

```text
Granular carbon
```

### Page Heading

```text
Coconut shell granular activated carbon for fixed-bed and process systems
```

### Page Description

```text
Black Opal Carbons manufactures high-hardness coconut shell granular activated carbon for water treatment, gold recovery, solvent recovery, condensate polishing, gas purification, refinery service, and industrial filtration systems.
```

### Intro Heading

```text
High-hardness GAC with mesh-size and pore-structure control
```

### Intro Body

```text
Black Opal granular activated carbon is produced from selected coconut shell feedstock and engineered so particle size and pore structure support adsorption performance in fixed-bed filters, cartridges, pressure vessels, adsorption columns, and process systems. Grades can be matched by mesh size, adsorption level, washing, pH adjustment, hardness, surface area, and documentation requirements.
```

### Highlight Bullets

```text
High-hardness coconut shell GAC for water treatment, gold recovery, solvent recovery, condensate polishing, and gas-phase service
Produced from selected coconut shell feedstock with controls for hardness, surface area, and attrition resistance
Mesh size, adsorption level, washing, and pH-adjusted variants available
Suitable for fixed-bed filters, cartridges, pressure vessels, adsorption columns, and process systems
NSF 42 and NSF 61 listed grades for applicable water-treatment use
```

### Three Content Cards

```text
Fixed-bed and cartridge systems
Granular activated carbon supports filtration systems where flow control, contact time, adsorption capacity, mechanical strength, and pressure drop matter.

Mechanical strength
Coconut shell GAC is valued for hardness, abrasion resistance, attrition resistance, and durable performance through handling and service cycles.

Application fit
Black Opal granular activated carbon supports water treatment, gold recovery, solvent recovery, condensate polishing, hydrogen sulfide removal, gas purification, and refinery service.
```

### Grade Selection Notes

```text
Particle size or mesh size, adsorption level, hardness, ash, pH, moisture, apparent density, and documentation where applicable.
Application: water treatment, gold recovery, solvent recovery, condensate polishing, air and gas, oil and gas, refinery service, or industrial filtration.
System context: fixed-bed filter, cartridge, pressure vessel, contactor, adsorption column, or process system.
```

### CTA

```text
Contact Black Opal for granular activated carbon requirements
```

### CTA Body

```text
Share the application, mesh size, grade requirement, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

## Metadata

SEO title:

```text
Granular Activated Carbon Supplier | Black Opal Carbons
```

Meta description:

```text
Granular activated carbon supplier with company-owned Indian manufacturing. High-hardness coconut shell GAC for water treatment, gold recovery, gas purification, refinery service, and industrial filtration.
```

## CMS Impact

No CMS change. This supplier landing page content is code-backed in `src/app/content/supplierLandingPages.ts`.

---

# Step 5 Approved: Coconut Shell Activated Carbon Page Revision

Status: approved and implemented.

This revision replaces the older coconut-shell supplier-page copy that used weak terms such as `buyers`, `procurement`, `repeat supply`, and generic pricing language. The approved copy stays inside the Black Opal narrative: selected coconut shell feedstock, high hardness, low ash, micropore structure, attrition resistance, steam activation, product-family coverage, and industrial application fit.

## Approved Visible Copy

Page:

```text
/activated-carbon-suppliers/coconut-shell-activated-carbon-supplier
```

### Page Label

```text
Coconut Shell Activated Carbon
```

### Breadcrumb Label

```text
Coconut shell carbon
```

### Page Heading

```text
Coconut shell activated carbon for demanding purification systems
```

### Page Description

```text
Black Opal Carbons manufactures coconut shell activated carbon from selected feedstock for water treatment, gold recovery, air and gas, oil and gas, and specialty purification applications.
```

### Intro Heading

```text
Selected coconut shell feedstock, steam activation, and controlled sizing
```

### Intro Body

```text
Selected coconut shells support high hardness, low ash, micropore structure, and attrition resistance. Black Opal controls feedstock selection, steam activation, sizing, packing, and final assurance before shipment, with granular, powder, impregnated, and catalytic formats available for application-specific requirements.
```

### Highlight Bullets

```text
Selected coconut shell feedstock for high hardness, low ash, and attrition resistance
Steam activation, particle-size control, packing, and final assurance before shipment
Granular, powder, impregnated, and catalytic activated carbon product families
Applications across water treatment, gold recovery, air and gas, oil and gas, and specialty purification
NSF 42 and NSF 61 listed grades for applicable water-treatment use
```

### Three Content Cards

```text
Coconut shell performance
Coconut shell carbon is valued for hardness, low ash, micropore structure, and attrition resistance across liquid-phase and vapor-phase purification duties.

Product family options
Granular, powder, impregnated, and catalytic formats allow the carbon selection to follow the application, contaminant profile, contact time, and operating conditions.

Application fit
Black Opal coconut shell activated carbon supports water treatment, gold recovery, air and gas purification, oil and gas, and specialty industrial purification systems.
```

### Grade Selection Notes

```text
Product family: granular, powder, impregnated, or catalytic activated carbon.
Application: water treatment, gold recovery, air and gas, oil and gas, catalytic carbon, or specialty purification.
Specification: particle size, pore structure, hardness, surface area, attrition resistance, packing, and documentation where applicable.
```

### CTA

```text
Contact Black Opal for coconut shell activated carbon requirements
```

### CTA Body

```text
Share the product family, application, grade requirement, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

## Metadata

SEO title:

```text
Coconut Shell Activated Carbon Supplier | Black Opal Carbons
```

Meta description:

```text
Coconut shell activated carbon supplier with company-owned Indian manufacturing. Granular, powder, impregnated, and catalytic coconut carbon for water, gold, air, gas, and industrial purification.
```

## CMS Impact

No CMS change. This supplier landing page content is code-backed in `src/app/content/supplierLandingPages.ts`.

---

# Step 4 Approved: Bulk Activated Carbon Page Revision

Status: approved and implemented.

This revision replaces the older bulk-page language that used weak terms such as `buyers`, `procurement`, `repeat supply`, and `supply program`. The approved copy keeps the page inside the Black Opal narrative: company-owned manufacturing, coconut shell activated carbon, 35000 metric tons annual capacity, product-family coverage, export readiness, and application fit.

## Approved Visible Copy

Page:

```text
/activated-carbon-suppliers/bulk-activated-carbon-supplier
```

### Page Label

```text
Bulk Activated Carbon
```

### Breadcrumb Label

```text
Bulk
```

### Page Heading

```text
Bulk coconut activated carbon from controlled Indian manufacturing
```

### Page Description

```text
Black Opal Carbons manufactures coconut shell activated carbon in granular, powder, impregnated, and catalytic formats for industrial purification applications that require scale, consistency, packing discipline, and export readiness.
```

### Intro Heading

```text
Manufacturing scale for larger activated carbon requirements
```

### Intro Body

```text
Black Opal's company-owned manufacturing controls feedstock selection, steam activation, particle sizing, packing, and final quality assurance before shipment. With 35000 metric tons of annual coconut activated carbon capacity, the product range supports water treatment, gold recovery, air and gas, oil and gas, catalytic carbon, and specialty purification applications.
```

### Highlight Bullets

```text
35000 metric tons annual coconut activated carbon capacity
Company-owned manufacturing with controlled feedstock, activation, sizing, packing, and final quality assurance
Granular, powder, impregnated, and catalytic activated carbon product families
Coconut shell carbon manufactured and exported from India
NSF 42 and NSF 61 listed grades for applicable water-treatment use
```

### Three Content Cards

```text
Manufacturing control
Company-owned facilities keep raw material selection, activation, processing, packing, and final assurance under direct operating control.

Bulk product range
Granular, powder, impregnated, and catalytic activated carbon grades cover liquid-phase, vapor-phase, precious metal recovery, refinery, and specialty purification duties.

Export readiness
Packing format, product documentation, shipment planning, and destination-market requirements can be aligned before dispatch.
```

### Grade Selection Notes

```text
Product family: granular, powder, impregnated, or catalytic activated carbon.
Application: water treatment, gold recovery, air and gas, oil and gas, catalytic carbon, or specialty purification.
Specification: particle size, pore structure, hardness, surface area, attrition resistance, packing, and documentation where applicable.
```

### CTA

```text
Contact Black Opal for bulk activated carbon requirements
```

### CTA Body

```text
Share the product family, application, grade requirement, volume, packing, and destination market with the Black Opal team.
```

### CTA Button

```text
Contact Black Opal
```

## Metadata

SEO title:

```text
Bulk Activated Carbon Supplier | Black Opal Carbons
```

Meta description:

```text
Bulk activated carbon supplier with company-owned Indian manufacturing. Coconut shell granular, powder, impregnated, and catalytic carbon for industrial purification applications.
```

## CMS Impact

No CMS change. This supplier landing page content is code-backed in `src/app/content/supplierLandingPages.ts`.
