import Wrapper from "../../other/Wrapper";
import useLocalStorage from "./useLocalStorage";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const handleThemeSwitcher = () => {
    console.log(theme);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className="bg-black text-white dark:bg-white dark:text-black transition-all"
      data-theme={theme}
    >
      <Wrapper heading="Theme Switcher" isFlex>
        <button
          className="bg-white text-black dark:bg-black dark:text-white py-3 px-6 rounded-lg cursor-pointer transition-all active:scale-95"
          onClick={handleThemeSwitcher}
        >
          Change Theme
        </button>
      </Wrapper>
    </div>
  );
};

export default ThemeSwitcher;
