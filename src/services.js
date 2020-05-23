import { auth } from './firebase/config';

export const registerUser = async ({nickName, email, password, password2, image}) => {
  console.log('email, password registerUser', email, password);
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    let user = await auth.currentUser;
    console.log('user services', user);
    user
      .updateProfile({
        displayName: nickName,
        photoURL: image,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  } catch (error) {
    console.log('message', error);
  }
};

// registerUser();

export const loginUser = async ({ email, password }) => {
  console.log('email, password loginUser', email, password);
  try {
    await auth.signInWithEmailAndPassword(email, password);
    let user = auth.currentUser;
    console.log('userCurrent', user);
  } catch (error) {
    console.log('message', error);
  }
};
