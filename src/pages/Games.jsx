import React from "react";
import SnakeGame from "../components/SnakeGame";

function Games() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <section className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-12 text-center">Games</h1>

        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Snake Game</h2>
          <p className="text-gray-600 mb-8 text-center">
            Use the arrow keys to control the snake. Collect the red food to
            grow longer, but don't hit yourself!
          </p>
          <div className="flex justify-center">
            <SnakeGame />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Games;
