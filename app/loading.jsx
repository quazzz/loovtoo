"use client";
function LoadingPage() {
  return (
    <div className="min-h-screen text-gray-900 flex items-center justify-center py-12 font-[family-name:var(--font-geist-sans)]">
      <div className="pb-4 text-center mx-auto">
         Give us a second.
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
}
export default LoadingPage;
