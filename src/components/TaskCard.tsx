import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onOpen: (id: string) => void;
}

const typeLabel: Record<Task['type'], string> = {
  template: '模板生成类',
  form: '日常填表类',
  guide: '操作指引类',
  routine: '熟练完成类',
};

export function TaskCard({ task, onOpen }: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-card-top">
        <span className={`priority ${task.priority}`}>{task.priority}</span>
        <span className="type-tag">{typeLabel[task.type]}</span>
      </div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <div className="meta-row">
        <span>{task.source}</span>
        <span>{task.deadline}</span>
      </div>
      <button className="primary-button" onClick={() => onOpen(task.id)}>
        去完成
      </button>
    </article>
  );
}
