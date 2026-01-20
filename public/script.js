// ============================================
// TEMPLATE DEFINITIONS
// ============================================

window.TEMPLATES = [
    {
        id: 'meme1',
        name: 'Drake Meme',
        description: 'Classic drake reaction format',
        image: 'assets/meme1.jpg',
        width: 600,
        height: 600,
        textBoxes: [
            { x: 300, y: 100, width: 250, height: 60, fontSize: 24, text: 'Bad Option' },
            { x: 300, y: 300, width: 250, height: 60, fontSize: 24, text: 'Good Option' }
        ]
    },
    {
        id: 'meme2',
        name: 'Distracted Boyfriend',
        description: 'Popular reaction meme',
        image: 'assets/meme2.jpg',
        width: 600,
        height: 600,
        textBoxes: [
            { x: 450, y: 150, width: 120, height: 60, fontSize: 18, text: 'Her' },
            { x: 100, y: 200, width: 120, height: 60, fontSize: 18, text: 'Me' },
            { x: 400, y: 350, width: 120, height: 60, fontSize: 18, text: 'My Phone' }
        ]
    },
    {
        id: 'poster1',
        name: 'Motivational Poster',
        description: 'Inspirational design',
        image: 'assets/poster1.jpg',
        width: 600,
        height: 800,
        textBoxes: [
            { x: 300, y: 300, width: 500, height: 100, fontSize: 36, text: 'Your Success Starts Here' },
            { x: 300, y: 450, width: 500, height: 60, fontSize: 20, text: 'Believe in yourself and achieve greatness' }
        ]
    },
    {
        id: 'poster2',
        name: 'Event Poster',
        description: 'Promotional poster',
        image: 'assets/poster2.jpg',
        width: 600,
        height: 800,
        textBoxes: [
            { x: 300, y: 150, width: 500, height: 80, fontSize: 40, text: 'COMING SOON' },
            { x: 300, y: 400, width: 500, height: 60, fontSize: 24, text: 'Mark your calendar!' }
        ]
    },
    {
        id: 'blank',
        name: 'Blank Canvas',
        description: 'Start from scratch',
        image: 'assets/blank.jpg',
        width: 600,
        height: 600,
        textBoxes: [
            { x: 300, y: 300, width: 400, height: 60, fontSize: 24, text: 'Your Text Here' }
        ]
    }
];

// ============================================
// EDITOR STATE
// ============================================

let editorState = {
    canvas: null,
    ctx: null,
    canvasImage: null,
    textBoxes: [],
    activeTextBoxIndex: null,
    currentTemplate: null,
    isDragging: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
};

// ============================================
// EDITOR INITIALIZATION
// ============================================

function initializeEditor() {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template') || 'blank';

    const template = window.TEMPLATES.find(t => t.id === templateId);
    if (!template) {
        alert('Template not found');
        window.location.href = 'generator.html';
        return;
    }

    editorState.currentTemplate = template;

    // Initialize canvas
    editorState.canvas = document.getElementById('canvas');
    editorState.ctx = editorState.canvas.getContext('2d');
    editorState.canvas.width = template.width;
    editorState.canvas.height = template.height;

    // Load template image
    if (templateId !== 'blank') {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            editorState.canvasImage = img;
            drawCanvas();
        };
        img.onerror = function () {
            console.log('Template image not found, using blank canvas');
            drawCanvas();
        };
        img.src = template.image;
    } else {
        // Blank canvas
        editorState.ctx.fillStyle = '#ffffff';
        editorState.ctx.fillRect(0, 0, template.width, template.height);
    }

    // Initialize text boxes
    editorState.textBoxes = template.textBoxes.map(box => ({
        ...box,
        fontFamily: 'Arial',
        color: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 2
    }));

    createTextBoxElements();
    drawCanvas();
}

