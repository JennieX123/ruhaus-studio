const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '../client/public');
const OUT = path.join(__dirname, '../client/public/learno-deck.pdf');

const C = {
  bg:      '#FBF8F4',
  text:    '#3D2B1F',
  muted:   '#8A7060',
  light:   '#B8A898',
  accent:  '#8BC34A',
  accentD: '#6A9E32',
  white:   '#FFFFFF',
  rule:    '#E8E0D5',
};

const W = 792; // letter landscape
const H = 612;
const M = 56;  // margin

const doc = new PDFDocument({ size: [W, H], margin: 0, autoFirstPage: false });
doc.pipe(fs.createWriteStream(OUT));

/* ── helpers ── */
function bg(color = C.bg) {
  doc.rect(0, 0, W, H).fill(color);
}

function rule(y, color = C.rule) {
  doc.moveTo(M, y).lineTo(W - M, y).stroke(color);
}

function tag(label, x, y) {
  const pad = 10, h = 20;
  const w = doc.widthOfString(label, { size: 8 }) + pad * 2;
  doc.roundedRect(x, y, w, h, 10).stroke(C.rule);
  doc.fontSize(8).fillColor(C.light).font('Helvetica').text(label.toUpperCase(), x + pad, y + 6, { lineBreak: false });
  return x + w + 8;
}

function sectionLabel(text) {
  doc.fontSize(8).fillColor(C.light).font('Helvetica')
    .text(text.toUpperCase(), M, M + 4, { letterSpacing: 2 });
  rule(M + 20);
}

function pageNum(n, total) {
  doc.fontSize(8).fillColor(C.light).font('Helvetica')
    .text(`${n} / ${total}`, W - M - 40, H - M + 8, { lineBreak: false });
}

function accentBar(x = 0, w = 4, color = C.accent) {
  doc.rect(x, 0, w, H).fill(color);
}

function imageFullBleed(file, opacity = 1) {
  const p = path.join(PUBLIC, file);
  if (fs.existsSync(p)) {
    doc.save();
    if (opacity < 1) doc.opacity(opacity);
    doc.image(p, 0, 0, { width: W, height: H, cover: [W, H], align: 'center', valign: 'center' });
    doc.restore();
  }
}

function imageFit(file, x, y, w, h) {
  const p = path.join(PUBLIC, file);
  if (fs.existsSync(p)) doc.image(p, x, y, { fit: [w, h], align: 'center', valign: 'center' });
}

const TOTAL = 14;

/* ═══════════════════════════════════════════════
   01 — COVER
══════════════════════════════════════════════════ */
doc.addPage();
imageFullBleed('learno-hero.jpg');
// dark overlay
doc.rect(0, 0, W, H).fill('rgba(30,20,10,0.52)');

// big title
doc.fontSize(72).font('Helvetica-Bold').fillColor(C.white)
  .text('LEARNO', M, H / 2 - 80, { lineBreak: false });

doc.fontSize(16).font('Helvetica').fillColor('rgba(255,255,255,0.75)')
  .text('A next-generation K–12 learning ecosystem', M, H / 2 + 12, { lineBreak: false });
doc.fontSize(13).font('Helvetica').fillColor('rgba(255,255,255,0.5)')
  .text('with AI-guided gamified journeys and emotional companions', M, H / 2 + 34, { lineBreak: false });

// tags bottom
let tx = M;
const tags = ['EdTech', 'AI Learning', 'K-12', 'Gamification'];
const ty = H - M - 28;
tags.forEach(t => {
  const tw = doc.widthOfString(t.toUpperCase(), { size: 8 }) + 20;
  doc.roundedRect(tx, ty, tw, 20, 10).fillOpacity(0.25).fill(C.white);
  doc.fillOpacity(1).fontSize(8).font('Helvetica').fillColor(C.white)
    .text(t.toUpperCase(), tx + 10, ty + 6, { lineBreak: false });
  tx += tw + 8;
});

// accent bottom bar
doc.rect(0, H - 4, W, 4).fill(C.accent);
pageNum(1, TOTAL);

