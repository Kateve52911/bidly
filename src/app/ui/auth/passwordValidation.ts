export function checkPassword(password: string): boolean {
  if (password.length < 8) {
    return false;
  } else {
    return true;
  }
}

export function validatePassword() {
  const form = document.getElementById('register-user-form');
  console.log(form);
  form?.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    const passwordInput = document.getElementById(
      'password',
    ) as HTMLInputElement;
    const passwordValue: string = passwordInput.value;
    console.log(passwordValue);
    console.log('errorMessage');

    if (!checkPassword(passwordValue)) {
      const errorMessage: HTMLElement | null = document.getElementById(
        'passwordError',
      ) as HTMLElement;
      errorMessage.innerHTML = 'Password must be at least 8 characters';
      errorMessage.style.display = 'block';
      passwordInput.classList.add('is-invalid');
      console.log(errorMessage);
    }
  });
}
