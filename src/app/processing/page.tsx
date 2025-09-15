'use client';

import { Suspense, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingId = searchParams.get('meetingId');

  useEffect(() => {
    if (!meetingId) return;

    const transcribe = async () => {
      try {
        await fetch('/api/transcribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ meetingId }),
        });

        await fetch('/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ meetingId }),
        });

        router.push(`/summary?meetingId=${meetingId}`);
      } catch (error) {
        console.error('Error transcribing audio:', error);
      }
    };

    transcribe();
  }, [meetingId, router]);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg mx-auto text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
          <div className="mb-6">
            <Loader className="mx-auto h-16 w-16 text-primary animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Processing your meeting notes
          </h2>
          <p className="text-slate-500 mb-6">
            We&apos;re working hard to provide you with the best possible summary of
            your meeting. Please wait while we process the audio.
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: '60%' }}
            ></div>
          </div>
          <p className="text-sm text-slate-500">
            Transcription and summarization in progress... This may take a few
            minutes.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProcessingContent />
    </Suspense>
  )
}