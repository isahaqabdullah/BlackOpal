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
| Black Opal supports procurement teams that need stable lots, clear specifications, practical packing, export documentation, and continuity across repeat shipments. | Black Opal works with industrial buyers who need consistent lots, clear specifications, practical packing, export documentation, and dependable shipment planning. |
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
