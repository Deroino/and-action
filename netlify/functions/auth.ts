import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const githubOAuthBaseUrl = 'https://github.com/login/oauth';
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubApiScopes = 'repo read:org';

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const redirectUrl = `${githubOAuthBaseUrl}/authorize?client_id=${githubClientId}&scope=${encodeURIComponent(
    githubApiScopes
  )}`;

  return {
    statusCode: 302,
    headers: {
      Location: redirectUrl,
      'Access-Control-Allow-Origin': '*',
    },
    body: '',
  };
};
