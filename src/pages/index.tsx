import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const players = [
    {
      name: "Yusuf",
      url: "https://mobalytics.gg/lol/profile/na/12th%20planet-na1/overview",
    },
    {
      name: "Colton",
      url: "https://mobalytics.gg/lol/profile/na/rabin-na1/overview",
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Desktop: Split-screen view */}
      <div className="hidden md:flex h-full">
        {/* Left iframe - First player */}
        <div className="w-1/2 h-full border-r border-gray-300">
          <iframe
            src={players[0].url}
            className="w-full h-full border-0"
            title={`${players[0].name} Profile`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
          />
        </div>

        {/* Right iframe - Second player */}
        <div className="w-1/2 h-full">
          <iframe
            src={players[1].url}
            className="w-full h-full border-0"
            title={`${players[1].name} Profile`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
          />
        </div>
      </div>

      {/* Mobile: Tab view */}
      <div className="md:hidden flex flex-col h-full">
        {/* Mobile iframe content - keep both loaded but show/hide */}
        <div className="flex-1 relative">
          {players.map((player, index) => (
            <iframe
              key={index}
              src={player.url}
              className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-200 ${
                activeTab === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              title={`${player.name} Profile`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
            />
          ))}
        </div>

        {/* Mobile tab switcher at bottom */}
        <div className="flex bg-gray-100 border-t border-gray-300">
          {players.map((player, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {player.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
