export default function Home() {
  return (
    <main className="min-h-screen">
      
      <div className="relative h-screen w-full">
        
        <img
          src="/images/homepage/hero-jungle-mountain.png"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 z-[99999] flex items-center justify-center">
          <div className="bg-red-500 p-10 text-6xl font-bold text-white">
            PAGE TEST
          </div>
        </div>

      </div>

    </main>
  );
}