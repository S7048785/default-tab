import {useEffect, useMemo, useRef, useState} from "react";
import {cn} from "@/lib/class-mergn.ts";
import {motion, AnimatePresence} from "motion/react"
import {useClickOutside} from "@/hooks/click-outside.ts";
import "./setting.module.css"
import {FaBorderAll, FaInfoCircle, FaPalette, FaSearch} from 'react-icons/fa';
import emitter from "../../plugins/emitter.ts";
import QuickTab from "./tab/quick-tab.tsx";
import SearchTab from "./tab/search-tab.tsx";
import WallTab from "./tab/wall-tab.tsx";

const tabList = [
	{
		value: "",
		title: "快捷访问",
		icon: <FaBorderAll/>,
		element: QuickTab
	},
	{
		value: "tab1",
		title: "搜素引擎",
		icon: <FaSearch/>,
		element: SearchTab
	},
	{
		value: "tab2",
		title: "外观",
		icon: <FaPalette/>,
		element: WallTab
	},
	{
		value: "tab3",
		title: "关于",
		icon: <FaInfoCircle/>,
		element: WallTab
	}
]

export default function SettingPopular() {
	/**
	 * 设置当前选中的标签页索引状态
	 * @param selectTabIndex - 当前选中的标签页索引
	 * @param setSelectTabIndex - 设置选中标签页索引的函数
	 */
	const [selectTabIndex, setSelectTabIndex] = useState(0)

	/**
	 * 设置模态框是否打开的状态
	 * @param isOpen - 模态框打开状态标识
	 * @param setIsOpen - 设置模态框打开状态的函数
	 */
	const [isOpen, setIsOpen] = useState(false)

	/**
	 * 模态框DOM元素的引用
	 */
	const modal = useRef(null)


	/**
	 * 根据当前选中的标签页索引获取对应的组件
	 * @returns 返回当前选中标签页对应的React组件
	 */
	const TabComponent = useMemo(() => {
		return tabList[selectTabIndex].element;
	}, [selectTabIndex]);

	/**
	 * 组件挂载时注册事件监听器
	 */
	useEffect(() => {
		emitter.on("open-setting-popular", onOpenPopular)
	}, []);

	/**
	 * 打开热门设置模态框的回调函数
	 */
	const onOpenPopular = () => {
		setIsOpen(true)
	}

	/**
	 * 监听模态框外部点击事件，点击外部区域时关闭模态框
	 */
	useClickOutside([modal], () => {
		setIsOpen(false)
	})



	return (
		<>
			<AnimatePresence>
				{isOpen &&
					<motion.div
						animate={{y: 0, backdropFilter: "blur(5px)"}}
						exit={{backdropFilter: "blur(0px)"}}
						transition={{duration: 0.3}}
						className={cn("fixed top-0 left-0 size-full flex items-center justify-center z-999")}
					>
						<motion.div
							initial={{opacity: 0, scale: 0.5}}
							animate={{opacity: 1, scale: 1, transition: {duration: 0.3, ease: "backOut"}}}
							exit={{opacity: 0}}
							ref={modal}
							className="w-[60%] flex backdrop-blur-md shadow-md">
							<div className="flex overflow-hidden flex-col w-[25%] rounded-l-lg border-r-solid border border-gray-300 dark:border-gray-700 bg-[#f9fafb] dark:bg-[#18212f]">
								<p className={"text-black dark:text-gray-100 text-lg font-bold border-b-solid border border-gray-300 dark:border-gray-700 p-4"}>设置</p>
								<div className={"relative"}>
									{
										tabList.map((item, index) => (
											<motion.div
												initial={{opacity: 0, x: 50, filter: "blur(5px)"}}
												animate={{opacity: 1, x: 0, filter: "blur(0px)"}}
												transition={{delay: (index + 1) * 0.1}}
												className={cn("text-md my-2 ml-2 relative after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-0.5 cursor-pointer")}
												onClick={() => {
													setSelectTabIndex(index)
												}}
												key={index}
											>
												<div className={cn("duration-300 h-9.25 p-2 flex items-center gap-2 text-gray-500 dark:text-gray dark:hover:text-gray-100 hover:translate-x-2 ", {"translate-x-2 text-gray-800 dark:text-gray-100": selectTabIndex === index})}>
													{item.icon}
													{item.title}
												</div>
											</motion.div>
										))
									}
									<div
										style={{
											transform: `translateY(${selectTabIndex * 45}px)`
										}}
										className={"absolute top-[8px] left-0 w-0.5 transition h-[37px] bg-cyan-600"}></div>
								</div>
							</div>
							<div className="min-h-120 p-5 flex-1 overflow-y rounded-r-lg bg-white dark:bg-[#111827]">
								<p className={"text-xl mb-5 dark:text-white font-bold"}>{tabList[selectTabIndex].title}</p>
								<div className="flex-1">
									<TabComponent />
								</div>
							</div>
						</motion.div>
					</motion.div>
				}
			</AnimatePresence>
		</>
	)
}