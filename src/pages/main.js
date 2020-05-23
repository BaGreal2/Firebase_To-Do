import { db } from '../firebase/config';
import moment from 'moment';
import card from '../templates/card.hbs';
import form from '../templates/form.hbs';
import { registerUser, loginUser } from '../services';
const writeDownNotes = async object => {
  let arrayDate = moment().format('L').split('/');
  let deadLine =
    object.deadline.split('-').reverse().slice(0, 2).reverse().join('/') +
    `/${arrayDate[2]}`;
  console.log('moment:', moment().format('L'));
  const addDoc = await db.collection('notes').add({
    title: object.title,
    description: object.description,
    nickName: object.nickName,
    deadline: deadLine,
  });
  console.log('addDoc: ', addDoc);
};
export const mainAccount = (name1, photourl) => {
  if (localStorage.getItem('registretionLoginisation') === null) {
    localStorage.setItem('registretionLoginisation', false);
  }
  if (localStorage.getItem('registretionLoginisation') === 'false') {
    document
      .querySelector('.accountContainer')
      .insertAdjacentHTML('afterbegin', `<h1>${name1}</h1>`);
    document.querySelector('.accountContainer2').innerHTML = `<h1>${name1}</h1>`;
    document.querySelector('.addNote').innerHTML = form();
    let preDate =
      moment().format('L').split('/').slice(0, 2).reverse().join('-') + '-2020';
    let dateInFormat = preDate.split('-').reverse().join('-');
    document.querySelector('.deadlineAdd').setAttribute('min', dateInFormat);
    // console.log('get:', '2020-05-19')
    const formAdding = document.querySelector('.addNote').querySelector('form');
    formAdding.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const notes = {};
      formData.forEach((value, name) => (notes[name] = value));
      console.log('notes:', notes);
      moment().format('L');
      writeDownNotes(notes);
    });
  }
  const getCurrentNotes = async () => {
    const currentNotes = await db
      .collection('notes')
      .onSnapshot(docSnapshot => {
        const all = docSnapshot.docs.map(note => ({
          ...note.data(),
          id: note.id,
        }));
        console.log(all);
        document.querySelector('.notesContainer').innerHTML = card(all);
      });
  };
  getCurrentNotes();

  //writeDownNotes()
  return `<div class="main">
    <img class = 'avatar' src="${photourl}" alt="">
    <ul class='notesContainer'></ul>
    <button class='signout'>SIGNOUT</button>
  </div>`;
};
const handleDelete = e => {
  const currentDay = moment().format('L');
  if (e.target.textContent !== 'DELETE') {
    return;
  }
  if (currentDay === e.target.closest('li').dataset.deadline) {
    db.collection('notes').doc(e.target.closest('li').id).delete();
  }
  // db.collection("notes").doc(e.target.closest('li').id).delete()
};
document
  .querySelector('.accountContainer')
  .addEventListener('click', handleDelete);
