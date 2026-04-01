import type { InventoryItem, SalesPeriod } from '../types';

export function generateAnalysisConclusion(period: SalesPeriod): string {
  const growthText = period.overview.growth >= 0 ? '增长' : '下降';
  const hottest = period.topItems[0];
  const chartPeak = [...period.chart].sort((a, b) => b.revenue - a.revenue)[0];

  return `从${period.label}数据看，门店营收为 ${period.overview.revenue} 元，较上周期${growthText}${Math.abs(
    period.overview.growth,
  )}%。${hottest.name}是当前最强单品，销量/点单表现领先。${chartPeak.label}为销售高峰，建议在高峰前补足主食材并提升外卖出餐效率。`;
}

export function generateOperationStrategy(period: SalesPeriod): string[] {
  const hottest = period.topItems[0]?.name ?? '招牌黄焖鸡';
  return [
    `围绕${hottest}推出“单品加饮品”套餐，重点覆盖${period.label}高峰时段。`,
    '在高峰前 1 小时完成备料复核，减少断货和等待时间。',
    '针对低峰时段发放外卖满减券，提升全天订单分布均衡度。',
  ];
}

export function generatePurchaseSummary(items: InventoryItem[]): {
  urgent: InventoryItem[];
  normal: InventoryItem[];
} {
  const lowStock = items.filter((item) => item.current < item.threshold);
  return {
    urgent: lowStock.filter((item) => item.current / item.threshold < 0.7),
    normal: lowStock.filter((item) => item.current / item.threshold >= 0.7),
  };
}
