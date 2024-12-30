# Webcam Video Recorder Application

## Overview
This project allows users to record them, saves their videos and saves specific frames at a frame rate of "n" (to be specified in app.py).
The project is using flask framework to run the backend and html, css and js for the frontend.


---

## Features

### Frontend:
- **Record Videos:** Start, pause, resume, and stop webcam recording.
- **Save Locally:** Download the recorded video as a `.webm` file.
- **Preview Recording:** View the recorded video before saving or uploading.

### Backend:
- **Upload Video:** Save the uploaded video to the server.
- **Extract Frames:** Extract every nth second frame from the video and save them in a dedicated folder structure.
- **Organized Storage:** Frames are stored in subfolders named `video1_frames`, `video2_frames`, etc.

---

## Folder Structure
```
project/
├── app.py               # Flask backend application
├── static/              # Frontend files
│   ├── index.html       # HTML file
│   ├── script.js        # JavaScript for frontend logic
│   ├── style.css        # CSS styles
├── uploads/             # Folder to store uploaded videos
├── frames/              # Folder to store extracted frames
```

---

## Requirements
- Python 3.7+
- Flask
- OpenCV

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   Use `pip` to install the required Python libraries:
   ```bash
   pip install flask opencv-python
   ```

3. **Run the Application**
   ```bash
   python app.py
   ```

4. **Access the Application**
   Open your browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

---

## Usage

### Recording a Video
1. Open the application in your browser.
2. Allow webcam access.
3. Use the buttons to:
   - Start Recording
   - Pause Recording
   - Resume Recording
   - Stop Recording
   - Save Video

### Uploading and Processing
1. After recording, the video is automatically uploaded to the backend.
2. Frames are extracted and stored in the `frames/` folder.
3. The extracted frames are organized in a subfolder corresponding to the video.

---

## How It Works

### Frontend
- **Webcam Access:** The application uses `getUserMedia` API to access the webcam.
- **MediaRecorder API:** Handles video recording.
- **Save Functionality:** Creates a downloadable `.webm` file of the recorded video.

### Backend
- **File Upload:** Flask handles video upload via an API endpoint.
- **Frame Extraction:** OpenCV processes the uploaded video and saves every nth frame in a folder.

---

## Known Issues
- Ensure webcam permissions are granted for the application to function properly.
- Large video files may take longer to process on the backend.

---

## Future Enhancements
- Add user authentication for video uploads.
- Allow configurable frame extraction intervals (e.g., every 2 seconds).
- Add video playback features directly from extracted frames.

---

## Contributors
- **Khushvardhan Bhardwaj** (Primary Developer)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/khushvardhanbhardwaj)


