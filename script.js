const correctAnswers = {
    "John": "5c6ecfa86513efcdde1cc4db2cd0328954142594d8fc9e7a3140e17b8b14ad1c",
    "Smith": "7e2b6406d379210644f897a80de06ac1690fb94159ed42c449537245172b271f",
    "Alice": "25baf6ca5845726acbfc07c8d12cf582772f8c25fb27433a78fa2197f08f148f",
    "Bob": "41d2647859366bbef3adcb99a6dc5a70c6257a08fba98ba1e7d9d4339dc1c7ea",
    "Kuang": "91f973374d405c6bdf8ffd1cb47e07895aa18a4fd24f21c2dd929e0a13e9f241",
    "Donald": "96a8767040b978c30ccfbc0b4d879b63d7e6511e30c0a47a8ae6e08d8ae4d7af",
    "Elon": "8848598827b842df2ff68a2eda5a8b02511cea710e4ef004409a1c24c17ce649",
    "Skibidi": "a7dfb4e9ab3a3857e40de992d9e2b642ad0b2b6f1bf23e58507c0c00d0a7fb5e",
    "Chimpanzini Bananini": "c8b01f8546ec64a054f25acaa8c8d635d767ac055ad81d98e826daf107fc6e16",
    "4 dimensional being": "29675cd2572b17b4fbcc88280e9bbc25075751dc92533a955ef1da6d4ee5fc81"
};

const hints = {
    "John": "nothing here",
    "Smith": "nothing here",
    "Alice": "maybe the $dollar signs$ are unnecessary?",
    "Bob": "maybe the @ signs are unnecessary?",
    "Kuang": "^ means exponent. (eg. 2^3 = 8)",
    "Donald": "do it seperately. underscore is _",
    "Elon": "abcde,fghij becomes afbgchdiej. get it?",
    "Skibidi": "have you tried reversing them?",
    "Chimpanzini Bananini": "abc became zab, def became cde. get it?",
    "4 dimensional being": "inspect element *cough cough click submit and look at console *cough cough *dies"
}


async function hashString(input) {

    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}


document.querySelectorAll('.submit-btn').forEach(button => {
    button.addEventListener('click', async function () {

        const rowIndex = this.getAttribute('data-row');


        const input = document.querySelectorAll('.crack-input')[rowIndex];
        const userGuess = input.value.trim();
        const username = document.querySelectorAll('td')[rowIndex * 4].innerText
        const correctHash = correctAnswers[username];

        const hashedGuess = await hashString(userGuess);
        console.log(hashedGuess)

        console.log(`${hashedGuess} is it equal to ${correctHash}`)
        if (hashedGuess === correctHash) {

            input.value = "Challenge Solved! ✅";
            input.classList.add('disabled');
            input.disabled = true; 
            this.disabled = true; 
        } else {
            alert("Incorrect guess! Try again.");
        }
    });
});

document.querySelectorAll('.hint-btn').forEach(button => {
    button.addEventListener('click', function () {
        const rowIndex = this.getAttribute('data-row');
        const username = document.querySelectorAll('td')[rowIndex * 4].innerText;

        // Retrieve the hint for the username
        const hint = hints[username] || "No hint available for this user.";

        // Display the hint
        alert(hint);
    });
});