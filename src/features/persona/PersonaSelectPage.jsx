import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import beginnerImage from '../../assets/ai-persona/persona-beginner-character.png';
import interestedImage from '../../assets/ai-persona/persona-interested-character.png';
import studyImage from '../../assets/ai-persona/persona-study-character.png';
import { AppCard } from '../../components/AppCard.jsx';
import { chatPersonas, readChatPersonaId, saveChatPersonaId } from '../../data/screenData.js';
import { getRememberedPersonaId, pagePath } from '../../routes/routeConfig.js';

const imageMap = { beginner: beginnerImage, interested: interestedImage, study: studyImage };

export function PersonaSelectPage() {
  const { personaId = getRememberedPersonaId() } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(readChatPersonaId(personaId));

  const apply = () => {
    saveChatPersonaId(personaId, selected);
    navigate(pagePath(personaId, 'tax-chat'));
  };

  return (
    <section className="screen-page ai-persona-page" aria-label="AI 페르소나 변경">
      <header className="screen-heading">
        <h1>AI 페르소나 변경</h1>
        <p>어떤 방식으로 설명해드릴까요?</p>
      </header>
      <div className="ai-persona-list" role="list">
        {chatPersonas.map((option) => (
          <AppCard as="button" type="button" className={`ai-persona-card${selected === option.id ? ' is-selected' : ''}`} aria-pressed={selected === option.id} onClick={() => setSelected(option.id)} key={option.id} title={option.source}>
            <span className="visual-tile ai-persona-card__visual"><img src={imageMap[option.id]} alt="" aria-hidden="true" /></span>
            <span>
              <strong className="ui-list-title">{option.name}</strong>
              <em>{option.definition}</em>
              <small>{option.description}</small>
            </span>
          </AppCard>
        ))}
      </div>
      <AppCard className="bottom-action-card">
        <strong className="ui-list-title">선택한 설명 스타일을 적용할게요</strong>
        <p className="ui-body-muted">챗봇 답변 방식만 바뀌며 한버팀/김갓생 화면 흐름은 그대로 유지돼요.</p>
        <button className="blue-pill-cta ui-action" type="button" onClick={apply}>선택 완료</button>
      </AppCard>
    </section>
  );
}