/* ═══════════════════════════════════════════════
   02 — PROBLEM STATEMENT
══════════════════════════════════════════════════ */
doc.addPage();
bg();
accentBar(0, 4);

const cY = M + 28;

sectionLabel('Problem Space');

doc.fontSize(26).font('Helvetica-Bold').fillColor(C.text)
  .text('Uncovering Hidden Pressure\nin K1–K12 Education', M + 16, cY + 32, { width: 320, lineGap: 4 });

// Stats
const stats = [
  { num: '55M', desc: 'K1–K12 students in the US face sustained academic pressure throughout their learning journey.' },
  { num: '60%', desc: 'Experience daily academic stress — a pervasive but often invisible challenge in classrooms.' },
  { num: '40%', desc: 'Report persistent sadness or disengagement; emotional resilience remains under-supported.' },
];
const sX = M + 16 + 330 + 24;
const sW = (W - sX - M) / 3;
stats.forEach((s, i) => {
  const sx = sX + i * (sW + 12);
  doc.fontSize(40).font('Helvetica-Bold').fillColor(C.accent).text(s.num, sx, cY + 28, { width: sW });
  doc.fontSize(9.5).font('Helvetica').fillColor(C.muted).text(s.desc, sx, cY + 82, { width: sW - 4, lineGap: 3 });
});

// Rule above stats
doc.moveTo(sX - 12, cY + 20).lineTo(sX - 12, H - M - 24).stroke(C.rule);

pageNum(2, TOTAL);

/* ═══════════════════════════════════════════════
   03 — SOLUTION QUOTE
══════════════════════════════════════════════════ */
doc.addPage();
bg();
accentBar(W - 4, 4);

// center quote layout
const qY = H / 2 - 90;
doc.fontSize(10).font('Helvetica').fillColor(C.light)
  .text('PRESSURE ALWAYS HAPPENS', 0, qY, { align: 'center', letterSpacing: 3 });

doc.moveTo(W / 2 - 24, qY + 24).lineTo(W / 2 + 24, qY + 24).stroke(C.rule);

doc.fontSize(22).font('Helvetica-Bold').fillColor(C.text)
  .text('Now there is a way to give students a', 0, qY + 44, { align: 'center', width: W });
doc.fontSize(22).font('Helvetica-Bold').fillColor(C.accent)
  .text('mindful, confidence-building', 0, qY + 74, { align: 'center', width: W });
doc.fontSize(22).font('Helvetica-Bold').fillColor(C.text)
  .text('learning journey from K1 to K12.', 0, qY + 104, { align: 'center', width: W });

pageNum(3, TOTAL);

/* ═══════════════════════════════════════════════
   FEATURE PAGES helper
══════════════════════════════════════════════════ */
function featurePage(section, title, description, imgFile, pageN, imgRight = true) {
  doc.addPage();
  bg();

  const imgW = 360, imgH = 280;
  const textW = W - imgW - M * 2 - 40;

  if (imgRight) {
    // text left, image right
    sectionLabel(section);
    const ty2 = M + 36;
    doc.fontSize(22).font('Helvetica-Bold').fillColor(C.text)
      .text(title, M, ty2, { width: textW, lineGap: 4 });
    const titleH = doc.heightOfString(title, { width: textW, fontSize: 22 });
    doc.fontSize(10.5).font('Helvetica').fillColor(C.muted)
      .text(description, M, ty2 + titleH + 16, { width: textW, lineGap: 4 });
    // image right
    const ix = W - imgW - M + 8;
    const iy = (H - imgH) / 2;
    doc.roundedRect(ix - 4, iy - 4, imgW + 8, imgH + 8, 8).fill('#EDE8E2');
    imageFit(imgFile, ix, iy, imgW, imgH);
  } else {
    // image left, text right
    const ix = M - 8;
    const iy = (H - imgH) / 2;
    doc.roundedRect(ix - 4, iy - 4, imgW + 8, imgH + 8, 8).fill('#EDE8E2');
    imageFit(imgFile, ix, iy, imgW, imgH);

    const tx2 = M + imgW + 32;
    const tw2 = W - tx2 - M;
    doc.fontSize(8).fillColor(C.light).font('Helvetica')
      .text(section.toUpperCase(), tx2, M + 4, { letterSpacing: 2 });
    rule(M + 20);
    doc.fontSize(22).font('Helvetica-Bold').fillColor(C.text)
      .text(title, tx2, M + 36, { width: tw2, lineGap: 4 });
    const th2 = doc.heightOfString(title, { width: tw2, fontSize: 22 });
    doc.fontSize(10.5).font('Helvetica').fillColor(C.muted)
      .text(description, tx2, M + 36 + th2 + 16, { width: tw2, lineGap: 4 });
  }

  pageNum(pageN, TOTAL);
}

