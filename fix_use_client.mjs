import fs from 'fs';
import path from 'path';

function fixUseClient(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixUseClient(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            if (content.includes('"use client";')) {
                // Remove all occurrences of "use client";
                content = content.replace(/"use client";\s*/g, '');
                // Prepend it once at the very top
                content = '"use client";\n\n' + content;
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

fixUseClient(path.join(process.cwd(), 'src/app'));
console.log('Fixed "use client" directives.');
