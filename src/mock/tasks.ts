import type { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: '上传本周员工健康登记表',
    source: '总部群消息',
    type: 'form',
    status: 'pending',
    deadline: '今天 18:00',
    priority: 'high',
    description: '需要补充员工健康状态、体温和证件有效期，店铺信息可自动预填。',
    templateFields: {
      门店名称: '杨铭宇黄焖鸡米饭（理工店）',
      门店地址: '大连市甘井子区软件园路 88 号',
      店长姓名: '张姐',
    },
  },
  {
    id: 'task-2',
    title: '生成每日消毒记录',
    source: '每日定时任务',
    type: 'template',
    status: 'pending',
    deadline: '今天闭店前',
    priority: 'medium',
    description: '调用标准模板后，可通过语音、文字或上传照片补全消毒记录。',
    templateFields: {
      消毒区域: '后厨、前台、冷藏区',
      负责人: '张姐',
    },
  },
  {
    id: 'task-3',
    title: '完成新证件上传指引',
    source: '总部稽核通知',
    type: 'guide',
    status: 'in_progress',
    deadline: '明天 12:00',
    priority: 'high',
    description: '按总部要求上传鸡肉检疫报告，并核对拍照角度和时间戳。',
    steps: [
      '准备清晰的检疫报告原件并平铺拍照。',
      '确认照片包含完整章印和日期。',
      '进入总部表单，上传图片并勾选合规确认。',
      '提交后截图留档。',
    ],
  },
  {
    id: 'task-4',
    title: '午市补货确认',
    source: '门店日常',
    type: 'routine',
    status: 'pending',
    deadline: '今天 11:00',
    priority: 'low',
    description: '固定流程任务，可快速标记完成。',
  },
];
