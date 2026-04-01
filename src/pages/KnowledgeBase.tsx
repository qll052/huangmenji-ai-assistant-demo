import { useMemo, useState } from 'react';
import { useAppStore } from '../store/appStore';

export function KnowledgeBasePage() {
  const storeInfo = useAppStore((state) => state.storeInfo);
  const templates = useAppStore((state) => state.templates);
  const updateStoreInfo = useAppStore((state) => state.updateStoreInfo);
  const updateTemplate = useAppStore((state) => state.updateTemplate);
  const [keyword, setKeyword] = useState('');
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [showStoreEdit, setShowStoreEdit] = useState(false);

  const currentTemplate = templates.find((item) => item.id === editingId);
  const filtered = useMemo(
    () => templates.filter((item) => item.name.includes(keyword) || item.category.includes(keyword) || item.content.includes(keyword)),
    [keyword, templates],
  );

  return (
    <div className="page-grid">
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>我的知识库</h2>
            <p>保留店铺核心资料卡片，避免页面空和丑。</p>
          </div>
          <button className="ghost-button" onClick={() => setShowStoreEdit(true)}>编辑门店资料</button>
        </div>
        <div className="summary-grid">
          <article className="summary-card summary-hero">
            <span>门店名称</span>
            <strong>{storeInfo.name}</strong>
            <small>标准信息已接入待办预填和 AI 回复</small>
          </article>
          <article className="summary-card">
            <span>店长</span>
            <strong>{storeInfo.manager}</strong>
            <small>联系电话：{storeInfo.phone}</small>
          </article>
          <article className="summary-card wide">
            <span>门店地址</span>
            <strong>{storeInfo.address}</strong>
            <small>营业时间：{storeInfo.openTime}</small>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>模板管理</h2>
            <p>保留模板列表，详情按需弹出编辑。</p>
          </div>
        </div>
        <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索模板名称或内容" />
        <div className="template-grid">
          {filtered.map((item) => (
            <button key={item.id} className={`template-item ${editingId === item.id ? 'active' : ''}`} onClick={() => setEditingId(item.id)}>
              <strong>{item.name}</strong>
              <span>{item.category}</span>
              <p>{item.content}</p>
              <small>{item.updatedAt}</small>
            </button>
          ))}
        </div>
      </section>
      {showStoreEdit ? (
        <div className="modal-backdrop" onClick={() => setShowStoreEdit(false)}>
          <div className="brief-modal detail-modal" onClick={(event) => event.stopPropagation()}>
            <div className="panel-header">
              <div>
                <h2>编辑门店资料</h2>
                <p>修改后会同步影响待办预填和 AI 回复内容。</p>
              </div>
              <button className="ghost-button" onClick={() => setShowStoreEdit(false)}>关闭</button>
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
          </div>
        </div>
      ) : null}
      {currentTemplate ? (
        <div className="modal-backdrop" onClick={() => setEditingId(undefined)}>
          <div className="brief-modal detail-modal" onClick={(event) => event.stopPropagation()}>
            <div className="panel-header">
              <div>
                <h2>{currentTemplate.name}</h2>
                <p>{currentTemplate.category}</p>
              </div>
              <button className="ghost-button" onClick={() => setEditingId(undefined)}>关闭</button>
            </div>
            <textarea rows={12} value={currentTemplate.content} onChange={(event) => updateTemplate(currentTemplate.id, event.target.value)} />
            <small>最近更新时间：{currentTemplate.updatedAt}</small>
          </div>
        </div>
      ) : null}
    </div>
  );
}
