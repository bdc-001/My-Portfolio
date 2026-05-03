import fs from 'fs';
import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '../public/case-studies/ge-001.pdf');

const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream(outputPath));

// Title
doc.font('Helvetica-Bold').fontSize(22).fillColor('#10b981').text('Instagram Daily Active Users in India', { align: 'center' });
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(12).fillColor('#6b7280').text('How many people in India use Instagram daily?', { align: 'center' });
doc.moveDown(2);

// Step 1
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Step 1: Population Funnel');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(10).text('Layer', 50, doc.y, { continued: true, width: 200 }).text('Logic', 200, doc.y, { continued: true, width: 200 }).text('Number', 400, doc.y);
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10);
doc.text('India Population', 50, doc.y, { continued: true, width: 150 }).text('Known', 200, doc.y, { continued: true, width: 200 }).text('~1.45B', 400, doc.y);
doc.text('Internet Users', 50, doc.y, { continued: true, width: 150 }).text('~55% penetration', 200, doc.y, { continued: true, width: 200 }).text('~800M', 400, doc.y);
doc.text('Smartphone Users', 50, doc.y, { continued: true, width: 150 }).text('~85% of internet users', 200, doc.y, { continued: true, width: 200 }).text('~680M', 400, doc.y);
doc.text('Social Media Users', 50, doc.y, { continued: true, width: 150 }).text('~75% of smartphone users', 200, doc.y, { continued: true, width: 200 }).text('~510M', 400, doc.y);
doc.text('Instagram Accessible Users', 50, doc.y, { continued: true, width: 150 }).text('Skews urban, 18-35 (~50% of SM)', 200, doc.y, { continued: true, width: 200 }).text('~255M', 400, doc.y);
doc.moveDown(1.5);

// Step 2
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Step 2: DAU/MAU Ratio', 50, doc.y);
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(12).text('Instagram globally runs ~60–65% DAU/MAU. India is a high-engagement, mobile-first market — people doom-scroll Reels hard. So I\'ll use 65%.');
doc.moveDown(0.5);
doc.text('Instagram India MAU ≈ ~230–250M (reasonable estimate for a market this size)');
doc.text('DAU = 250M × 65% ≈ 160M');
doc.moveDown(1.5);

// Step 3
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Step 3: Sanity Checks');
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(12).text('• WhatsApp India DAU ~500M → Instagram at ~30% of that makes sense (more niche, skews younger/urban)');
doc.text('• YouTube India DAU ~250M → Instagram slightly below, reasonable since YouTube is more mass-market');
doc.text('• Meta has disclosed India as their #1 or #2 market by users globally — 160M DAU tracks');
doc.moveDown(1.5);

// Final Answer
doc.font('Helvetica-Bold').fontSize(16).fillColor('#10b981').text('Final Answer');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(14).fillColor('#111827').text('~150–160 Million Daily Active Users');

doc.end();
console.log('Generated ge-001.pdf successfully.');
