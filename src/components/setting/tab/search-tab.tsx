import {motion} from "motion/react"
import SearchRadio from "../../search/SearchRadio.tsx";
const SearchTab = () => {
	return (
		<div className="h-full">
			<motion.div
				initial={{x: -20, opacity: 0}}
				animate={{x: 0, opacity: 1}}
				className={"h-full"}>
				<SearchRadio/>
			</motion.div>
		</div>
	)
}

export default SearchTab