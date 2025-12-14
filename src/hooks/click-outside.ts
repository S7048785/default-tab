import {type RefObject, useEffect} from 'react';

/**
 * 点击非目标元素时 执行回调函数
 * @param refs 目标元素
 * @param callback 回调函数
 */
export function useClickOutside(refs: RefObject<HTMLInputElement | null>[], callback: () => void) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			let inRefs = false;
			refs.forEach((ref) => {
				// 检测点击的元素是否在 refs 中
				if (ref.current && ref.current.contains(event.target as Node)) {
					inRefs = true
				}
			});

			// 点击元素 如果不在 refs 中，则执行回调函数
			if (!inRefs) {
				callback();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [refs, callback]);
}