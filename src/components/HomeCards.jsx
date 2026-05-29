/*
 * HOME CARD IMPLEMENTATION CONTRACT
 *
 * 이 파일은 메인 페이지의 큰 카드 3개(중요알림 / 절세온도 / 오늘의 지식 한입)를
 * 다른 페이지에서도 재사용할 수 있게 만든 기준 구현이다. 이후 세션에서도 아래 규칙을 따른다.
 *
 * 1) AppCard 사용 규칙
 * - 메인 페이지의 바깥 카드(root)는 반드시 <AppCard>로 감싼다.
 * - AppCard는 카드의 외곽 단위다. 카드끼리의 간격은 부모(.main2-page)의 gap만 사용한다.
 * - 카드 root에서 margin을 추가하지 않는다. 카드 간 상하 간격을 조정해야 하면 HomePage의
 *   카드 배열 부모 gap 또는 AppCard 공통 규칙만 조정한다.
 * - 카드 내부 edge padding은 AppCard 계층의 공통 padding 규칙을 따른다.
 *   개별 카드 children이 padding/margin으로 카드 외곽 여백을 흉내 내면 세 카드의 여백이 달라진다.
 * - 카드 안쪽 요소 간 간격은 해당 카드 내부 레이아웃 클래스에서만 관리한다.
 *   예: 추천 칩 간격은 .main2-benefit-row, 계기판 내부 간격은 .main2-tax-temp-card.
 * - 절대배치 이미지는 레이아웃 흐름에 참여시키지 않는다. 이미지 위치 때문에 텍스트 영역이 필요하면
 *   텍스트 max-width만 조정하고 카드 root margin/padding을 바꾸지 않는다.
 *
 * 2) 폰트/색상 토큰 사용 규칙
 * - 텍스트 크기, 굵기, 색상은 h1/p/strong/span/button 같은 요소 selector에 새로 정의하지 않는다.
 * - 텍스트에는 반드시 global.css의 ui-* typography class를 붙인다.
 *   예: ui-eyebrow, ui-alert-title, ui-body-muted, ui-label-sm, ui-amount,
 *       ui-amount-unit, ui-action, ui-knowledge-title, ui-section-title,
 *       ui-list-title, ui-caption, ui-chip-title, ui-chip-caption.
 * - 새 텍스트 계층이 필요하면 임의 font-size/font-weight/color를 요소에 직접 쓰지 말고,
 *   global.css에 토큰과 ui-* class를 먼저 추가한 뒤 여기서 그 class만 사용한다.
 * - 색상도 직접 hex를 JSX 인라인 스타일이나 카드별 새 텍스트 selector에 넣지 않는다.
 *   기존 --color-text-* 토큰 또는 ui-* class를 재사용한다.
 *
 * 3) mockdatas 사용 규칙
 * - 이 컴포넌트는 표시만 담당한다. 금액, 추천명, 설명, 일정 문구를 이 파일에서 새로 만들지 않는다.
 * - 데이터는 src/data/personaMockData.js에서 내려온 값을 그대로 렌더링한다.
 * - personaMockData.js에 값을 추가/수정할 때도 mockdatas/index.md, mockdatas/*.xml,
 *   mockdatas/text/*에 실제로 존재하는 문구만 사용한다.
 * - 임의 금액, 임의 정책/공제명, 임의 일정, 임의 설명은 금지한다.
 * - 긴 mock 문구가 레이아웃을 넘치면 데이터를 줄이지 말고 CSS 말줄임/줄바꿈 규칙으로 처리한다.
 *   원문 보존이 필요한 추천 칩은 title/aria-label로 전체 문구를 유지한다.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GaugeComponent from 'react-gauge-component';
import { AppCard } from './AppCard.jsx';
import { pagePath } from '../routes/routeConfig.js';

export function BenefitAlertCard({ alert, recommendations, personaId, deductionDetailPath, visualSrc }) {
  return (
    <AppCard className="main2-alert-card">
      {visualSrc && <img className="main2-alert-visual" src={visualSrc} alt="" aria-hidden="true" />}
      <p className="main2-eyebrow ui-eyebrow">중요 알림</p>
      <h1 className="ui-alert-title">
        {alert.message.map((part, index) => (
          <span className={part.highlight ? 'main2-alert-highlight' : undefined} key={`${part.text}-${index}`}>{part.text}</span>
        ))}
      </h1>
      <article className="main2-amount-card">
        <span className="ui-label-sm">{alert.amountLabel}</span>
        <strong className="ui-amount">{alert.amount}<em className="ui-amount-unit">{alert.amountUnit}</em></strong>
        <Link className="main2-primary-cta ui-action" to={deductionDetailPath}>바로 확인하고 신청하기&gt;</Link>
      </article>
      <div className="main2-benefit-row" aria-label="추천 정책 및 공제 목록">
        {recommendations.map((item) => (
          <BenefitChip item={item} to={pagePath(personaId, item.detailPage, item.detailId)} key={item.title} />
        ))}
      </div>
    </AppCard>
  );
}

export function KnowledgeBiteCard({ knowledge, personaId, visualSrc }) {
  return (
    <AppCard className="main2-knowledge-card">
      <div>
        <p className="main2-eyebrow ui-eyebrow">오늘의 지식 한입</p>
        <strong className="ui-knowledge-title">
          {Array.isArray(knowledge.title)
            ? knowledge.title.map((part, index) => (
              <span className={part.highlight ? 'main2-knowledge-highlight' : undefined} key={`${part.text}-${index}`}>{part.text}</span>
            ))
            : knowledge.title}
        </strong>
        <p className="ui-body-muted">{knowledge.description}</p>
        <Link className="main2-text-link ui-action" to={pagePath(personaId, knowledge.detailPage, knowledge.detailId)}>더 알아보기 &gt;</Link>
      </div>
      {visualSrc && <img className="knowledge-visual" src={visualSrc} alt="" aria-hidden="true" />}
    </AppCard>
  );
}

const taxTemperatureAnimationMs = 1200;

function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

export function TaxTemperatureCard({ temperature = 72, calendar, personaId }) {
  const [animatedTemperature, setAnimatedTemperature] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setAnimatedTemperature(temperature);
      return undefined;
    }

    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (shouldReduceMotion) {
      setAnimatedTemperature(temperature);
      return undefined;
    }

    let frameId = 0;
    let startTime = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / taxTemperatureAnimationMs, 1);
      setAnimatedTemperature(Math.round(temperature * easeOutCubic(progress)));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    setAnimatedTemperature(0);
    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [temperature]);

  return (
    <AppCard className="main2-tax-temp-card" aria-label="절세온도 계기판">
      <div className="main2-section-head">
        <h2 className="ui-section-title">절세온도</h2>
      </div>
      <div className="main2-tax-gauge" aria-hidden="true">
        <GaugeComponent
          id="tax-temperature-gauge"
          style={{ overflow: 'visible', maxHeight: 'none' }}
          type="semicircle"
          value={animatedTemperature}
          minValue={0}
          maxValue={100}
          marginInPercent={{ top: 0.06, right: 0.08, bottom: 0, left: 0.08 }}
          arc={{
            width: 0.18,
            padding: 0.018,
            cornerRadius: 8,
            subArcs: [
              { limit: 35, color: '#a7d8ff' },
              { limit: 70, color: '#4f7cff' },
              { limit: 100, color: '#ff8a3d' },
            ],
          }}
          pointer={{
            type: 'needle',
            color: '#101828',
            baseColor: '#101828',
            length: 0.72,
            width: 14,
            animate: false,
          }}
          labels={{
            valueLabel: { hide: true },
            tickLabels: { hideMinMax: true },
          }}
        />
      </div>
      <div className="main2-tax-temp-readout">
        <strong className="ui-amount">{animatedTemperature}<em className="ui-amount-unit">℃</em></strong>
        <span className="ui-caption">조금만 챙기면 더 올라가요</span>
      </div>
      <div className="main2-tax-boost">
        <h3 className="ui-section-title">절세 온도 높이기</h3>
        <div className="main2-schedule-list">
          {calendar.schedules.map((schedule) => (
            <Link className={`main2-schedule-item main2-schedule-item--${schedule.type}`} to={pagePath(personaId, schedule.detailPage, schedule.detailId)} key={`${schedule.type}-${schedule.title}`}>
              <strong className="ui-list-title">{schedule.title}</strong>
              <span className="ui-caption">{schedule.period}</span>
            </Link>
          ))}
        </div>
      </div>
    </AppCard>
  );
}

export function BenefitChip({ item, to }) {
  const label = `${item.title} 자세히보기`;

  return (
    <Link className="main2-benefit-chip" to={to} aria-label={label} title={label}>
      <strong className="ui-chip-title">{item.title}</strong>
      <span className="ui-chip-caption">자세히보기</span>
    </Link>
  );
}
