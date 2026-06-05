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
