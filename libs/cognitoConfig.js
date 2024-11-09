import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'eu-west-1_hwvQBj1jO',
      userPoolClientId: '685dukda1oam836d07arlmdfqe',
      identityPoolId: 'eu-west-1:6fb8d0c7-5659-49c9-8acb-aaed730ecc75',
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
