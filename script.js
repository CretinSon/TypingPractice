document.addEventListener('DOMContentLoaded', () => {
    const textToType = document.getElementById('text-to-type').innerText;
    const userInput = document.getElementById('user-input');
    const result = document.getElementById('result');

    userInput.addEventListener('input', () => {
        const typedText = userInput.value;
        if (typedText === textToType) {
            result.innerText = 'Correct!';
            setCookie('typingResult', 'Correct!', 7);
        } else {
            result.innerText = '';
        }
    });

    const savedResult = getCookie('typingResult');
    if (savedResult) {
        result.innerText = savedResult;
    }
});

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
