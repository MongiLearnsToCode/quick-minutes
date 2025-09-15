import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MoreVertical, PlusCircle, Search } from "lucide-react";

export default function MeetingsPage() {
  return (
    <main className="flex-1 px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            All Meetings
          </h2>
          <Button className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm">
            <PlusCircle className="h-5 w-5" />
            <span>New Meeting</span>
          </Button>
        </div>
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)]" />
            <Input
              className="w-full rounded-md border border-[var(--border-color)] bg-white py-2 pl-10 pr-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
              placeholder="Search meetings by title, date, or participants"
              type="text"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1.5 rounded-md border border-[var(--border-color)] bg-white px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-slate-50"
            >
              <span>Date</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-1.5 rounded-md border border-[var(--border-color)] bg-white px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-slate-50"
            >
              <span>Participants</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-color)] bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Project Kickoff</TableCell>
                <TableCell>Mar 15, 2024</TableCell>
                <TableCell>Alex, Sarah, Mike</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
