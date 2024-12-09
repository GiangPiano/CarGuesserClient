async function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async function() {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

        try {
            const response = await fetch('https://0e1c-119-18-0-102.ngrok-free.app/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: base64String })
            });

            if (response.ok) {
                const result = await response.text();
                console.log('File uploaded successfully:', result);
            } else {
                console.error('File upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    reader.readAsDataURL(file);
}
