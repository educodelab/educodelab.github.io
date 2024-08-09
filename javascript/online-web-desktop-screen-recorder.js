let mediaRecorder, recordedChunks = [];

const startRecording = async () => {
  document.getElementById('loadingIndicator').style.display = 'block';
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      document.getElementById('recordedVideo').src = url;
      document.getElementById('saveRecording').disabled = false;
    };

    recordedChunks = [];
    mediaRecorder.start();

    document.getElementById('startRecording').disabled = true;
    document.getElementById('stopRecording').disabled = false;
    document.getElementById('pauseRecording').disabled = false;
    document.getElementById('statusMessage').textContent = 'Recording started.';
    document.getElementById('saveRecording').disabled = true; // Disable the Save button initially
  } catch (e) {
    console.error('Error accessing screen and audio:', e);
    document.getElementById('statusMessage').textContent = 'Error: ' + e.message;
  } finally {
    document.getElementById('loadingIndicator').style.display = 'none';
  }
};

const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    document.getElementById('startRecording').disabled = false;
    document.getElementById('stopRecording').disabled = true;
    document.getElementById('pauseRecording').disabled = true;
    document.getElementById('resumeRecording').disabled = true;
    document.getElementById('statusMessage').textContent = 'Recording stopped.';
  }
};

const pauseRecording = () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.pause();
    document.getElementById('pauseRecording').disabled = true;
    document.getElementById('resumeRecording').disabled = false;
    document.getElementById('statusMessage').textContent = 'Recording paused.';
  }
};

const resumeRecording = () => {
  if (mediaRecorder && mediaRecorder.state === 'paused') {
    mediaRecorder.resume();
    document.getElementById('pauseRecording').disabled = false;
    document.getElementById('resumeRecording').disabled = true;
    document.getElementById('statusMessage').textContent = 'Recording resumed.';
  }
};

const saveRecording = () => {
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'recorded_video.webm';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

document.getElementById('startRecording').addEventListener('click', startRecording);
document.getElementById('stopRecording').addEventListener('click', stopRecording);
document.getElementById('pauseRecording').addEventListener('click', pauseRecording);
document.getElementById('resumeRecording').addEventListener('click', resumeRecording);
document.getElementById('saveRecording').addEventListener('click', saveRecording);
