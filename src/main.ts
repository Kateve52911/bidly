// import { createRegisterUserForm} from './app/components/forms/registerUser/registerUserForm.ts';
import './scss/custom-bootstrap.scss';
import './scss/styles.scss';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { initializeNavbar } from './app/components/navbar/hamburgerMenu/initialiseHamburger.ts';
console.log('Hello World!');

document.addEventListener('DOMContentLoaded', () => {
  initializeNavbar();
});
