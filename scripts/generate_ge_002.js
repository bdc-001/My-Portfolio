import fs from 'fs';
import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '../public/case-studies/ge-002.pdf');

const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream(outputPath));

// Title
doc.font('Helvetica-Bold').fontSize(22).fillColor('#10b981').text('Daily Swiggy/Zomato Orders in India', { align: 'center' });
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(12).fillColor('#6b7280').text('Estimate the daily number of Swiggy or Zomato orders in India.', { align: 'center' });
doc.moveDown(2);

// Step 1
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Step 1: Addressable User Funnel');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(10);
doc.text('Layer', 50, doc.y, { continued: true, width: 200 }).text('Logic', 200, doc.y, { continued: true, width: 200 }).text('Number', 400, doc.y);
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10);
doc.text('India Population', 50, doc.y, { continued: true, width: 150 }).text('Known', 200, doc.y, { continued: true, width: 200 }).text('~1.45B', 400, doc.y);
doc.text('Urban Population', 50, doc.y, { continued: true, width: 150 }).text('~35% live in cities', 200, doc.y, { continued: true, width: 200 }).text('~500M', 400, doc.y);
doc.text('Smartphone + Internet (Urban)', 50, doc.y, { continued: true, width: 150 }).text('~80% of urban', 200, doc.y, { continued: true, width: 200 }).text('~400M', 400, doc.y);
doc.text('Food Delivery App Installed', 50, doc.y, { continued: true, width: 150 }).text('~40% of those', 200, doc.y, { continued: true, width: 200 }).text('~160M', 400, doc.y);
doc.text('Monthly Active Orderers', 50, doc.y, { continued: true, width: 150 }).text('~50% actually order', 200, doc.y, { continued: true, width: 200 }).text('~80M', 400, doc.y);
doc.moveDown(1.5);

// Step 2
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Step 2: Order Frequency Segmentation', 50, doc.y);
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(10);
doc.text('Segment', 50, doc.y, { continued: true, width: 150 }).text('% of MAU / Users', 200, doc.y, { continued: true, width: 150 }).text('Orders/Mo', 350, doc.y, { continued: true, width: 100 }).text('Total/Mo', 450, doc.y);
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10);
doc.text('Power Users (bachelors, urban pros)', 50, doc.y, { continued: true, width: 150 }).text('15% | 12M', 200, doc.y, { continued: true, width: 150 }).text('12', 350, doc.y, { continued: true, width: 100 }).text('144M', 450, doc.y);
doc.text('Regular Users (2–3x/week)', 50, doc.y, { continued: true, width: 150 }).text('25% | 20M', 200, doc.y, { continued: true, width: 150 }).text('10', 350, doc.y, { continued: true, width: 100 }).text('200M', 450, doc.y);
doc.text('Occasional Users (weekends)', 50, doc.y, { continued: true, width: 150 }).text('60% | 48M', 200, doc.y, { continued: true, width: 150 }).text('3', 350, doc.y, { continued: true, width: 100 }).text('144M', 450, doc.y);
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Total Monthly Orders ≈ ~488M | Daily Orders = 488M ÷ 30 ≈ ~16M/day');
doc.moveDown(1.5);

// Step 3
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Step 3: Adjust for Quick Commerce Food Players', 50, doc.y);
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10).text('My funnel above only captures Swiggy/Zomato-type behaviour — planned meal ordering. It misses impulse 10-min orders which have a different user psychology and incrementally add to the market.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Zepto Café + Bistro + Swish = ~4–5M/day incremental');
doc.text('Adjusted Total Market: ~20–22M orders/day');
doc.moveDown(1.5);

// Step 4
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Step 4: Market Share Split');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(10);
doc.text('Player', 50, doc.y, { continued: true, width: 150 }).text('Market Share', 200, doc.y, { continued: true, width: 150 }).text('Daily Orders', 350, doc.y);
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10);
doc.text('Zomato', 50, doc.y, { continued: true, width: 150 }).text('~38%', 200, doc.y, { continued: true, width: 150 }).text('~8–9M', 350, doc.y);
doc.text('Swiggy', 50, doc.y, { continued: true, width: 150 }).text('~30%', 200, doc.y, { continued: true, width: 150 }).text('~6–7M', 350, doc.y);
doc.text('Zepto Café', 50, doc.y, { continued: true, width: 150 }).text('~10%', 200, doc.y, { continued: true, width: 150 }).text('~2M', 350, doc.y);
doc.text('Bistro (Zomato)', 50, doc.y, { continued: true, width: 150 }).text('~7%', 200, doc.y, { continued: true, width: 150 }).text('~1.5M', 350, doc.y);
doc.text('Swish', 50, doc.y, { continued: true, width: 150 }).text('~5%', 200, doc.y, { continued: true, width: 150 }).text('~1M', 350, doc.y);
doc.text('Others', 50, doc.y, { continued: true, width: 150 }).text('~10%', 200, doc.y, { continued: true, width: 150 }).text('~2M', 350, doc.y);
doc.moveDown(1.5);

// Final Answer
doc.font('Helvetica-Bold').fontSize(16).fillColor('#10b981').text('Final Answer');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(12).fillColor('#111827').text('Total market: ~20–22M orders/day');
doc.font('Helvetica').text('Zomato: ~8–9M | Swiggy: ~6–7M | Quick commerce food: ~4–5M | Rest: ~2M');

doc.end();
console.log('Generated ge-002.pdf successfully.');
