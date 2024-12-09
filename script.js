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

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        resultDiv.textContent = 'Loading...';
        request(imgsrc);
    });
});

async function request(imgsrc) {
    const form = document.getElementById('uploadForm');
    const resultDiv = document.getElementById('result');
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
}

var file;

function dropHandler(ev) {
    console.log("File(s) dropped");
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    if (ev.dataTransfer.items.kind === "file") {
        file = ev.dataTransfer.items.getAsFile();
        console.log(`... file.name = ${file.name}`);
    }
}

function dragOverHandler(ev) {
    ev.preventDefault();
    console.log("File(s) in drop zone");
    // Prevent default behavior (Prevent file from being opened)
}