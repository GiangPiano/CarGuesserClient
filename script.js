document.addEventListener('DOMContentLoaded', function() {
    // Update the image when the user selects a file/url
    window.addEventListener('load', function() {
        const img = document.getElementById('image');
        img.onload = function() {
            URL.revokeObjectURL(img.src);  // no longer needed, free memory
        }
        
        // Update URL
        document.querySelector('input[type="text"]').addEventListener('change', function() {
            img.src = this.value;
        });
        
        // Update file
        document.querySelector('input[type="file"]').addEventListener('change', function() {
            img.src = URL.createObjectURL(this.files[0]);
        });
    });

    const resultDiv = document.getElementById('result');
    
    // Submit the form URL
    const submitURL = document.getElementById('uploadURL');
    submitURL.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const url = document.querySelector('input[type="text"]').value;
        if (!url) {
            resultDiv.textContent = 'No URL entered.';
            return;
        }

        resultDiv.textContent = 'Loading...';

        request(url).then(function(messageContent) {
            resultDiv.textContent = messageContent;
        }).catch(function(error) {
            console.error('Error:', error);
            resultDiv.textContent = 'An error occurred.';
        });
    });

    // Submit the form file
    const submitFile = document.getElementById('uploadFile');    
    submitFile.addEventListener('submit', async function(e){
        e.preventDefault();
        
        const file = document.querySelector('input[type="file"]').files[0];
        if (!file) {
            resultDiv.textContent = 'No file selected.';
            return;
        }

        resultDiv.textContent = 'Loading...';
        
        let reader = new FileReader();
        reader.onload = function() {
            request(reader.result).then(function(messageContent) {
                resultDiv.textContent = messageContent;
            }).catch(function(error) {
                console.error('Error:', error);
                resultDiv.textContent = 'An error occurred.';
            });
        };
        reader.readAsDataURL(file);
    });
    
    // Send a request to the server
    async function request(imgsrc) {
        try {
            const response = await fetch('https://car-guesser-server.vercel.app/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: imgsrc })
            });
            
            const data = await response.json(); // Parse JSON
            console.log(data);
            
            const messageContent = data.choices[0].message.content;
            return messageContent;
        } catch (error) {
            console.error('Error:', error);
            return 'An error occurred.';
        }
    }
});