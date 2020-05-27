import login from '../templates/log.hbs';
import register from '../templates/reg.hbs';
import '../styles/authStyles.css';
import { registerUser, loginUser } from '../services';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const createAccount = () => {
  const authContainer = document
    .querySelector('.accountContainer2')
    .querySelector('.authContainer');

  authContainer.innerHTML = login();

  const handleChangeForm = evt => {
    if (evt.target.dataset.action === 'go-reg') {
      authContainer.innerHTML = register();
      getFormValue();
    } else if (evt.target.dataset.action === 'go-log') {
      authContainer.innerHTML = login();
      getFormValue();
    }
  };

  authContainer.addEventListener('click', handleChangeForm);

  authContainer.querySelector('form').addEventListener('submit', evt => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const user1 = {};
    formData.forEach((value, name) => (user1[name] = value));
    console.log('user:', user1)
    loginUser(user1)
  });

  const getFormValue = () => {
    const authContainer = document
      .querySelector('.accountContainer2')
      .querySelector('.authContainer')
      .querySelector('form')
      .addEventListener('submit', evt => {
        evt.preventDefault();
        if(document.querySelector('.go-change').dataset.action==="go-log"){
          const formData = new FormData(evt.target);
          const user1 = {};
          formData.forEach((value, name) => (user1[name] = value));
          console.log('user:', user1)
          if(user1.password===user1.passwordConfirm){
          registerUser(user1)
          } else{
            Swal.fire({
              icon: 'error',
              title: 'Confirming password is incorrect',
              text: `Password and confirming password don't match`,
            })
          }
      } else if(document.querySelector('.go-change').dataset.action==="go-reg"){
        const formData = new FormData(evt.target);
        const user1 = {};
        formData.forEach((value, name) => (user1[name] = value));
        console.log('user:', user1)
        loginUser(user1)
      }
    });
  };
};
  