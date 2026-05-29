import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import policySearch from '../../assets/policies/policy-search.svg';
import childCarePolicy from '../../assets/policies/child-care-policy.svg';
import cultureCard from '../../assets/policies/culture-card.svg';
import jobTraining from '../../assets/policies/job-training.svg';
import youthRent from '../../assets/policies/youth-rent.svg';
import { AppCard } from '../../components/AppCard.jsx';
import { PolicyFilterChip, PolicyRecommendationCard } from '../../components/PolicyCards.jsx';
import { getPolicies } from '../../data/screenData.js';
import { getRememberedPersonaId, pagePath } from '../../routes/routeConfig.js';

const imageMap = { childCarePolicy, cultureCard, jobTraining, youthRent };
const categories = ['전체', '문화', '교육', '취업', '의료', '대출', '지원금', '보호', '행정', '주거'];

export function PoliciesPage() {
  const { personaId = getRememberedPersonaId() } = useParams();
  const [category, setCategory] = useState('전체');
  const policies = getPolicies(personaId);
  const filtered = useMemo(() => category === '전체' ? policies : policies.filter((item) => item.category === category || item.tags.includes(category)), [category, policies]);

  return (
    <section className="screen-page policies-page" aria-label="정책추천">
      <AppCard className="policy-hero-card">
        <div>
          <p className="ui-eyebrow">추천 정책</p>
          <h1>정책 추천</h1>
          <p className="ui-body-muted">나에게 맞는 지원 정책을 확인해보세요</p>
        </div>
        <span className="visual-tile policy-hero-card__visual"><img src={policySearch} alt="" aria-hidden="true" /></span>
      </AppCard>
      <div className="filter-chip-row" aria-label="정책 카테고리">
        {categories.map((item) => <PolicyFilterChip key={item} label={item} selected={category === item} onClick={() => setCategory(item)} />)}
      </div>
      <div className="policy-list">
        {filtered.map((policy) => <PolicyRecommendationCard key={policy.id} policy={policy} imageSrc={imageMap[policy.image]} to={pagePath(personaId, 'policy-detail', policy.id)} />)}
      </div>
      <Link className="floating-chat-card" to={pagePath(personaId, 'tax-chat')}>추천 정책이 궁금하다면 AI에게 물어보기 ›</Link>
    </section>
  );
}
