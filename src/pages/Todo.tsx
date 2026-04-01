import { useMemo, useState } from 'react';
import { AIAssistantPanel } from '../components/AIAssistantPanel';
import { TaskCard } from '../components/TaskCard';
import { useAppStore } from '../store/appStore';
import type { Task } from '../types';

const taskTypeName: Record<Task['type'], string> = {
  template: '模板生成类任务',
  form: '日常填表类任务',
  guide: '操作指引类任务',
  routine: '熟练完成类任务',
};

export function TodoPage() {
  const tasks = useAppStore((state) => state.tasks);
  const activeTaskId = useAppStore((state) => state.activeTaskId);
  const setActiveTask = useAppStore((state) => state.setActiveTask);
  const completeTask = useAppStore((state) => state.completeTask);

  const [filledText, setFilledText] = useState('员工今日体温正常，后厨已完成第一次消毒。');
  const [showBrief, setShowBrief] = useState(false);
  const activeTask = tasks.find((item) => item.id === activeTaskId) ?? tasks[0];
  const completedCount = tasks.filter((item) => item.status === 'completed').length;

  const grouped = useMemo(() => {
    return tasks.reduce<Record<string, Task[]>>((acc, task) => {
      const key = task.type;
      acc[key] = acc[key] ?? [];
      acc[key].push(task);
      return acc;
    }, {});
  }, [tasks]);

  return (
    <div className="page-grid two-column">
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>待办任务汇总</h2>
            <p>支持总部消息解析、任务分类、去完成和日报更新。</p>
          </div>
          <button className="ghost-button" onClick={() => setShowBrief(true)}>
            查看日报弹窗
          </button>
        </div>
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type} className="task-group">
            <h3>{taskTypeName[type as Task['type']]}</h3>
            <div className="task-list">
              {items.map((task) => (
                <TaskCard key={task.id} task={task} onOpen={setActiveTask} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        {activeTask ? (
          <>
            <div className="panel-header">
              <div>
                <h2>{activeTask.title}</h2>
                <p>{activeTask.description}</p>
              </div>
              <span className={`status-tag ${activeTask.status}`}>{activeTask.status}</span>
            </div>
            <div className="detail-block">
              <strong>任务类型</strong>
              <p>{taskTypeName[activeTask.type]}</p>
            </div>

            {activeTask.templateFields ? (
              <div className="detail-block">
                <strong>自动预填 / 识别回填</strong>
                <div className="field-grid">
                  {Object.entries(activeTask.templateFields).map(([key, value]) => (
                    <label key={key} className="field-card">
                      <span>{key}</span>
                      <input defaultValue={value} />
                    </label>
                  ))}
                  <label className="field-card full">
                    <span>补充内容（支持语音/图片识别结果回填）</span>
                    <textarea rows={5} value={filledText} onChange={(event) => setFilledText(event.target.value)} />
                  </label>
                </div>
              </div>
            ) : null}

            {activeTask.steps ? (
              <div className="detail-block">
                <strong>操作指引</strong>
                <ol className="steps">
                  {activeTask.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="action-row">
              <button className="ghost-button" onClick={() => setFilledText('已通过图片识别补充检疫报告日期和供应商信息。')}>
                模拟图片识别回填
              </button>
              <button className="ghost-button" onClick={() => setFilledText('通过语音识别填写：员工今日体温 36.5 度，状态正常。')}>
                模拟语音识别回填
              </button>
              <button className="primary-button" onClick={() => completeTask(activeTask.id)}>
                审核并提交
              </button>
            </div>

            <div className="daily-brief">
              <h3>每日工作简报</h3>
              <p>今日已完成 {completedCount} 项任务，剩余待办集中在填表与证件上传。建议优先处理高优先级合规任务，再进行午市补货确认。</p>
            </div>
          </>
        ) : (
          <p>请选择一个任务查看详情。</p>
        )}
      </section>

      <AIAssistantPanel />
      {showBrief ? (
        <div className="modal-backdrop" onClick={() => setShowBrief(false)}>
          <div className="brief-modal" onClick={(event) => event.stopPropagation()}>
            <div className="panel-header">
              <div>
                <h2>今日工作简报</h2>
                <p>AI 自动汇总门店待办、完成情况和下一步建议。</p>
              </div>
              <button className="ghost-button" onClick={() => setShowBrief(false)}>
                关闭
              </button>
            </div>
            <div className="brief-highlight">
              <strong>完成情况</strong>
              <p>今日已完成 {completedCount} 项，仍有 {tasks.length - completedCount} 项待办需要推进。</p>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <strong>高优先级</strong>
                <p>健康登记与证件上传需在今日营业结束前完成。</p>
              </div>
              <div className="timeline-item">
                <strong>运营建议</strong>
                <p>午市前完成补货确认，避免高峰时段鸡腿肉和酱料包不足。</p>
              </div>
              <div className="timeline-item">
                <strong>同步动作</strong>
                <p>日报生成后可直接用于向总部汇报当天完成情况。</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
