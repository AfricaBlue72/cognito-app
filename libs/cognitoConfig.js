import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_ubPkTKxs6',
    userPoolWebClientId: '1q0bnvbfii1cmcb7jb1a7qgfkj',
  }
};

export const configureAmplify = () => {
  Amplify.configure(amplifyConfig);
};
