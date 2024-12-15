document.addEventListener('DOMContentLoaded', function() {
    
    var resultDiv = document.getElementById('result');
    var imgsrc = '';
    var file = '';

    window.addEventListener('load', function() {
        document.querySelector('input[type="text"]').addEventListener('change', function() {
            var img = document.getElementById('image');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
            img.src = this.value;
            imgsrc = img.src;
        });
        document.querySelector('input[type="file"]').addEventListener('change', function() {
            var img = document.getElementById('image');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
            img.src = URL.createObjectURL(this.files[0]);
            imgsrc = img.src;
            file = this.files[0];
        });
    });
    
    var formURL = document.getElementById('uploadURL');
    formURL.addEventListener('submit', async function(e) {
        e.preventDefault();
        resultDiv.textContent = 'Loading...';
        request(imgsrc);
    });

    
    var formFile = document.getElementById('uploadFile');
    console.log(file);
    
    formFile.addEventListener('submit', async function(e){
        e.preventDefault();
        resultDiv.textContent = 'Loading...';
        
        if (file) {
            const reader = new FileReader();
            reader.onload = async function() {
                const base64String = reader.result;
                console.log(base64String);
                request(base64String);
            };
            reader.readAsDataURL(file);
        }
    });

    async function request(imgsrc) {
        try {
            console.log(imgsrc);
            const response = await fetch('e438-27-96-222-22.ngrok-free.app/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: imgsrc })
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
    }
});