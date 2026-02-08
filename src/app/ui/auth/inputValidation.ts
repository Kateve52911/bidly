export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@stud\.noroff\.no$/;
  return emailRegex.test(email);
}

export function validateInputFields() {
  const form = document.getElementById('register-user-form');
  form?.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    const passwordInput = document.getElementById(
      'password',
    ) as HTMLInputElement;
    const passwordValue: string = passwordInput.value;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const emailValue: string = emailInput.value;

    if (!isValidEmail(emailValue)) {
      const emailErrorMessage: HTMLElement | null = document.getElementById(
        'emailError',
      ) as HTMLElement;
      emailErrorMessage.style.display = 'block';
      emailInput.classList.add('is-invalid');
    }

    if (!isValidPassword(passwordValue)) {
      const errorMessage: HTMLElement | null = document.getElementById(
        'passwordError',
      ) as HTMLElement;
      errorMessage.style.display = 'block';
      passwordInput.classList.add('is-invalid');
    }
  });
}
