import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/todo', label: '待办任务' },
  { to: '/knowledge', label: '我的知识库' },
  { to: '/analysis', label: '经营分析' },
  { to: '/inventory', label: '采购管理' },
];

export function Layout() {
  const inventory = useAppStore((state) => state.inventory);
  const tasks = useAppStore((state) => state.tasks);
  const lowStockCount = inventory.filter((item) => item.current < item.threshold).length;
  const pendingCount = tasks.filter((item) => item.status !== 'completed').length;

  return (
    <div className="shell">
      <aside className="sidebar">
        <Link className="brand" to="/">
          <span className="brand-badge">AI</span>
          <div>
            <strong>黄焖鸡AI助手</strong>
            <p>门店运营 Demo</p>
          </div>
        </Link>
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {item.label}
              {item.to === '/inventory' && lowStockCount > 0 ? <span className="alert-dot">!</span> : null}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-card">
          <span>门店今日状态</span>
          <strong>{pendingCount} 项待办</strong>
          <p>{lowStockCount} 项库存预警，AI 助手可直接生成采购建议。</p>
        </div>
      </aside>
      <main className="content">
        <header className="topbar">
          <div>
            <strong>杨小助在线</strong>
            <p>欢迎回来，今天优先处理合规填表和库存补货。</p>
          </div>
          <div className="topbar-pills">
            <span className="topbar-pill">待办 {pendingCount}</span>
            <span className="topbar-pill warning">预警 {lowStockCount}</span>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
