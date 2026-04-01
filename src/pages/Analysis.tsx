import { useState } from 'react';
import { MiniBarChart } from '../components/MiniBarChart';
import { useAppStore } from '../store/appStore';
import { downloadPdfReport } from '../utils/export';

export function AnalysisPage() {
  const sales = useAppStore((state) => state.sales);
  const selectedPeriodId = useAppStore((state) => state.selectedPeriodId);
  const setSelectedPeriod = useAppStore((state) => state.setSelectedPeriod);
  const getCurrentSalesPeriod = useAppStore((state) => state.getCurrentSalesPeriod);
  const getCurrentConclusion = useAppStore((state) => state.getCurrentConclusion);
  const getCurrentStrategy = useAppStore((state) => state.getCurrentStrategy);

  const period = getCurrentSalesPeriod();
  const conclusion = getCurrentConclusion();
  const strategy = getCurrentStrategy();
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="page-grid">
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>经营分析</h2>
            <p>按 PPT 汇报稿的思路，先给总览、再给趋势、最后给热销结构。</p>
          </div>
          <div className="action-row">
            <button className="primary-button" onClick={() => downloadPdfReport(period, conclusion, strategy)}>
              下载销售分析 PDF
            </button>
            <button className="ghost-button" onClick={() => setShowReport(true)}>
              查看 AI 报告
            </button>
          </div>
        </div>
        <div className="chip-row">
          {sales.map((item) => (
            <button
              key={item.id}
              className={`chip ${selectedPeriodId === item.id ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="analysis-hero">
          <div className="analysis-summary-card">
            <span className="analysis-summary-label">{period.label}总览</span>
            <strong>{period.overview.revenue}</strong>
            <p>{conclusion}</p>
            <div className="analysis-inline-metrics">
              <span>订单 {period.overview.orders}</span>
              <span>客单价 {period.overview.avgTicket}</span>
              <span>增长 {period.overview.growth}%</span>
            </div>
          </div>
          <div className="stats-grid">
            <article className="stat-card">
              <span>营收</span>
              <strong>{period.overview.revenue}</strong>
            </article>
            <article className="stat-card">
              <span>订单量</span>
              <strong>{period.overview.orders}</strong>
            </article>
            <article className="stat-card">
              <span>客单价</span>
              <strong>{period.overview.avgTicket}</strong>
            </article>
            <article className="stat-card">
              <span>环比变化</span>
              <strong>{period.overview.growth}%</strong>
            </article>
          </div>
        </div>
        <div className="analysis-board">
          <div className="analysis-chart-card">
            <div className="analysis-card-header">
              <div>
                <h3>销售趋势</h3>
                <p>按当前时间维度展示趋势变化</p>
              </div>
            </div>
            <MiniBarChart data={period.chart} />
          </div>
          <div className="analysis-ranking-card">
            <div className="analysis-card-header">
              <div>
                <h3>热销排行</h3>
                <p>销量和点单表现最强的品类</p>
              </div>
            </div>
            <div className="ranking-inline analysis-ranking-list">
              {period.topItems.map((item, index) => (
                <div key={item.name} className="ranking-item">
                  <span>TOP {index + 1}</span>
                  <strong>{item.name}</strong>
                  <small>{item.value}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {showReport ? (
        <div className="modal-backdrop" onClick={() => setShowReport(false)}>
          <div className="brief-modal detail-modal" onClick={(event) => event.stopPropagation()}>
            <div className="panel-header">
              <div>
                <h2>{period.label} AI 分析报告</h2>
                <p>分析结论会随着所选销售周期变化。</p>
              </div>
              <button className="ghost-button" onClick={() => setShowReport(false)}>
                关闭
              </button>
            </div>
            <div className="daily-brief">
              <h3>AI 经营小结</h3>
              <p>{conclusion}</p>
            </div>
            <div className="detail-block">
              <strong>运营策略</strong>
              <ol className="steps">
                {strategy.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
            <div className="detail-block">
              <strong>一周执行表</strong>
              <div className="schedule-grid">
                <div>周一：检查备料与热销波动</div>
                <div>周二：优化外卖套餐文案</div>
                <div>周三：复盘高峰时段出餐</div>
                <div>周四：盘点库存并更新采购计划</div>
                <div>周五：做周末促销预热</div>
              </div>
            </div>
            <div className="report-preview">
              <div className="report-sheet">
                <span className="report-tag">PDF 报告预览</span>
                <h3>{period.label}销售分析报告</h3>
                <p>{conclusion}</p>
                <div className="report-metrics">
                  <span>营收 {period.overview.revenue}</span>
                  <span>订单 {period.overview.orders}</span>
                  <span>增长 {period.overview.growth}%</span>
                </div>
              </div>
            </div>
            <div className="action-row action-row-start">
              <button className="primary-button" onClick={() => downloadPdfReport(period, conclusion, strategy)}>
                下载销售分析 PDF
              </button>
              <button className="ghost-button" onClick={() => window.print()}>
                打印演示页
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
