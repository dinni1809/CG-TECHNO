import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, '..', 'apps', 'web', 'public', 'images', 'services');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = {
  'it-infrastructure.jpg': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
  'software-licensing.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  'security-systems.jpg': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1000&auto=format&fit=crop',
  'biometric-attendance.jpg': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop',
  'access-automation.jpg': 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1000&auto=format&fit=crop',
  'boom-barriers.jpg': 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=1000&auto=format&fit=crop',
  'networking-solutions.jpg': 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000&auto=format&fit=crop',
  'electronics-integration.jpg': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop',
  'amc-support.jpg': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop'
};

function download(filename, url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(targetDir, filename));
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: status code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename} successfully.`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(path.join(targetDir, filename), () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Starting visual quality image downloads...');
  for (const [filename, url] of Object.entries(images)) {
    try {
      await download(filename, url);
    } catch (err) {
      console.error(err.message);
    }
  }
  console.log('All visual quality image downloads completed.');
}

main();
