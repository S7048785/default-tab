
const WallTab = function () {
	return (
		<div className="p-4 rounded-lg flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50">
			<p>简洁标签页</p>
			<p className="text-sm text-gray-500 dark:text-gray-400">
				<p>版本 v1.0.0</p>
				<p>一个轻量简约的浏览器标签页</p>
			</p>
			<hr/>
			<div>
				<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">功能特点</p>
				<ul className=" list-inside text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-1">
					<li>✅ 简洁的标签页界面</li>
					<li>✅ 自定义图标和名称</li>
					<li>✅ 快速访问常用网站</li>
					<li>✅ 深色/浅色主题切换</li>
				</ul>
			</div>
		</div>
	)
}

export default WallTab