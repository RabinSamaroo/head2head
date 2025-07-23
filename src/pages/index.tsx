export default function Home() {
  return (
    <div className="h-screen w-screen flex">
      {/* Left iframe - First OP.GG instance */}
      <div className="w-1/2 h-full border-r border-gray-300">
        <iframe
          src="/api/proxy?url=https://u.gg/lol/profile/na1/rabin-na1/overview"
          className="w-full h-full border-0"
          title="OP.GG Player 1"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
        />
      </div>

      {/* Right iframe - Second OP.GG instance */}
      <div className="w-1/2 h-full">
        <iframe
          src="/api/proxy?url=https://www.u.gg"
          className="w-full h-full border-0"
          title="OP.GG Player 2"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
        />
      </div>
    </div>
  );
}
