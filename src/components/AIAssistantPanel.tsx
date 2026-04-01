import type { ChangeEvent } from 'react';
import { useMemo, useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';
import { useAppStore } from '../store/appStore';

type SpeechRecognitionCtor = new () => {
  lang: string;
  start: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: SpeechRecognitionCtor;
    SpeechRecognition?: SpeechRecognitionCtor;
  }
}

const quickActions = ['帮我总结今日经营情况', '生成采购清单', '更新门店地址', '查看今日待办'];

export function AIAssistantPanel() {
  const messages = useAppStore((state) => state.chatMessages);
  const addChatMessage = useAppStore((state) => state.addChatMessage);
  const getCurrentConclusion = useAppStore((state) => state.getCurrentConclusion);
  const getCurrentStrategy = useAppStore((state) => state.getCurrentStrategy);
  const tasks = useAppStore((state) => state.tasks);
  const storeInfo = useAppStore((state) => state.storeInfo);

  const [draft, setDraft] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const recognition = useMemo(() => {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    return Ctor ? new Ctor() : null;
  }, []);

  const reply = (text: string) => {
    addChatMessage({
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: text,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const ask = (question: string) => {
    addChatMessage({
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    });

    if (question.includes('经营') || question.includes('销售')) {
      reply(`${getCurrentConclusion()} 可继续让我生成 PDF 报告或一周执行表。`);
      return;
    }

    if (question.includes('采购')) {
      reply('我已根据当前库存和阈值生成建议采购清单，鸡腿肉、酱料包和香菇需要优先补货。');
      return;
    }

    if (question.includes('地址') || question.includes('门店')) {
      reply(`当前门店信息：${storeInfo.name}，地址为 ${storeInfo.address}，联系电话 ${storeInfo.phone}。`);
      return;
    }

    if (question.includes('待办')) {
      const pendingCount = tasks.filter((item) => item.status !== 'completed').length;
      reply(`当前还有 ${pendingCount} 项待办，优先级最高的是健康登记和证件上传任务。`);
      return;
    }

    reply(`我理解你的需求是“${question}”。目前建议先处理待办，再看经营分析，最后生成采购清单。`);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    ask(text);
    setDraft('');
  };

  const handleVoice = () => {
    if (!recognition) {
      reply('当前浏览器不支持语音识别，请使用 Chrome 或 Edge 后再试。');
      return;
    }

    recognition.lang = 'zh-CN';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecognizing(false);
      setDraft(transcript);
      ask(transcript);
    };
    recognition.onerror = () => {
      setRecognizing(false);
      reply('语音识别失败，请检查麦克风权限后重试。');
    };
    setRecognizing(true);
    recognition.start();
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    addChatMessage({
      id: `user-file-${Date.now()}`,
      role: 'user',
      content: `上传图片：${file.name}`,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    });

    setExpanded(true);
    setOcrLoading(true);

    try {
      const worker = await createWorker('chi_sim+eng');
      const {
        data: { text },
      } = await worker.recognize(file);
      await worker.terminate();

      const cleanText = text.replace(/\s+/g, ' ').trim();
      const preview = cleanText ? cleanText.slice(0, 120) : '未识别到清晰文字';
      reply(`已完成图片识别。提取结果预览：${preview}${cleanText.length > 120 ? '...' : ''}`);
    } catch {
      reply(`图片已上传，但 OCR 识别失败。请尝试更清晰的表单或报告图片：${file.name}`);
    } finally {
      setOcrLoading(false);
    }
    event.target.value = '';
  };

  const strategyPreview = getCurrentStrategy();
  const pendingCount = tasks.filter((item) => item.status !== 'completed').length;

  return (
    <>
      <button className="assistant-fab" onClick={() => setExpanded((value) => !value)}>
        {expanded ? '收起 AI' : '杨小助'}
      </button>
      {expanded ? (
        <section className="assistant-drawer">
          <div className="assistant-header">
            <div className="assistant-brand">
              <span className="assistant-avatar">AI</span>
              <div>
                <h3>杨小助</h3>
                <p>{ocrLoading ? '正在识别图片内容...' : '门店运营智能助手已在线'}</p>
              </div>
            </div>
            <button className="ghost-button assistant-suggest-button" onClick={() => reply(`经营建议：${strategyPreview.join('；')}`)}>
              生成建议
            </button>
          </div>
          <div className="assistant-overview">
            <div className="assistant-kpi">
              <span>今日待办</span>
              <strong>{pendingCount}</strong>
            </div>
            <div className="assistant-kpi">
              <span>当前能力</span>
              <strong>语音 + OCR</strong>
            </div>
          </div>
          <div className="quick-actions">
            {quickActions.map((item) => (
              <button key={item} className="chip" onClick={() => ask(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="chat-list">
            {messages.map((message) => (
              <div key={message.id} className={`chat-item ${message.role}`}>
                <span>{message.role === 'assistant' ? 'AI' : '我'}</span>
                <div>
                  <p>{message.content}</p>
                  <small>{message.timestamp}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="composer">
            <div className="assistant-compose-label">直接问我：经营分析、任务汇总、门店资料、采购建议</div>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="输入问题，如：帮我生成本月经营总结"
            />
            <div className="composer-actions">
              <button className="ghost-button" onClick={handleVoice}>
                {recognizing ? '语音识别中...' : '语音输入'}
              </button>
              <button className="ghost-button" onClick={() => fileRef.current?.click()} disabled={ocrLoading}>
                {ocrLoading ? '图片识别中...' : '上传照片'}
              </button>
              <button className="primary-button" onClick={handleSend}>
                发送
              </button>
            </div>
            <input ref={fileRef} hidden type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </section>
      ) : null}
    </>
  );
}
