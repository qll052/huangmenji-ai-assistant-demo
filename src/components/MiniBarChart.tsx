import type { SalesPoint } from '../types';

interface MiniBarChartProps {
  data: SalesPoint[];
}

export function MiniBarChart({ data }: MiniBarChartProps) {
  const max = Math.max(...data.map((item) => item.revenue), 1);

  return (
    <div className="chart">
      {data.map((item) => (
        <div key={item.label} className="bar-item">
          <div className="bar-outer">
            <div className="bar-inner" style={{ height: `${(item.revenue / max) * 100}%` }} />
          </div>
          <strong>{item.revenue}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
