import { create } from 'zustand';
import { mockInventory } from '../mock/inventory';
import { mockSales } from '../mock/sales';
import { mockStoreInfo, mockTemplates } from '../mock/store';
import { mockTasks } from '../mock/tasks';
import type { ChatMessage, InventoryItem, KnowledgeTemplate, SalesPeriod, StoreInfo, Task } from '../types';
import { generateAnalysisConclusion, generateOperationStrategy } from '../utils/analysis';

interface AppState {
  tasks: Task[];
  storeInfo: StoreInfo;
  templates: KnowledgeTemplate[];
  sales: SalesPeriod[];
  inventory: InventoryItem[];
  selectedPeriodId: SalesPeriod['id'];
  chatMessages: ChatMessage[];
  activeTaskId?: string;
  setSelectedPeriod: (id: SalesPeriod['id']) => void;
  setActiveTask: (id?: string) => void;
  completeTask: (id: string) => void;
  updateStoreInfo: (patch: Partial<StoreInfo>) => void;
  updateTemplate: (id: string, content: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  simulateTaskParsing: () => void;
  getCurrentSalesPeriod: () => SalesPeriod;
  getCurrentConclusion: () => string;
  getCurrentStrategy: () => string[];
}

const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  timestamp: '09:00',
  content: '你好，我是黄焖鸡店运营 AI 小助手。我可以帮你整理待办、更新知识库、分析经营数据和生成采购清单。',
};

export const useAppStore = create<AppState>((set, get) => ({
  tasks: mockTasks,
  storeInfo: mockStoreInfo,
  templates: mockTemplates,
  sales: mockSales,
  inventory: mockInventory,
  selectedPeriodId: 'day',
  chatMessages: [welcomeMessage],
  activeTaskId: mockTasks[0]?.id,
  setSelectedPeriod: (id) => set({ selectedPeriodId: id }),
  setActiveTask: (id) => set({ activeTaskId: id }),
  completeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, status: 'completed' } : task)),
    })),
  updateStoreInfo: (patch) => set((state) => ({ storeInfo: { ...state.storeInfo, ...patch } })),
  updateTemplate: (id, content) =>
    set((state) => ({
      templates: state.templates.map((item) =>
        item.id === id ? { ...item, content, updatedAt: new Date().toLocaleString('zh-CN') } : item,
      ),
    })),
  addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  simulateTaskParsing: () =>
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          content: '已解析总部新消息，新增 1 条高优先级任务，并已按任务类型整理到待办列表。',
        },
      ],
      tasks: [
        {
          id: `task-${Date.now()}`,
          title: '更新四月门店地址确认表',
          source: '总部转发消息',
          type: 'form',
          status: 'pending',
          deadline: '今天 20:00',
          priority: 'high',
          description: '门店基础信息会自动预填，只需核对电话、定位和营业时间。',
          templateFields: {
            门店名称: state.storeInfo.name,
            门店地址: state.storeInfo.address,
            联系电话: state.storeInfo.phone,
          },
        },
        ...state.tasks,
      ],
    })),
  getCurrentSalesPeriod: () => get().sales.find((item) => item.id === get().selectedPeriodId) ?? mockSales[0],
  getCurrentConclusion: () => generateAnalysisConclusion(get().getCurrentSalesPeriod()),
  getCurrentStrategy: () => generateOperationStrategy(get().getCurrentSalesPeriod()),
}));
