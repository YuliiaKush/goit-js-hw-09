import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const el = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

if (savedData !== {}) {
  el.email.value = savedData.email || '';
  el.message.value = savedData.message || '';
}

el.form.addEventListener('input', throttle(saveInput, 500));

function saveInput(evt) {
  const formData = savedData;
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

el.form.addEventListener('submit', result);

function result(evt) {
  evt.preventDefault();
  if (el.email.value === '') {
    alert('the email is empty');
    return;
  }
  console.log(savedData);
  localStorage.removeItem(STORAGE_KEY);
  el.form.reset();
}
