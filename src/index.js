import { auth } from './firebase/config';
import { createAccount } from './pages/auth';
import { mainAccount } from './pages/main';
import './public/styles.css';
import './styles/authStyles.css'
import login from './templates/log.hbs'
import register from './templates/reg.hbs'
import { relativeTimeRounding } from 'moment';
const refs = {
  accountContainer: document.querySelector('.accountContainer'),
};

const signOut = () => {
  auth.signOut();
  document.querySelector('.accountContainer2').style.display="block";
  window.location.reload()
};

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
    } else {
      createAccount();
      document.querySelector('.addNote').classList.add('hidden')
    }
    
    const btn = document.querySelector('.signout');
    if (btn) {
      btn.addEventListener('click', signOut);
    }
  });
};

authStateChange();