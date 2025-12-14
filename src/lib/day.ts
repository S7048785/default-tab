export function formatDateToHHMM(date: Date) {
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