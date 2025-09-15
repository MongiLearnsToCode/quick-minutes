'use client';

import { Suspense, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from 'next/navigation';

interface Segment {
  speaker: string;
  text: string;
}

interface Transcript {
  content: Segment[];
}

function TranscriptContent() {
  const searchParams = useSearchParams();
  const meetingId = searchParams.get('meetingId');
  const [transcript, setTranscript] = useState<Transcript | null>(null);

  useEffect(() => {
    if (!meetingId) return;

    const fetchTranscript = async () => {
      const response = await fetch(`/api/meetings/${meetingId}`);
      const { transcript } = await response.json();
      setTranscript(transcript);
    };

    fetchTranscript();
  }, [meetingId]);

  if (!transcript) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Meeting Transcript
          </h1>
          <p className="mt-1 text-slate-500">
            Full, unedited transcript of the meeting
          </p>
        </div>
        <div className="mb-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <Input
              className="block w-full rounded-md border-slate-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
              placeholder="Search transcript..."
              type="search"
            />
          </div>
        </div>
        <div className="space-y-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
          {transcript.content.map((item: Segment, index: number) => (
            <div className="flex items-start gap-4" key={index}>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600`}
              >
                S{item.speaker}
              </span>
              <div className="flex-1">
                <p className="font-medium text-slate-800">
                  Speaker {item.speaker}
                </p>
                <p className="text-slate-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function TranscriptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TranscriptContent />
    </Suspense>
  )
}