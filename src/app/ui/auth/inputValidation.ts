export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@stud\.noroff\.no$/;
  return emailRegex.test(email);
}
