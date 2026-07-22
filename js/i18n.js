(function(){
  const translations = {
    fr: {
      'brand.title': 'Hôpital ITAC',
      'brand.tagline': 'Soins, confiance et innovation',
      'nav.home': 'Accueil',
      'nav.about': 'À propos',
      'nav.services': 'Services',
      'nav.doctors': 'Médecins',
      'nav.appointments': 'Rendez-vous',
      'nav.emergency': 'Urgences',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'emergency.title': 'URGENCE 24/7 :',
      'emergency.phone': '+509 47 45 76 36',
      'emergency.note': 'Transport médicalisé disponible • Entrée urgences : Bâtiment A',
      'hero.title': 'Bienvenue à l\u2019hôpital ITAC',
      'hero.lead': 'Soins spécialisés, équipe pluridisciplinaire et prise en charge personnalisée.',
      'hero.cta.services': 'Voir les services',
      'hero.cta.appointment': 'Prendre rendez-vous',
      'contact.quick.title': 'Contact rapide',
      'contact.quick.phone': 'Tél. urgences : +509 47 45 76 36',
      'contact.quick.appointment': 'Rendez-vous : Prendre un rendez-vous',
      'contact.quick.contact': 'Nous contacter',
      'services.title': 'Nos principaux services',
      'services.emergency.title': 'Urgences',
      'services.emergency.text': 'Prise en charge immédiate 24/7 par nos équipes d\u2019urgence.',
      'services.surgery.title': 'Chirurgie',
      'services.surgery.text': 'Bloc opératoire moderne et équipes chirurgicales spécialisées.',
      'services.maternity.title': 'Maternité',
      'services.maternity.text': 'Accompagnement complet de la grossesse et de l\u2019accouchement.',
      'services.cta': 'Voir tous les services',
      'doctors.title': 'Nos médecins',
      'doctors.dr1.name': 'Dr. Marie Dupont',
      'doctors.dr1.title': 'Cardiologie — Chef de service',
      'doctors.dr2.name': 'Dr. Paul Martin',
      'doctors.dr2.title': 'Pédiatrie — Spécialiste'
    },
    en: {
      'brand.title': 'ITAC Hospital',
      'brand.tagline': 'Care, trust and innovation',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.doctors': 'Doctors',
      'nav.appointments': 'Appointments',
      'nav.emergency': 'Emergency',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'emergency.title': 'EMERGENCY 24/7:',
      'emergency.phone': '+509 47 45 76 36',
      'emergency.note': 'Medical transport available • Emergency entrance: Building A',
      'hero.title': 'Welcome to ITAC Hospital',
      'hero.lead': 'Specialized care, multidisciplinary team and personalised patient pathways.',
      'hero.cta.services': 'See services',
      'hero.cta.appointment': 'Book appointment',
      'contact.quick.title': 'Quick contact',
      'contact.quick.phone': 'Emergency tel: +509 47 45 76 36',
      'contact.quick.appointment': 'Appointments: Book an appointment',
      'contact.quick.contact': 'Contact us',
      'services.title': 'Our main services',
      'services.emergency.title': 'Emergency',
      'services.emergency.text': 'Immediate care 24/7 by our emergency teams.',
      'services.surgery.title': 'Surgery',
      'services.surgery.text': 'Modern operating theatre and specialised surgical teams.',
      'services.maternity.title': 'Maternity',
      'services.maternity.text': 'Comprehensive maternity care and childbirth support.',
      'services.cta': 'See all services',
      'doctors.title': 'Our Doctors',
      'doctors.dr1.name': 'Dr. Marie Dupont',
      'doctors.dr1.title': 'Cardiology — Head of Department',
      'doctors.dr2.name': 'Dr. Paul Martin',
      'doctors.dr2.title': 'Pediatrics — Specialist'
    }
  };

  function translateTo(lang){
    const dict = translations[lang] || translations.fr;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
    document.documentElement.lang = lang;
  }

  // Initialize
  const select = document.getElementById('lang');
  if (!select) return;
  const saved = localStorage.getItem('site_lang') || (navigator.language && navigator.language.startsWith('en') ? 'en' : 'fr');
  select.value = saved;
  translateTo(saved);

  select.addEventListener('change', (e)=>{
    const v = e.target.value;
    localStorage.setItem('site_lang', v);
    translateTo(v);
  });
})();
