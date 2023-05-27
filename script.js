// Encryption function
function vigenereCipherEncrypt(plainText, key) {
    plainText = plainText.replace(/[^a-zA-Z]/g, '').toUpperCase();
    key = key.toUpperCase();

    var encryptedText = '';
    var keyIndex = 0;

    for (var i = 0; i < plainText.length; i++) {
        var plainTextCharCode = plainText.charCodeAt(i);
        var keyCharCode = key.charCodeAt(keyIndex);

        var encryptedCharCode = ((plainTextCharCode - 65) + (keyCharCode - 65)) % 26 + 65;
        encryptedText += String.fromCharCode(encryptedCharCode);

        keyIndex = ++keyIndex % key.length;
    }

    return encryptedText;
    }

// Decryption function
function vigenereCipherDecrypt(cipherText, key) {
    cipherText = cipherText.toUpperCase();
    key = key.toUpperCase();

    var decryptedText = '';
    var keyIndex = 0;

    for (var i = 0; i < cipherText.length; i++) {
        var cipherTextCharCode = cipherText.charCodeAt(i);
        var keyCharCode = key.charCodeAt(keyIndex);

        var decryptedCharCode = ((cipherTextCharCode - 65) - (keyCharCode - 65) + 26) % 26 + 65;
        decryptedText += String.fromCharCode(decryptedCharCode);

        keyIndex = ++keyIndex % key.length;
    }

    return decryptedText;
}

// Encrypt file function
function encryptFile() {
    var file = document.getElementById('file-input').files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
        var plainText = event.target.result;
        var key = document.getElementById('encryption-key').value;
        var encryptedText = vigenereCipherEncrypt(plainText, key);

        var downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(encryptedText));
        downloadLink.setAttribute('download', 'encrypted.txt');
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
}

// Decrypt file function
function decryptFile() {
    var file = document.getElementById('file-input').files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
        var cipherText = event.target.result;
        var key = document.getElementById('encryption-key').value;
        var decryptedText = vigenereCipherDecrypt(cipherText, key);

        var downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(decryptedText));
        downloadLink.setAttribute('download', 'decrypted.txt');
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
}