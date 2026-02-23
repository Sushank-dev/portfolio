import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src', 'components');

const regexes = [
  {
    search: /text-foreground-dark-muted/g,
    replace: 'text-foreground-light-muted dark:text-foreground-dark-muted'
  },
  {
    search: /text-foreground-dark(?!-muted)/g,
    replace: 'text-foreground-light dark:text-foreground-dark'
  },
  {
    search: /bg-foreground-dark-muted/g,
    replace: 'bg-foreground-light-muted dark:bg-foreground-dark-muted'
  },
  {
    search: /bg-surface-dark(?!-elevated|-card)/g,
    replace: 'bg-surface-light dark:bg-surface-dark'
  },
  {
    search: /border-foreground-dark-muted/g,
    replace: 'border-foreground-light-muted dark:border-foreground-dark-muted'
  },
  {
    search: /hover:text-foreground-dark(?!-muted)/g,
    replace: 'hover:text-foreground-light dark:hover:text-foreground-dark'
  },
  {
    search: /hover:text-surface-dark/g,
    replace: 'hover:text-surface-light dark:hover:text-surface-dark'
  },
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const { search, replace } of regexes) {
        content = content.replace(search, replace);
      }
      
      content = content.replace(/text-foreground-light-muted dark:text-foreground-light-muted dark:text-foreground-dark-muted/g, 'text-foreground-light-muted dark:text-foreground-dark-muted');
      content = content.replace(/text-foreground-light \s*dark:text-foreground-light dark:text-foreground-dark/g, 'text-foreground-light dark:text-foreground-dark');
      content = content.replace(/dark:dark:/g, 'dark:');
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', file);
      }
    }
  }
}

walk(srcDir);
