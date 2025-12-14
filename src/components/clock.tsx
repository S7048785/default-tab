import { useEffect, useState } from "react";
export default function Clock() {
  	const [date, setDate] = useState(new Date())
	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date())
		}, 1000)

		return () => clearInterval(timer);
	}, []);
  return (
    <div>
      <p className="text-7xl font-light text-center mb-4">{(formatDateToHHMM(date))}</p>
      <div className="font-light text-center">2025年7月24日 星期四</div>
    </div>
    )
}

function formatDateToHHMM(date: Date) {  
	// 获取小时（0-23）
	const hours = date.getHours();
	// 获取分钟（0-59）
	const minutes = date.getMinutes();

	// 确保小时和分钟是两位数（例如 3 → '03'）
	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMinutes = minutes.toString().padStart(2, '0');

	// 返回 hh:mm 格式
	return `${formattedHours}:${formattedMinutes}`;
}