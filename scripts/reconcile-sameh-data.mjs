import { readFile } from 'node:fs/promises';

const projectUrl = 'https://rvhmhbtacshzcicwrdjn.supabase.co';
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  (await readFile('/tmp/multigates-supabase-secret', 'utf8')).trim();

if (!serviceKey.startsWith('sb_secret_') && !serviceKey.startsWith('eyJ')) {
  throw new Error('A Supabase service-role or secret key is required.');
}

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  'Content-Type': 'application/json',
};

async function readAll(table) {
  const rows = [];
  for (let start = 0; ; start += 1000) {
    const response = await fetch(`${projectUrl}/rest/v1/${table}?select=*`, {
      headers: { ...headers, Range: `${start}-${start + 999}`, 'Range-Unit': 'items' },
    });
    if (!response.ok) throw new Error(`${table}: ${response.status} ${await response.text()}`);
    const page = await response.json();
    rows.push(...page);
    if (page.length < 1000) return rows;
  }
}

async function insert(table, rows, onConflict) {
  if (!rows.length) return [];
  const suffix = onConflict ? `?on_conflict=${encodeURIComponent(onConflict)}` : '';
  const response = await fetch(`${projectUrl}/rest/v1/${table}${suffix}`, {
    method: 'POST',
    headers: {
      ...headers,
      Prefer: `${onConflict ? 'resolution=merge-duplicates,' : ''}return=representation`,
    },
    body: JSON.stringify(rows),
  });
  if (!response.ok) throw new Error(`${table} insert: ${response.status} ${await response.text()}`);
  return response.json();
}

