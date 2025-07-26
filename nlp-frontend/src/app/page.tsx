"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, ImageIcon, Copy, Download } from "lucide-react";
import Image from "next/image";

export default function ImageCaptioningApp() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleImageSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("Image size should be less than 10MB");
      return;
    }

    setSelectedImage(file);
    setError(null);
    setCaption("");

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleImageSelect(file);
      }
    },
    [handleImageSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const generateCaption = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create FormData to send the image
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Replace this URL with your actual API endpoint
      const response = await fetch("http://127.0.0.1:5000/caption", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate caption");
      }

      const data = await response.json();
      setCaption(data.caption || "Caption generated successfully!");
    } catch (err) {
      setError("Failed to generate caption. Please try again.");
      console.error("Error generating caption:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCaption = () => {
    if (caption) {
      const blob = new Blob([caption], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "image-caption.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const resetApp = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setCaption("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            AI Image Captioning
          </h1>
          <p className="text-lg text-gray-600">
            Upload an image and get an AI-generated caption
          </p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Drag and drop an image or click to select. Supports JPG, PNG, GIF
              up to 10MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {isDragOver
                    ? "Drop your image here"
                    : "Choose an image or drag it here"}
                </p>
                <p className="text-sm text-gray-500">
                  JPG, PNG, GIF up to 10MB
                </p>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Image Preview and Caption Section */}
        {imagePreview && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Image Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={generateCaption}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Caption"
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetApp}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Caption Results */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Caption</CardTitle>
                <CardDescription>
                  AI-generated description of your image
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : caption ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <p className="text-gray-800 leading-relaxed">{caption}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadCaption}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 h-32 flex items-center justify-center">
                    <p>
                      Upload an image and click "Generate Caption" to see
                      results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
