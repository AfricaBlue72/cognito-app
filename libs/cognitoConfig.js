import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'eu-west-1_ubPkTKxs6',
      userPoolClientId: '1q0bnvbfii1cmcb7jb1a7qgfkj',
      identityPoolId: 'eu-west-1:cb735aec-b81e-464c-a7ff-0983df7aa36b',
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
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
      Amplify.configure(amplifyConfig);
      console.log('Amplify configured successfully');
    } else {
      console.error('Amplify.configure is not a function');
    }
  } catch (error) {
    console.error('Error configuring Amplify:', error);
  }
};
