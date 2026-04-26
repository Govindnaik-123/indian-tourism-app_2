const fs = require('fs');

const configPath = 'next.config.ts';
let configContent = fs.readFileSync(configPath, 'utf8');

const domains = [
  'www.felixferiatravel.com', 'cdn.prod.website-files.com', 'static.toiimg.com', 'blog.redbus.in', 'rest.techbehemoths.com', 'www.iasgyan.in', 'media.assettype.com', 'img.veenaworld.com', 'tripoventure.com', 'media.savetherhino.org', 'chalbanjare.com', 'i.pinimg.com', 'stylesatlife.com', 'tourism.bihar.gov.in', 'assets-news.housing.com', 'cdn.britannica.com', 'incredibleasia.org', 'travel.4kerala.in', 'wallpapers.com', 'tse1.mm.bing.net', 'media-cdn.tripadvisor.com', 'cdn.shopify.com', 'puretravel.com', 'tohrabazarbusiness.com', 's7ap1.scene7.com', 'magarticles.magzter.com', 'www.holidify.com', 'www.japjitravel.com', 'uttarakhandtravelagency.com', 'www.grasshopperyatra.com', 'images.news18.com', 'shikaraboatalleppey.com', 'media.cnn.com', 'img1.picmix.com', 'c.ndtvimg.com', 'www.namasteindiatrip.org', 'media.tripinvites.com', 'im.hunt.in', 'mir-s3-cdn-cf.behance.net', 'cdn.dribbble.com', 'kerala.me', 'media.newindianexpress.com', 'media.timeout.com', 'indiaholidaymall.com', 'images.slurrp.com', 'www.kanhanationalparkonline.in', 'spn-sta.spinny.com', 'www.delhitourism.com', 'res.cloudinary.com', 'imphalreviews.in', 'wanderon-images.gumlet.io', 'ak0.picdn.net', 'theultimateindia.com', 'editorial01.shutterstock.com', 'www.exploreouting.com', 'static2.tripoto.com', 'www.solitarytraveller.com', 'th.bing.com', 'imvoyager.com', 'purimarkets.com', 'hindufestivaldates.com', 'shreejagannathapuri.com', 'aniportalimages.s3.amazonaws.com', 'images.alphacoders.com', 'cdn1.goibibo.com', 'st1.latestly.com', 'www.oyorooms.com', 'www.shutterstock.com', 'cdn.cdnparenting.com', 'www.tallengestore.com', 'dynamic-media-cdn.tripadvisor.com', 'www.esikkimtourism.in', 'www.bhutanrentalandtravel.com', 's01.sgp1.digitaloceanspaces.com', 'webneel.com', 'd26dp53kz39178.cloudfront.net', 'warangaltourism.in', 'manahyderabadguru.com', '3.bp.blogspot.com', 'thumbs.dreamstime.com', 'img1.exportersindia.com', 'i.timesnowhindi.com', 'asi.nic.in', 'resize.indiatvnews.com', 'uttarakhand.in', 'campgangavatika.com', 'travelfoodatlas.com', 'www.trawell.in', 'imgstaticcontent.lbb.in', 'hindutone.com', 'lp-cms-production.imgix.net'
];

// Check which domains are already in config
const domainRegex = /hostname:\s*["']([^"']+)["']/g;
const allowedDomains = new Set();
let match;
while ((match = domainRegex.exec(configContent)) !== null) {
  allowedDomains.add(match[1]);
}

const missingDomains = domains.filter(d => !allowedDomains.has(d));

if (missingDomains.length > 0) {
  const newEntries = missingDomains.map(d => `      { protocol: "https", hostname: "${d}" },`).join('\n');
  
  // Find where to insert (after upload.wikimedia.org)
  const insertIndex = configContent.indexOf('      { protocol: "https", hostname: "upload.wikimedia.org" },');
  if (insertIndex !== -1) {
    const endOfLine = configContent.indexOf('\n', insertIndex) + 1;
    configContent = configContent.slice(0, endOfLine) + newEntries + '\n' + configContent.slice(endOfLine);
    fs.writeFileSync(configPath, configContent);
    console.log(`Added ${missingDomains.length} missing domains to next.config.ts`);
  } else {
    console.error("Could not find insertion point");
  }
} else {
  console.log("No missing domains to add.");
}
