document.addEventListener('DOMContentLoaded', () => {
    const randomBtn = document.getElementById('random');
    const memorableBtn = document.getElementById('memorable');
    const pinBtn = document.getElementById('pin');
    const toggles = document.getElementById('random-options');
    const slider = document.getElementById('length-slider');
    const lengthValue = document.getElementById('length-value');
    const passwordField = document.getElementById('password-field');
    const copyBtn = document.getElementById('copy-password');
    const refreshBtn = document.getElementById('refresh-password');

    // Default values
    let passwordType = 'random';
    let passwordLength = slider.value;

    // Update slider value and generate password immediately
    slider.addEventListener('input', () => {
        passwordLength = slider.value;
        lengthValue.textContent = passwordLength;
        generatePassword();  // Automatically generate password when slider is adjusted
    });

    // Toggle between password types (random, memorable, pin)
    [randomBtn, memorableBtn, pinBtn].forEach((btn) => {
        btn.addEventListener('click', () => {
            [randomBtn, memorableBtn, pinBtn].forEach((b) => b.classList.remove('selected'));
            btn.classList.add('selected');
            passwordType = btn.id;

            if (passwordType === 'random') {
                toggles.style.display = 'flex';
            } else {
                toggles.style.display = 'none';
            }

            generatePassword();
        });
    });

    // Generate password
    const generatePassword = () => {
        let password = '';
        
        if (passwordType === 'random') {
            const includeUppercase = document.getElementById('include-uppercase').checked;
            const includeLowercase = document.getElementById('include-lowercase').checked;
            const includeNumbers = document.getElementById('include-numbers').checked;
            const includeSymbols = document.getElementById('include-symbols').checked;

            const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercase = 'abcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

            let characters = '';
            if (includeUppercase) characters += uppercase;
            if (includeLowercase) characters += lowercase;
            if (includeNumbers) characters += numbers;
            if (includeSymbols) characters += symbols;

            for (let i = 0; i < passwordLength; i++) {
                password += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        } else if (passwordType === 'memorable') {
            // List of words for memorable password
            const words = ['block', 'delta', 'negate', 'morrow', 'buzzer', 'toward', 'plain', 'ward', 'river', 'cloud', 'swift', 'tower', 'jolly'];
            // We'll combine words and ensure the length meets the required password length
            while (password.length < passwordLength) {
                password += (password.length > 0 ? '-' : '') + words[Math.floor(Math.random() * words.length)];
            }
            // Trim the password to the exact length if it exceeds the desired length
            password = password.slice(0, passwordLength);
        } else if (passwordType === 'pin') {
            for (let i = 0; i < passwordLength; i++) {
                password += Math.floor(Math.random() * 10).toString();
            }
        }

        // Update the password field
        passwordField.value = password;
    };

    // Copy password to clipboard
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(passwordField.value);
            alert('Password copied to clipboard!');
        } catch (err) {
            alert('Failed to copy password');
        }
    });

    // Refresh password on button click
    refreshBtn.addEventListener('click', () => {
        generatePassword();  // Simply regenerate the password
    });

    // Generate initial password
    generatePassword();
});
