import type { SalesPeriod } from '../types';

export const mockSales: SalesPeriod[] = [
  {
    id: 'day',
    label: '今日',
    overview: { revenue: 4860, orders: 178, avgTicket: 27.3, growth: 12.6 },
    chart: [
      { label: '10:00', revenue: 380, orders: 14 },
      { label: '12:00', revenue: 1280, orders: 48 },
      { label: '14:00', revenue: 890, orders: 33 },
      { label: '18:00', revenue: 1460, orders: 52 },
      { label: '20:00', revenue: 850, orders: 31 },
    ],
    topItems: [
      { name: '招牌黄焖鸡', value: 72 },
      { name: '香菇黄焖鸡', value: 48 },
      { name: '可乐', value: 36 },
    ],
  },
  {
    id: 'month',
    label: '本月',
    overview: { revenue: 128600, orders: 4520, avgTicket: 28.4, growth: 8.2 },
    chart: [
      { label: '第1周', revenue: 28600, orders: 1010 },
      { label: '第2周', revenue: 31400, orders: 1102 },
      { label: '第3周', revenue: 33200, orders: 1168 },
      { label: '第4周', revenue: 35400, orders: 1240 },
    ],
    topItems: [
      { name: '招牌黄焖鸡', value: 1630 },
      { name: '土豆黄焖鸡', value: 1180 },
      { name: '酸梅汤', value: 860 },
    ],
  },
  {
    id: 'quarter',
    label: '本季度',
    overview: { revenue: 372000, orders: 13120, avgTicket: 28.3, growth: 10.4 },
    chart: [
      { label: '1月', revenue: 116000, orders: 4040 },
      { label: '2月', revenue: 121400, orders: 4270 },
      { label: '3月', revenue: 134600, orders: 4810 },
    ],
    topItems: [
      { name: '招牌黄焖鸡', value: 4520 },
      { name: '香菇黄焖鸡', value: 2650 },
      { name: '酸梅汤', value: 2210 },
    ],
  },
  {
    id: 'year',
    label: '本年',
    overview: { revenue: 1486000, orders: 51800, avgTicket: 28.7, growth: 15.3 },
    chart: [
      { label: 'Q1', revenue: 372000, orders: 13120 },
      { label: 'Q2', revenue: 358000, orders: 12460 },
      { label: 'Q3', revenue: 365000, orders: 12710 },
      { label: 'Q4', revenue: 391000, orders: 13510 },
    ],
    topItems: [
      { name: '招牌黄焖鸡', value: 17600 },
      { name: '土豆黄焖鸡', value: 12240 },
      { name: '可乐', value: 9800 },
    ],
  },
];
