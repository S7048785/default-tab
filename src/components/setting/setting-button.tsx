import emitter from "../../plugins/emitter.ts";
import {Settings} from "lucide-react";

export default function SettingButton() {

	const onOpenPopular = () => {
		emitter.emit("open-setting-popular")
	}

	return (
		<>
			<button onClick={onOpenPopular} className={" bg-transparent rounded-lg p-2 inline-flex items-center"}>
				<span className="bg-transparent size-25px text-black dark:text-white duration-500">
					<Settings />
				</span>
			</button>
		</>
	)
}