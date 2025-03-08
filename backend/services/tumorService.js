import { getGradioClient } from "../utils/gradioClient.js";
import { geminiModel } from "../utils/geminiClient.js";
import { extractTumorType } from "../utils/tumorUtils.js";

export const processImage = async (imageBuffer, mimetype) => {
  const gradioClient = await getGradioClient();
  const imageBlob = new Blob([imageBuffer], { type: mimetype });
  const result = await gradioClient.predict("/predict", { image: imageBlob });
  return result.data[0];
};

export const generateTumorInfo = async (tumorType) => {
  const prompt = `Provide a brief summary of ${tumorType} brain tumors:
1. Key symptoms (3-4 points)
2. Standard treatments (2-3 approaches)
3. General prognosis
4. Main risk factors
5. One notable recent advancement

Format the response with HTML tags (<p> for paragraphs, <strong> for emphasis).
Keep the response under 200 words total in simple, clear language for web display.`;

  try {
    const geminiResponse = await geminiModel.generateContent(prompt);
    let responseText = geminiResponse.response.text();

    // Clean up the response if it still has markdown code blocks
    responseText = responseText.replace(/```html\n/g, "").replace(/\n```/g, "");

    return responseText;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};
