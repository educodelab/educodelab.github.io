const imageInput = document.getElementById('imageInput');
const textInput = document.getElementById('textInput');
const fontSelect = document.getElementById('fontSelect');
const colorInput = document.getElementById('colorInput');
const opacityInput = document.getElementById('opacityInput');
const sizeInput = document.getElementById('sizeInput');
const positionSelect = document.getElementById('positionSelect');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let imageFormat = 'png';

function applyWatermark() {
    const file = imageInput.files[0];
    if (!file) {
        alert("Please select an image.");
        return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const text = textInput.value || '© Your Name';
        const opacity = opacityInput.value;
        const font = `${sizeInput.value}px '${fontSelect.value}'`;
        const color = colorInput.value;

        ctx.globalAlpha = opacity;
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        let x, y;
        const margin = 20;

        switch (positionSelect.value) {
            case 'top-left':
                x = margin;
                y = margin + parseInt(sizeInput.value);
                break;
            case 'top-right':
                x = canvas.width - margin - ctx.measureText(text).width;
                y = margin + parseInt(sizeInput.value);
                break;
            case 'bottom-left':
                x = margin;
                y = canvas.height - margin;
                break;
            case 'bottom-right':
                x = canvas.width - margin - ctx.measureText(text).width;
                y = canvas.height - margin;
                break;
            case 'center':
                x = (canvas.width - ctx.measureText(text).width) / 2;
                y = canvas.height / 2;
                break;
            case 'random':
                x = Math.random() * (canvas.width - ctx.measureText(text).width);
                y = Math.random() * (canvas.height - parseInt(sizeInput.value)) + parseInt(sizeInput.value);
                break;
        }

        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
    };

    // Detect the image format based on the file type
    const fileExtension = file.name.split('.').pop().toLowerCase();
    imageFormat = fileExtension === 'jpg' || fileExtension === 'jpeg' ? 'jpeg' : 'png';
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = `watermarked-image.${imageFormat}`;
    link.href = canvas.toDataURL(`image/${imageFormat}`);
    link.click();
}
