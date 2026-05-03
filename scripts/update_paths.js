import fs from 'fs';

let content = fs.readFileSync('src/constants/caseStudies.js', 'utf8');
content = content.replace(/id: "([^"]+)",([\s\S]*?)file: null,/g, (match, id, middle) => {
    return `id: "${id}",${middle}file: "/case-studies/${id}.pdf",`;
});

fs.writeFileSync('src/constants/caseStudies.js', content);