function createTextBoxElements() {
    const container = document.getElementById('textBoxesContainer');
    container.innerHTML = '';

    editorState.textBoxes.forEach((box, index) => {
        const textBoxDiv = document.createElement('div');
        textBoxDiv.className = 'editable-textbox';
        textBoxDiv.dataset.index = index;
        textBoxDiv.style.left = box.x - box.width / 2 + 'px';
        textBoxDiv.style.top = box.y - box.fontSize / 2 + 'px';
        textBoxDiv.style.width = box.width + 'px';
        textBoxDiv.style.fontSize = box.fontSize + 'px';
        textBoxDiv.style.fontFamily = box.fontFamily;
        textBoxDiv.style.color = box.color;
        textBoxDiv.style.textShadow = `1px 1px 2px ${box.strokeColor}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = box.text;

        input.addEventListener('change', () => {
            box.text = input.value;
            drawCanvas();
        });

        input.addEventListener('input', () => {
            box.text = input.value;
            drawCanvas();
        });

        textBoxDiv.appendChild(input);

        textBoxDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            selectTextBox(index);
        });

        textBoxDiv.addEventListener('mousedown', (e) => {
            if (e.target === input) return;
            e.preventDefault();
            editorState.isDragging = true;
            editorState.dragOffsetX = e.clientX - textBoxDiv.getBoundingClientRect().left;
            editorState.dragOffsetY = e.clientY - textBoxDiv.getBoundingClientRect().top;
        });

        container.appendChild(textBoxDiv);
    });

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
}

function selectTextBox(index) {
    // Remove active class from all
    document.querySelectorAll('.editable-textbox').forEach(el => {
        el.classList.remove('active');
    });

    editorState.activeTextBoxIndex = index;

    // Add active class to selected
    const textBoxEl = document.querySelector(`[data-index="${index}"]`);
    if (textBoxEl) {
        textBoxEl.classList.add('active');
        textBoxEl.querySelector('input').focus();
    }

    updateControlPanel();
}

function updateControlPanel() {
    const index = editorState.activeTextBoxIndex;
    if (index === null || !editorState.textBoxes[index]) return;

    const box = editorState.textBoxes[index];

    document.getElementById('fontFamily').value = box.fontFamily;
    document.getElementById('fontSize').value = box.fontSize;
    document.getElementById('fontSizeValue').textContent = box.fontSize;
    document.getElementById('textColor').value = box.color;
    document.getElementById('strokeColor').value = box.strokeColor;
    document.getElementById('strokeWidth').value = box.strokeWidth;
    document.getElementById('strokeWidthValue').textContent = box.strokeWidth;
}

function updateActiveTextBox(property, value) {
    const index = editorState.activeTextBoxIndex;
    if (index === null || !editorState.textBoxes[index]) return;

    const box = editorState.textBoxes[index];

    if (property === 'fontFamily') {
        box.fontFamily = value;
    } else if (property === 'fontSize') {
        box.fontSize = parseInt(value);
    } else if (property === 'color') {
        box.color = value;
    } else if (property === 'strokeColor') {
        box.strokeColor = value;
    } else if (property === 'strokeWidth') {
        box.strokeWidth = parseFloat(value);
    }

    // Update the text box element
    const textBoxEl = document.querySelector(`[data-index="${index}"]`);
    if (textBoxEl) {
        textBoxEl.style.fontSize = box.fontSize + 'px';
        textBoxEl.style.fontFamily = box.fontFamily;
        textBoxEl.style.color = box.color;
        textBoxEl.style.textShadow = `${box.strokeWidth}px ${box.strokeWidth}px ${box.strokeWidth}px ${box.strokeColor}`;
    }

    drawCanvas();
}

function handleDragMove(e) {
    if (!editorState.isDragging || editorState.activeTextBoxIndex === null) return;

    const index = editorState.activeTextBoxIndex;
    const textBoxEl = document.querySelector(`[data-index="${index}"]`);
    const container = document.getElementById('textBoxesContainer');

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - editorState.dragOffsetX;
    const y = e.clientY - rect.top - editorState.dragOffsetY;

    textBoxEl.style.left = x + 'px';
    textBoxEl.style.top = y + 'px';

    // Update box position
    const box = editorState.textBoxes[index];
    box.x = x + box.width / 2;
    box.y = y + box.fontSize / 2;

    drawCanvas();
}

function handleDragEnd() {
    editorState.isDragging = false;
}

// ============================================
// CANVAS DRAWING
// ============================================

function drawCanvas() {
    const ctx = editorState.ctx;
    const canvas = editorState.canvas;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    if (editorState.canvasImage) {
        ctx.drawImage(editorState.canvasImage, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw text
    editorState.textBoxes.forEach(box => {
        drawText(ctx, box);
    });
}

function drawText(ctx, box) {
    const text = box.text;
    const fontSize = box.fontSize;
    const fontFamily = box.fontFamily;
    const color = box.color;
    const strokeColor = box.strokeColor;
    const strokeWidth = box.strokeWidth;

    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw stroke
    if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeText(text, box.x, box.y);
    }

    // Draw text
    ctx.fillStyle = color;
    ctx.fillText(text, box.x, box.y);
}

// ============================================
// AI CAPTION GENERATION
// ============================================

async function generateCaptions() {
    const topic = document.getElementById('topic').value || 'meme';
    const tone = document.getElementById('tone').value || 'funny';
    const type = 'meme';

    const generateBtn = document.getElementById('generateBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resultsDiv = document.getElementById('captionsResults');

    // Show loading
    generateBtn.disabled = true;
    loadingSpinner.style.display = 'block';
    resultsDiv.style.display = 'none';

    try {
        // Determine API endpoint
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8000/api/generate'
            : '/api/generate';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic: topic,
                tone: tone,
                type: type
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate captions');
        }

        const data = await response.json();
        displayCaptions(data.captions || []);

    } catch (error) {
        console.error('Error generating captions:', error);
        // Show fallback captions
        displayCaptions([
            'This is a caption!',
            'Great content incoming',
            'Share this moment'
        ]);
    } finally {
        generateBtn.disabled = false;
        loadingSpinner.style.display = 'none';
    }
}

function displayCaptions(captions) {
    const captionsList = document.getElementById('captionsList');
    const resultsDiv = document.getElementById('captionsResults');

    captionsList.innerHTML = '';

    captions.forEach(caption => {
        const option = document.createElement('div');
        option.className = 'caption-option';
        option.textContent = caption;
        option.onclick = () => insertCaption(caption);
        captionsList.appendChild(option);
    });

    resultsDiv.style.display = 'block';
}

function insertCaption(caption) {
    const index = editorState.activeTextBoxIndex;
    if (index === null || !editorState.textBoxes[index]) {
        alert('Please select a text box first');
        return;
    }

    editorState.textBoxes[index].text = caption;

    // Update input
    const textBoxEl = document.querySelector(`[data-index="${index}"]`);
    if (textBoxEl) {
        textBoxEl.querySelector('input').value = caption;
    }

    drawCanvas();

    // Hide results
    document.getElementById('captionsResults').style.display = 'none';
}

// ============================================
// CANVAS EXPORT
// ============================================

function downloadCanvas() {
    const canvas = editorState.canvas;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `meme-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================
// EVENT LISTENERS
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById('canvas')) {
            initializeEditor();
        }
    });
}

// Click outside to deselect
document.addEventListener('click', function (e) {
    if (e.target.id === 'textBoxesContainer' || e.target.id === 'canvas') {
        document.querySelectorAll('.editable-textbox').forEach(el => {
            el.classList.remove('active');
        });
        editorState.activeTextBoxIndex = null;
    }
});
