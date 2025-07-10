
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const formSuccess = document.getElementById('formSuccess');

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
}

function validateName() {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        showError(nameError, 'Name is required.');
        return false;
    } else {
        clearError(nameError);
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
        showError(emailError, 'Email is required.');
        return false;
    } else if (!emailPattern.test(emailValue)) {
        showError(emailError, 'Please enter a valid email address.');
        return false;
    } else {
        clearError(emailError);
        return true;
    }
}

function validatePassword() {
    const passwordValue = passwordInput.value;
    if (passwordValue === '') {
        showError(passwordError, 'Password is required.');
        return false;
    } else if (passwordValue.length < 8) {
        showError(passwordError, 'Password must be at least 8 characters long.');
        return false;
    } else {
        clearError(passwordError);
        return true;
    }
}

function validateConfirmPassword() {
    const confirmPasswordValue = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;

    if (confirmPasswordValue === '') {
        showError(confirmPasswordError, 'Confirm password is required.');
        return false;
    } else if (confirmPasswordValue !== passwordValue) {
        showError(confirmPasswordError, 'Passwords do not match.');
        return false;
    } else {
        clearError(confirmPasswordError);
        return true;
    }
}

function validateForm(event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        formSuccess.classList.remove('hidden');
        console.log('Form submitted successfully!');
        console.log('Name:', nameInput.value);
        console.log('Email:', emailInput.value);
        form.reset();
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 3000);
    } else {
        formSuccess.classList.add('hidden');
    }
}

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

form.addEventListener('submit', validateForm);