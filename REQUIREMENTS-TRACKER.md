# Mr Sameh Egyptian Website Requirements Tracker

Audit date: 2026-08-24

Source: 126 Gmail messages from `sameh.ahmed@multigates-co.com`, reviewed oldest to newest (2025-09-22 through 2026-08-16).

Scope: Egyptian website only. Requests for the Canadian Quaval site were kept separate. Later emails override earlier ones.

Status definitions:

- **Complete** - present in the code/database and verified against the supplied evidence.
- **Complete with limitation** - implemented, but a browser or source-file limitation is documented below.
- **Superseded** - explicitly cancelled or replaced by a later Sameh email.
- **Pending client input** - Sameh mentioned the item but did not provide enough final content to implement it faithfully.
- **Needs follow-up** - the visible UI exists, but a production integration still needs a destination or account decision.

## Home and About

| ID | Email evidence | Atomic requirement | Status | Implementation/evidence |
|---|---|---|---|---|
| H01 | 2025-09-22 `19972db482092dab` | Home hero uses Sameh's supplied industrial imagery | Complete | Home hero and image assets in `src/app/[locale]/(main)/page.tsx` and `public/` |
| H02 | 2025-09-22 `19972db482092dab` | Short animated movie on home page | Complete | Home video `/video/Ball_bearings_rotating_202604262210.mp4` |
| H03 | 2025-09-22 `19972db482092dab` | Animated sequence of brand logos | Complete | Brand carousel reads active `eg_brands` records |
| H04 | 2025-09-22 `19972db482092dab` | Code of Ethics text | Complete | Home content section |
| H05 | 2025-09-22 `19972db482092dab` | Corporation policy text | Complete | Home content section |
| H06 | 2025-09-22 `19972db482092dab` | Mission statement text | Complete | Home content section |
| H07 | 2025-09-22 `19972db482092dab` | Bearing history text and Wikipedia source | Complete | Home history section with source link |
| H08 | 2025-09-22 `19972db482092dab` | Exact bearing-history attachment beside history | Complete | Uploaded to `product-images/site/home/bearing-history.jpg` and wired into home |
| H09 | 2025-09-22 `19972db482092dab` | 15 named industries on home | Complete | Home industries section |
| H10 | 2025-09-22; 2026-03-29 `19d39bdf437ce6e7` | Customer-help chat with supplied woman photo | Complete | Global bilingual `CustomerSupportChat`; image at `product-images/site/chat/customer-support.jpg` |
| A01 | 2025-09-24 `199792fc458d115b` | Who We Are company copy | Complete | Redesigned bilingual About page |
| A02 | 2025-09-24 `199792fc458d115b` | What We Do copy | Complete | About page |
| A03 | 2025-09-24 `199792fc458d115b` | NTN, KSM, Quaval, DKF, STC/DGWL brand histories | Complete | About brand spotlight sections |
| A04 | 2025-09-25 `1997e9e4d4a1eb7c` | Company history and supplied imagery | Complete | About timeline/history redesign |
| A05 | 2026-08-14 `1a0017b213e8e6f0`; 2026-08-16 `1a00c7c52f49eb6f` | Add Who is KMR content, with a distinct Egyptian design | Complete | KMR translations and About spotlight added; Egyptian design retained |

## Product architecture and interaction

| ID | Email evidence | Atomic requirement | Status | Implementation/evidence |
|---|---|---|---|---|
| P01 | 2025-09-26 `199839df63b35579` | Catalogs available for browsing, not downloading | Complete with limitation | Brand-page protected modal viewer; catalog rows use `is_downloadable=false`. Network-level copying cannot be made impossible in a web browser. |
| P02 | 2025-09-26 `199839df63b35579` | Certificates browse-only, no download/screenshot | Complete with limitation | Protected modal, hidden PDF toolbar, watermark, context-menu/save/print deterrence. Operating-system screenshots cannot technically be prevented. |
| P03 | 2025-09-26 `199839df63b35579` | Bearing finder by dimensions and type | Complete | Products finder UI backed by 23 dimensioned product rows |
| P04 | 2025-09-26 through 2025-09-29 | Brands and nested bearing categories | Complete | Products/brand/category navigation and product cards backed by Supabase |
| P05 | 2025-09-27 `19988f790cec1bb8` | Bearing Segments: Industry, Railway, Automotive, Retail, Trading | Complete | Products segments section |
| P06 | 2026-03-23 `19d1a9b02f4b57c9` | Product catalog categories beyond bearings | Complete | 17 `eg_product_categories` records and category UI |
| P07 | 2026-03-23 `19d1c23ebe56dffe` | FSQ Plummer Blocks and Special Housings | Complete | 2 active FSQ products with supplied images |
| P08 | 2026-03-25 `19d2608977a2b3bd` | DGWL Slewing Bearings | Complete | 1 active DGWL product with image |
| P09 | 2026-03-25 `19d260c010bf382b` | Lubcon product presence | Complete | 3 active Lubcon product rows |
| P10 | 2026-03-28 `19d35e3ef8a8c972` | Partner/manufacturer brand list | Complete | All requested brand records are present; brands without supplied product sets remain legitimate logo/partner entries |
| P11 | 2026-03-28 `19d360abf2d7e9f1` | Partners page and hover imagery | Complete | Requested partners present; SAMICK, MORSE, DODGE and LINK-BELT showcase rows corrected and activated |

