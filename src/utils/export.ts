import { jsPDF } from 'jspdf';
import type { InventoryItem, SalesPeriod } from '../types';

export function downloadPdfReport(period: SalesPeriod, conclusion: string, strategy: string[]) {
  const doc = new jsPDF();
  doc.setFillColor(25, 118, 210);
  doc.rect(0, 0, 210, 34, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Huangmenji AI Report', 14, 20);
  doc.setFontSize(10);
  doc.text(`Period: ${period.label}`, 14, 28);
  doc.setTextColor(31, 41, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(`Revenue: ${period.overview.revenue}`, 14, 48);
  doc.text(`Orders: ${period.overview.orders}`, 14, 56);
  doc.text(`Average Ticket: ${period.overview.avgTicket}`, 14, 64);
  doc.text(`Growth: ${period.overview.growth}%`, 14, 72);
  doc.setDrawColor(220, 227, 235);
  doc.line(14, 78, 196, 78);
  doc.text(`Conclusion: ${conclusion}`, 14, 90, { maxWidth: 180 });
  doc.text('Strategies:', 14, 120);
  strategy.forEach((item, index) => {
    doc.text(`${index + 1}. ${item}`, 18, 130 + index * 10, { maxWidth: 176 });
  });
  doc.save(`sales-report-${period.id}.pdf`);
}

export function downloadExcelLikeFile(items: InventoryItem[]) {
  const headers = ['原料', '分类', '当前库存', '安全阈值', '建议采购量'];
  const rows = items
    .filter((item) => item.suggested > 0)
    .map((item) => [item.name, item.category, `${item.current}${item.unit}`, `${item.threshold}${item.unit}`, `${item.suggested}${item.unit}`]);

  const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `purchase-list-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
