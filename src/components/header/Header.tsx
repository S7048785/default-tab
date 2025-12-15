import ThemeSwitch from "../theme-switch.tsx";
import SettingButton from "../setting/setting-button.tsx";

export default function Header() {

	return (
		<header className="px-5 pb-10 flex items-center justify-between">
			<div className="">
				asd
			</div>
			{/* right */}
			<div className="ml-auto flex gap-4 items-center ">
				<ThemeSwitch />
				<SettingButton />
			</div>
		</header>
	)
}