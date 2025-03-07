import React from "react";

function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Don't make connecting awkward
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          No more fumbling for business cards or searching for lost contacts
          after an event. Jive makes it easy to exchange info and keep the
          conversation going straight from your inbox.
        </p>
        <button className="btn-primary text-lg">Sign up free</button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-jive-yellow opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-jive-coral opacity-20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-jive-teal opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
    </main>
  );
}

export default Home;
