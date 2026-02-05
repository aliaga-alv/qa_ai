#!/usr/bin/env node

/**
 * Lighthouse Test Runner
 * 
 * Simplified script to run Lighthouse tests and display results
 * without requiring a full build/preview server setup.
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pages to test
const PAGES = [
  { name: 'Home', url: 'http://localhost:4173/' },
  { name: 'Pricing', url: 'http://localhost:4173/pricing' },
  { name: 'About', url: 'http://localhost:4173/about' },
  { name: 'Security', url: 'http://localhost:4173/security' },
  { name: 'Documentation', url: 'http://localhost:4173/documentation' },
  { name: 'Blog', url: 'http://localhost:4173/blog' },
  { name: 'Contact', url: 'http://localhost:4173/contact' },
  { name: 'Login', url: 'http://localhost:4173/login' },
  { name: 'Register', url: 'http://localhost:4173/register' },
];

// Lighthouse configuration
const LIGHTHOUSE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
    },
  },
};

/**
 * Format score with color
 */
function formatScore(score) {
  const percentage = Math.round(score * 100);
  
  if (percentage >= 90) return `\x1b[32m${percentage}%\x1b[0m`; // Green
  if (percentage >= 70) return `\x1b[33m${percentage}%\x1b[0m`; // Yellow
  return `\x1b[31m${percentage}%\x1b[0m`; // Red
}

/**
 * Run Lighthouse test for a single page
 */
async function testPage(chrome, page) {
  console.log(`\n📊 Testing: ${page.name} (${page.url})`);
  
  try {
    const runnerResult = await lighthouse(page.url, {
      logLevel: 'error',
      output: 'html',
      port: chrome.port,
    }, LIGHTHOUSE_CONFIG);
    
    const { categories } = runnerResult.lhr;
    
    console.log(`   Performance:     ${formatScore(categories.performance.score)}`);
    console.log(`   Accessibility:   ${formatScore(categories.accessibility.score)}`);
    console.log(`   Best Practices:  ${formatScore(categories['best-practices'].score)}`);
    console.log(`   SEO:             ${formatScore(categories.seo.score)}`);
    
    return {
      page: page.name,
      url: page.url,
      scores: {
        performance: categories.performance.score,
        accessibility: categories.accessibility.score,
        bestPractices: categories['best-practices'].score,
        seo: categories.seo.score,
      },
      report: runnerResult.report,
    };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Lighthouse Tests...\n');
  console.log('Please ensure your preview server is running on http://localhost:4173/');
  console.log('Run: npm run preview (in another terminal)\n');
  
  // Wait for user confirmation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Launch Chrome
  console.log('🌐 Launching Chrome...');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
  });
  
  console.log('✅ Chrome launched');
  
  const results = [];
  
  // Test each page
  for (const page of PAGES) {
    const result = await testPage(chrome, page);
    if (result) {
      results.push(result);
    }
  }
  
  // Kill Chrome
  await chrome.kill();
  
  // Save reports
  const reportsDir = path.join(__dirname, '..', 'lighthouse-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  console.log('\n\n📝 Saving Reports...');
  
  results.forEach((result, index) => {
    const filename = `${result.page.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.html`;
    const filepath = path.join(reportsDir, filename);
    fs.writeFileSync(filepath, result.report);
    console.log(`   ✅ ${result.page}: ${filename}`);
  });
  
  // Summary
  console.log('\n\n📊 Summary:');
  console.log('═'.repeat(80));
  console.log('Page                Performance   Accessibility   Best Practices   SEO');
  console.log('─'.repeat(80));
  
  results.forEach((result) => {
    const name = result.page.padEnd(20);
    const perf = formatScore(result.scores.performance).padEnd(25);
    const a11y = formatScore(result.scores.accessibility).padEnd(25);
    const bp = formatScore(result.scores.bestPractices).padEnd(25);
    const seo = formatScore(result.scores.seo);
    
    console.log(`${name}${perf}${a11y}${bp}${seo}`);
  });
  
  console.log('═'.repeat(80));
  
  // Check if all passed
  const allPassed = results.every((result) => 
    result.scores.performance >= 0.85 &&
    result.scores.accessibility >= 0.95 &&
    result.scores.bestPractices >= 0.90 &&
    result.scores.seo >= 0.95
  );
  
  if (allPassed) {
    console.log('\n✅ All tests passed! 🎉');
  } else {
    console.log('\n⚠️  Some tests did not meet the minimum thresholds');
    console.log('   Review the reports in lighthouse-reports/ directory');
  }
  
  console.log(`\n📁 Reports saved to: ${reportsDir}\n`);
}

// Run
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
