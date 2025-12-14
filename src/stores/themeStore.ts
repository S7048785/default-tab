import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export type ThemeStoreType = {
	isDark: boolean,
	toggleTheme: () => void
}

// 创建 store
const useThemeStore = create<ThemeStoreType>()(
	persist(
		(set) => ({

			isDark: false,

			toggleTheme: () => {
				document.documentElement.classList.toggle('dark')
				return set((state: ThemeStoreType) => {
					return {
						isDark: !state.isDark
					}
				})
			}
		}),
		{
			name: 'theme',// 本地存储中的键名
// 也可以使用 sessionStorage
			// 可选：只持久化部分状态
			partialize: (state: ThemeStoreType) => ({ isDark: state.isDark }),
		}
	)
)

export default useThemeStore;