## Product sets and supplied photos

| Brand/request | Email evidence | Expected semantic products | Verified active rows | Status |
|---|---|---:|---:|---|
| NTN | 2025-11-10 `19a6b8c97f2be317` | 18 supplied types | 25 (18 types + 7 finder examples) | Complete |
| SNR | 2025-11-11 `19a70cca24c0b84d` | 16 | 18 | Complete |
| BCA and BOWER | 2025-11-12 `19a7602afcd0e726` | Cancel both | 0 / 0 | Superseded |
| KSM | 2025-11-12; 2025-12-13 | Supplied multi-email set | 40 | Complete |
| DKF | 2025-12-16 `19b250c5ea7376a6` | 12 | 18 | Complete |
| KINEX | 2025-12-16 and 2025-12-17 | 16 | 20 | Complete |
| STC-STEYR | 2025-12-19 and 2026-01-06 | 21 | 32 | Complete |
| JIB | 2026-01-06 `19b957a208753ecf` | 9 | 21 | Complete |
| NSK | 2026-01-07 `19b962dfebdfecc3` | 27 | 26 distinct product rows | Complete |
| TIMKEN | 2026-01-07 `19b9ad56d42edc71` | 19 | 15 semantic rows after duplicate-page cleanup | Complete |
| IKO | 2026-01-08 `19b9b3b8c90b843e` | 18 | 17 distinct product rows | Complete |
| KASHIMA | 2026-01-09 `19ba0e5c2522f7ae` | 13 | 13 | Complete |
| JMC | 2026-03-13 `19ce86c2fe33da96` | 6 product families | 6 | Complete |
| EASE | 2026-03-13 `19ce8c88e944a0d7` | 8 | 8 | Complete |
| OZAK | 2026-03-13 `19ce8ff142b6dab5` | Supplied set | 27 | Complete |
| NMS/NJL | 2026-03-13 `19ce92584dbc6834` | 10 | 10 | Complete |
| KMR | 2026-08-14 `1a0017b213e8e6f0` | 15 | 15 | Complete |
| KBC | 2026-08-16 `1a00b6a88a8c975a` | 10 | 10 | Complete |
| SLF | 2026-08-16 `1a00b6f704315629` | 7 | 7 | Complete |
| KOYO | 2026-08-16 `1a00c55e2034a74d` | 21 | 21 | Complete with limitation - existing generic category images retained; Sameh did not subsequently request replacement |
| STIEBER | 2026-08-16 `1a00c59aa46b400d` | 35 | 35 | Complete |
| NADELLA | 2026-08-16 `1a00c5a53eb314ee` | 7 | 7 | Complete |
| SKF | 2026-08-16 `1a00c6677641c6da` | 30 distinct products | 30 | Complete with limitation - CARB attachment was an unsupported AVIF, so the supplied closest spherical-roller image is used |
| FAG | 2026-08-16 `1a00c693383aa437` | 29 | 29 | Complete |
| INA | 2026-08-16 `1a00c693383aa437` | 29 | 29 | Complete |
| HIWIN | 2026-08-16 `1a00c7708334622b` | 10 | 10 | Complete |

The audit found 120 active rows that were attachment/gallery pages imported as products under the wrong brands. They were made inactive rather than deleted. This preserves the source material while showing only the clean semantic product sets above.

## Catalogs and certificates

