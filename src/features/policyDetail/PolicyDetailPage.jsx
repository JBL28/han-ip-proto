import { Link, useParams } from 'react-router-dom';
import childCareDetail from '../../assets/policy-detail/child-care-detail.svg';
import cultureDetail from '../../assets/policy-detail/culture-detail.svg';
import trainingDetail from '../../assets/policy-detail/training-detail.svg';
import rentDetail from '../../assets/policy-detail/rent-detail.svg';
import { AppCard } from '../../components/AppCard.jsx';
import { PolicyDetailHero, PolicyFieldList } from '../../components/PolicyCards.jsx';
import { getPolicyDetail } from '../../data/screenData.js';
import { getRememberedPersonaId, pagePath } from '../../routes/routeConfig.js';

const imageMap = { childCareDetail, cultureDetail, trainingDetail, rentDetail };

export function PolicyDetailPage() {
  const { personaId = getRememberedPersonaId(), policyId } = useParams();
  const policy = getPolicyDetail(personaId, policyId);
  const fields = [
    { label: '지원 대상', value: policy.tags.join(', ') },
    { label: '지원 주기', value: policy.cycle },
    { label: '지원 내용', value: policy.provision },
    { label: '온라인 신청', value: policy.online === 'Y' ? '가능' : '확인 필요' },
  ];
  const orgFields = [
    { label: '소관 부처', value: policy.ministry },
    { label: '담당 부서', value: policy.department },
    { label: '문의처', value: policy.contact },
  ];
  return (
    <section className="screen-page detail-page" aria-label="정책 상세보기">
      <PolicyDetailHero policy={policy} imageSrc={imageMap[policy.detailImage]} />
      <PolicyFieldList title="지원 정보" fields={fields} />
      <PolicyFieldList title="신청 및 문의" fields={orgFields} />
      <AppCard className="bottom-action-card" title={policy.source}>
        <strong className="ui-list-title">더 자세히 확인하기</strong>
        <p className="ui-body-muted">복지로 원문 링크와 AI 설명을 함께 확인할 수 있어요.</p>
        <div className="action-row">
          <a className="outline-cta ui-action" href={policy.link} target="_blank" rel="noreferrer">자세히 보기</a>
          <Link className="blue-pill-cta ui-action" to={pagePath(personaId, 'tax-chat')}>챗봇에게 물어보기</Link>
        </div>
      </AppCard>
    </section>
  );
}
