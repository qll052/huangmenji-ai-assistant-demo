import type { InventoryItem } from '../types';

export const mockInventory: InventoryItem[] = [
  { id: 'inv-1', name: '鸡腿肉', category: '主食材', current: 12, unit: 'kg', threshold: 20, suggested: 28 },
  { id: 'inv-2', name: '香菇', category: '辅料', current: 4, unit: 'kg', threshold: 6, suggested: 8 },
  { id: 'inv-3', name: '青椒', category: '辅料', current: 7, unit: 'kg', threshold: 5, suggested: 0 },
  { id: 'inv-4', name: '米饭', category: '主食材', current: 18, unit: 'kg', threshold: 15, suggested: 0 },
  { id: 'inv-5', name: '酱料包', category: '辅料', current: 22, unit: '袋', threshold: 30, suggested: 40 },
  { id: 'inv-6', name: '可乐', category: '饮品', current: 9, unit: '箱', threshold: 10, suggested: 6 },
];
