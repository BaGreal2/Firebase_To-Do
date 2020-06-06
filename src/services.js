import { auth } from './firebase/config';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const registerUser = async ({displayName, email, password, password2, photoURL}) => {
  //console.log('email, password registerUser', email, password);
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    let user = await auth.currentUser;
    user
      .updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  } catch (error) {
    if(password.length<6){
      Swal.fire({
        icon: 'error',
        title: `Too short password`,
        text: error,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: `Unknown error`,
        text: error,
      })
    }
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    let user = auth.currentUser;
    console.log('userCurrent', user);
    let error1 = false;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Something went wrong!',
      text: `${error}`,
    })
    let error1 = true;
  }
};
