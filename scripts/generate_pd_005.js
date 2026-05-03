import fs from 'fs';
import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);const outputPath = path.join(__dirname, '../public/case-studies/pd-005.pdf');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream(outputPath));

// Title
doc.font('Helvetica-Bold').fontSize(22).fillColor('#7c3aed').text('AI Health Coach for Chronic Illness', { align: 'center' });
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(12).fillColor('#6b7280').text('Design an AI-powered personal health coach for someone with chronic illness.', { align: 'center' });
doc.moveDown(2);

// Goal & Objective
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Why are we solving? - Goal & Objective');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(12).text('Goal: ', { continued: true }).font('Helvetica').text('Empower patients with chronic illnesses to regain control over their daily lives by reducing the cognitive, emotional, and physical burden of managing their condition.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Objective: ', { continued: true }).font('Helvetica').text('Build a privacy-first, AI-driven mobile application that shifts disease management from reactive symptom tracking to proactive flare-up prevention, ultimately improving the patient\'s day-to-day quality of life.');
doc.moveDown(1.5);

// Timeline
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('By When?');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(12).text('Phase 1 (MVP - 6 Months): ', { continued: true }).font('Helvetica').text('Launch core ambient voice journaling, local device processing (for privacy), and basic wearable integration (Apple Health/Google Fit) for passive data collection.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Phase 2 (V1 - 12 Months): ', { continued: true }).font('Helvetica').text('Roll out the predictive AI model for flare-up forecasting and environmental API integrations (weather, air quality).');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Phase 3 (Future - 18-24 Months): ', { continued: true }).font('Helvetica').text('Develop generative clinical summary reports for doctors and pursue necessary regulatory compliance (e.g., FDA software-as-a-medical-device guidelines) for deeper health recommendations.');
doc.moveDown(1.5);

// Personas
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('For whom? (3 Personas)');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(12).text('1. The Overwhelmed Newbie (The "Spiraling" Persona): ', { continued: true }).font('Helvetica').text('Just diagnosed. They are terrified, googling everything, and trying to track 50 variables at once. They need direction.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('2. The Fatigue-Hit Veteran (The "Burnout" Persona): ', { continued: true }).font('Helvetica').text('Has had the condition for 10 years. They’ve stopped tracking because it’s depressing. They need invisibility.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('3. The High-Performer (The "Optimizer" Persona): ', { continued: true }).font('Helvetica').text('Wants to work a 60-hour week despite their condition. They want to know exactly how close they are to the "red line." They need data.');
doc.moveDown(1.5);

// Problems
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Problems');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(12).text('High Interaction Friction (The "Cost of Tracking"): ', { continued: true }).font('Helvetica').text('Current solutions require active input at the exact moments when the user has the lowest physical or mental energy. This creates a paradox: the product is hardest to use when the user needs it most.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Disconnected Data Silos (The "Synthesis Gap"): ', { continued: true }).font('Helvetica').text('Vital signals biometric, environmental, and behavioral are captured in isolation. There is no unified layer to correlate these disparate data points, leaving the user to manually connect the dots.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Lack of Predictive Visibility (The "Reactive Trap"): ', { continued: true }).font('Helvetica').text('Most tools are digital rearview mirrors—they tell you what happened, not what will happen. This leaves users in a permanent state of "reactive management."');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Emotional & Cognitive Tax (The "Reminder Burden"): ', { continued: true }).font('Helvetica').text('Constant notifications serve as a persistent psychological reminder of the disease, leading to medical burnout.');
doc.moveDown(1.5);

// Prioritization
doc.addPage();
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Prioritization: What comes first?');
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(12).text('I’m prioritizing The Synthesis Gap and Interaction Friction. Why? Because predictive visibility is impossible without clean, multi-layered data. If we don’t make it easy to get data in (Friction) and merge it (Silos), the AI’s advice will be "garbage in, garbage out."');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('The Trade-off: ', { continued: true }).font('Helvetica').text('I’m de-prioritizing social features or "gamification." People with chronic illness don\'t want a "streak"; they want their life back.');
doc.moveDown(1.5);

// Solution
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('The Solution: The "Ambient Health Orchestrator"');
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(12).text('The solution is a cross-platform AI agent that lives on the user’s phone and is wearable, acting as a Translation Layer between their body and their environment.');
doc.moveDown(1);
doc.font('Helvetica-Bold').text('1. The Passive Data Aggregator (Solving Silos)');
doc.font('Helvetica').text('The AI doesn\'t ask the user for data. It pulls via API from:\n• Biometrics: Continuous HRV, SpO2, and Sleep Stages (via Wearable).\n• Environment: Local barometric pressure, pollen counts, and temperature (via Weather API).\n• Behavior: Step counts, calendar intensity, and location (to track "rest time" vs. "active time").');
doc.moveDown(1);
doc.font('Helvetica-Bold').text('2. The Natural Language Interface (Solving Friction)');
doc.font('Helvetica').text('Instead of a UI with 20 buttons, the app is a single "Listen" button.\nScenario: If the user feels a flare-up, they just tap and say, "My knees are a 7 today." The AI\'s Job: It tags that "7" and instantly looks back at the last 48 hours of passive data to find the correlation. It’s an asynchronous journal.');
doc.moveDown(1);
doc.font('Helvetica-Bold').text('3. Proactive "Pre-Hab" Insights (The Proactive Shift)');
doc.font('Helvetica').text('The system uses Predictive Modeling to identify "Pre-flare" signatures.\nThe Output: A push notification that is actionable and low-stress.\n"Hi [Name], we\'ve noticed your resting heart rate is up and the weather is shifting. Based on your history, today is a high-risk day. We’ve drafted a \'Low Energy\' version of your to-do list—would you like to swap?"');
doc.moveDown(1.5);

// Metrics
doc.font('Helvetica-Bold').fontSize(16).fillColor('#111827').text('Metrics to Track Performance');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(12).text('1. The Predictability Score (Accuracy):');
doc.font('Helvetica').text('• Definition: What percentage of user-reported flare-ups were predicted by the AI 12+ hours in advance?\n• Goal: Higher accuracy builds the "Trust" required for a health coach.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('2. The Management-to-Life Ratio (Efficiency):');
doc.font('Helvetica').text('• Definition: Total time the user spends interacting with the app vs. hours of "active life" recorded.\n• Goal: We want this ratio to decrease. A successful product in this space should be invisible.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('3. The Agency Delta (Qualitative):');
doc.font('Helvetica').text('• Definition: A monthly "Control" survey. "Do you feel you are managing your illness, or is it managing you?"\n• Goal: We want to see a statistically significant shift toward the user feeling they have the upper hand.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('4. Privacy Trust Score:');
doc.font('Helvetica').text('• Definition: Percentage of users who keep "Full Synthesis" (data sharing) toggled on after 90 days.\n• Goal: If they turn it off, our privacy-first design fails to make them feel safe.');

doc.end();
console.log('Generated pd-005.pdf successfully.');
