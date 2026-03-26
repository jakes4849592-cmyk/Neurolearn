"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, Image, X, ScanLine, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HomeworkScannerProps {
  onTextExtracted: (text: string, imageUrl: string) => void;
  onClose: () => void;
}

export function HomeworkScanner({ onTextExtracted, onClose }: HomeworkScannerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WEBP)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB");
      return;
    }
    setError(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleScan = async () => {
    if (!selectedFile || !previewUrl) return;
    setIsProcessing(true);
    setError(null);

    try {
      // Dynamic import to avoid SSR issues
      const { extractTextFromImage, formatOCRTextForChat } = await import("@/lib/ocr");
      const result = await extractTextFromImage(selectedFile);

      if (!result.text) {
        setError("Could not extract text from this image. Try a clearer photo.");
        return;
      }

      const formattedText = formatOCRTextForChat(result.text);
      onTextExtracted(formattedText, previewUrl);
    } catch (err) {
      setError("OCR processing failed. Please try again or type your question.");
      console.error("OCR error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScanLine size={16} className="text-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Homework Scanner
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={[
            "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200",
            isDragging
              ? "border-[var(--accent)] bg-[var(--accent)]/10"
              : "border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-surface)]",
          ].join(" ")}
        >
          <Upload size={24} className="mx-auto mb-2 text-[var(--text-muted)]" />
          <p className="text-sm text-[var(--text-secondary)]">
            Drop your homework image here
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            or click to browse (JPG, PNG, WEBP — max 10MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-[var(--border)]">
            <img
              src={previewUrl!}
              alt="Homework preview"
              className="w-full max-h-40 object-contain bg-[var(--bg-surface)]"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Image size={14} className="text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-secondary)] truncate flex-1">
              {selectedFile.name}
            </span>
          </div>

          <Button
            onClick={handleScan}
            loading={isProcessing}
            variant="primary"
            size="sm"
            fullWidth
            disabled={isProcessing}
          >
            {isProcessing ? "Reading text..." : "Scan & Send to Nero"}
          </Button>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}

      <p className="text-[10px] text-[var(--text-muted)]">
        Nero will help you understand the problem — not solve it for you 😊
      </p>
    </div>
  );
}

export default HomeworkScanner;
