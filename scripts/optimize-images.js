const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const imageDir = path.resolve(__dirname, '../src/images');
const reportFile = path.resolve(__dirname, '../image-optimization-report.json');

const sourceFormats = ['.jpg', '.jpeg', '.png', '.svg'];
const sizes = [400, 800, 1200];
const outputFormats = [
  { ext: '.webp', options: { quality: 80 } },
  { ext: '.avif', options: { quality: 60 } },
  { ext: '.jpg', options: { quality: 90 } },
];

async function getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const images = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...(await getFiles(fullPath)));
    } else if (sourceFormats.includes(path.extname(entry.name).toLowerCase())) {
      images.push(fullPath);
    }
  }
  return images;
}

async function fileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

function formatPercent(oldSize, newSize) {
  return oldSize > 0 ? ((oldSize - newSize) / oldSize * 100).toFixed(1) : '0.0';
}

function isGeneratedFile(filePath) {
  return /-(400|800|1200)\.(jpg|jpeg|png|webp|avif)$/.test(filePath);
}

async function optimizeJpgOrPng(filePath, size) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const results = [];

  for (const format of outputFormats) {
    const outputPath = path.join(dir, `${baseName}-${size}${format.ext}`);
    const pipeline = sharp(filePath).resize({ width: size, withoutEnlargement: true });
    await pipeline.toFormat(format.ext.replace('.', ''), format.options).toFile(outputPath);
    const optimizedSize = await fileSize(outputPath);
    results.push({
      file: outputPath,
      format: format.ext.substring(1),
      size: optimizedSize,
      width: size,
    });
  }

  return results;
}

async function optimizeSvg(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const results = [];

  for (const size of sizes) {
    for (const format of outputFormats.filter((item) => item.ext !== '.jpg')) {
      const outputPath = path.join(dir, `${baseName}-${size}${format.ext}`);
      await sharp(filePath)
        .resize({ width: size })
        .toFormat(format.ext.replace('.', ''), format.options)
        .toFile(outputPath);

      const optimizedSize = await fileSize(outputPath);
      results.push({
        file: outputPath,
        format: format.ext.substring(1),
        size: optimizedSize,
        width: size,
      });
    }
  }

  return results;
}

async function optimizeFile(filePath) {
  if (isGeneratedFile(filePath)) {
    return null;
  }

  const ext = path.extname(filePath).toLowerCase();
  const originalSize = await fileSize(filePath);
  const outputs = [];

  if (ext === '.svg') {
    const results = await optimizeSvg(filePath);
    outputs.push(...results);
  } else {
    for (const size of sizes) {
      const results = await optimizeJpgOrPng(filePath, size);
      outputs.push(...results);
    }
  }

  return {
    original: { file: filePath, format: ext.substring(1), size: originalSize },
    optimized: outputs,
  };
}

async function run() {
  const sourceFiles = await getFiles(imageDir);
  const report = [];

  for (const filePath of sourceFiles) {
    const result = await optimizeFile(filePath);
    if (result) {
      report.push(result);
    }
  }

  await fs.writeFile(reportFile, JSON.stringify(report, null, 2), 'utf8');
  console.log('Optimització completa. Informe guardat a:', reportFile);
  console.log('Resum:');
  report.forEach((item) => {
    console.log(`- ${path.basename(item.original.file)} (${item.original.format}, ${item.original.size} bytes)`);
    item.optimized.forEach((opt) => {
      console.log(`  • ${path.basename(opt.file)}: ${opt.size} bytes (${opt.width}px, ${opt.format})`);
    });
  });
}

run().catch((error) => {
  console.error('Error en optimitzar imatges:', error);
  process.exit(1);
});
