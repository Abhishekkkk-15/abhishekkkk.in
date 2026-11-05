export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] dark:bg-[#0d0d0e] flex flex-col items-center justify-center p-6 select-none font-mono text-xs">
      <div className="max-w-[680px] w-full flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[#5e5e5e] dark:text-[#9e9ea6]">abhishek.in // reading 680px buffer...</span>
        </div>
        <div className="w-48 h-[1.5px] bg-[#E5E5E5] dark:bg-[#26262a] overflow-hidden">
          <div className="w-1/2 h-full bg-[#1a1c1c] dark:bg-[#f0f0f2] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
