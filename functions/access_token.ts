// Cloudflare Pages Function for GitHub OAuth token exchange
export async function onRequestGet(context: {
  request: Request;
  env: { GITHUB_CLIENT_ID: string; GITHUB_CLIENT_SECRET: string };
}) {
  const githubOAuthBaseUrl = 'https://github.com/login/oauth';
  const githubClientId = context.env.GITHUB_CLIENT_ID;
  const githubClientSecret = context.env.GITHUB_CLIENT_SECRET;

  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response(JSON.stringify({ error: 'Missing code parameter' }), {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const response = await fetch(`${githubOAuthBaseUrl}/access_token`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: githubClientId,
        client_secret: githubClientSecret,
        code: code,
      }),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to exchange code for token' }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
