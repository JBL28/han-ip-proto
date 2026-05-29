import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import aiAvatar from '../../assets/tax-chat/ai-chat-avatar.svg';
import { ChatInputBar, ChatMessageBubble, ChatSuggestionChip, ChatSummaryNotice } from '../../components/ChatComponents.jsx';
import { chatDataByPersona, chatPersonas, commonChatAnswers, commonChatQuestions, readChatPersonaId } from '../../data/screenData.js';
import { getRememberedPersonaId, pagePath } from '../../routes/routeConfig.js';

function answerFor(question, data) {
  return data.answers?.[question] || commonChatAnswers[question] || `${question} 질문은 현재 추천 공제와 연결해서 확인할 수 있어요. 핵심 조건, 필요한 자료, 다음 행동 순서로 정리해드릴게요.`;
}

function isPolicySummaryItem(item) {
  return /지원사업|서비스|이용권|훈련지원/.test(item);
}

const summaryDeductionIdByLabel = {
  '근로장려금 및 자녀장려금': 'earned-child-credit',
  '한부모 소득공제': 'single-parent-income-deduction',
  '취학 전 아동 학원비 세액공제': 'preschool-education-credit',
  '월세액 세액공제': 'monthly-rent-home',
  '주택청약종합저축 소득공제': 'housing-savings-deduction',
  '고향사랑기부제': 'hometown-donation-credit',
};

function summaryItemLinks(items, personaId) {
  return items.map((item) => ({
    label: item,
    to: pagePath(personaId, isPolicySummaryItem(item) ? 'policy-detail' : 'deduction-detail', summaryDeductionIdByLabel[item]),
  }));
}

export function TaxChatPage() {
  const { personaId = getRememberedPersonaId() } = useParams();
  const data = chatDataByPersona[personaId] || chatDataByPersona.hanbeoteam;
  const chatPersona = chatPersonas.find((item) => item.id === readChatPersonaId(personaId)) || chatPersonas[0];
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([{ id: 'intro', role: 'bot', text: data.intro }]);
  const pendingTimers = useRef([]);
  const messageListRef = useRef(null);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const questions = useMemo(() => [...data.questions, ...commonChatQuestions.slice(0, 3)], [data.questions]);
  const summaryItems = useMemo(() => summaryItemLinks(data.summaryItems, personaId), [data.summaryItems, personaId]);

  useLayoutEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) return;
    messageList.scrollTo({ top: messageList.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => () => pendingTimers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const ask = (question) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;
    const answer = answerFor(trimmedQuestion, data);
    const timestamp = Date.now();
    const lookupId = `lookup-${timestamp}-${trimmedQuestion}`;
    const answerId = `answer-${timestamp}-${trimmedQuestion}`;

    setMessages((prev) => [
      ...prev,
      { id: `u-${timestamp}-${trimmedQuestion}`, role: 'user', text: trimmedQuestion },
      { id: lookupId, role: 'bot', text: '관련 자료를 확인해볼게요.', pending: true },
    ]);

    const timer = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev.map((message) => (message.id === lookupId ? { ...message, pending: false } : message)),
        { id: answerId, role: 'bot', text: answer },
      ]);
    }, 1100);
    pendingTimers.current.push(timer);
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
      <ChatSummaryNotice summary={data.summary} items={summaryItems} open={summaryOpen} onToggle={() => setSummaryOpen((value) => !value)} />
      <div className="chat-message-list" aria-label="채팅 메시지" ref={messageListRef}>
        {messages.map((message) => <ChatMessageBubble key={message.id} message={message} avatarSrc={aiAvatar} />)}
      </div>
      <div className="chat-bottom-stack">
        <section className={`chat-suggestions${questionsOpen ? ' is-open' : ''}`} aria-label="자주 묻는 질문">
          <div className="chat-suggestions-head">
            <h2 className="ui-section-title">자주 묻는 질문</h2>
            <button className="chat-suggestions-toggle" type="button" aria-expanded={questionsOpen} onClick={() => setQuestionsOpen((value) => !value)}>
              {questionsOpen ? '접기' : '펼치기'}
            </button>
          </div>
          <div className="chat-suggestions-list">
            <div className="chat-suggestions-list-inner">{questions.map((question) => <ChatSuggestionChip key={question} question={question} onClick={ask} />)}</div>
          </div>
        </section>
        <ChatInputBar value={draft} onChange={setDraft} onSubmit={(event) => { event.preventDefault(); ask(draft); }} />
      </div>
    </section>
  );
}
