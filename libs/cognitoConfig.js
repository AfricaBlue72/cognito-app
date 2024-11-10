import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'eu-west-1_qaaY4ppd8',
      userPoolClientId: '6788vcnl4jotttqgf0htiaouql',
      identityPoolId: 'eu-west-1:2d7c3b05-b64d-49cc-bcaa-da5f3ca9f183',
      loginWith: {
        email: true,
        oauth: {
          domain: 'auth-accept-domain-eu-west-1-970547379959.auth.eu-west-1.amazoncognito.com',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: [
            'http://localhost:3000', 
            'https://accept-cognito-app.bluecoast.co.za',   
            'https://bluecoast.co.za', 
          ],
          redirectSignOut: [
            'http://localhost:3000', 
            'https://accept-cognito-app.bluecoast.co.za',   
            'https://bluecoast.co.za', 
          ],
          responseType: 'code',
          providers: ['Google']
        },
      },
      signUpAttributes: ['email', 'locale'],
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    }
  }
};

export const configureAmplify = () => {
  try {
    Amplify.configure({
      ...amplifyConfig,
      Analytics: {
        disabled: true,
      },
      Logger: {
        LOG_LEVEL: 'DEBUG'
      }
    });
    
    console.log('Amplify configured successfully');
    console.log('Amplify config:', amplifyConfig);
  } catch (error) {
    console.error('Error configuring Amplify:', error);
  }
};
