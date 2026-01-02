import LogoLarge from "../assets/images/logo-large.svg";
import LogoSmall from "../assets/images/logo-small.svg";
import Trophy from "../assets/images/icon-personal-best.svg";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { state } = useAppContext();
  const currentLevelBest =
    state.bestScores[state.level.toLowerCase() as "easy" | "medium" | "hard"];

  const formatTime = () => {
    if (state.clock < 10) {
      return `0:0${state.clock}`;
    } else {
      return `0:${state.clock}`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-20 w-full px-6 py-3 md:py-5 bg-[#121212] backdrop-blur-xl flex items-center justify-between">
      <div className="">
        <img
          src={LogoLarge}
          alt="test typing logo large"
          className="hidden md:block"
        />
        <img
          src={LogoSmall}
          alt="test typing logo small"
          className="block md:hidden"
        />
      </div>
      <div className="flex items-center gap-2 flex-row justify-center">
        <p className="text-[#949497] text-base m-0 md:text-lg">Time:</p>
        <p
          className={`${
            state.clock < 10
              ? "text-[#D64D5B]"
              : state.clock >= 10 && state.clock <= 20
              ? "text-[#F4DC73]"
              : "text-white"
          } font-bold m-0 text-xl md:text-lg`}
        >
          {formatTime()}
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <img src={Trophy} alt="new personal best trophy" />
          <p className="hidden md:block text-[#949497] text-base">
            Personal best:{" "}
            <span className="text-white">{currentLevelBest} WPM</span>
          </p>
          <p className="block md:hidden text-[#949497] text-base">
            Best: <span className="text-white">{currentLevelBest} WPM</span>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Header;
