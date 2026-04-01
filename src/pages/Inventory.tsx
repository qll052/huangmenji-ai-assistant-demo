import { useMemo, useState } from 'react';
import { AIAssistantPanel } from '../components/AIAssistantPanel';
import { useAppStore } from '../store/appStore';
import { generatePurchaseSummary } from '../utils/analysis';
import { downloadExcelLikeFile } from '../utils/export';

export function InventoryPage() {
  const inventory = useAppStore((state) => state.inventory);
  const [keyword, setKeyword] = useState('招牌黄焖鸡');

  const summary = useMemo(() => generatePurchaseSummary(inventory), [inventory]);
  const ingredientAnswer = `招牌黄焖鸡主要原材料包括鸡腿肉、香菇、青椒、酱料包和米饭。当前紧缺项是鸡腿肉与香菇，建议今天闭店前优先采购。`;

  return (
    <div className="page-grid two-column">
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>采购管理</h2>
            <p>支持库存预警、原材料查询和采购清单生成。</p>
          </div>
          <span className="alert-banner">! {summary.urgent.length} 项紧急预警</span>
        </div>
        <div className="inventory-table">
          <div className="inventory-row header">
            <span>原料</span>
            <span>分类</span>
            <span>当前库存</span>
            <span>阈值</span>
            <span>建议采购</span>
          </div>
          {inventory.map((item) => (
            <div key={item.id} className={`inventory-row ${item.current < item.threshold ? 'low' : ''}`}>
              <span>{item.name}</span>
              <span>{item.category}</span>
              <span>
                {item.current}
                {item.unit}
              </span>
              <span>
                {item.threshold}
                {item.unit}
              </span>
              <span>
                {item.suggested}
                {item.unit}
              </span>
            </div>
          ))}
        </div>
        <div className="action-row">
          <button className="primary-button" onClick={() => downloadExcelLikeFile(inventory)}>
            生成并下载采购清单
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>原材料查询</h2>
            <p>支持自然语言查看单品对应库存。</p>
          </div>
        </div>
        <label className="field-card full">
          <span>查询内容</span>
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} />
        </label>
        <div className="daily-brief">
          <h3>{keyword} 原材料情况</h3>
          <p>{ingredientAnswer}</p>
        </div>
        <div className="detail-block">
          <strong>库存预警分级</strong>
          <div className="schedule-grid">
            {summary.urgent.map((item) => (
              <div key={item.id} className="warning-card urgent">
                {item.name} 需立即采购
              </div>
            ))}
            {summary.normal.map((item) => (
              <div key={item.id} className="warning-card">
                {item.name} 建议近两日补货
              </div>
            ))}
          </div>
        </div>
      </section>

      <AIAssistantPanel />
    </div>
  );
}