async function patchRows(table, filter, values) {
  const response = await fetch(`${projectUrl}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify(values),
  });
  if (!response.ok) throw new Error(`${table} patch: ${response.status} ${await response.text()}`);
  return response.json();
}

async function deleteRows(table, filter) {
  const response = await fetch(`${projectUrl}/rest/v1/${table}?${filter}`, {
    method: 'DELETE',
    headers: { ...headers, Prefer: 'return=representation' },
  });
  if (!response.ok) throw new Error(`${table} delete: ${response.status} ${await response.text()}`);
  return response.json();
}

const normalize = (value = '') =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const slugify = (value) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 110);

const [brands, originalProducts, originalCatalogs, originalCertificates, originalMedia] =
  await Promise.all([
    readAll('eg_brands'),
    readAll('eg_products'),
    readAll('eg_catalogs'),
    readAll('eg_certificates'),
    readAll('eg_media'),
  ]);

const brandBySlug = Object.fromEntries(brands.map((brand) => [brand.slug, brand]));
const brandSlugById = Object.fromEntries(brands.map((brand) => [brand.id, brand.slug]));
const imageCandidates = originalProducts.filter((product) => product.image_url);

function productImage(...names) {
  for (const name of names) {
    const wanted = normalize(name);
    const match = imageCandidates.find((product) => {
      const file = decodeURIComponent(product.image_url.split('/').pop() || '');
      return normalize(product.name) === wanted || normalize(file) === wanted;
    });
    if (match) return match.image_url;
  }
  return null;
}

const aliases = {
  'Single Row Deep Groove Ball Bearings': ['Single-Row Deep Groove Ball Bearings', 'Deep Groove Ball Bearings'],
  'Miniature Ball Bearings': ['Miniature Ball Bearings', 'Miniature ball bearings'],
  'Spherical Roller Bearings': ['Spherical Roller Bearings', 'Spherical roller bearings'],
  'Single Row Tapered Roller Bearings': ['Single-Row Tapered Roller Bearings', 'Single Row Tapered Roller Bearings'],
  'Double Row Tapered Roller Bearings': ['Double-Row Tapered Roller Bearings', 'Double-row tapered roller bearing'],
  'Single Row Cylindrical Roller Bearings': ['Single-Row Cylindrical Roller Bearings'],
  'Double Row Cylindrical Roller Bearings': ['Double-Row Cylindrical Roller Bearings'],
  'Four Row Cylindrical Roller Bearings': ['Four-Row Cylindrical Roller Bearings'],
  'Single Row Angular Contact Ball Bearings': ['Single-Row Angular Contact Ball Bearings', 'Single Row Angular Contact Ball Bearings'],
  'Double Row Angular Contact Ball Bearings': ['Double-Row Angular Contact Ball Bearings', 'Double row angular contact ball bearings'],
  'Self-Aligning Ball Bearings': ['Self-Aligning Ball Bearings', 'Self-aligning ball bearings'],
  'Spherical Plain Bearings': ['Spherical plain bearings', 'Spherical Plain Bearings'],
  'Thrust Ball Bearings': ['Thrust Ball Bearings', 'Thrust ball bearings'],
  'Thrust Roller Bearings': ['Thrust Roller Bearings', 'Thrust cylindrical roller bearings'],
  'Adapter Sleeves': ['Adapter Sleeves', 'Adapter sleeves'],
  'Insert Bearings': ['Insert Bearings and Housed Units', 'Bearing inserts'],
  'Pillow Block Housings': ['Pillow Blocks (2)', 'Pillow Block Housing', 'Plummer Blocks'],
  'Spindle Bearings': ['Spindle Bearings'],
  'Crossed Roller Bearings': ['Crossed roller bearings', 'Crossed Bearings'],
  'Linear Ball Bearings': ['Linear Ball Bearings', 'Linear Bearings'],
  'Needle Roller Bearings': ['Needle Roller Bearings', 'Needle roller bearings'],
  'Linear Guide': ['Linear Guide', 'Linear Guides'],
  'Track Roller': ['Track Roller', 'Roller Followers'],
  'High-Precision Bearings': ['Super Precision Angular Contact Ball Bearings', 'Angular-contact bearings high precision'],
  'Super-Precision Bearings': ['Super Precision Angular Contact Ball Bearings', 'Angular-contact bearings high precision'],
  'Spherical Roller Thrust Bearings': ['Spherical Roller Thrust Bearings', 'Spherical roller thrust bearings'],
  'Plummer Blocks': ['Plummer Blocks', 'Plummer blocks'],
  'Rod Ends': ['Rod Ends', 'Rod ends'],
  'Thin Bearings': ['Miniature & Thin Bearings', 'Thin Bearings'],
  'Slewing Bearings': ['Slewing rings', 'Seutsche Brogwalzlager'],
  'Four-Point Ball Bearings': ['Four-Point Contact Bearings', 'Four-point contact ball bearings'],
  // Gmail exposes this AVIF attachment as application/octet-stream and cannot
  // return its bytes. Keep the product live with the closest supplied SKF
  // spherical-roller image until the original AVIF can be exported manually.
  'CARB Toroidal Roller Bearings': ['CARB Toroidal Roller Bearings', 'Spherical Roller Bearings'],
  'Angular Contact Ball Bearings': ['Angular contact ball bearings1', 'Angular Contact Ball Bearings'],
  'Super Precision Bearings': ['Super Precision Angular Contact Ball Bearings'],
  'Four-Point Contact Ball Bearings': ['Four-point contact ball bearings'],
  'Full-Complement Cylindrical Roller Bearings': ['Full-complement cylindrical roller bearings'],
  'Thrust Cylindrical Roller Bearings': ['Thrust cylindrical roller bearings'],
  'Thrust Tapered Roller Bearings': ['Thrust tapered roller bearings'],
  'Ball Bearing Units': ['Ball bearing units'],
  'Accessories': ['Accessories1', 'Accessories2'],
  'Ball Screws': ['Ball screws'],
  'Water Pump Bearings': ['Water pump bearings'],
  'Cam Followers & Roller Followers': ['Cam-followers & roller followers'],
  'One Way Clutch Bearings': ['One way clutch bearings'],
  'One Way Needle Bearings': ['one way needle bearing'],
  'Tapered Roller Bearings': ['Metric tapered roller bearings', 'Tapered Roller Bearings'],
  'Double-Tapered Roller Bearings': ['Double tapered roller bearings'],
  'AP Bearings': ['AP bearings'],
  'Thrust Bearings': ['Thrust bearings1'],
  'Spherical Roller Bearings Solid Block Housed Units': ['Spherical roller bearings solid block housed units'],
  'SAF-Split Block Housed Units': ['SAF-split block housed units'],
  'Type E Mounted Tapered Roller Bearings': ['Type E mounted tapered roller bearings'],
  'UC Series Ball Bearing Housed Units': ['UC series ball bearings housed units'],
  'Deep Groove Ball Bearings': ['Deep groove ball bearings', 'Deep Groove Ball Bearings'],
  'Cylindrical Roller Bearings': ['Cylindrical roller bearings'],
  'SNT Plummer Block': ['SNT plummer block'],
  'Split Cylindrical Roller Bearing Housed Units': ['Split Cylindrical Roller Bearing Housed Units'],
  'Miniature & Thin Bearings': ['Miniature & Thin Bearings'],
  'Shell Type Needle Roller Bearings': ['Shell Type Needle Roller Bearings'],
  'Inner Rings': ['Inner Rings'],
  'Needle Roller Cages': ['Needle Roller Cages'],
  'Machined Type Needle Roller Bearings': ['Machine Type Needle Roller Bearings'],
  'Roller Bearings': ['Roller Bearings'],
  'Roller Bearings for Sheaves': ['Roller Bearings for Sheaves'],
  'Thrust Needle Roller Bearings': ['Thrust Needle Roller Bearings'],
  'Needle Roller Bearings with Thrust Ball Bearings': ['Needle Roller Bearings with Thrust Ball Bearings'],
  'Needle Roller Bearings with Angular Contact Thrust Bearings': ['Needle Roller Bearings with Angular Contact Thrust Bearings'],
  'Cam Followers': ['Cam Followers'],
  'Cylindrical Roller Followers': ['Cylindrical Roller Follower'],
  'Roller Followers': ['Roller Followers'],
  'Spherical Bushings': ['Spherical Bushings'],
  'Linear Bushings': ['Linear Bushings'],
  'Linear Guides': ['Linear Guides'],
};

function imageForProduct(name) {
  return productImage(name, ...(aliases[name] || []));
}

const fagInaProducts = [
  'Single Row Deep Groove Ball Bearings',
  'Miniature Ball Bearings',
  'Spherical Roller Bearings',
  'Single Row Tapered Roller Bearings',
  'Double Row Tapered Roller Bearings',
  'Single Row Cylindrical Roller Bearings',
  'Double Row Cylindrical Roller Bearings',
  'Single Row Angular Contact Ball Bearings',
  'Double Row Angular Contact Ball Bearings',
  'Self-Aligning Ball Bearings',
  'Spherical Plain Bearings',
  'Thrust Ball Bearings',
  'Thrust Roller Bearings',
  'Adapter Sleeves',
  'Insert Bearings',
  'Pillow Block Housings',
  'Spindle Bearings',
  'Crossed Roller Bearings',
  'Linear Ball Bearings',
  'Needle Roller Bearings',
  'Linear Guide',
  'Track Roller',
  'High-Precision Bearings',
  'Spherical Roller Thrust Bearings',
  'Plummer Blocks',
  'Rod Ends',
  'Thin Bearings',
  'Slewing Bearings',
  'Four-Point Ball Bearings',
];

const skfProducts = [
  ...fagInaProducts.filter((name) => !['Spindle Bearings', 'High-Precision Bearings'].includes(name)),
  'CARB Toroidal Roller Bearings',
  'Four Row Cylindrical Roller Bearings',
  'Super-Precision Bearings',
];

const productSets = {
  ntn: [
    'Deep Groove Ball Bearings',
    'Miniature Ball Bearings',
    'Spherical Roller Bearings',
    'Tapered Roller Bearings',
    'Single-Row Cylindrical Roller Bearings',
    'Single-Row Angular Contact Ball Bearings',
    'Sealed and Shielded Double Row Angular Contact Ball Bearings',
    'Bearing Units & Pillow Blocks',
    'Needle Roller Bearings',
    'Self-Aligning Ball Bearings',
    'Thrust Ball Bearings',
    'Thrust Spherical Roller Bearings',
    'Duplex Angular Contact Ball Bearings',
    'SL Type Cylindrical Roller Bearings',
    'Double-Row Cylindrical Roller Bearings',
    'Double-Row Tapered Roller Bearings',
    'Spherical Roller Bearings with High-strength Cage',
    'Four-Row Cylindrical Roller Bearings',
  ],
  ease: [
    'Standard Linear',
    'Adjustable Linear',
    'Open Linear',
    'Round Flanged Linear',
    'Square Flanged Linear',
    'Long Linear',
    'Long Round Flanged Linear',
    'Long Square Flanged Linear',
  ],
  kashima: [
    'Deep Groove Ball Bearings',
    'Thrust Ball Bearings',
    'Angular Contact Ball Bearings',
    'Self-Aligning Ball Bearings',
    'Miniature Ball Bearings',
    'Custom-Made Ball Bearings',
    'Bearing Units',
    'Phenol',
    'PTFE',
    'UHMW',
    'PEEK',
    'PPS',
    'CARBON',
  ],
  fag: fagInaProducts,
  ina: fagInaProducts,
  skf: skfProducts,
  dgwl: ['Slewing Bearings'],
  nsk: [
    'Single-row deep groove ball bearings',
    'Miniature ball bearings',
    'Angular Contact Ball Bearings',
    'Super Precision Bearings',
    'Four-Point Contact Ball Bearings',
    'Self-aligning ball bearings',
    'Cylindrical Roller Bearings',
    'Double-Row Cylindrical Roller Bearings',
    'Full-Complement Cylindrical Roller Bearings',
    'Single-Row Tapered Roller Bearings',
    'Double-Row Tapered Roller Bearings',
    'Spherical Roller Bearings',
    'Thrust Ball Bearings',
    'Thrust Cylindrical Roller Bearings',
    'Thrust Tapered Roller Bearings',
    'Thrust Spherical Roller Bearings',
    'Needle Roller Bearings',
    'Ball Bearing Units',
    'Plummer Blocks',
    'Accessories',
    'Ball Screws',
    'Linear Guides',
    'Water Pump Bearings',
    'Cam Followers & Roller Followers',
    'One Way Clutch Bearings',
    'One Way Needle Bearings',
  ],
  timken: [
    'Tapered Roller Bearings',
    'Double-Tapered Roller Bearings',
    'AP Bearings',
    'Spherical Roller Bearings',
    'Thrust Bearings',
    'Spherical Roller Bearings Solid Block Housed Units',
    'SAF-Split Block Housed Units',
    'Type E Mounted Tapered Roller Bearings',
    'UC Series Ball Bearing Housed Units',
    'Deep Groove Ball Bearings',
    'Cylindrical Roller Bearings',
    'Angular Contact Ball Bearings',
    'SNT Plummer Block',
    'Split Cylindrical Roller Bearing Housed Units',
    'Miniature & Thin Bearings',
  ],
  iko: [
    'Shell Type Needle Roller Bearings',
    'Inner Rings',
    'Needle Roller Cages',
    'Machined Type Needle Roller Bearings',
    'Roller Bearings',
    'Roller Bearings for Sheaves',
    'Thrust Needle Roller Bearings',
    'Thrust Roller Bearings',
    'Needle Roller Bearings with Thrust Ball Bearings',
    'Needle Roller Bearings with Angular Contact Thrust Bearings',
    'Cam Followers',
    'Cylindrical Roller Followers',
    'Roller Followers',
    'Spherical Bushings',
    'Rod Ends',
    'Linear Bushings',
    'Linear Guides',
  ],
};

const productUpserts = [];
for (const [brandSlug, names] of Object.entries(productSets)) {
  const brand = brandBySlug[brandSlug];
  if (!brand) throw new Error(`Missing brand ${brandSlug}`);
  names.forEach((name, index) => {
    productUpserts.push({
      brand_id: brand.id,
      slug: `${brandSlug}-${slugify(name)}`,
      name,
      image_url: imageForProduct(name),
      sort_order: index + 1,
      is_active: true,
      updated_at: new Date().toISOString(),
    });
  });
}

const unresolvedProducts = productUpserts.filter((product) => !product.image_url);
if (unresolvedProducts.length) {
  throw new Error(`Missing image mapping: ${unresolvedProducts.map((p) => p.slug).join(', ')}`);
}

async function insertOrUpdateProducts(rows) {
  const liveProducts = await readAll('eg_products');
  const inserts = [];
  for (const row of rows) {
    const existing = liveProducts.find((product) => product.slug === row.slug);
    if (existing) await patchRows('eg_products', `id=eq.${existing.id}`, row);
    else inserts.push(row);
  }
  await insert('eg_products', inserts);
}

const pollutionPredicates = {
  ntn: () => true,
  ksm: (p) => p.created_at.startsWith('2026-04-12'),
  quaval: (p) => p.created_at.startsWith('2026-04-12'),
  dkf: (p) => p.created_at.startsWith('2026-04-12'),
  kinex: (p) => p.created_at.startsWith('2026-04-12'),
  nsk: () => true,
  iko: () => true,
  jmc: (p) => !['JMC Rod End', 'JMC Spherical Plain', 'Ball Joint', 'Stud Type Track Roller', 'Yoke Type Track Roller', 'LM Stroke'].includes(p.name),
  ozak: (p) => p.created_at < '2026-04-12T14:34:24',
  fsq: (p) => !['Plummer Blocks', 'Special Housings'].includes(p.name),
  skf: () => true,
  kashima: () => true,
  dgwl: () => true,
  timken: () => true,
};

const polluted = originalProducts.filter((product) => {
  if (!product.is_active || product.part_number) return false;
  const slug = brandSlugById[product.brand_id];
  return pollutionPredicates[slug]?.(product) || false;
});

for (const row of polluted) {
  await patchRows('eg_products', `id=eq.${row.id}`, {
    is_active: false,
    updated_at: new Date().toISOString(),
  });
}

await insertOrUpdateProducts(productUpserts);

// Move SDB files from JIB to EASE; the attachment-only email immediately followed
// the EASE catalog batch and preceded the later, explicit JIB catalog email.
for (const catalog of originalCatalogs.filter(
  (row) => brandSlugById[row.brand_id] === 'jib' && ['SDB', 'SDB-AJ', 'SDB-OP'].includes(row.title),
)) {
  await patchRows('eg_catalogs', `id=eq.${catalog.id}`, { brand_id: brandBySlug.ease.id });
}

// Correct files that were imported into catalogs even though Sameh identified them as certificates.
for (const [title, brandSlug, certificateTitle] of [
  ['Conf_dkf_Quaval_egypt', 'dkf', 'DKF Distribution Certificate'],
  ['Englisch_ZER_0016570_239910', 'stc-steyr', 'STC-STEYR Certificate'],
]) {
  const catalog = originalCatalogs.find(
    (row) => row.title === title && brandSlugById[row.brand_id] === brandSlug,
  );
  if (catalog) {
    const existing = originalCertificates.find(
      (row) => row.file_url === catalog.file_url && row.brand_id === brandBySlug[brandSlug].id,
    );
    if (!existing) {
      await insert('eg_certificates', [
        {
          brand_id: brandBySlug[brandSlug].id,
          title: certificateTitle,
          file_url: catalog.file_url,
          is_downloadable: false,
        },
      ]);
    }
    await deleteRows('eg_catalogs', `id=eq.${catalog.id}`);
  }
}

// The first Quaval certificate was cancelled; the suffixed second upload is the later correction.
const quavalCertificates = originalCertificates.filter(
  (row) => brandSlugById[row.brand_id] === 'quaval' && row.title.startsWith('Quaval Certificate'),
);
const correctedQuaval = quavalCertificates.find((row) => row.file_url.includes('_ba3e7d'));
const cancelledQuaval = quavalCertificates.find((row) => row.file_url.endsWith('/Quaval Certificate.pdf'));
if (correctedQuaval) {
  await patchRows('eg_certificates', `id=eq.${correctedQuaval.id}`, { title: 'Quaval Certificate' });
}
if (cancelledQuaval) await deleteRows('eg_certificates', `id=eq.${cancelledQuaval.id}`);

// Build the gallery from the exact attachment list in the Media Page emails.
const emailExports = [
  ...(JSON.parse(await readFile('audit/sameh-emails-older.json', 'utf8')).emails || []),
  ...(JSON.parse(await readFile('audit/sameh-emails.json', 'utf8')).emails || []),
];
const mediaEmails = emailExports.filter((email) => email.body.trimStart().startsWith('Media Page'));
const existingMediaUrls = new Set(originalMedia.map((row) => row.image_url));
const mediaRows = [];
let mediaOrder = originalMedia.length;

for (const email of mediaEmails) {
  for (const attachment of email.attachments.filter((item) => item.filename !== 'image001.png')) {
    const exact = productImage(attachment.filename);
    const extension = (attachment.filename.split('.').pop() || 'jpg').toLowerCase();
    const storedUrl = `${projectUrl}/storage/v1/object/public/product-images/media/${slugify(
      attachment.filename.replace(/\.[^.]+$/, ''),
    )}.${extension}`;
    let imageUrl = exact;
    if (!imageUrl) {
      const head = await fetch(storedUrl, { method: 'HEAD' });
      if (head.ok) imageUrl = storedUrl;
    }
    if (!imageUrl || existingMediaUrls.has(imageUrl)) continue;
    existingMediaUrls.add(imageUrl);
    mediaRows.push({
      image_url: imageUrl,
      title: attachment.filename.replace(/\.[^.]+$/, ''),
      category: 'products',
      media_type: 'image',
      sort_order: ++mediaOrder,
    });
  }
}

await insert('eg_media', mediaRows);

const finalProducts = await readAll('eg_products');
const finalMedia = await readAll('eg_media');
const finalCatalogs = await readAll('eg_catalogs');
const finalCertificates = await readAll('eg_certificates');

console.log(
  JSON.stringify(
    {
      deactivated_polluted_products: polluted.length,
      upserted_required_products: productUpserts.length,
      active_product_counts: Object.fromEntries(
        Object.keys(productSets).map((slug) => [
          slug,
          finalProducts.filter(
            (product) => product.brand_id === brandBySlug[slug].id && product.is_active,
          ).length,
        ]),
      ),
      inserted_media: mediaRows.length,
      total_media: finalMedia.length,
      catalog_count: finalCatalogs.length,
      certificate_count: finalCertificates.length,
    },
    null,
    2,
  ),
);
