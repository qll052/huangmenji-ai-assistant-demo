import { useMemo, useState } from 'react';
import { AIAssistantPanel } from '../components/AIAssistantPanel';
import { useAppStore } from '../store/appStore';

export function KnowledgeBasePage() {
  const storeInfo = useAppStore((state) => state.storeInfo);
  const templates = useAppStore((state) => state.templates);
  const updateStoreInfo = useAppStore((state) => state.updateStoreInfo);
  const updateTemplate = useAppStore((state) => state.updateTemplate);
  const [keyword, setKeyword] = useState('');
  const [editingId, setEditingId] = useState(templates[0]?.id);

  const currentTemplate = templates.find((item) => item.id === editingId) ?? templates[0];
  const filtered = useMemo(
    () => templates.filter((item) => item.name.includes(keyword) || item.category.includes(keyword) || item.content.includes(keyword)),
    [keyword, templates],
  );

  return (
    <div className="page-grid two-column">
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>我的知识库</h2>
            <p>集中管理门店基础信息和标准模板，修改后可供待办和分析模块复用。</p>
          </div>
        </div>
        <div className="field-grid">
          <label className="field-card">
            <span>门店名称</span>
            <input value={storeInfo.name} onChange={(event) => updateStoreInfo({ name: event.target.value })} />
          </label>
          <label className="field-card">
            <span>店长</span>
            <input value={storeInfo.manager} onChange={(event) => updateStoreInfo({ manager: event.target.value })} />
          </label>
          <label className="field-card full">
            <span>门店地址</span>
            <input value={storeInfo.address} onChange={(event) => updateStoreInfo({ address: event.target.value })} />
          </label>
          <label className="field-card">
            <span>联系电话</span>
            <input value={storeInfo.phone} onChange={(event) => updateStoreInfo({ phone: event.target.value })} />
          </label>
          <label className="field-card">
            <span>营业时间</span>
            <input value={storeInfo.openTime} onChange={(event) => updateStoreInfo({ openTime: event.target.value })} />
          </label>
        </div>
        <div className="daily-brief">
          <h3>语音修改演示</h3>
          <p>点击 AI 助手中的“更新门店地址”，即可用自然语言触发知识库内容更新说明。</p>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>模板管理</h2>
            <p>支持搜索、查看、在线编辑和实时更新。</p>
          </div>
        </div>
        <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索模板名称或内容" />
        <div className="template-layout">
          <div className="template-list">
            {filtered.map((item) => (
              <button key={item.id} className={`template-item ${editingId === item.id ? 'active' : ''}`} onClick={() => setEditingId(item.id)}>
                <strong>{item.name}</strong>
                <span>{item.category}</span>
                <small>{item.updatedAt}</small>
              </button>
            ))}
          </div>
          {currentTemplate ? (
            <div className="template-editor">
              <h3>{currentTemplate.name}</h3>
              <textarea
                rows={10}
                value={currentTemplate.content}
                onChange={(event) => updateTemplate(currentTemplate.id, event.target.value)}
              />
              <small>最近更新时间：{currentTemplate.updatedAt}</small>
            </div>
          ) : null}
        </div>
      </section>

      <AIAssistantPanel />
    </div>
  );
}
