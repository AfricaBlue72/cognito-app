import { Auth } from 'aws-amplify';

export const loginWithAmplify = async (email, password) => {
  try {
    const user = await Auth.signIn(email, password);
    console.log('Login successful!', user);
    return user;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export const signUpWithAmplify = async (email, password) => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
    });
    console.log('Sign up successful!', user);
    return user;
  } catch (error) {
    console.error('Sign up failed', error);
    throw error;
  }
};

export const confirmSignUpWithAmplify = async (email, code) => {
  try {
    await Auth.confirmSignUp(email, code);
    console.log('Sign up confirmed successfully!');
  } catch (error) {
    console.error('Sign up confirmation failed', error);
    throw error;
  }
};

export const signOutWithAmplify = async () => {
  try {
    await Auth.signOut();
    console.log('Sign out successful!');
  } catch (error) {
    console.error('Sign out failed', error);
    throw error;
  }
};

export const resendSignUpCodeWithAmplify = async (email) => {
  try {
    await Auth.resendSignUp(email);
    console.log('Sign up code resent successfully!');
  } catch (error) {
    console.error('Failed to resend sign up code', error);
    throw error;
  }
};

// Usage example:
// import { loginWithAmplify } from './libs/cognitoAuth';
//
// try {
//   const user = await loginWithAmplify('user@example.com', 'password123');
//   console.log('Login successful', user);
//   // Handle successful login (e.g., store user info, redirect user)
// } catch (error) {
//   console.error('Login failed', error);
//   // Handle login failure (e.g., show error message to user)
// }
