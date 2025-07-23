import { useState, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      // August 1st, 2025 at midnight EST
      const targetDate = new Date("2025-08-01T00:00:00-05:00");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col relative">
      {/* Countdown overlay - top right */}
      <div className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 shadow-xl">
        <div className="text-xs text-white/80 mb-1">
          Countdown to August 1st
        </div>
        <div className="font-mono text-sm font-semibold">
          {timeLeft.days}d {timeLeft.hours.toString().padStart(2, "0")}h{" "}
          {timeLeft.minutes.toString().padStart(2, "0")}m{" "}
          {timeLeft.seconds.toString().padStart(2, "0")}s
        </div>
      </div>

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

        {/* Mobile floating buttons - middle right, stacked vertically */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-50 flex flex-col gap-3">
          {players.map((player, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-14 h-14 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-md border shadow-xl ${
                activeTab === index
                  ? "bg-white/30 text-white scale-110 border-white/40 shadow-white/20"
                  : "bg-white/10 text-white/90 hover:bg-white/20 border-white/20 hover:border-white/30"
              }`}
            >
              {player.name.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
