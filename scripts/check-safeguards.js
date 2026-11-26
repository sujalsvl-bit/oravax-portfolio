import fs from 'fs';
import path from 'path';

function getFiles(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === 'dist' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else if (exts.includes(path.extname(fullPath))) {
      results.push(fullPath);
    }
  }
  return results;
}

const exts = ['.ts', '.tsx', '.html', '.css'];
const srcFiles = getFiles('./src', exts);
const filesToCheck = ['./index.html', './README.md', ...srcFiles];

let errors = [];

for (const file of filesToCheck) {
  const content = fs.readFileSync(file, 'utf-8');

  // Check for em dash (—)
  if (content.includes('\u2014')) {
    errors.push(`Em dash (—) found in ${file}`);
  }

  // Check for "free audit"
  if (/free\s+audit/i.test(content)) {
    errors.push(`"free audit" found in ${file}`);
  }

  // Check for invented domains
  if (/https?:\/\/(www\.)?oravax\.(com|io|ai|net|org)/i.test(content)) {
    errors.push(`Invented domain found in ${file}`);
  }

  // Check for forbidden promise words outside disclaimers
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/guarantee/i.test(line) && !/no\s+guaranteed\s+(sales|results)/i.test(line)) {
      errors.push(`Possible guarantee promise on line ${idx + 1} of ${file}: ${line.trim()}`);
    }
  });
}

// Verify reviews.ts, gallery.ts, and contact.ts
import { reviews } from '../src/data/reviews.ts';
import { galleryItems } from '../src/data/gallery.ts';
import { contactConfig } from '../src/data/contact.ts';

if (!Array.isArray(reviews)) {
  errors.push(`reviews is not an array`);
} else {
  reviews.forEach((r, idx) => {
    if (!r.permissionConfirmed) {
      errors.push(`Review ${r.id || idx} has permissionConfirmed: false`);
    }
    if (r.sourceLabel !== 'delivered via oravax' && r.sourceLabel !== 'prior agency work' && r.sourceLabel !== 'example') {
      errors.push(`Review ${r.id || idx} does not have valid sourceLabel: ${r.sourceLabel}`);
    }
    if (/[*—–!]|--/.test(r.quote)) {
      errors.push(`Review ${r.id || idx} contains forbidden punctuation: ${r.quote}`);
    }
  });
}

if (!Array.isArray(galleryItems) || galleryItems.length !== 0) {
  errors.push(`gallery.ts is not an empty array. Length: ${galleryItems.length}`);
}

if (contactConfig.email !== 'oravaxbusiness@gmail.com') {
  errors.push(`contactConfig.email is expected to be 'oravaxbusiness@gmail.com', got: ${contactConfig.email}`);
}

if (contactConfig.whatsapp !== 'https://wa.me/917202080634') {
  errors.push(`contactConfig.whatsapp is expected to be 'https://wa.me/917202080634', got: ${contactConfig.whatsapp}`);
}

if (contactConfig.phone !== '+917202080634') {
  errors.push(`contactConfig.phone is expected to be '+917202080634', got: ${contactConfig.phone}`);
}

if (contactConfig.bookingUrl !== null) {
  errors.push(`contactConfig.bookingUrl must be null, got: ${contactConfig.bookingUrl}`);
}

if (errors.length > 0) {
  console.error('Safeguard check failed:');
  errors.forEach((e) => console.error('-', e));
  process.exit(1);
} else {
  console.log(`All safeguard checks passed cleanly across ${filesToCheck.length} files. ${reviews.length} reviews verified.`);
}
