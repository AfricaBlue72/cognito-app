import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';


const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'eu-west-1_Q4KoMg9hb',
      userPoolClientId: '7p3nchhf3ufmfeegv6kjs63r6s',
      identityPoolId: 'eu-west-1:b836a443-3051-406e-96e7-a90f3a289faa',
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
