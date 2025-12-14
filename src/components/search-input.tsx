import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/click-outside.ts";
import "./search-input.less"
import * as React from "react";
import { useHistoryStore } from "../stores/historyStore.ts";
import { cn } from "../lib/class-mergn.ts";
import { searchMap } from "../lib/selectEngine.ts";

export default function SearchInput() {

	const historyStore = useHistoryStore()

	const [isShow, setIsShow] = useState(true)

	// 搜索框输入框状态
	const [searchState, setSearchState] = useState('')
	// 搜索框
	const inputRef = useRef<HTMLInputElement | null>(null)
	// 历史搜索下拉菜单
	const menuRef = useRef<HTMLInputElement | null>(null)
	useClickOutside([inputRef, menuRef], () => {
		setIsShow(false)
	})
	useEffect(() => {
		// 搜索框聚焦
		inputRef.current?.focus()
	}, []);

	// 搜索
	const handleHistoryClick = (keyword?: string) => {
		if (!keyword) {
			return;
		}
		setSearchState(keyword)
		setIsShow(false)

		historyStore.addHistory(keyword.trim())

		const searchName = localStorage.getItem('search-engine') || "Bing"
		const url = searchMap.get(searchName)

		window.location.href = url + encodeURIComponent(keyword)
	}

	// 清空输入框事件
	const onSearchInput = (event: React.KeyboardEvent | undefined) => {
		if (event?.key === 'Escape') {
			return setSearchState("")
		}
	}

	const onSubmit = (event: React.FormEvent<HTMLFormElement> | undefined) => {
		event?.preventDefault()

		handleHistoryClick(inputRef.current?.value)
	}

	// 删除历史搜索
	const handleDeleteHistory = (index: number, event: React.MouseEvent | undefined) => {
		historyStore.delHistory(index)
		event?.stopPropagation()
	}

	return (
		<>
			<div className={"relative w-160 flex flex-col"}>
				<motion.form
					onSubmit={onSubmit}
					initial={{ scale: 1, width: "50%", opacity: 0.5 }}
					animate={isShow || searchState.length > 0 ? { width: "100%" } : { scale: 0.8, width: "50%", opacity: 0.5 }}
					transition={{ duration: 0.2, ease: "backOut" }}
					className={"mx-auto"}
				>
					<div className={"h-14 rounded-full dark:bg-[#49515f] bg-white px-6 flex duration-300 shadow-lg items-center w-full"}>
						<input id="select"
							ref={inputRef}
							value={searchState}
							onChange={(e) => setSearchState(e.target.value)}
							onKeyDown={onSearchInput}
							onMouseEnter={() => { setIsShow(true); inputRef.current?.focus() }}
							className="border-none outline-none text-lg flex-1 h-full bg-transparent dark:text-white"
							type="text"
							placeholder="搜索"
						/>
					</div>
				</motion.form>

				{/*下拉菜单 历史记录*/}
				{
					isShow && <motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, bounce: 0.5, type: "spring" }}
						ref={menuRef}
						style={{ display: historyStore.historySearchData.length > 0 ? "block" : "none" }}
						className="w-full absolute rounded-lg -z-10 dark:bg-[#ffffff11] bg-[#ffffff66] backdrop-blur-lg top-18 ">
						{/* 玻璃背景 */}
						{/*<div className={"border-1 -z-10 rounded-lg absolute top-0 size-full"}/>*/}
						{/* 头部 */}
						<div className={"mt-3 mb-5"}>
							<div className={"px-4 inline-flex justify-between w-full text-sm mb-1"}>
								<span className={"dark:text-gray-300"}>搜索历史</span>
								<span onClick={() => { historyStore.clear() }} className={"ml-auto cursor-pointer dark:text-gray hover:text-gray-800 dark:hover:text-gray-200"}>清除历史</span >
							</div>

							{/* 历史搜索数据*/}
							<div className={"mx-2"}>
								{
									historyStore.historySearchData.map((item, index) => (
										<div onClick={() => {
											handleHistoryClick(item)
										}} key={item} className={"history my-2 p-2 py-3 rounded-lg flex justify-between cursor-pointer hover:bg-[#66666611] dark:hover:bg-[#ffffff22]"}>
											<div className={"inline-flex items-center gap-2"}>
												<svg width="20" height="20" viewBox="0 0 15 15" className="fill-[#aaa] dark:fill-[#f2f2f288]" xmlns="http://www.w3.org/2000/svg">
													<path d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z"></path>
												</svg>
												<span>{item}</span>
											</div>
											<button onClick={(event) => {
												handleDeleteHistory(index, event)
											}} className={"inline-flex items-center mr-2 cursor-pointer"}>
												<svg width="15" height="15" viewBox="0 0 15 15" className={"dark:hover:fill-[#f2f2f2]!"} xmlns="http://www.w3.org/2000/svg">
													<path stroke="#f2f2f288" strokeWidth="1" d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"></path>
												</svg>
											</button>
										</div>
									))
								}

							</div>

						</div>
					</motion.div>
				}
			</div>

		</>

	);
}