import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

const cards = [
  { to: '/todo', title: '待办任务', desc: '自动汇总总部任务，分类执行并更新状态。' },
  { to: '/knowledge', title: '我的知识库', desc: '集中管理门店基础信息和标准模板。' },
  { to: '/analysis', title: '经营分析', desc: '查看多周期销售表现并生成 AI 结论。' },
  { to: '/inventory', title: '采购管理', desc: '监控库存预警并生成采购清单。' },
];

export function HomePage() {
  const tasks = useAppStore((state) => state.tasks);
  const simulateTaskParsing = useAppStore((state) => state.simulateTaskParsing);
  const storeInfo = useAppStore((state) => state.storeInfo);
  const pending = tasks.filter((item) => item.status !== 'completed').length;
  const [parsing, setParsing] = useState(false);
  const [showInbox, setShowInbox] = useState(false);

  useEffect(() => {
    if (!parsing) return undefined;

    const timer = window.setTimeout(() => {
      simulateTaskParsing();
      setParsing(false);
      setShowInbox(true);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [parsing, simulateTaskParsing]);

  return (
    <div className="page-grid">
      <section className="panel hero-panel">
        <div className="hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">门店运营全流程助手</span>
            <h1>黄焖鸡店运营 AI 小助手</h1>
            <p>按照 PPT 中的门店场景，还原任务处理、知识库、经营分析和采购库存四条主链路。</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => setParsing(true)} disabled={parsing}>
                {parsing ? 'AI 正在解析消息...' : '解析总部新消息'}
              </button>
              <button className="ghost-button" onClick={() => setShowInbox((value) => !value)}>
                查看消息演示
              </button>
            </div>
            <div className="hero-badges">
              <span className="hero-badge">当前待办 {pending} 项</span>
              <span className="hero-badge">{storeInfo.name}</span>
              <span className="hero-badge warning">库存预警 4 项</span>
            </div>
          </div>
          <div className="phone-preview">
            <div className="phone-header">
              <span>总部消息</span>
              <strong>09:24</strong>
            </div>
            <div className="phone-bubble inbound">
              今天 20:00 前完成四月门店地址确认表，并上传员工健康登记。
            </div>
            <div className={`phone-bubble assistant ${parsing ? 'is-parsing' : ''}`}>
              {parsing ? '杨小助正在解析任务类型、截止时间和预填字段...' : '已提取任务类型：日常填表类，可自动预填门店信息。'}
            </div>
            <div className="phone-summary">
              <strong>自动生成结果</strong>
              <p>新增高优先级任务 1 条，已同步到待办列表。</p>
            </div>
          </div>
        </div>
      </section>
      {showInbox ? (
        <section className="panel inbox-demo">
          <div className="panel-header">
            <div>
              <h3>任务接收动画演示</h3>
              <p>模拟用户转发总部消息给小助手，再自动解析为待办任务。</p>
            </div>
            <span className="status-tag in_progress">实时同步</span>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <strong>1. 转发总部消息</strong>
              <p>将聊天内容发给杨小助。</p>
            </div>
            <div className="timeline-item">
              <strong>2. AI 自动解析</strong>
              <p>识别任务类型、优先级、截止时间和可预填字段。</p>
            </div>
            <div className="timeline-item">
              <strong>3. 写入待办列表</strong>
              <p>自动放入待办任务，并支持直接点击“去完成”。</p>
            </div>
          </div>
        </section>
      ) : null}
      <div className="card-grid">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="panel feature-card">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
