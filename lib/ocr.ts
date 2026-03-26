"use client";

import Tesseract from "tesseract.js";

export interface OCRResult {
  text: string;
  confidence: number;
}

/**
 * Extract text from an image file using Tesseract.js OCR
 */
export async function extractTextFromImage(file: File): Promise<OCRResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string;

        const result = await Tesseract.recognize(imageData, "eng", {
          logger: () => {}, // suppress logs
        });

        resolve({
          text: result.data.text.trim(),
          confidence: result.data.confidence,
        });
      } catch (error) {
        reject(new Error(`OCR failed: ${error}`));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Process OCR text to clean it up for sending to the AI
 */
export function formatOCRTextForChat(ocrText: string): string {
  if (!ocrText.trim()) {
    return "I uploaded an image but couldn't extract the text clearly. Can you help me understand what I should do?";
  }

  return `I have a homework problem I need help understanding. Here's what it says:\n\n"${ocrText}"\n\nCan you help me work through this?`;
}
