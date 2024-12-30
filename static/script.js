const webcam = document.getElementById('webcam');
const preview = document.getElementById('preview');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const stopBtn = document.getElementById('stopBtn');
const saveBtn = document.getElementById('saveBtn');

let mediaRecorder;
let recordedChunks = [];

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        webcam.srcObject = stream;

        // Start Recording
        startBtn.addEventListener('click', () => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                preview.src = url;
                saveBtn.disabled = false;

                // Upload the video to the backend
                const formData = new FormData();
                formData.append('video', blob);

                fetch('/upload', {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        alert(`Frames saved in folder: ${data.folder}`);
                    })
                    .catch((error) => console.error('Error uploading video:', error));
            };

            mediaRecorder.start();
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            stopBtn.disabled = false;
        });

        // Pause Recording
        pauseBtn.addEventListener('click', () => {
            mediaRecorder.pause();
            pauseBtn.disabled = true;
            resumeBtn.disabled = false;
        });

        // Resume Recording
        resumeBtn.addEventListener('click', () => {
            mediaRecorder.resume();
            resumeBtn.disabled = true;
            pauseBtn.disabled = false;
        });

        // Stop Recording
        stopBtn.addEventListener('click', () => {
            mediaRecorder.stop();
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            resumeBtn.disabled = true;
            stopBtn.disabled = true;
            saveBtn.disabled = false;
        });

        // Save Video
        saveBtn.addEventListener('click', () => {
            if (recordedChunks.length > 0) {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);

                // Create an anchor element to download the video
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'recorded_video.webm'; // Filename for the saved video
                document.body.appendChild(a);
                a.click();

                // Cleanup
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
                alert('Video saved locally!');
            } else {
                alert('No video recorded to save!');
            }
        });
    })
    .catch((error) => {
        console.error('Error accessing webcam:', error);
        alert('Could not access webcam. Please ensure it is enabled.');
    });
