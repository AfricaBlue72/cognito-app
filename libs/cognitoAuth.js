import { signIn, signInWithRedirect, signUp, signOut, confirmSignUp, getCurrentUser, resendSignUpCode, fetchAuthSession, fetchUserAttributes, resetPassword, confirmResetPassword } from 'aws-amplify/auth';

export const loginWithAmplify = async (email, password) => {
  try {
    console.log('Logging in with Amplify...');
    try {
      console.log('Trying to sign out...');
      await signOutWithAmplify(false);
    } catch (error) {
      console.log('Error signing out', error);
    }

    const user = await signIn({
      username: email, 
      password: password
  });
    console.log('Login successful!', user);
    return user;
  } catch (error) {
    console.log('Using the following arguments:', { email, password });
    console.error('Login failed', error);
    throw error;
  }
};

export const loginWithAmplifyRedirect = async (provider) => {
  try {
    console.log('Logging in with Amplify using redirect with provider:', provider);
    try {
      console.log('Trying to sign out...');
      await signOutWithAmplify(false);
    } catch (error) {
      console.log('Error signing out', error);
    }
    await signInWithRedirect({
      provider: provider
    });
    console.log(`Login with ${provider} successful!`);
  } catch (error) {
    console.error('Login with provider failed', error);
    throw error;
  }
}

export const autoLoginWithAmplify = async () => {
  try {
    console.log('Auto logging in with Amplify...');
    const user = await autoSignIn();
    console.log('Auto login successful!');
    return;
  } catch (error) {
    console.error('Auto login failed');
    throw error;
  }
};

export const signUpWithAmplify = async (email, password, preferred_username, locale) => {
  try {
    try {
      console.log('Trying to sign out...');
      await signOutWithAmplify(false);
    } catch (error) {
      console.log('Error signing out', error);
    }
    const signUpResult = await signUp({
      username: email, // Use email as the username
      password: password,
      options: {
        userAttributes: {
          email: email,
          locale: locale,
          preferred_username: preferred_username,
        },
      }
    });
    console.log('Sign up successful!', signUpResult );
    return signUpResult;
  } catch (error) {
    console.error('Sign up failed', error);
    console.log('Using the following arguments:', { email, password, preferred_username, locale });
    throw error;
  }
};

export const confirmSignUpWithAmplify = async (destination, code) => {
  try {
    await confirmSignUp({
      username: destination, 
      confirmationCode: code
  });
    console.log('Sign up confirmed successfully!');
  } catch (error) {
    console.log('Using the following arguments:', { email, code });
    console.error('Sign up confirmation failed', error);
    throw error;
  }
};

export const signOutWithAmplify = async (global = true) => {
  try {
    await signOut({ global: global });
    console.log('Sign out successful!');

    // Clear all Cognito-related local storage items
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('CognitoIdentityProvider')) {
        localStorage.removeItem(key);
      }
    });

    console.log('Local storage items cleared');
  } catch (error) {
    console.error('Sign out failed', error);
    throw error;
  }
};

export const resendSignUpCodeWithAmplify = async (email) => {
  try {
    await resendSignUpCode({ username: email });
    console.log('Sign up code resent successfully!');
  } catch (error) {
    console.error('Failed to resend sign up code', error);
    throw error;
  }
};

export const getCurrentUserWithAmplify = async () => {
  try {
    const currentUser = await getCurrentUser();
    console.log('Current user retrieved successfully', currentUser);
    return currentUser;
  } catch (error) {
    console.log('Failed to get current user', error);
    return null;
  }
};

export const fetchAuthSessionWithAmplify = async (refresh) => {
  try {
    const session = await fetchAuthSession({ forceRefresh: refresh });
    console.log('Auth session fetched successfully', session);
    console.log('IdToken:', session.tokens.idToken);
    console.log('IdToken raw:', session.tokens.idToken.toString());
    return session;
  } catch (error) {
    console.log('Failed to fetch auth session', error);
    throw error;
  }
};

export const fetchUserAttributesWithAmplify = async () => {
  try {
    const attributes = await fetchUserAttributes();
    console.log('User attributes fetched successfully', attributes);
    return attributes;
  } catch (error) {
    console.log('Failed to fetch user attributes', error);
    throw error;
  }
};

export const resetPasswordWithAmplify = async (username) => {
  try {
    await resetPassword({ username });
    console.log('Password reset initiated successfully');
  } catch (error) {
    console.error('Password reset initiation failed', error);
    throw error;
  }
};

export const confirmResetPasswordWithAmplify = async (username, newPassword, confirmationCode) => {
  try {
    await confirmResetPassword({ username, newPassword, confirmationCode });
    console.log('Password reset confirmed successfully');
  } catch (error) {
    console.error('Password reset confirmation failed', error);
    throw error;
  }
};

// Usage example:
// import { 
//   loginWithAmplify, 
//   signUpWithAmplify, 
//   getCurrentUserWithAmplify, 
//   decodeJWT,
//   fetchAuthSessionWithAmplify,
//   fetchUserAttributesWithAmplify
// } from './libs/cognitoAuth';
//
// try {
//   const user = await loginWithAmplify('user@example.com', 'password123');
//   console.log('Login successful', user);
//   // Handle successful login (e.g., store user info, redirect user)
// } catch (error) {
//   console.error('Login failed', error);
//   // Handle login failure (e.g., show error message to user)
// }
//
// try {
//   const result = await signUpWithAmplify('user@example.com', 'password123', 'username123');
//   console.log('Sign up successful', result);
//   // Handle successful sign up (e.g., show confirmation message, redirect to confirmation page)
// } catch (error) {
//   console.error('Sign up failed', error);
//   // Handle sign up failure (e.g., show error message to user)
// }
//
// try {
//   const currentUser = await getCurrentUserWithAmplify();
//   if (currentUser) {
//     console.log('Current user:', currentUser);
//     // Handle authenticated user
//   } else {
//     console.log('No authenticated user');
//     // Handle unauthenticated state
//   }
// } catch (error) {
//   console.error('Error getting current user', error);
//   // Handle error
// }
//
// // Example of using decodeJWT
// try {
//   const token = 'your_jwt_token_here';
//   const decodedToken = decodeJWT(token);
//   console.log('Decoded JWT:', decodedToken);
//   // Use the decoded token information as needed
// } catch (error) {
//   console.error('Error decoding JWT', error);
//   // Handle error
// }
//
// // Example of using fetchAuthSessionWithAmplify
// try {
//   const session = await fetchAuthSessionWithAmplify();
//   console.log('Auth session:', session);
//   // Use the session information as needed
// } catch (error) {
//   console.error('Error fetching auth session', error);
//   // Handle error
// }
//
// // Example of using fetchUserAttributesWithAmplify
// try {
//   const attributes = await fetchUserAttributesWithAmplify();
//   console.log('User attributes:', attributes);
//   // Use the user attributes as needed
// } catch (error) {
//   console.error('Error fetching user attributes', error);
//   // Handle error
// }
