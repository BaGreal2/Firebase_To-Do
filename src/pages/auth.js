import auth from '../templates/auth.hbs';
import login from '../templates/log.hbs';
import register from '../templates/reg.hbs';
import '../styles/authStyles.css';
import { registerUser, loginUser } from '../services';

//const userFinal = {}
export const createAccount = () => {
  document.querySelector('.authContainer').innerHTML = login()
  document.querySelector('.go-log').style.display="none";
  localStorage.setItem('login', true)
  document.querySelector('.accountContainer').innerHTML = '';
  localStorage.setItem('registretionLoginisation', true);
  if (localStorage.getItem('registretionLoginisation') === 'true') {
    document.querySelector('.addNote').innerHTML = '';
  }
  const form = document
    .querySelector('.accountContainer2')
    .querySelector('form');
  const handleSubmit = (e) => {
    e.preventDefault()
    if(localStorage.getItem('login') === 'true'){
      let formData = new FormData(e.target);
      let user1 = {};
      formData.forEach((value, name) => (user1[name] = value));
      loginUser(user1)
    } else if(localStorage.getItem('login')==='false'){
      let formData = new FormData(e.target);
      let user1 = {};
      formData.forEach((value, name) => (user1[name] = value));
      console.log('user:', user1)
      registerUser(user1)
    }
  }
  form.addEventListener('submit', handleSubmit)
  document.querySelector('.changes').addEventListener('click', (e)=>{
    if(e.target.dataset.action === "go-reg"){
      document.querySelector('.authContainer').innerHTML = register()
      document.querySelector('.go-reg').style.display="none";
      document.querySelector('.go-log').style.display="block";
      localStorage.setItem('login', false)
    } else if(e.target.dataset.action === "go-log"){
      document.querySelector('.authContainer').innerHTML = login()
      document.querySelector('.go-log').style.display="none";
      document.querySelector('.go-reg').style.display="block";
      localStorage.setItem('login', true)
    }
    })
  };
  
//   form.addEventListener('submit', handleSubmit);
// const handleSubmit = evt => {
//   evt.preventDefault();
//   const formData = new FormData(evt.target);
//   const user = {};
//   formData.forEach((value, name) => (user[name] = value));
//   evt.target.querySelector('.btn-group').addEventListener('click', evt => {
//     localStorage.setItem('registretionLoginisation', false);
//     if (evt.target.textContent === 'Register') {
//       registerUser(user);
//     } else loginUser(user);
//   });
// };
