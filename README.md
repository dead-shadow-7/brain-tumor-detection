# Brain Tumor Detection

An AI-powered web application for detecting brain tumors from MRI scans using a Convolutional Neural Network (CNN).

![Brain Tumor Detection](./images/mainHome.png)

## Features

- Upload and analyze brain MRI scans
- Real-time brain tumor detection using a CNN model
- Interactive visualization of detection results
- Responsive UI for desktop and mobile devices
- Secure and efficient image processing pipeline

## Tech Stack

### Frontend

- **Vite**: For fast development and optimized builds
- **React**: UI component library
- **Tailwind CSS**: For styling and responsive design

### Backend

- **Express.js**: Node.js server for handling API requests
- **Multer**: For file upload handling
- **Axios**: For communicating with Hugging Face API

### Machine Learning

- **Convolutional Neural Network (CNN)**: Custom-trained model for tumor detection
- **Hugging Face**: For model deployment and inference

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Clone the Repository

```bash
git clone https://github.com/dead-shadow-7/brain-tumor-detection.git
cd brain-tumor-detection
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_KEY
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:

```
HUGGINGFACE_API_KEY=your_api_key_here (Optional if your model is private)
HF_SPACE=your_model_endpoint_here
GEMINI_API_KEY=YOUR-GEMINI-API-KEY
MONGODB_URI=YOUR-MONGODB-URL
```

## Usage

1. Open the link from the console
2. Upload a brain MRI scan (supported formats: JPEG, PNG)
3. Wait for the analysis to complete
4. View the detection results and confidence score

## API Endpoints

### POST /api/predict

Accepts an MRI image and returns detection results.

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body: form-data with key "image" containing the MRI scan file

**Sample Response:**

```
{
"status": "success",
"data": {
  "prediction": "Prediction: pituitary_tumor (Confidence: 1.00)",
  "tumorType": "pituitary",
  "medicalInfo": "<p>Pituitary brain tumors are abnormal growths in the pituitary gland, a small but vital gland that controls hormone production. While usually benign, they can cause problems by pressing on surrounding structures or disrupting hormone balance.</p>\n\n<p><strong>Key symptoms</strong> often include vision problems (like double vision or loss of peripheral vision), headaches, hormonal imbalances (leading to fatigue, menstrual changes, or erectile dysfunction), and unintended weight gain or loss.</p>\n\n<p><strong>Standard treatments</strong> depend on the tumor type and size, and may include surgery (often through the nose), radiation therapy, or medication to control hormone production.</p>\n\n<p>The <strong>prognosis</strong> for pituitary tumors is generally good, especially for non-cancerous tumors. Many patients can live normal lives after treatment, though hormone monitoring may be necessary.</p>\n\n<p>There are no definitive <strong>risk factors</strong>. Some genetic conditions, such as Multiple Endocrine Neoplasia type 1 (MEN1), can increase the risk, but most tumors occur spontaneously.</p>\n\n<p>One <strong>notable recent advancement</strong> is the increasing use of minimally invasive endoscopic surgery, offering faster recovery times and fewer complications for some patients.</p>",
  "timestamp": "2025-07-17T11:50:23.963Z",
  "userId": "test1234"
},
"\_id": "6878e37f8f6160275e31fe7b"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Dataset on [Kaggle](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset/data)
