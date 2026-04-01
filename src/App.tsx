import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AnalysisPage } from './pages/Analysis';
import { HomePage } from './pages/Home';
import { InventoryPage } from './pages/Inventory';
import { KnowledgeBasePage } from './pages/KnowledgeBase';
import { TodoPage } from './pages/Todo';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/knowledge" element={<KnowledgeBasePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