/* ═══════════════════════════════════════════════
   04 — LEARNO UNIVERSE INTRO
══════════════════════════════════════════════════ */
doc.addPage();
bg();
accentBar(0, 4);
doc.fontSize(9).font('Helvetica').fillColor(C.light).text('LEARNO UNIVERSE', M + 16, H / 2 - 60, { letterSpacing: 3 });
doc.moveTo(M + 16, H / 2 - 44).lineTo(M + 200, H / 2 - 44).stroke(C.rule);
doc.fontSize(36).font('Helvetica-Bold').fillColor(C.text).text('The Learning\nEcosystem', M + 16, H / 2 - 36, { lineGap: 6 });
doc.fontSize(12).font('Helvetica').fillColor(C.muted)
  .text('Each subject is a distinct realm. Progress at your own pace.', M + 16, H / 2 + 50, { width: 340 });
pageNum(4, TOTAL);

/* ═══════════════════════════════════════════════
   05 — Individualized Learning Progress
══════════════════════════════════════════════════ */
featurePage(
  'Learno Universe',
  'Individualized Learning Progress',
  'Learno represents each subject as a distinct realm, progressing at its own pace based on individual learning patterns. This approach emphasizes personalized growth rather than uniform advancement.',
  'learno-hero.jpg',
  5, true
);

/* ═══════════════════════════════════════════════
   06 — World Overview & Learning Snapshot
══════════════════════════════════════════════════ */
featurePage(
  'Learno Universe',
  'World Overview & Learning Snapshot',
  'A world-level overview provides a consolidated snapshot of learning activity, progress distribution, and relative standing — encouraging reflection and long-term engagement without overemphasizing competition.',
  'learno-vr.jpg',
  6, false
);

/* ═══════════════════════════════════════════════
   07 — Subject-Based Realm Organization
══════════════════════════════════════════════════ */
featurePage(
  'Learno Universe',
  'Subject-Based Realm Organization',
  'Learno organizes learning into subject-based realms, each encompassing its related disciplines and content areas. This maintains clarity across subjects while supporting seamless navigation within the ecosystem.',
  'learno-hero.jpg',
  7, true
);

/* ═══════════════════════════════════════════════
   08 — Feature 1 INTRO: Personalized Avatars
══════════════════════════════════════════════════ */
doc.addPage();
bg(C.text);
accentBar(W - 4, 4, C.accent);
doc.fontSize(9).font('Helvetica').fillColor(C.accent).text('FEATURE 01', M, H / 2 - 60, { letterSpacing: 3 });
doc.moveTo(M, H / 2 - 44).lineTo(M + 200, H / 2 - 44).stroke('rgba(255,255,255,0.2)');
doc.fontSize(36).font('Helvetica-Bold').fillColor(C.white).text('Personalized Avatars\n& Learning Communities', M, H / 2 - 36, { lineGap: 6 });
doc.fontSize(12).font('Helvetica').fillColor('rgba(255,255,255,0.55)')
  .text('Emotional connection, individuality, and shared belonging.', M, H / 2 + 60, { width: 420 });
pageNum(8, TOTAL);

/* ═══════════════════════════════════════════════
   09 — Expressive Character System
══════════════════════════════════════════════════ */
featurePage(
  'Feature 01 · Personalized Avatars',
  'Expressive Character System',
  'Learno introduces an expressive character system with varied appearances, outfits, and scales. These visual variations help learners form emotional connections while reinforcing individuality and engagement.',
  'learno-characters.png',
  9, false
);

