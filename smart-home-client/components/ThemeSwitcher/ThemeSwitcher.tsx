import { useTheme } from "next-themes";
import styles from "./ThemeSwitcher.module.scss";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.switcher}>
      The current theme is: {theme}
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
};

export default ThemeSwitcher;
