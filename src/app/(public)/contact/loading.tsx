export default function ContactLoading() {
  return (
    <div className="bg-[#0F0F0F] text-[#FFFFFF] min-h-screen font-sans antialiased overflow-x-hidden pt-20 animate-pulse">
      {/* Contact Section Skeleton */}
      <section className="py-20 px-container-margin">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center gap-sm mb-16">
            <div className="h-8 bg-[#262626] rounded-lg w-48"></div>
            <div className="h-4 bg-[#262626] rounded-md w-96"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side cards */}
            <div className="flex flex-col gap-8">
              <div className="bg-[#181818] border border-[#323232] p-6 rounded-2xl h-32"></div>
              <div className="bg-[#181818] border border-[#323232] p-6 rounded-2xl h-32"></div>
              <div className="bg-[#181818] border border-[#323232] p-6 rounded-2xl h-32"></div>
            </div>
            {/* Right side hours card */}
            <div className="bg-[#181818] border border-[#323232] p-6 rounded-2xl h-full min-h-[300px]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
