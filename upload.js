


async function uploadImage() {
    var formFile = document.getElementById('uploadFile');
    var resultDiv = document.getElementById('result');
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    formFile.addEventListener('submit', async function(e){
        e.preventDefault();
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload;
        const base64String = reader.result;

        try {
            console.log(imgsrc);
            const response = await fetch('https://0e1c-119-18-0-102.ngrok-free.app/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: base64String })
            });
            
            const data = await response.json(); // Parse JSON
    
            const messageContent = data.choices[0].message.content;
            console.log(data);
    
            // Update the HTML element
            resultDiv.textContent = messageContent; 
        } catch (error) {
            console.error('Error:', error);
            resultDiv.textContent = 'An error occurred.';
        }
    });
}
