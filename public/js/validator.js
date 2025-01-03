export const formValidator = () => {
 document.getElementById('form-btn').addEventListener('click', function(e) {

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    if(document.querySelector('#username')){
        const username = document.getElementById('username').value.trim();
        if (!username) {
            e.preventDefault();
            errorMessage.classList.remove('hidden');
        } else {
            errorMessage.classList.add('hidden');
            console.log('Form submitted:', { email, password });
        }
    }
    // Email validation regex function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate form fields
    if (!email || !password || !validateEmail(email)) {
        e.preventDefault();
        errorMessage.classList.remove('hidden');
    } else {
        errorMessage.classList.add('hidden');
        console.log('Form submitted:', { email, password });
    }
    });

   
};

 