import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { CASE_STUDY_CATEGORIES } from '../src/constants/caseStudies.js';

const outputDir = path.resolve('./public/case-studies');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateCategoryPDFs() {
  for (const cat of CASE_STUDY_CATEGORIES) {
    const filename = `${cat.id}-framework.pdf`;
    const filePath = path.join(outputDir, filename);

    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(24).font('Helvetica-Bold').text(`${cat.label} Framework`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).font('Helvetica').text(`This is the core framework used for solving ${cat.label} case studies.`, { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(16).font('Helvetica-Bold').text('Overview:');
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(cat.description);

    doc.moveDown(3);
    doc.fontSize(10).fillColor('gray').text('Generated for Arsalaan Mohammed Portfolio', { align: 'center' });

    doc.end();

    await new Promise((resolve) => writeStream.on('finish', resolve));
    console.log(`Generated ${filename}`);
  }
}

generateCategoryPDFs().catch(console.error);