/* ═══════════════════════════════════════════════
   10 — Personalized Avatar Customization
══════════════════════════════════════════════════ */
featurePage(
  'Feature 01 · Personalized Avatars',
  'Personalized Avatar Customization',
  'Learno allows learners to customize their own characters through personalization settings. By enabling choice in appearance and expression, the system fosters a sense of ownership and identity from the start.',
  'learno-characters.png',
  10, true
);

/* ═══════════════════════════════════════════════
   11 — Learning Community in a Shared 3D World
══════════════════════════════════════════════════ */
featurePage(
  'Feature 01 · Learning Communities',
  'Learning Community in a Shared 3D World',
  'Learno extends learning into a shared 3D world where individual learners coexist within a broader community — reinforcing belonging and shared progress while maintaining each learner\'s personalized journey.',
  'learno-vr.jpg',
  11, false
);

/* ═══════════════════════════════════════════════
   12 — Feature 2: Emotionally Aligned
══════════════════════════════════════════════════ */
doc.addPage();
bg();
accentBar(0, 4, C.accentD);
doc.fontSize(9).font('Helvetica').fillColor(C.light).text('FEATURE 02', M + 16, H / 2 - 60, { letterSpacing: 3 });
doc.moveTo(M + 16, H / 2 - 44).lineTo(M + 200, H / 2 - 44).stroke(C.rule);
doc.fontSize(36).font('Helvetica-Bold').fillColor(C.text).text('Emotionally &\nPersonality-Aligned AI', M + 16, H / 2 - 36, { lineGap: 6 });
doc.fontSize(12).font('Helvetica').fillColor(C.muted)
  .text('Tutors that adapt to students\' emotional states and learning rhythms.', M + 16, H / 2 + 54, { width: 380 });
pageNum(12, TOTAL);

/* ═══════════════════════════════════════════════
   13 — AI Tutors That Adapt to You
══════════════════════════════════════════════════ */
featurePage(
  'Feature 02 · AI Companions',
  'AI Tutors That Adapt to You',
  'Learno offers emotionally and personality-aligned AI tutors, each designed with distinct interaction styles, tones, and behavioral archetypes. These tutors adapt to students\' learning rhythms and emotional states, providing guidance that is supportive, relatable, and human-centered.',
  'learno-hero.jpg',
  13, true
);

/* ═══════════════════════════════════════════════
   14 — Feature 3 + Closing
══════════════════════════════════════════════════ */
doc.addPage();
imageFullBleed('learno-vr.jpg');
doc.rect(0, 0, W, H).fill('rgba(30,20,10,0.6)');

doc.fontSize(9).font('Helvetica').fillColor(C.accent).text('FEATURE 03 · AI ADAPTIVE LEARNING JOURNEY', M, M + 4, { letterSpacing: 2 });
doc.moveTo(M, M + 22).lineTo(W - M, M + 22).stroke('rgba(255,255,255,0.2)');

doc.fontSize(30).font('Helvetica-Bold').fillColor(C.white)
  .text('AI-Tailored Holistic Study Journey', M, H / 2 - 80, { width: W - M * 2, lineGap: 4 });
doc.fontSize(12).font('Helvetica').fillColor('rgba(255,255,255,0.7)')
  .text(
    'Learno organizes learning content into an AI-tailored, holistic study journey that clearly structures subjects, lessons, and progression. This approach helps learners understand their path toward mastery while reducing cognitive overload and supporting sustained engagement.',
    M, H / 2 - 24, { width: W - M * 2 - 40, lineGap: 4 }
  );

// Bottom closing
doc.fontSize(10).font('Helvetica').fillColor('rgba(255,255,255,0.4)')
  .text('The gamified knowledge realms ecosystem designed for K1–K12', 0, H - M - 28, { align: 'center', width: W });

doc.rect(0, H - 4, W, 4).fill(C.accent);
pageNum(14, TOTAL);

/* ── finalize ── */
doc.end();
doc.on('finish', () => console.log('✅  learno-deck.pdf written to', OUT));
