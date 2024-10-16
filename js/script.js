document.getElementById('switchToLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.flip-container').classList.add('flipped');
});

document.getElementById('switchToRegister').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.flip-container').classList.remove('flipped');
});

document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    clearErrors();

    let isValid = true;

    if (!validateUsername(username.value)) {
        showError(username, 'Username must be at least 3 characters.');
        isValid = false;
    }

    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email.');
        isValid = false;
    }

    if (!validatePassword(password.value)) {
        showError(password, 'Password must be at least 6 characters.');
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match.');
        isValid = false;
    }

    if (isValid) {
        const user = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        saveUser(user);
        alert('Registration successful!');

        // Clear the registration form fields
        username.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';

        // Automatically switch to the login form after the user clicks "OK" on the alert
        document.querySelector('.flip-container').classList.add('flipped');
    }
});
 
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');

    clearErrors();

    if (validateLogin(loginEmail.value, loginPassword.value)) {
        alert('Login successful!');
        window.location.href = 'templates/users.html';
        loginEmail.value = '';
        loginPassword.value = '';
    } else {
        showError(loginEmail, 'Invalid email or password.');
    }
});

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function validateLogin(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email && user.password === password);
}

function validateUsername(username) {
    return username.length >= 3;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(email.toLowerCase());
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(input, message) {
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    input.classList.add('error');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.textContent = '';
        msg.style.display = 'none';
    });
    document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
}
