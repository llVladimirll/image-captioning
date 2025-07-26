from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration

app = Flask(__name__)
CORS(app)

# Load BLIP model and processor
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Use GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

@app.route('/caption', methods=['POST'])
def caption_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    try:
        image = Image.open(BytesIO(file.read())).convert('RGB')

        # Preprocess image and generate caption
        inputs = processor(images=image, return_tensors="pt").to(device)
        with torch.no_grad():
            output = model.generate(**inputs)
            caption = processor.decode(output[0], skip_special_tokens=True)

        return jsonify({'caption': caption})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
