import { Link, useParams } from 'react-router-dom';
import { getRememberedPersonaId, personas, rememberPersonaId } from '../../routes/routeConfig.js';

export function PersonaSelectPage() {
  const { personaId = getRememberedPersonaId() } = useParams();

  return (
    <section className="placeholder-page persona-select-page" aria-label="AI 페르소나 변경">
      <p className="eyebrow">AI 페르소나 변경</p>
      <h1>페르소나를 선택해주세요</h1>
      <p className="body-muted">선택하면 상태가 저장되고 해당 페르소나 화면으로 이동해요.</p>
      <div className="persona-grid" role="list">
        {personas.map((persona) => (
          <Link
            className={`persona-card${personaId === persona.id ? ' is-selected' : ''}`}
            to={`/${persona.id}/signup/cert`}
            onClick={() => rememberPersonaId(persona.id)}
            key={persona.id}
            role="listitem"
          >
            <span>{persona.name}</span>
            <strong>{persona.description}</strong>
            <em>{persona.summary}</em>
          </Link>
        ))}
      </div>
    </section>
  );
}
