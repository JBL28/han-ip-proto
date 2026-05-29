export function ChoiceCard({ title, description, selected, onClick }) {
  return (
    <button className={`choice-card${selected ? ' is-selected' : ''}`} type="button" aria-pressed={selected} onClick={onClick}>
      <span><strong>{title}</strong>{description && <em>{description}</em>}</span>
      <span className="choice-check"><CheckIcon /></span>
    </button>
  );
}

export function Chip({ children, selected, onClick }) {
  return <button className={`choice-chip${selected ? ' is-selected' : ''}`} type="button" aria-pressed={selected} onClick={onClick}>{children}</button>;
}

export function CounterCard({ label, helper, value, onMinus, onPlus, age }) {
  return (
    <article className={`counter-card${value > 0 ? ' is-selected' : ''}`}>
      <div className="counter-copy">
        <strong>{label}</strong>
        <p>{helper}</p>
        {age && <p className="bold-value">나이 <b>{age}</b></p>}
      </div>
      <div className="counter-control" aria-label={`${label} 인원수 조정`}>
        <button type="button" onClick={onMinus} aria-label={`${label} 줄이기`}><MinusIcon /></button>
        <strong>{value}명</strong>
        <button type="button" onClick={onPlus} aria-label={`${label} 늘리기`}><PlusIcon /></button>
      </div>
    </article>
  );
}

export function YesNoRow({ label, value, onChange }) {
  return (
    <div className="yes-no-row">
      <span>{label}</span>
      <span className="yes-no-controls" role="group" aria-label={label}>
        <button className={`mini-pill${value ? ' is-selected' : ''}`} type="button" aria-pressed={value} onClick={() => onChange(true)}>O</button>
        <button className={`mini-pill${!value ? ' is-selected' : ''}`} type="button" aria-pressed={!value} onClick={() => onChange(false)}>X</button>
      </span>
    </div>
  );
}

export function SignupActionBar({ primary, secondary, single = false }) {
  return (
    <footer className={`signup-bottom-actions${single ? ' signup-bottom-actions--single' : ''}`}>
      {!single && secondary && <ActionLink className="secondary-action" {...secondary} />}
      <ActionLink className="primary-action" {...primary} />
    </footer>
  );
}

function ActionLink({ as: Component = 'a', className = '', children, ...props }) {
  return <Component className={className} {...props}>{children}</Component>;
}

export function EqualButtonGroup({ label, options }) {
  return (
    <div className="auth-choice-row" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          className={`auth-choice${option.selected ? ' is-selected' : ''}`}
          type="button"
          aria-pressed={option.selected}
          onClick={option.onClick}
          key={option.value || option.label}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function MinusIcon() { return <svg className="counter-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /></svg>; }
export function PlusIcon() { return <svg className="counter-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14" /><path d="M5 12h14" /></svg>; }
export function CheckIcon() { return <svg className="inline-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5" /></svg>; }
export function ChevronLeftIcon() { return <svg className="inline-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>; }
