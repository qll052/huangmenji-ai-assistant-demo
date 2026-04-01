export type TaskType = 'template' | 'form' | 'guide' | 'routine';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  source: string;
  type: TaskType;
  status: TaskStatus;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  templateFields?: Record<string, string>;
  steps?: string[];
}

export interface StoreInfo {
  name: string;
  manager: string;
  address: string;
  phone: string;
  openTime: string;
  tags: string[];
}

export interface KnowledgeTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  updatedAt: string;
}

export interface SalesPoint {
  label: string;
  revenue: number;
  orders: number;
}

export interface SalesPeriod {
  id: 'day' | 'month' | 'quarter' | 'year';
  label: string;
  overview: {
    revenue: number;
    orders: number;
    avgTicket: number;
    growth: number;
  };
  chart: SalesPoint[];
  topItems: Array<{ name: string; value: number }>;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: '主食材' | '辅料' | '饮品';
  current: number;
  unit: string;
  threshold: number;
  suggested: number;
}

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}
