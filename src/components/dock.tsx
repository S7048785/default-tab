import {useRef, useState} from 'react';
import { motion } from 'motion/react';
import { useQuickAccessStore, type QuickAccessItem } from '../stores/quickAccessStore';
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi';
// import {useClickOutside} from '../hooks/click-outside';

const Dock = () => {
  const { items, removeItem} = useQuickAccessStore();
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<QuickAccessItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  // useClickOutside([menuRef], () => setShowMenu(null));

  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return '/icons.png';
    }
  };

  const handleItemClick = (item: QuickAccessItem) => {
    window.open(item.url.startsWith('http') ? item.url : `https://${item.url}`, '_blank');
  };

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className=""
      >
        <div className="flex items-center gap-2 px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          {items
            .sort((a, b) => a.order - b.order)
            .map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleItemClick(item)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setShowMenu(item.id);
                  }}
                  className="relative group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <img
                      src={item.icon || getFavicon(item.url)}
                      alt={item.name}
                      className="w-8 h-8 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/icons.png';
                      }}
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded whitespace-nowrap"
                  >
                    {item.name}
                  </motion.div>
                </motion.button>

                {showMenu === item.id && (
                  <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 flex gap-1 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
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
              </motion.div>
            ))}

          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <HiOutlinePlus className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
      </motion.div>

      {/* 编辑弹窗 */}
      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}

      {/* 添加弹窗 */}
      {showAddForm && (
        <AddModal
          onClose={() => setShowAddForm(false)}
        />
      )}
    </>
  );
};

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 shadow-2xl"
      >
        <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">编辑快捷方式</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              名称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              图标 URL（可选）
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="留空将自动获取网站图标"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              保存
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
            >
              取消
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// 添加弹窗组件
const AddModal = ({ onClose }: { onClose: () => void }) => {
  const { addItem } = useQuickAccessStore();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(formData);
    onClose();
    setFormData({ name: '', url: '', icon: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 shadow-2xl"
      >
        <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">添加快捷方式</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              名称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="例如：GitHub"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="例如：github.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              图标 URL（可选）
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="留空将自动获取网站图标"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              添加
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
            >
              取消
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Dock;