import { db } from '../firebase/config';
import { auth } from '../firebase/config';
import moment from 'moment';
import card from '../templates/card.hbs';
import form from '../templates/form.hbs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// import signOut from '../index'
const writeDownNotes = async object => {
  let arrayDate = moment().format('L').split('/');
  let deadLine =
    object.deadline.split('-').reverse().slice(0, 2).reverse().join('/') +
    `/${arrayDate[2]}`;
  const addDoc = await db.collection('notes').add({
    title: object.title,
    description: object.description,
    nickName: object.nickName,
    deadline: deadLine,
  });
  console.log('addDoc: ', addDoc);
};
export const mainAccount = (name1, photourl) => {
    document.querySelector('.addNote').innerHTML = form();
    let preDate =
      moment().format('L').split('/').slice(0, 2).reverse().join('-') + '-2020';
    let dateInFormat = preDate.split('-').reverse().join('-');
    document.querySelector('.deadlineAdd').setAttribute('min', dateInFormat);
    const formAdding = document.querySelector('.addNote').querySelector('form');
    formAdding.addEventListener('submit', e => {
      e.preventDefault(); 
      const formData = new FormData(e.target);
      const notes = {};
      formData.forEach((value, name) => (notes[name] = value));
      console.log('notes:', notes);
      moment().format('L');
      writeDownNotes(notes);
      e.target.reset()
      Swal.fire(
        'Complete!',
        `You have successfully added task as "${notes.nickName}"`,
        'success'
      )
    });

  const getCurrentNotes = async () => {
    const currentNotes = await db
      .collection('notes')
      .onSnapshot(docSnapshot => {
        const all = docSnapshot.docs.map(note => ({
          ...note.data(),
          id: note.id,
        }));
        console.log('All Current Notes:',all);
        document.querySelector('.notesContainer').innerHTML = card(all);
        const handleTodoClick = (e) => {
          if(e.target.nodeName !== 'LI' && e.target.className !== 'nickname_card' && e.target.className !== 'description' && e.target.className !== 'title_card'){
            return
          }
          for(let elem of all){
            if(elem.id===e.target.closest('li').id){
              document.querySelector('.lightbox__content').innerHTML=`
              <h2 class="lightbox_nickname">${elem.nickName}</h2>
              <h2 class="lightbox_title">${elem.title}</h3>
              <p class="lightbox_description">${elem.description}</p>
              <p class="lightbox_deadline">Do before ${elem.deadline}</p>
              `
            }
          }
          document.querySelector('.lightbox').classList.add('is-open')
          document.querySelector('body').style.overflowY = 'hidden'
    
        }
        document.querySelector('.accountContainer').addEventListener('click', handleTodoClick)
        const handleClose = (e) => {
          document.querySelector('.lightbox').classList.remove('is-open')
          document.querySelector('body').style.overflowY = 'auto'
        }
        document.querySelector('.lightbox__button').addEventListener('click', handleClose)
        document.querySelector('.lightbox__overlay').addEventListener('click', handleClose)
      });
  };
  getCurrentNotes();
  let click = 0;
  const signOut = () => {
    console.log('what')
    auth.signOut();
    document.querySelector('.accountContainer2').style.display="block";
    document.querySelector('.projectName').style.display="block";
    window.location.reload()
  };
  const insertAccount = (e) =>{
    if(click==0){
      document.querySelector('.top').insertAdjacentHTML('beforeend', `<div class="account"><img class = 'avatar' src="${photourl}" alt=""><h1 class="account_name">${name1}</h1><button class='signout'>SIGNOUT</button></div>`)
      // const btn = document.querySelector('.signout');
      console.log(document.querySelector('.signout'))
      document.querySelector('.signout').addEventListener('click', signOut);
      console.log('why')
    } else if(click%2==0){
      document.querySelector('.account').style.display="block"
    }else if(click%2!==0){
      document.querySelector('.account').style.display="none"
    }
    click+=1
  }
  document.querySelector('.burger').addEventListener('click', insertAccount)
  //document.querySelector('.top').insertAdjacentHTML('beforeend', `<div class="account"><img class = 'avatar' src="${photourl}" alt=""><h1 class="account_name">${name1}</h1><button class='signout'>SIGNOUT</button></div>`)
  return `<div class="main">

    <div class='notesContainer'></div>
  </div>`;
};
const handleDelete = e => {
  const currentDay = moment().format('L');
  if (e.target.textContent !== 'DELETE') {
    return;
  }
  if (currentDay === e.target.closest('li').dataset.deadline || ((Number(currentDay.split('/')[1]) >= Number(e.target.closest('li').dataset.deadline.split('/')[1]))&&(Number(currentDay.split('/')[0]) >= Number(e.target.closest('li').dataset.deadline.split('/')[0]))&&(Number(currentDay.split('/')[2]) >= Number(e.target.closest('li').dataset.deadline.split('/')[2])))     ) {
    db.collection('notes').doc(e.target.closest('li').id).delete();
    Swal.fire(
      'Complete!',
      'You deleted the task!',
      'success'
    )
  } else {
    Swal.fire({
      icon: 'error',
      title: `You can't delete this task`,
      text: `The deadline is: ${e.target.closest('li').dataset.deadline}`,
    })
  }
};
document
  .querySelector('.accountContainer')
  .addEventListener('click', handleDelete);
