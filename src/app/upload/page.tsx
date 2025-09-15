'use client';

import { useState } from 'react';
import { Upload, FolderOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      const { signedUrl } = await response.json();

      await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      const meetingResponse = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: file.name, audioFilePath: file.name }),
      });

      const newMeeting = await meetingResponse.json();

      router.push(`/processing?meetingId=${newMeeting.id}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Upload your meeting recording
        </h1>
        <p className="text-slate-600 text-lg mb-8">
          Supported formats: MP3, WAV
        </p>
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-slate-300 p-14">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-slate-100 rounded-full p-3 text-slate-600">
                <Upload className="text-4xl" />
              </div>
              <p className="text-slate-900 text-lg font-semibold leading-tight">
                Drag and drop or browse to upload
              </p>
              <p className="text-slate-500 text-sm leading-normal">
                Max file size: 2GB
              </p>
            </div>
            <label className="flex items-center justify-center gap-2 rounded-md h-10 px-6 bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer">
              <FolderOpen className="text-base" />
              <span className="truncate">Browse Files</span>
              <input type="file" className="hidden" onChange={handleFileChange} disabled={isUploading} />
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}