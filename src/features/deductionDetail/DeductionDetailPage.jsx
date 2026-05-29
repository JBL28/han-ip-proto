import { useParams } from 'react-router-dom';
import rentReceipt from '../../assets/deduction-detail/rent-receipt.svg';
import benefitCoins from '../../assets/deduction-detail/benefit-coins.svg';
import { BottomActionCard, DetailHeroCard, DetailInfoSection } from '../../components/DetailSections.jsx';
import { getDeductionDetail } from '../../data/screenData.js';
import { getRememberedPersonaId } from '../../routes/routeConfig.js';

const imageMap = { rentReceipt, benefitCoins };

export function DeductionDetailPage() {
  const { personaId = getRememberedPersonaId(), deductionId } = useParams();
  const detail = getDeductionDetail(personaId, deductionId);
  return (
    <section className="screen-page detail-page" aria-label="공제 상세보기">
      <DetailHeroCard eyebrow="공제 상세보기" title={detail.title} amountText={detail.amountText} summary={detail.summary} imageSrc={imageMap[detail.image]} />
      {detail.sections.map((section) => <DetailInfoSection key={section.title} section={section} />)}
      <BottomActionCard personaId={personaId} />
    </section>
  );
}
