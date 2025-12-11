// Cloudflare Pages Function for GitHub OAuth authorization
export async function onRequestGet(context: {
  request: Request;
  env: { GITHUB_CLIENT_ID: string };
}) {
  const githubOAuthBaseUrl = 'https://github.com/login/oauth';
  const githubClientId = context.env.GITHUB_CLIENT_ID;
  const githubApiScopes = 'repo read:org';

  const redirectUrl = `${githubOAuthBaseUrl}/authorize?client_id=${githubClientId}&scope=${encodeURIComponent(
    githubApiScopes
  )}`;

  return new Response('', {
    status: 302,
    headers: {
      Location: redirectUrl,
      'Access-Control-Allow-Origin': '*',
    },
  });
}
