document.addEventListener('DOMContentLoaded', function() {
  var imgsrc = '';

    window.addEventListener('load', function() {
        document.querySelector('input[type="text"]').addEventListener('change', function() {
            var img = document.getElementById('image');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
            img.src = this.value;
            imgsrc = img.src;
        });
    });
    const form = document.getElementById('uploadForm');
    const resultDiv = document.getElementById('result');
    var result = '1';
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        resultDiv.textContent = 'Loading...';

        try {
          const response = await fetch('https://0e1c-119-18-0-102.ngrok-free.app/ask', {
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
      


        // try {
        //     const response =  fetch('http://localhost:3000/ask', {
        //         method: 'POST',
        //         body: formData,
        //     });

        //     const result =  response.json();
        //     resultDiv.textContent = JSON.stringify(result, null, 2);
        // } catch (error) {
        //     console.error('Error:', error);
        //     resultDiv.textContent = 'Failed to upload image.';
        // }
    });

});