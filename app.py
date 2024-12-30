import os
from flask import Flask, request, jsonify, send_from_directory, render_template
import cv2

app = Flask(__name__)

# Define folders for uploads and frames
UPLOAD_FOLDER = 'uploads'
FRAMES_FOLDER = 'frames'
STATIC_FOLDER = 'static'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(FRAMES_FOLDER, exist_ok=True)

# Serve the static files
@app.route('/')
def index():
    return send_from_directory(STATIC_FOLDER, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(STATIC_FOLDER, path)

# Endpoint to upload video and process frames
@app.route('/upload', methods=['POST'])
def upload_video():
    # Save uploaded video
    video = request.files['video']
    video_path = os.path.join(UPLOAD_FOLDER, video.filename)
    video.save(video_path)

    # Create a folder for the frames
    video_index = len(os.listdir(FRAMES_FOLDER)) + 1
    frame_folder = os.path.join(FRAMES_FOLDER, f'video{video_index}_frames')
    os.makedirs(frame_folder, exist_ok=True)

    # Extract and save frames
    extract_frames(video_path, frame_folder)

    return jsonify({'message': 'Video uploaded and frames saved', 'folder': frame_folder})


def extract_frames(video_path, frame_folder, nth_second=1):# YOU CAN SET THE VALUE OF nth_second AS PER USE
    # Open the video file
    cap = cv2.VideoCapture(video_path)
    fps = int(cap.get(cv2.CAP_PROP_FPS))  # Frames per second
    nth_frame = fps * nth_second  # Calculate nth frame based on nth_second

    frame_count = 0
    saved_frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Save every nth frame
        if frame_count % nth_frame == 0:
            frame_filename = os.path.join(frame_folder, f'frame_{saved_frame_count}.jpg')
            cv2.imwrite(frame_filename, frame)
            saved_frame_count += 1

        frame_count += 1

    cap.release()


if __name__ == '__main__':
    app.run(debug=True)
