
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(process.cwd(), 'src/lib/ai/site-knowledge.json');
const SRC_DIR = path.join(process.cwd(), 'src/app');

// Files to ignore
const IGNORE_DIRS = ['api', 'fonts', 'favicon.ico', 'globals.css'];
const IGNORE_FILES = ['layout.tsx', 'loading.tsx', 'error.tsx', 'not-found.tsx', 'page.module.css'];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            if (!IGNORE_FILES.includes(file) && (file.endsWith('.tsx') || file.endsWith('.md') || file.endsWith('.mdx'))) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

function cleanContent(content) {
    // Basic stripping of imports and exports
    let cleaned = content
        .replace(/import .* from .*/g, '')
        .replace(/export .* {/g, '')
        .replace(/export default function .*/g, '')
        .replace(/'use client';/g, '')
        .replace(/console\.log\(.*\);/g, '');

    // Remove import statements that might span multiple lines (basic)
    cleaned = cleaned.replace(/import\s*{[^}]*}\s*from\s*['"].*['"];?/gs, '');

    // Simplify whitespace
    return cleaned.replace(/\s+/g, ' ').trim();
}

async function main() {
    console.log('Indexing site content...');

    const files = getAllFiles(SRC_DIR);
    console.log(`Found ${files.length} files to index.`);

    const knowledge = {
        pages: [],
        timestamp: new Date().toISOString()
    };

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const relativePath = path.relative(process.cwd(), file);

        // Skip small files or likely mostly code files without much text
        if (content.length < 100) continue;

        const cleaned = cleanContent(content);

        knowledge.pages.push({
            path: relativePath,
            content: cleaned
        });
        console.log(`Indexed: ${relativePath}`);
    }

    // Also index the manually created content files if they exist
    // Public docs
    const publicDir = path.join(process.cwd(), 'public');
    if (fs.existsSync(publicDir)) {
        const publicFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.md') || f.endsWith('.txt'));

        for (const file of publicFiles) {
            const content = fs.readFileSync(path.join(publicDir, file), 'utf8');
            knowledge.pages.push({
                path: `public/${file}`,
                content: content.replace(/\s+/g, ' ').trim()
            });
            console.log(`Indexed public file: ${file}`);
        }
    }

    // Ensure dir exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(knowledge, null, 2));
    console.log(`Successfully wrote site knowledge to ${OUTPUT_FILE}`);
}

main();
