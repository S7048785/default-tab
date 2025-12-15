"use client"

import React, { useRef, useState, useEffect } from "react"
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'
import { AnimatePresence } from 'motion/react'

import { cn } from "@/lib/utils.ts"
import { buttonVariants } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip.tsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dock, DockIcon } from "@/components/ui/dock.tsx"
import {motion} from "motion/react";
import { useQuickAccessStore, type QuickAccessItem } from "@/stores/quickAccessStore.ts"


export function DockDemo() {
	const [open, setOpen] = React.useState(false)
	const [showMenu, setShowMenu] = useState<string | null>(null);
	const [editingItem, setEditingItem] = useState<QuickAccessItem | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const { items, removeItem } = useQuickAccessStore();

	// 点击外部关闭菜单
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowMenu(null);
			}
		};

		if (showMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showMenu]);

	const getFavicon = (url: string) => {
		try {
			const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
			return `${domain}/favicon.ico`;
		} catch {
			return '/icons.png';
		}
	};

	const handleItemClick = (item: QuickAccessItem) => {
		window.open(item.url.startsWith('http') ? item.url : `https://${item.url}`, '_blank');
	};



	return (
		<div className="flex flex-col items-center justify-center">
			<TooltipProvider delayDuration={0}>
				<Dock direction="middle">
					{items
						.sort((a, b) => a.order - b.order)
						.map((item, _) => (
							<DockIcon key={item.id}>
								<div className="relative">
									<Tooltip>
										<TooltipTrigger asChild>
											<motion.button
												whileHover={{ scale: 1.1, y: -5 }}
												whileTap={{ scale: 0.95 }}
												onClick={() => handleItemClick(item)}
												onContextMenu={(e) => {
													e.preventDefault();
													setShowMenu(item.id);
												}}
												className={cn(
													buttonVariants({ variant: "ghost", size: "icon" }),
													"size-12 rounded-full relative"
												)}
											>
												<img
													src={item.icon || getFavicon(item.url)}
													alt={item.name}
													className="size-6"
													onError={(e) => {
														const target = e.target as HTMLImageElement;
														target.src = '/icons.png';
													}}
												/>
											</motion.button>
										</TooltipTrigger>
										<TooltipContent>
											<p>{item.name}</p>
										</TooltipContent>
									</Tooltip>

									{showMenu === item.id && (
										<motion.div
											ref={menuRef}
											initial={{ opacity: 0, scale: 0.95 }}
											animate={{ opacity: 1, scale: 1 }}
											className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 flex gap-1 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
										>
											<button
												onClick={() => {
													setEditingItem(item);
													setShowMenu(null);
												}}
												className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
											>
												<HiOutlinePencil className="w-4 h-4" />
											</button>
											<button
												onClick={() => {
													removeItem(item.id);
													setShowMenu(null);
												}}
												className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-red-500"
											>
												<HiOutlineTrash className="w-4 h-4" />
											</button>
										</motion.div>
									)}
								</div>
							</DockIcon>
						))}

					<Separator orientation="vertical" className="h-full" />
					<motion.button
						whileHover={{ scale: 1.1, rotate: 90 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setOpen(true)}
						className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
					>
						<HiOutlinePlus className="w-6 h-6 text-gray-600 dark:text-gray-400" />
					</motion.button>
				</Dock>
			</TooltipProvider>

				{/* 添加弹窗 */}
				<AnimatePresence>
					{open && (
						<AddModal
							showAddForm={open}
							setShowAddForm={setOpen}
						/>
					)}
				</AnimatePresence>

				{/* 编辑弹窗 */}
				<AnimatePresence>
					{editingItem && (
						<EditModal
							item={editingItem}
							onClose={() => setEditingItem(null)}
						/>
					)}
				</AnimatePresence>
		</div>
	)
}

// 编辑弹窗组件
const EditModal = ({ item, onClose }: { item: QuickAccessItem; onClose: () => void }) => {
	const { updateItem } = useQuickAccessStore();
	const [formData, setFormData] = useState({
		name: item.name,
		url: item.url,
		icon: item.icon || '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateItem(item.id, formData);
		onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-white/30 dark:bg-black/30 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: "backOut" } }}
				exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
				onClick={(e) => e.stopPropagation()}
				className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 w-96 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
			>
				<h3 className="text-lg font-semibold mb-4 dark:text-gray-100">编辑快捷方式</h3>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							名称
						</Label>
						<Input
							id="edit-name"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="例如：GitHub"
							required
						/>
					</div>
					<div>
						<Label htmlFor="edit-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							URL
						</Label>
						<Input
							id="edit-url"
							value={formData.url}
							onChange={(e) => setFormData({ ...formData, url: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="例如：github.com"
							required
						/>
					</div>
					<div>
						<Label htmlFor="edit-icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							图标 URL（可选）
						</Label>
						<Input
							id="edit-icon"
							value={formData.icon}
							onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="留空将自动获取网站图标"
						/>
					</div>
					<div className="flex gap-2 pt-2">
						<Button
							type="button"
							onClick={onClose}
							variant="outline"
							className="flex-1"
						>
							取消
						</Button>
						<Button
							type="submit"
							className="flex-1"
						>
							保存
						</Button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

// 添加弹窗组件
const AddModal = ({setShowAddForm}: {showAddForm: boolean, setShowAddForm: (show: boolean) => void}) => {
	const { addItem } = useQuickAccessStore();
	const [formData, setFormData] = useState({
		name: '',
		url: '',
		icon: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		addItem(formData);
		setShowAddForm(false);
		setFormData({ name: '', url: '', icon: '' });
	};

	return (
		<div
			className="fixed inset-0 bg-white/30 dark:bg-black/30 flex items-center justify-center z-50"
			onClick={() => setShowAddForm(false)}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: "backOut" } }}
				exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
				onClick={(e) => e.stopPropagation()}
				className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 w-96 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
			>
				<h3 className="text-lg font-semibold mb-4 dark:text-gray-100">添加快捷方式</h3>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="add-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							名称
						</Label>
						<Input
							id="add-name"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="例如：GitHub"
							required
						/>
					</div>
					<div>
						<Label htmlFor="add-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							URL
						</Label>
						<Input
							id="add-url"
							value={formData.url}
							onChange={(e) => setFormData({ ...formData, url: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="例如：github.com"
							required
						/>
					</div>
					<div>
						<Label htmlFor="add-icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							图标 URL（可选）
						</Label>
						<Input
							id="add-icon"
							value={formData.icon}
							onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="留空将自动获取网站图标"
						/>
					</div>
					<div className="flex gap-2 pt-2">
						<Button
							type="button"
							onClick={() => setShowAddForm(false)}
							variant="outline"
							className="flex-1"
						>
							取消
						</Button>
						<Button
							type="submit"
							className="flex-1"
						>
							添加
						</Button>
					</div>
				</form>
			</motion.div>
		</div>
	)
}