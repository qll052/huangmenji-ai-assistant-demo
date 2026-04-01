import type { KnowledgeTemplate, StoreInfo } from '../types';

export const mockStoreInfo: StoreInfo = {
  name: '杨铭宇黄焖鸡米饭（理工店）',
  manager: '张姐',
  address: '大连市甘井子区软件园路 88 号',
  phone: '138-0000-8899',
  openTime: '10:00 - 22:00',
  tags: ['加盟店', '外卖活跃', '学生客群'],
};

export const mockTemplates: KnowledgeTemplate[] = [
  {
    id: 'tpl-1',
    name: '员工健康登记表',
    category: '表单模板',
    content: '员工姓名、体温、健康状态、证件有效期、异常备注。',
    updatedAt: '2026-04-01 09:10',
  },
  {
    id: 'tpl-2',
    name: '每日消毒记录',
    category: '记录模板',
    content: '记录消毒区域、消毒时间、执行人、复核人及异常情况。',
    updatedAt: '2026-03-30 20:15',
  },
  {
    id: 'tpl-3',
    name: '月度耗材申报表',
    category: '报表模板',
    content: '汇总酱料包、餐盒、打包袋等耗材本月消耗与下月建议。',
    updatedAt: '2026-03-29 16:40',
  },
];
