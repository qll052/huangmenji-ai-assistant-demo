import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
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
  const rows = items
    .filter((item) => item.suggested > 0)
    .map((item) => ({
      原料: item.name,
      分类: item.category,
      当前库存: `${item.current}${item.unit}`,
      安全阈值: `${item.threshold}${item.unit}`,
      建议采购量: `${item.suggested}${item.unit}`,
    }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '采购清单');
  XLSX.writeFile(workbook, `purchase-list-${Date.now()}.xlsx`);
}
