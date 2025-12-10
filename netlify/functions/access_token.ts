import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const githubOAuthBaseUrl = 'https://github.com/login/oauth';
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const code = event.queryStringParameters?.code;

  if (!code) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Missing code parameter' }),
    };
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

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to exchange code for token' }),
    };
  }
};
