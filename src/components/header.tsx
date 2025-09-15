import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--border-color)] px-6 py-4">
      <div className="flex items-center gap-3 text-slate-800">
        <div className="size-8 text-[var(--primary-color)]">
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 8H8V12H4V8ZM4 14H8V18H4V14ZM10 8H14V12H10V8ZM10 14H14V18H10V14ZM16 8H20V12H16V8ZM16 14H20V18H16V14Z"></path>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">
          Meeting Notes
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
