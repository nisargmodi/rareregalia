#!/usr/bin/env node

/**
 * Link Testing Utility
 * 
 * This script provides easy commands to run specific link tests
 * Usage:
 *   npm run test:links                    - Run all link tests
 *   npm run test:links -- --broken       - Run broken link detection
 *   npm run test:links -- --nav          - Run navigation tests only
 *   npm run test:links -- --footer       - Run footer tests only
 */

const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);

// Define test configurations
const testConfigs = {
  all: {
    files: ['tests/e2e/links.spec.ts', 'tests/e2e/broken-links.spec.ts'],
    description: 'Running all link tests...'
  },
  broken: {
    files: ['tests/e2e/broken-links.spec.ts'],
    description: 'Running broken link detection...'
  },
  nav: {
    files: ['tests/e2e/links.spec.ts'],
    grep: 'Header navigation|Mobile navigation|Category showcase',
    description: 'Running navigation tests...'
  },
  footer: {
    files: ['tests/e2e/links.spec.ts'],
    grep: 'Footer links',
    description: 'Running footer link tests...'
  },
  hero: {
    files: ['tests/e2e/links.spec.ts'],
    grep: 'Hero section',
    description: 'Running hero section tests...'
  },
  products: {
    files: ['tests/e2e/links.spec.ts'],
    grep: 'Product card',
    description: 'Running product link tests...'
  },
  status: {
    files: ['tests/e2e/links.spec.ts'],
    grep: 'All internal links return proper HTTP status',
    description: 'Running HTTP status tests...'
  }
};

function showHelp() {
  console.log(`
Link Testing Utility for Rare Regalia

Usage:
  npm run test:links                    - Run all link tests
  npm run test:links -- --broken       - Run broken link detection
  npm run test:links -- --nav          - Run navigation tests only
  npm run test:links -- --footer       - Run footer tests only
  npm run test:links -- --hero         - Run hero section tests only
  npm run test:links -- --products     - Run product link tests only
  npm run test:links -- --status       - Run HTTP status tests only
  npm run test:links -- --help         - Show this help

Examples:
  npm run test:links -- --broken
  npm run test:links -- --nav --verbose
  npm run test:links -- --status --headed

Options:
  --headed      Run tests with browser UI (default: headless)
  --verbose     Show detailed output
  --debug       Run with debug options
  --report      Open HTML report after tests
`);
}

function runTests(config, options = {}) {
  console.log(config.description);
  
  const playwrightArgs = ['test'];
  
  // Add test files
  if (config.files) {
    playwrightArgs.push(...config.files);
  }
  
  // Add grep pattern
  if (config.grep) {
    playwrightArgs.push('--grep', config.grep);
  }
  
  // Add options
  if (options.headed) {
    playwrightArgs.push('--headed');
  }
  
  if (options.verbose) {
    playwrightArgs.push('--verbose');
  }
  
  if (options.debug) {
    playwrightArgs.push('--debug');
  }
  
  const child = spawn('npx', ['playwright', ...playwrightArgs], {
    stdio: 'inherit',
    shell: true
  });
  
  child.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ Tests completed successfully!');
      
      if (options.report) {
        console.log('Opening HTML report...');
        spawn('npx', ['playwright', 'show-report'], { 
          stdio: 'inherit',
          shell: true
        });
      }
    } else {
      console.log(`\n❌ Tests failed with exit code ${code}`);
      
      if (!options.report) {
        console.log('To see detailed results, run: npx playwright show-report');
      }
    }
  });
  
  child.on('error', (err) => {
    console.error('❌ Failed to run tests:', err.message);
  });
}

// Parse command line arguments
const options = {
  headed: args.includes('--headed'),
  verbose: args.includes('--verbose'),
  debug: args.includes('--debug'),
  report: args.includes('--report')
};

// Determine which test to run
if (args.includes('--help') || args.includes('-h')) {
  showHelp();
} else if (args.includes('--broken')) {
  runTests(testConfigs.broken, options);
} else if (args.includes('--nav')) {
  runTests(testConfigs.nav, options);
} else if (args.includes('--footer')) {
  runTests(testConfigs.footer, options);
} else if (args.includes('--hero')) {
  runTests(testConfigs.hero, options);
} else if (args.includes('--products')) {
  runTests(testConfigs.products, options);
} else if (args.includes('--status')) {
  runTests(testConfigs.status, options);
} else {
  // Default: run all tests
  runTests(testConfigs.all, options);
}