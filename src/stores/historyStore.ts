import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type HistoryStoreType = {
	historySearchData: string[],
	addHistory: (data: string) => void,
	delHistory: (index: number) => void,
	clear: () => void
}
// 存储历史记录数量
const HISTORY_LEN = 6

export const useHistoryStore = create<HistoryStoreType>()(
	persist(
		(set) => ({
			historySearchData: [
				"前端开发面试题",
				"Tailwind CSS教程",
			],
			addHistory: (data: string) => (
				set((state) => {

					// 先过滤掉重复的关键字
					const filteredHistory = state.historySearchData.filter((item) => item !== data)

					// 添加新项到开头并截取前6项
					const newHistory = [data, ...filteredHistory].slice(0, HISTORY_LEN)

					return {
						historySearchData: newHistory
					}
				})
			),
			delHistory: (index: number) => {
				set((state) => {
					const newHistory = [...state.historySearchData];
					newHistory.splice(index, 1);
					return {
						historySearchData: newHistory
					}
				})
			},
			clear: () => {
				set(() => {
					return {
						historySearchData: []
					}
				})
			}
		}),
		{
			name: 'history', // 本地存储中的键名
			// getStorage: () => localStorage
			// 可选：只持久化部分状态
			partialize: (state) => ({ historySearchData: state.historySearchData }),
		}
	)
)