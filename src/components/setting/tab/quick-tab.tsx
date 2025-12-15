import { useState } from "react";
import { motion } from "motion/react";
import { useQuickAccessStore } from "../../../stores/quickAccessStore";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";

const QuickTab = () => {
  const { items, removeItem, updateItem } = useQuickAccessStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', url: '', icon: '' });

  const handleEdit = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setEditingId(id);
      setEditForm({
        name: item.name,
        url: item.url,
        icon: item.icon || ''
      });
    }
  };

  const handleSave = () => {
    if (editingId) {
      updateItem(editingId, editForm);
      setEditingId(null);
      setEditForm({ name: '', url: '', icon: '' });
    }
  };

  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return '/icons.png';
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="p-4 rounded-lg flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50"
    >

      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm py-8 text-center">
          暂无快捷方式，点击底部的 + 按钮添加
        </p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto overflow-x-hidden scrollbar">
          {items.sort((a, b) => a.order - b.order).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg"
            >
              <img
                src={item.icon || getFavicon(item.url)}
                alt={item.name}
                className="w-8 h-8 rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/icons.png';
                }}
              />
              {editingId === item.id ? (
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="text"
                    value={editForm.url}
                    onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.url}</p>
                </div>
              )}
              <div className="flex gap-1">
                {editingId === item.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditForm({ name: '', url: '', icon: '' });
                      }}
                      className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                    >
                      取消
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                    >
                      <HiOutlinePencilAlt className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="pt-2 text-xs text-gray-500 dark:text-gray-400">
        <p>提示：</p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li>点击底部 Dock 的 + 按钮添加快捷方式</li>
          <li>右键点击 Dock 上的图标可编辑或删除</li>
          <li>快捷方式会自动保存到本地</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default QuickTab;