// 使用 Map 存储搜索引擎数据
export const searchMap = new Map<string, string>([
	["Bing", "https://cn.bing.com/search?q="],
	["夸克", "https://ai.quark.cn/s/L3DSAFOJSC13Hv7PnZ?q="],
	["百度", "https://www.baidu.com/s?wd="],
	["Yandex", "https://yandex.com/search?text="],
	["Google", "https://www.google.com/"],
	["DuckDuckGo", "https://duckduckgo.com/?q="],
]);

// 如果需要将 Map 转换为数组形式，可以使用以下方法
export const searchArray = Array.from(searchMap, ([name, URL]) => ({ name, URL }));
