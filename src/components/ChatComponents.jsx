import { Link } from 'react-router-dom';
import { AppCard } from './AppCard.jsx';

export function ChatSummaryNotice({ summary, items, open, onToggle }) {
  return (
    <AppCard className={`chat-summary-card${open ? ' is-open' : ''}`}>
      <div className="chat-summary-head">
        <p className="ui-eyebrow">나의 환급금 요약</p>
        <button className="chat-summary-toggle" type="button" aria-expanded={open} onClick={onToggle}>{open ? '접기' : '펼치기'}</button>
      </div>
      <strong className="ui-knowledge-title">{summary}</strong>
      <div className="chat-summary-collapsible">
        <div className="mini-chip-row" aria-label="요약 추천 항목">
          {items.map((item) => <Link className="mini-chip" key={item.label} to={item.to}>{item.label}</Link>)}
        </div>
      </div>
    </AppCard>
  );
}

export function ChatMessageBubble({ message, avatarSrc, avatarVariant }) {
  const isUser = message.role === 'user';
  return (
    <div className={`chat-message chat-message--${message.role}`}>
      {!isUser && (
        <span className={`chat-avatar chat-avatar--${avatarVariant || 'beginner'}`} aria-hidden="true">
          <img src={avatarSrc} alt="" />
        </span>
      )}
      <p className={`chat-bubble ui-body-muted${message.pending ? ' is-pending' : ''}`}>
        {message.text}
        {message.pending && <span className="chat-rag-status"><i />공제 자료 검색 중</span>}
      </p>
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
