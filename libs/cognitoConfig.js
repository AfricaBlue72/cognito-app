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
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
        locale: {
          required: true,
        },
        preferred_username: {
          required: false,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  }
};

export const configureAmplify = () => {
  try {
    if (typeof Amplify.configure === 'function') {
      // cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());
      Amplify.configure(amplifyConfig);
      console.log('Amplify configured successfully');
    } else {
      console.error('Amplify.configure is not a function');
    }
  } catch (error) {
    console.error('Error configuring Amplify:', error);
  }
};
