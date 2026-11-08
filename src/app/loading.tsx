export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] dark:bg-[#0d0d0e] flex flex-col items-center justify-center p-6 select-none font-mono text-xs transition-colors">
      <div className="max-w-[680px] w-full flex flex-col items-start gap-2.5">
        <span className="font-mono text-xs font-medium text-[#1a1c1c] dark:text-[#f0f0f2] lowercase tracking-tight">
          abhishek
        </span>
        <div className="w-48 h-[1.5px] bg-[#E5E5E5] dark:bg-[#26262a] overflow-hidden">
          <div className="w-1/2 h-full bg-[#1a1c1c] dark:bg-[#f0f0f2] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
