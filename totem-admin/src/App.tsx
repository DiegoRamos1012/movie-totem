import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8 text-center">
        <div className="flex justify-center gap-4">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img
              src={viteLogo}
              className="h-[6em] p-6 transition duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
              style={{ willChange: "filter" }}
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img
              src={reactLogo}
              className="h-[6em] p-6 transition duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]"
              style={{ willChange: "filter" }}
              alt="React logo"
            />
          </a>
        </div>

        <h1 className="mt-6 text-2xl font-semibold">Vite + React</h1>

        <div className="card p-8 mt-6 bg-gray-800 rounded-lg shadow-sm">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setCount((c) => c + 1)}
          >
            count is {count}
          </button>
          <p className="mt-4">
            Edit{" "}
            <code className="bg-gray-700 text-white px-1 rounded">
              src/App.tsx
            </code>{" "}
            and save to test HMR
          </p>
        </div>

        <p className="read-the-docs mt-6 text-gray-300">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
