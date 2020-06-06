import { auth } from './firebase/config';
import { createAccount } from './pages/auth';
import { mainAccount } from './pages/main';
import './publicStyles/styles.css';
import './styles/authStyles.css'
const refs = {
  accountContainer: document.querySelector('.accountContainer'),
};

// export const signOut = () => {
//   console.log('what')
//   auth.signOut();
//   document.querySelector('.accountContainer2').style.display="block";
//   document.querySelector('.projectName').style.display="block";
//   window.location.reload()
// };

const authStateChange = async () => {
  await auth.onAuthStateChanged(user => {
    console.log('user', user);
    if (user) {
      refs.accountContainer.innerHTML = mainAccount(
        user.displayName,
        user.photoURL,
      );
      document.querySelector('.addNote').classList.remove('hidden')
      document.querySelector('.accountContainer2').style.display="none";
      document.querySelector('.projectName').style.display="none";
      document.querySelector('.top').style.display="flex";
    } else {
      createAccount();
      document.querySelector('.addNote').classList.add('hidden')
    }
    
    // const btn = document.querySelector('.signout');
    // if (btn) {
    //   btn.addEventListener('click', signOut);
    // }
  });
};

authStateChange();