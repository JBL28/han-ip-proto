import { useMemo, useState } from 'react';
import { DayPicker } from '@daypicker/react';
import '@daypicker/react/style.css';

const calendarMonth = new Date(2025, 4, 1);

const scheduleByDate = {
  '2025-05-01': [
    { type: 'policy', title: '청년내일채움공제 신청 마감', period: '2025.05.01 ~ 2025.05.31' },
  ],
  '2025-05-10': [
    { type: 'tax', title: '월세 세액공제', period: '2025.05.01 ~ 2025.05.31' },
  ],
  '2025-05-15': [
    { type: 'policy', title: '청년내일채움공제 신청 마감', period: '2025.05.01 ~ 2025.05.31' },
    { type: 'tax', title: '종합소득세 신고 기간', period: '2025.05.01 ~ 2025.05.31' },
  ],
  '2025-05-25': [
    { type: 'tax', title: '자녀 세액공제', period: '2025.05.01 ~ 2025.05.31' },
  ],
  '2025-05-31': [
    { type: 'policy', title: '청년내일채움공제 신청 마감', period: '2025.05.01 ~ 2025.05.31' },
    { type: 'tax', title: '종합소득세 신고 기간', period: '2025.05.01 ~ 2025.05.31' },
  ],
};

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function scheduleDatesByType(type) {
  return Object.entries(scheduleByDate)
    .filter(([, schedules]) => schedules.some((schedule) => schedule.type === type))
    .map(([key]) => {
      const [year, month, day] = key.split('-').map(Number);
      return new Date(year, month - 1, day);
    });
}

export function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 15));
  const selectedKey = dateKey(selectedDate);
  const selectedSchedules = scheduleByDate[selectedKey] || [];
  const modifiers = useMemo(() => ({
    policySchedule: scheduleDatesByType('policy'),
    taxSchedule: scheduleDatesByType('tax'),
  }), []);

  return (
    <section className="main2-page" aria-label="메인 페이지">
      <section className="main2-alert-card">
        <p className="main2-eyebrow">중요 알림</p>
        <h1>지금 놓치고 있는<br />공제 혜택이 있어요!</h1>
        <p>놓치면 아쉬운 혜택,<br />지금 바로 확인하고 신청하세요.</p>
        <article className="main2-amount-card">
          <span>공제 혜택 예상 금액</span>
          <strong>120<em>만원</em></strong>
          <button type="button">바로 확인하고 신청하기&gt;</button>
        </article>
        <div className="main2-benefit-row" aria-label="공제 혜택 목록">
          <BenefitChip icon="세" title="청년내일채움공제" status="신청 마감 D-7" />
          <BenefitChip icon="A" title="월세 세액공제" status="신청 가능" />
          <BenefitChip icon="e" title="자녀 세액공제" status="신청 가능" />
        </div>
      </section>

      <section className="main2-knowledge-card">
        <div>
          <p className="main2-eyebrow">오늘의 지식 한입</p>
          <strong>안경 및 렌즈<br />시력교정용 공제 가능해요</strong>
          <p>시력교정용 안경, 렌즈 구입비도<br />의료비 세액공제 대상입니다.</p>
          <button type="button">더 알아보기 &gt;</button>
        </div>
        <div className="knowledge-visual" aria-hidden="true">66</div>
      </section>

      <section className="main2-calendar-section">
        <div className="main2-section-head">
          <h2>캘린더 (정책 + 세금)</h2>
          <button type="button">전체 일정 보기 &gt;</button>
        </div>
        <article className="main2-calendar-card">
          <div className="calendar-caption"><button type="button" aria-label="이전 달">&lt;</button><strong>2025년 5월</strong><button type="button" aria-label="다음 달">&gt;</button></div>
          <DayPicker
            mode="single"
            month={calendarMonth}
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            modifiers={modifiers}
            showOutsideDays
            fixedWeeks
            hideNavigation
            captionLayout="label"
            className="main2-daypicker"
          />
          <div className="main2-schedule-list">
            {selectedSchedules.map((schedule) => (
              <article className={`main2-schedule-item main2-schedule-item--${schedule.type}`} key={`${schedule.type}-${schedule.title}`}>
                <strong>{schedule.title}</strong>
                <span>{schedule.period}</span>
              </article>
            ))}
          </div>
          <div className="main2-calendar-legend">
            <span><i className="legend-dot legend-dot--policy" />정책 신청기간</span>
            <span><i className="legend-dot legend-dot--tax" />세금 신고기간</span>
          </div>
        </article>
      </section>
    </section>
  );
}

function BenefitChip({ icon, title, status }) {
  return (
    <article className="main2-benefit-chip">
      <i aria-hidden="true">{icon}</i>
      <strong>{title}</strong>
      <span>{status}</span>
    </article>
  );
}
