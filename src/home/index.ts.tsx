import SearchInput from "../components/search-input.tsx";
import Header from "../components/header.tsx";
import SettingPopular from "../components/setting/setting-popular.tsx";
import Clock from "../components/clock.tsx";
import Footer from "../components/footer.tsx";

export default function Home() {

	return (
		<div className="h-screen overflow-hidden">
			{/* 背景装饰 */}
			<div className="absolute top-1/8 left-1/7 rounded-full blur-3xl bg-[#165dff1a] opacity-80 size-140"></div>
			<div className="absolute top-1/6 right-1/4 rounded-full blur-3xl bg-[#722ed11a] opacity-80 size-140"></div>

			<div className="text-light-text dark:text-dark-text bg-gradient-to-br from-light-from to-light-to dark:from-dark-from dark:to-dark-to flex flex-col h-full p-5">
				<Header/>
				<main className="flex flex-col flex-1 gap-8 items-center relative top-10">
					<div className="">
						<Clock/>
					</div>
					{/*	搜索框*/}
					<div className="z-10 ">
						<SearchInput/>
					</div>

				</main>
				<footer>
						<Footer/>
				</footer>

			</div>
			{/* 设置弹窗 */}
			<SettingPopular/>
		</div>

	)
}
