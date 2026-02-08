/**
 * Validates that a password meets the minimum length requirement.
 *
 * Checks if the provided password string is at least 8 characters long.
 * This is a basic length validation and does not check for complexity
 * requirements such as special characters, numbers, or mixed case.
 *
 * @param {string} password - The password string to validate
 * @returns {boolean} Returns true if password is 8 or more characters, false otherwise
 *
 * @example
 * isValidPassword('short'); // false
 * isValidPassword('longenough'); // true
 * isValidPassword('12345678'); // true
 */

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Validates that an email address is a valid Noroff student email.
 *
 * Checks if the provided email string matches the required format for
 * Noroff student email addresses (@stud.noroff.no domain). Uses regex
 * pattern matching to ensure the email has a valid format with no whitespace
 * and ends with the correct domain.
 *
 * @param {string} email - The email address string to validate
 * @returns {boolean} Returns true if email matches @stud.noroff.no format, false otherwise
 *
 * @example
 * isValidEmail('student@stud.noroff.no'); // true
 * isValidEmail('student@noroff.no'); // false
 * isValidEmail('student@gmail.com'); // false
 * isValidEmail('invalid @stud.noroff.no'); // false (contains whitespace)
 */

export function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^[^\s@]+@stud\.noroff\.no$/;
  return emailRegex.test(email);
}
