import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { CASE_STUDIES } from '../src/constants/caseStudies.js';

const outputDir = path.resolve('./public/case-studies');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generatePDFs() {
  for (const study of CASE_STUDIES) {
    const filename = `${study.id}.pdf`;
    const filePath = path.join(outputDir, filename);

    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text(study.title, { align: 'center' });
    doc.moveDown();

    // Question
    doc.fontSize(16).font('Helvetica-Bold').text('Question:', { underline: true });
    doc.fontSize(14).font('Helvetica').text(study.question);
    doc.moveDown();

    // Category & Tags
    doc.fontSize(12).font('Helvetica-Bold').text('Category: ', { continued: true }).font('Helvetica').text(study.category);
    doc.font('Helvetica-Bold').text('Difficulty: ', { continued: true }).font('Helvetica').text(study.difficulty);
    doc.font('Helvetica-Bold').text('Tags: ', { continued: true }).font('Helvetica').text(study.tags.join(', '));
    doc.moveDown();

    // Approach
    if (study.approach && study.approach.length > 0) {
      doc.fontSize(16).font('Helvetica-Bold').text('Framework / Approach:', { underline: true });
      doc.moveDown(0.5);
      study.approach.forEach((step, index) => {
        doc.fontSize(12).font('Helvetica').text(`${index + 1}. ${step}`);
      });
      doc.moveDown();
    }

    // Snapshot / Answer
    doc.fontSize(16).font('Helvetica-Bold').text('Snapshot / Solution:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(study.snapshot, { align: 'justify' });

    // Footer
    doc.moveDown(3);
    doc.fontSize(10).fillColor('gray').text('Generated for Arsalaan Mohammed Portfolio', { align: 'center' });

    doc.end();

    await new Promise((resolve) => writeStream.on('finish', resolve));
    console.log(`Generated ${filename}`);
  }
}

generatePDFs().catch(console.error);
