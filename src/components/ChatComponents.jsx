import { Link } from 'react-router-dom';
import { AppCard } from './AppCard.jsx';

export function ChatSummaryNotice({ summary, items, to }) {
  return (
    <AppCard className="chat-summary-card">
      <p className="ui-eyebrow">나의 환급금 요약</p>
      <strong className="ui-knowledge-title">{summary}</strong>
      <div className="mini-chip-row" aria-label="요약 추천 항목">
        {items.map((item) => <span className="mini-chip" key={item}>{item}</span>)}
      </div>
      <Link className="text-link-cta ui-action" to={to}>공제 상세보기 &gt;</Link>
    </AppCard>
  );
}

export function ChatMessageBubble({ message, avatarSrc }) {
  const isUser = message.role === 'user';
  return (
    <div className={`chat-message chat-message--${message.role}`}>
      {!isUser && <img className="chat-avatar" src={avatarSrc} alt="" aria-hidden="true" />}
      <p className="chat-bubble ui-body-muted">{message.text}</p>
    </div>
  );
}

export function ChatSuggestionChip({ question, onClick }) {
  return <button className="chat-suggestion ui-action" type="button" onClick={() => onClick(question)}>{question}</button>;
}

export function ChatInputBar({ value, onChange, onSubmit }) {
  return (
    <form className="chat-input-bar" onSubmit={onSubmit}>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="궁금한 점을 입력해보세요" aria-label="챗봇 질문 입력" />
      <button type="submit" aria-label="질문 보내기">전송</button>
    </form>
  );
}
