'use client';

import { Suspense, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Share, FileText } from "lucide-react";
import { useSearchParams } from 'next/navigation';

interface Meeting {
  id: string;
  title: string;
  createdAt: string;
}

interface Summary {
  content: string;
  actionItems: string[];
}

function SummaryContent() {
  const searchParams = useSearchParams();
  const meetingId = searchParams.get('meetingId');
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    if (!meetingId) return;

    const fetchMeeting = async () => {
      const response = await fetch(`/api/meetings/${meetingId}`);
      const { meeting, summary } = await response.json();
      setMeeting(meeting);
      setSummary(summary);
    };

    fetchMeeting();
  }, [meetingId]);

  if (!meeting || !summary) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {meeting.title}
            </h1>
            <p className="mt-1 text-slate-500">
              {new Date(meeting.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(summary?.content || '')}>
              <Share className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const blob = new Blob([summary?.content || ""], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${meeting?.title}-summary.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              TXT
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <div className="rounded-md border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Meeting Summary
              </h2>
              <p className="text-sm text-slate-600">AI-generated summary</p>
            </div>
            <div className="mt-6 space-y-8" contentEditable="true">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Key Points
                </h3>
                <p className="mt-2 text-slate-700">{summary.content}</p>
              </div>
              {summary.actionItems && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Action Items
                  </h3>
                  <div className="mt-3 space-y-3">
                    {summary.actionItems.map((item: string, index: number) => (
                      <div className="flex items-start gap-3" key={index}>
                        <Checkbox id={`action-item-${index}`} />
                        <label
                          htmlFor={`action-item-${index}`}
                          className="text-sm text-slate-700"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SummaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SummaryContent />
    </Suspense>
  )
}