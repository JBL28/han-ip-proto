import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import aiAvatar from '../../assets/tax-chat/ai-chat-avatar.svg';
import { ChatInputBar, ChatMessageBubble, ChatSuggestionChip, ChatSummaryNotice } from '../../components/ChatComponents.jsx';
import { chatDataByPersona, chatPersonas, commonChatQuestions, readChatPersonaId } from '../../data/screenData.js';
import { getRememberedPersonaId, pagePath } from '../../routes/routeConfig.js';

function answerFor(question) {
  return `${question} 질문은 지금 화면의 추천 공제와 연결해서 확인할 수 있어요. 근거가 있는 항목만 3줄로 쉽게 정리해드릴게요.`;
}

export function TaxChatPage() {
  const { personaId = getRememberedPersonaId() } = useParams();
  const data = chatDataByPersona[personaId] || chatDataByPersona.hanbeoteam;
  const chatPersona = chatPersonas.find((item) => item.id === readChatPersonaId(personaId)) || chatPersonas[0];
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([{ id: 'intro', role: 'bot', text: data.intro }]);
  const questions = useMemo(() => [...data.questions, ...commonChatQuestions.slice(0, 3)], [data.questions]);

  const ask = (question) => {
    if (!question.trim()) return;
    setMessages((prev) => [...prev, { id: `u-${prev.length}-${question}`, role: 'user', text: question }, { id: `b-${prev.length}-${question}`, role: 'bot', text: answerFor(question) }]);
    setDraft('');
  };

  return (
    <section className="screen-page chat-page" aria-label="절세챗봇">
      <header className="screen-heading chat-heading">
        <div>
          <h1>절세챗봇</h1>
          <p>{chatPersona.name} · {chatPersona.description}</p>
        </div>
        <Link className="outline-cta ui-action" to={pagePath(personaId, 'persona')}>AI 페르소나 변경</Link>
      </header>
      <ChatSummaryNotice summary={data.summary} items={data.summaryItems} to={pagePath(personaId, 'deduction-detail')} />
      <div className="chat-message-list" aria-label="채팅 메시지">
        {messages.map((message) => <ChatMessageBubble key={message.id} message={message} avatarSrc={aiAvatar} />)}
      </div>
      <section className="chat-suggestions" aria-label="자주 묻는 질문">
        <h2 className="ui-section-title">자주 묻는 질문</h2>
        <div>{questions.map((question) => <ChatSuggestionChip key={question} question={question} onClick={ask} />)}</div>
      </section>
      <ChatInputBar value={draft} onChange={setDraft} onSubmit={(event) => { event.preventDefault(); ask(draft); }} />
    </section>
  );
}
