import {useState} from "react";
import {motion} from "motion/react"

const QuickTab = () => {
	const [quickWebsite, setQuickWebsite] = useState({
		name: "",
		url: ""
	})
	return (
		<motion.div
			initial={{x: -20, opacity: 0}}
			animate={{x: 0, opacity: 1}}
			className={"p-4 rounded-lg flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50"}>
			<p className={"text-sm dark:text-gray"}>添加新快捷方式</p>
			<div className={"flex flex-col"}>
				<span className={"text-gray text-sm"}>网站名称</span>
				<input
					type="text"
					placeholder={"例如: Google"}
					className={"rounded-lg bg-white dark:bg-gray-700 dark:text-gray border border-gray p-3 border-solid "}
					value={quickWebsite.name}
					onChange={(event) => setQuickWebsite({...quickWebsite, name: event.target.value})}/>
			</div>
			<div className={"flex flex-col"}>
				<span className={"text-gray text-sm"}>网站URL</span>
				<input
					type="text"
					placeholder={"例如: https://google.com"}
					className={"rounded-lg dark:bg-[#374151] dark:text-gray border border-gray p-3 border-solid "}
					value={quickWebsite.url}
					onChange={(event) => setQuickWebsite({...quickWebsite, url: event.target.value})}/>
			</div>
			<button className={"bg-blue-500 hover:bg-blue-600 rounded-lg text-white py-3 mt-4"}>添加快捷方式</button>


		</motion.div>
	)
}

export default QuickTab