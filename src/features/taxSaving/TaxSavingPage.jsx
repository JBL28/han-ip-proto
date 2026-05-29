import { useParams } from 'react-router-dom';
import glassesLenses from '../../assets/tax-saving/glasses-lenses.svg';
import educationNote from '../../assets/tax-saving/education-note.svg';
import medicalCheckup from '../../assets/tax-saving/medical-checkup.svg';
import monthlyRentHome from '../../assets/tax-saving/monthly-rent-home.svg';
import creditCard from '../../assets/tax-saving/credit-card.svg';
import babyCare from '../../assets/tax-saving/baby-care.svg';
import supportSearch from '../../assets/tax-saving/support-search.svg';
import { TaxSavingBenefitCard, TaxSavingSupportBanner } from '../../components/TaxSavingCards.jsx';
import { supportBanner, taxSavingCards } from '../../data/screenData.js';
import { getRememberedPersonaId, pagePath } from '../../routes/routeConfig.js';

const imageMap = { glassesLenses, educationNote, medicalCheckup, monthlyRentHome, creditCard, babyCare };

export function TaxSavingPage() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return (
    <section className="screen-page tax-saving-page" aria-label="절세 추천">
      <header className="screen-heading">
        <h1><span className="tax-saving-highlight tax-saving-heading-highlight">절세 추천</span></h1>
        <p><span className="tax-saving-highlight">지금 받을 수 있는 혜택</span>을 확인해보세요</p>
      </header>
      <div className="tax-saving-grid" aria-label="추천 공제 목록">
        {taxSavingCards.map((item) => (
          <TaxSavingBenefitCard key={item.id} item={item} imageSrc={imageMap[item.image]} to={pagePath(personaId, item.detailPage, item.detailId)} />
        ))}
      </div>
      <TaxSavingSupportBanner banner={supportBanner} imageSrc={supportSearch} to={pagePath(personaId, 'policies')} />
    </section>
  );
}