| ID | Email evidence | Atomic requirement | Status | Implementation/evidence |
|---|---|---|---|---|
| C01 | 2026-03-14 through 2026-03-17 | Brand catalogs attached for NTN, SNR, KSM, Quaval, DKF, STC, KINEX, JIB, NSK, TIMKEN, IKO, EASE, KASHIMA and NMS/NJL | Complete | 77 `eg_catalogs` rows after reconciliation, each associated with its brand |
| C02 | 2026-03-15 `19cf1fcea883e6bd` | Replace the earlier JIB catalog choice | Complete | Later JIB choice retained; obsolete choice excluded |
| C03 | 2026-03-17 `19cfc7b7dd0f6862` | Add exact 2025 JIB English PDF | Complete | `documents/catalogs/jib/2025-jib-catalog-eng.pdf`, linked to JIB |
| C04 | 2026-03-19 `19d074884c61f91e` | Cancel all March 19 JMC catalog emails | Superseded | March 19 sets excluded from the live catalog |
| C05 | 2026-03-20 `19d0b8760c1e0077` through `19d0c595fb148d6a` | Use replacement JMC catalog pages | Complete | Exact 88 pages assembled into a 94-page organized PDF and linked as `JMC Product Catalog` |
| C06 | 2026-03-20 `19d0c6c3e9b7f907` | DKF certificate | Complete | Corrected from catalog table into certificates |
| C07 | 2026-03-20 `19d0c6dfa009ea90`, `19d0c7b158678e41` | STC-STEYR certificates | Complete | Corrected from catalog table into certificates |
| C08 | 2026-03-21 `19d1065aa48d8f20` | Cancel first Quaval certificate design | Superseded | Cancelled row removed |
| C09 | 2026-03-22 `19d15d4d7cfbe1ef` | Use corrected Quaval certificate | Complete | Later corrected certificate retained |
| C10 | 2026-03-22 `19d16160c1ecd357` | NMS certificate | Complete | Certificate linked to NMS/NJL |
| C11 | 2026-03-22 `19d16ed60f076fd7` | KSM certificate | Complete | Certificate linked to KSM |
| C12 | 2026-03-23 `19d1bc335ba4729a` | OZAK certificate | Complete | Certificate linked to OZAK |
| C13 | 2026-03-29 `19d3a0031f1ec600`, `19d3a05fde0624e1` | KSM and Quaval trademark pages/certificates | Complete | Trademarks page and records present |

## Industries, media, and supporting pages

| ID | Email evidence | Atomic requirement | Status | Implementation/evidence |
|---|---|---|---|---|
| S01 | 2026-03-23 `19d1af12106ba4b5`, `19d1b7b055137b89`, `19d1c104ecd9248d`; 2026-03-25 `19d26111ea8b21a9` | All named industries and images | Complete with limitation | 31 industries, all with image URLs. The exact Paper/Cardboard WEBP could not be fetched, so the approved relevant pulp-and-paper image is reused. |
| S02 | 19 Media Page emails, 2026-03-23 through 2026-03-28 | Publish supplied media gallery | Complete with limitation | 137 distinct live media records. 5 AVIF attachments were not byte-retrievable through Gmail; all other distinct supplied assets are present. |
| S03 | 2026-03-29 `19d3b2bc555b142e` | Services page and supplied service list | Complete | Bilingual Services page |
| S04 | 2026-03-29 `19d3b2f0daf55273` | Blog page | Pending client input | Page exists as Coming Soon; no articles/content were supplied |
| S05 | 2026-03-29 `19d3b2fc669814d3` | News/Articles page | Pending client input | Page exists as Coming Soon; no articles/content were supplied |
| S06 | 2026-03-29 `19d3b3658b4d4fb9` | Investment Opportunity page and copy | Complete | Bilingual page present |
| S07 | 2026-03-29 `19d3b48111eafa29` | B2B page and copy | Complete | Bilingual page present |
| S08 | 2026-03-29 `19d39bdf437ce6e7` | Required fields must block incomplete forms | Complete | Contact/careers forms validate required fields |
| S09 | 2026-03-29 `19d39bdf437ce6e7` | Cookie feature after explanation | Pending client input | Sameh explicitly said the cookie/download behavior would be explained later; no final rule was supplied |
| S10 | 2026-03-30 `19d404461dd0037f` | No public email address; use forms, phones and locations | Complete | No company email is displayed; phone/address/map/form UI present |
| S11 | 2026-03-30 `19d404461dd0037f` | Three locations on contact map | Pending client input | Sameh supplied only two location/address records; both are shown |
| S12 | Contact/careers form requirement | Send submitted forms to a real destination | Needs follow-up | UI validation/success state exists, but no mail/API destination was supplied or configured |

## Verification snapshot

- Live Supabase project: `rvhmhbtacshzcicwrdjn`.
- Current records: 42 brands, 764 total product rows (including preserved inactive imports), 506 active products, 17 product categories, 77 catalogs, 18 certificates, 31 industries, 137 media items.
- No active product has a missing `image_url`. All 105 products across the seven August brands returned HTTP 200; all 137 media URLs also returned HTTP 200 when checked with rate-limited retries.
- JMC catalog public object returns HTTP 200 and is 12,085,926 bytes.
- Storage upload/update tasks are idempotent and do not contain a committed service-role/secret key.

## Remaining decisions for Sameh

1. Supply the third Egyptian location if three map pins are still required.
2. Provide the desired email/API destination for contact and careers submissions.
3. Supply actual blog/news articles when those sections should go live.
4. Clarify the final cookie/download-gating behavior he said he would explain later.
5. If exact replacement is important, resend the five inaccessible AVIF files as PNG/JPEG (including SKF CARB) and the Paper/Cardboard image as PNG/JPEG.
