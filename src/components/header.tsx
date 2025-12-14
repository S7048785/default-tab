import ThemeSwitch from "./theme-switch.tsx";
import useThemeStore from "../stores/themeStore.ts";
import SettingButton from "./setting/setting-button.tsx";

export default function Header() {
	const toggleTheme = useThemeStore().toggleTheme
	const themeState = useThemeStore((state) => state.isDark)
	return (
		<header className="px-5 pb-10 pt-5 flex items-center">
			<div className="">

			</div>
			{/* right */}
			<div className="ml-auto flex gap-4 items-center ">
				<ThemeSwitch value={themeState} onSwitch={toggleTheme} />
				<SettingButton />
			</div>
		</header>
	)
}