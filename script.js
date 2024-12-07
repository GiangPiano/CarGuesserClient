document.addEventListener('DOMContentLoaded', function() {
  var imgsrc = '';

    window.addEventListener('load', function() {
        document.querySelector('input[type="text"]').addEventListener('change', function() {
            // if (this.files && this.files[0]) {
                var img = document.getElementById('image');
                img.onload = () => {
                    URL.revokeObjectURL(img.src);  // no longer needed, free memory
                }
    
                img.src = this.value; // set src to blob url
                imgsrc = img.src;
            // }
            // imgsrc = this.value;
        });
    });
    const form = document.getElementById('uploadForm');
    const resultDiv = document.getElementById('result');
    var result = '1';
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        resultDiv.textContent = 'Loading...';

        // const formData = new FormData(form);
        // console.log([...formData]);

        try {
          // Fetch the data from the API
          const response = await fetch('https://d5d0-27-96-222-22.ngrok-free.app/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: imgsrc })

            });
            
          const data = await response.json(); // Parse JSON
          // Access the field you want
          const messageContent = data.choices[0].message.content;
          console.log(data);
  
          // Update the HTML element
          resultDiv.textContent = messageContent; // Set the content
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