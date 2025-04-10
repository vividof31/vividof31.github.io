import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'sonner'; // Import toast

type Language = 'en' | 'es' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string; // Allow optional default value
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// List of primarily Spanish-speaking country codes (ISO 3166-1 alpha-2)
// This list might need refinement based on target audience.
const spanishSpeakingCountries = [
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ',
  'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'ES', 'UY', 'VE', 'PR' // Added Puerto Rico
];

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default to English
  const [isLoading, setIsLoading] = useState(true); // Loading state for detection

  useEffect(() => {
    const detectUserLanguage = async () => {
      setIsLoading(true); // Start loading
      try {
        // 1. Check local storage first
        const storedLang = localStorage.getItem('preferredLanguage');
        if (storedLang === 'es' || storedLang === 'en') {
          setLanguage(storedLang);
          console.log(`Language set from localStorage: ${storedLang}`);
          setIsLoading(false);
          return;
        }

        // 2. Check browser language preference (less reliable for location)
        // const browserLang = navigator.language.split('-')[0];
        // if (browserLang === 'es') {
        //   setLanguage('es');
        //   localStorage.setItem('preferredLanguage', 'es');
        //   setIsLoading(false);
        //   return;
        // }

        // 3. Attempt IP Geolocation (using ipapi.co as in original)
        console.log('Attempting IP geolocation for language...');
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error(`ipapi.co request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('ipapi.co response:', data);

        if (data && data.country_code && spanishSpeakingCountries.includes(data.country_code)) {
          console.log(`Detected Spanish-speaking country: ${data.country_code}. Setting language to Spanish.`);
          setLanguage('es');
          localStorage.setItem('preferredLanguage', 'es');
        } else {
          console.log(`Detected non-Spanish-speaking country or no country code (${data?.country_code}). Setting language to English.`);
          setLanguage('en');
          localStorage.setItem('preferredLanguage', 'en');
        }
      } catch (error) {
        console.error('Error detecting language via IP:', error);
        // Fallback to English if detection fails
        setLanguage('en');
        localStorage.setItem('preferredLanguage', 'en');
      } finally {
        setIsLoading(false); // Finish loading
      }
    };

    detectUserLanguage();
  }, []); // Run only on initial mount

  const handleSetLanguage = (newLang: Language) => {
    console.log(`Manually setting language to: ${newLang}`);
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  // --- Translations Object (Combine previous texts) ---
  // NOTE: Ensure all keys used in components exist here for both 'en' and 'es'
  const translations: Record<Language, Record<string, string>> = {
    en: {
      // General / Header
      home: 'Home',
      about: 'About',
      services: 'Services',
      whyUs: 'Why Us', // Added key
      howItWorks: 'How It Works', // Added key
      faq: 'FAQ',
      contact: 'Contact', // Added key
      language: 'Language',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      applyNow: 'Apply Now', // Added key

      // Hero
      welcomeToVivid: 'WE HELP CREATORS REACH THE TOP 1% ON ONLYFANS.',
      heroSubtitle: "Focus on your content, we'll handle the rest. Expert management, promotion, and growth strategies.", // Added key
      learnMore: 'Learn More',

      // About
      aboutUs: 'About Us',
      aboutDescription: 'Vivid is a leading management agency laser-focused on empowering OnlyFans creators to achieve peak success. We specialize in navigating the unique landscape of the creator economy, providing dedicated support and expert strategies designed to maximize your earnings and audience growth on the platform.',
      aboutDescription2: 'Our experienced team understands the challenges and opportunities of OnlyFans inside and out. From targeted promotion and content strategy to full account management, we handle the complexities so you can dedicate your energy to creating the content your fans love. Partner with us to unlock your full potential.',
      strategicGrowth: "Creator-Focused Strategy", // Renamed from original for clarity
      strategicGrowthDesc: "Tailored plans designed for sustainable growth and engagement on OnlyFans.",
      discreetProfessional: "Discreet & Professional", // Added key
      discreetProfessionalDesc: "We prioritize your privacy and operate with the utmost professionalism.", // Added key
      expertTeam: 'Expert Team',
      expertTeamDesc: 'Work with industry professionals who understand the creator economy inside and out.',
      provenSuccess: 'Proven Results', // Renamed from original
      provenSuccessDesc: 'Our methods are designed to elevate creators towards top-tier success.', // Adjusted description

      // Services
      ourServices: 'Our Services',
      servicesSubtitle: 'Comprehensive solutions designed to elevate OnlyFans creators to the top 1%.', // Added key
      talentManagement: "Full Account Management", // Corresponds to the service title
      talentManagementDesc: "Complete handling of your OnlyFans account, including posting, promotion, and fan interaction.",
      bookingServices: "Marketing & Promotion", // Corresponds to the service title
      bookingServicesDesc: "Strategic promotion across relevant platforms to drive subscribers and visibility to your OnlyFans page.",
      modelTraining: "24/7 Chatter Management", // Corresponds to the service title
      modelTrainingDesc: "Dedicated team managing fan messages and DMs to build relationships and maximize PPV sales.",
      videoProduction: "Video Content Strategy", // Corresponds to the service title
      videoProductionDesc: "Planning and optimizing video content to maximize engagement and revenue on OnlyFans.",
      photoShoots: "Content Creation Support", // Corresponds to the service title
      photoShootsDesc: "Guidance and resources for producing high-quality photos and videos tailored for your audience.",
      analytics: "Analytics", // Added key
      analyticsDesc: "Detailed performance tracking and audience insights.", // Added key

      // How It Works
      howItWorksTitle: "How It Works", // Added key
      howItWorksSubtitle: "Our streamlined process for creator success.", // Added key
      step1Title: "1. Apply Online", // Added key
      step1Desc: "Fill out our detailed application form, providing your information and uploading the required images.", // Added key
      step2Title: "2. Application Review", // Added key
      step2Desc: "Our team carefully reviews your application, profile (if applicable), and images to assess potential partnership.", // Added key
      step3Title: "3. Onboarding Call", // Added key
      step3Desc: "If selected, we'll schedule a call to discuss strategy, expectations, and finalize our partnership agreement.", // Added key
      step4Title: "4. Growth & Management", // Added key
      step4Desc: "We implement tailored strategies for promotion, content, and account management to maximize your earnings and growth.", // Added key

      // Why Choose Us
      whyChooseUsTitle: "Why Partner with Vivid?", // Added key
      whyChooseUsSubtitle: "We provide the expertise and support system needed to thrive in the competitive creator economy.", // Added key
      acceleratedGrowth: "Accelerated Growth", // Added key
      acceleratedGrowthDesc: "Our proven marketing strategies rapidly expand your reach and subscriber base.", // Added key
      maximizedEarnings: "Maximized Earnings", // Added key
      maximizedEarningsDesc: "Expert chatters and optimized PPV strategies ensure you're earning your full potential.", // Added key
      focusOnCraft: "Focus on Your Craft", // Added key
      focusOnCraftDesc: "We handle the business side – management, promotion, support – so you can focus on creating content.", // Added key
      dedicatedPartnership: "Dedicated Partnership", // Added key
      dedicatedPartnershipDesc: "Receive personalized support and strategic guidance from our experienced team, committed to your success.", // Added key

      // FAQ (Copied from original context)
      faqTitle: 'Frequently Asked Questions',
      faqQuestion1: 'What services do you provide for OnlyFans creators?',
      faqAnswer1: `Our service provides comprehensive support so you can focus solely on creating content while we handle everything else. Here's what's included:\n\n• Full Marketing & Promotion: We cover all marketing costs and apply proven growth strategies to expand your audience and visibility.\n\n• Content Strategy & Trend Analysis: Receive regular insights on trending content and ideas tailored to your niche, helping you stay current and engaging.\n\n• 24/7 Chat Management: Our dedicated chat team manages your DMs, upselling fans and maximizing revenue, while ensuring you don't have to engage with uncomfortable messages.\n\n• In-Depth Analytics: We track engagement and revenue data to optimize strategies and ensure steady growth month over month.\n\n• One-on-One Support: You'll have direct access to our team of experts for personalized guidance, ensuring you feel supported every step of the way.\n\nOur goal is to make the journey as seamless and rewarding as possible by handling the business side so you can thrive as a creator.`,
      faqQuestion2: 'How long does it take to see results?',
      faqAnswer2: `While results can vary based on factors such as content quality, audience engagement, and market dynamics, our proven strategies typically yield significant growth within the first 30 to 60 days of implementation.\n\nDuring this initial phase, we focus on:\n\n• Content Optimization: We help you refine your content to ensure it resonates with your target audience. This may involve adjusting your content style, themes, or posting frequency based on performance analytics.\n\n• Engagement Strategies: Our team works closely with you to enhance subscriber engagement. This includes implementing effective communication techniques, utilizing promotional campaigns, and encouraging subscriber interaction.\n\n• Marketing Tactics: We leverage various marketing channels to boost your visibility. Our efforts include social media promotion, collaborations with other creators, and strategic ads, all aimed at driving traffic to your OnlyFans profile.\n\nWe continuously monitor and analyze your performance data to make necessary adjustments and maximize your growth potential. By focusing on these key areas, many of our clients begin to see measurable increases in subscriber counts, engagement rates, and overall revenue within the outlined timeframe.\n\nFor long-term success, we believe in building a strong foundation that not only accelerates initial growth but also sustains it over time. We remain committed to your success every step of the way!`,
      faqQuestion3: 'How do I get started with OnlyFans?',
      faqAnswer3: 'Getting started is easy! Simply fill out our join form, and our team will guide you through the entire process, from account setup to content strategy.',
      faqQuestion4: 'Do you help with content creation?',
      faqAnswer4: 'Yes! We provide professional photography and videography services, content planning, and creative direction to ensure your content stands out and attracts subscribers.',
      faqQuestion5: 'What makes your agency different?',
      faqAnswer5: 'We offer a full-service approach, handling everything from content creation to marketing. Our proven track record of helping creators reach the top 1% sets us apart.',
      faqQuestion6: 'How much time do I need to spend?',
      faqAnswer6: 'To maintain a solid engagement level, plan for around 1–4 hours each day. In the beginning, this time may be closer to 2–3 hours while we establish your presence and strategies. As your fanbase grows, you might spend a bit more time interacting with paying fans, but every minute invested directly supports your success. Our team will be there to help you streamline the process, maximizing your impact and ensuring that the time you put in is truly rewarding.',
      faqQuestion7: 'How often do I need to provide content?',
      faqAnswer7: `To maximize your success on OnlyFans, we recommend a consistent content schedule. Ideally, you should aim to provide at least two new photos and three short videos each day. On days when your fans request exclusive content, the number can increase to 5–10 pieces of media daily.\n\nRemember, content is essential for engagement and sales. Without a steady stream of new material, it becomes challenging to promote your account and satisfy your fans. Here's what we typically look for on a weekly basis:\n\n• 7–10 OnlyFans Feed Photos: Regular uploads keep your audience excited and engaged.\n\n• 1–2 Sexting Albums: These are key to driving sales in DMs, where we can capitalize on fan interest and generate revenue. We will collaborate on what works best for you.\n\n• Custom Requests: Occasionally, you may be asked to provide custom snapshots or content reflecting your daily life, adding a personal touch.\n\nFor effective marketing, we also recommend:\n\n• 6–9 TikToks/Reels per day: Short, engaging clips to capture attention across social media platforms.\n\n• 20–40 Short Videos (around 6 seconds each) per month for Reddit: Quick videos to help drive traffic to your OnlyFans profile.\n\n• Extra Content: Any additional material you can share will enhance our promotional efforts.\n\nThis may seem like a lot, but with our support, you can create a sustainable workflow. Ready to take the leap? Join our OnlyFans Agency—where your success is our priority—by clicking here!`,

      // Join Us / Form
      joinUsTitle: "Ready to Reach the Top 1%?", // Added key
      joinUsSubtitle: "Partner with Vivid Agency and unlock your full potential. We provide the tools, strategy, and support you need to succeed.", // Added key
      applyModalTitle: "Apply to Join Vivid", // Added key
      submissionSuccess: 'Application submitted successfully! We\'ll be in touch soon.', // Adjusted from original
      submissionError: 'Submission failed: Please check your input and try again.', // Adjusted from original
      submitting: 'Submitting...',
      submit: 'Submit Application', // Adjusted from original
      cancel: 'Cancel',
      // Form Labels (ensure these match modal)
      fullNameLabel: "Full Name", // Added key
      emailLabel: "Email Address", // Added key
      phoneNumberLabel: "Phone Number", // Added key
      ageLabel: "Age", // Added key
      countryOriginLabel: "Country of Origin", // Added key
      primaryLanguageLabel: "Primary Language", // Added key
      preferredContactLabel: "Preferred Contact Method", // Added key
      whatsappLabel: "WhatsApp Number", // Added key
      telegramLabel: "Telegram Username", // Added key
      hasOfAccountLabel: "Do you currently have an OnlyFans account?", // Added key
      isOfVerifiedLabel: "Is your OnlyFans account verified?", // Added key
      hasVerifiedPaymentLabel: "Have you verified a payment method on OnlyFans?", // Added key
      earningsLabel: "Approx. Earnings Last 30 Days (Optional)", // Added key
      whyJoinLabel: 'Why do you want to join Vivid Agency?', // Adjusted from original
      uploadFilesLabel: 'Upload Images (Min. 5)', // Added key
      ageConfirmLabel: "I confirm I am 18 years of age or older.", // Added key
      selectPlaceholder: "Select...", // Added key
      yes: "Yes", // Added key
      no: "No", // Added key
      sameAsPhone: "Same as Phone", // Added key
      enterDifferentWhatsApp: "Enter Different #", // Added key

      // Contact
      contactTitle: "Get In Touch", // Added key
      contactSubtitle: "Have questions? We're here to help. Reach out to us via email.", // Adjusted

      // Footer
      privacyPolicy: "Privacy Policy", // Added key
      termsOfService: "Terms of Service", // Added key
      allRightsReserved: 'All rights reserved.',

    },
    es: {
      // Admin Dashboard
      adminDashboardTitle: 'Panel de Administración - Solicitudes',
      signOut: 'Cerrar sesión',
      onboarding: 'Incorporación',
      status: 'Estado',
      date: 'Fecha',
      images: 'Imágenes',
      name: 'Nombre',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      age: 'Edad',
      country: 'País',
      contactMethod: 'Método de contacto',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      ofAccount: 'Cuenta OF',
      ofVerified: 'OF Verificado',
      verifiedPayment: 'Pago Verificado',
      earnings30d: 'Ganancias (30d)',
      ageConfirmed: 'Edad Confirmada',
      reason: 'Motivo',
      smartphone: 'Smartphone',
      compensation: 'Compensación',
      hoursPerDay: 'Horas/Día',
      englishSkill: 'Inglés (1-10)',
      explicitContent: 'Contenido Explícito',
      startAvailability: 'Disponibilidad Inicial',
      blockedCountries: 'Países Bloqueados',
      contractSigned: 'Contrato Firmado',
      equipmentReady: 'Equipo Listo',
      adminNotes: 'Notas Admin',
      options: 'Opciones',
      completeOnboarding: 'Completar Incorporación',
      complete: 'Completo',
      pending: 'Pendiente',
      viewImages: 'Ver Imágenes',
      none: 'Ninguno',
      delete: 'Eliminar',
      save: 'Guardar',
      confirmDelete: '¿Está seguro de que desea eliminar esta solicitud?',
      errorDeleting: 'Error al eliminar la solicitud: ',
      errorSaving: 'Error al guardar la información: ',
      submissionImages: 'Imágenes de la Solicitud',

      // General / Header
      home: 'Inicio',
      about: 'Acerca de',
      services: 'Servicios',
      whyUs: 'Por Qué Nosotros', // Removed ¿
      howItWorks: 'Cómo Funciona', // Removed ¿
      faq: 'Preguntas Frecuentes',
      contact: 'Contacto', // Added key
      language: 'Idioma',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro',
      applyNow: 'Aplica Ya', // Added key

      // Hero
      welcomeToVivid: 'AYUDAMOS A LOS CREADORES A ALCANZAR EL TOP 1% EN ONLYFANS.',
      heroSubtitle: "Enfócate en tu contenido, nosotros nos encargamos del resto. Gestión experta, promoción y estrategias de crecimiento.", // Added key
      learnMore: 'Aprende Más',

      // About
      aboutUs: 'Sobre Nosotros',
      aboutDescription: 'Vivid es una agencia de gestión líder enfocada en potenciar a los creadores de OnlyFans para alcanzar el máximo éxito. Nos especializamos en navegar el panorama único de la economía de creadores, brindando soporte dedicado y estrategias expertas diseñadas para maximizar tus ganancias y el crecimiento de tu audiencia en la plataforma.',
      aboutDescription2: 'Nuestro experimentado equipo comprende los desafíos y oportunidades de OnlyFans a la perfección. Desde la promoción dirigida y la estrategia de contenido hasta la gestión completa de la cuenta, manejamos las complejidades para que puedas dedicar tu energía a crear el contenido que tus fans aman. Asóciate con nosotros para desbloquear todo tu potencial.',
      strategicGrowth: "Estrategia Enfocada en el Creador",
      strategicGrowthDesc: "Planes a medida diseñados para el crecimiento sostenible y la interacción en OnlyFans.",
      discreetProfessional: "Discreto y Profesional", // Added key
      discreetProfessionalDesc: "Priorizamos tu privacidad y operamos con la máxima profesionalidad.", // Added key
      expertTeam: 'Equipo Experto',
      expertTeamDesc: 'Trabaja con profesionales de la industria que entienden la economía de los creadores.',
      provenSuccess: 'Resultados Comprobados',
      provenSuccessDesc: 'Nuestros métodos están diseñados para elevar a los creadores hacia el éxito de primer nivel.',

      // Services
      ourServices: 'Nuestros Servicios',
      servicesSubtitle: 'Soluciones integrales diseñadas para elevar a los creadores de OnlyFans al top 1%.', // Added key
      talentManagement: "Gestión Completa de Cuenta",
      talentManagementDesc: "Manejo total de tu cuenta de OnlyFans, incluyendo publicaciones, promoción e interacción con fans.",
      bookingServices: "Marketing y Promoción",
      bookingServicesDesc: "Promoción estratégica en plataformas relevantes para atraer suscriptores y visibilidad a tu página de OnlyFans.",
      modelTraining: "Gestión de Chat 24/7",
      modelTrainingDesc: "Equipo dedicado gestionando mensajes de fans y DMs para construir relaciones y maximizar ventas PPV.",
      videoProduction: "Estrategia de Contenido de Video",
      videoProductionDesc: "Planificación y optimización de contenido de video para maximizar la interacción y los ingresos en OnlyFans.",
      photoShoots: "Soporte de Creación de Contenido",
      photoShootsDesc: "Orientación y recursos para producir fotos y videos de alta calidad adaptados a tu audiencia.",
      analytics: "Analíticas", // Added key
      analyticsDesc: "Seguimiento detallado del rendimiento y conocimientos de la audiencia.", // Added key

      // How It Works
      howItWorksTitle: "¿Cómo Funciona?", // Added key
      howItWorksSubtitle: "Nuestro proceso optimizado para el éxito del creador.", // Added key
      step1Title: "1. Aplica Online", // Added key
      step1Desc: "Completa nuestro detallado formulario de solicitud, proporcionando tu información y subiendo las imágenes requeridas.", // Added key
      step2Title: "2. Revisión de Solicitud", // Added key
      step2Desc: "Nuestro equipo revisa cuidadosamente tu solicitud, perfil (si aplica) e imágenes para evaluar una posible asociación.", // Added key
      step3Title: "3. Llamada de Incorporación", // Added key
      step3Desc: "Si eres seleccionado, programaremos una llamada para discutir estrategia, expectativas y finalizar nuestro acuerdo de asociación.", // Added key
      step4Title: "4. Crecimiento y Gestión", // Added key
      step4Desc: "Implementamos estrategias a medida para promoción, contenido y gestión de cuenta para maximizar tus ganancias y crecimiento.", // Added key

      // Why Choose Us
      whyChooseUsTitle: "¿Por Qué Asociarte con Vivid?", // Added key
      whyChooseUsSubtitle: "Proporcionamos la experiencia y el sistema de apoyo necesarios para prosperar en la competitiva economía de creadores.", // Added key
      acceleratedGrowth: "Crecimiento Acelerado", // Added key
      acceleratedGrowthDesc: "Nuestras estrategias de marketing probadas expanden rápidamente tu alcance y base de suscriptores.", // Added key
      maximizedEarnings: "Ganancias Maximizadas", // Added key
      maximizedEarningsDesc: "Chatters expertos y estrategias PPV optimizadas aseguran que ganes todo tu potencial.", // Added key
      focusOnCraft: "Enfócate en Tu Arte", // Added key
      focusOnCraftDesc: "Nosotros manejamos el lado comercial – gestión, promoción, soporte – para que tú puedas enfocarte en crear contenido.", // Added key
      dedicatedPartnership: "Asociación Dedicada", // Added key
      dedicatedPartnershipDesc: "Recibe soporte personalizado y orientación estratégica de nuestro experimentado equipo, comprometido con tu éxito.", // Added key

      // FAQ (Spanish translations needed for answers)
      faqTitle: 'Preguntas Frecuentes',
      faqQuestion1: '¿Qué servicios proporcionan para creadores de OnlyFans?',
      faqAnswer1: `Nuestro servicio ofrece soporte integral para que puedas concentrarte únicamente en crear contenido mientras nosotros nos encargamos del resto. Incluye:\n\n• Marketing y promoción completa: Cubrimos todos los costos de marketing y aplicamos estrategias probadas para expandir tu audiencia.\n\n• Estrategia de contenido y análisis de tendencias: Recibe ideas y consejos personalizados para mantener tu contenido relevante y atractivo.\n\n• Gestión de chat 24/7: Nuestro equipo maneja tus mensajes y DMs para maximizar ingresos y evitar conversaciones incómodas.\n\n• Analíticas detalladas: Seguimiento de datos para optimizar estrategias y asegurar crecimiento constante.\n\n• Soporte personalizado: Acceso directo a nuestro equipo para orientación y apoyo continuo.\n\nNuestro objetivo es que tu experiencia sea fluida y rentable, ocupándonos del negocio para que puedas crecer como creador.`,
      faqQuestion2: '¿Cuánto tiempo toma ver resultados?',
      faqAnswer2: `Los resultados varían según la calidad del contenido, la interacción y el mercado, pero normalmente se ven mejoras significativas en los primeros 30 a 60 días.\n\nDurante este tiempo, nos enfocamos en:\n\n• Optimización de contenido\n• Estrategias de engagement\n• Tácticas de marketing\n\nMonitoreamos y ajustamos constantemente para maximizar tu crecimiento y ganancias.`,
      faqQuestion3: '¿Cómo empiezo con OnlyFans?',
      faqAnswer3: '¡Es fácil! Solo completa nuestro formulario de solicitud y nuestro equipo te guiará en todo el proceso, desde la creación de la cuenta hasta la estrategia de contenido.',
      faqQuestion4: '¿Ayudan con la creación de contenido?',
      faqAnswer4: 'Sí, ofrecemos fotografía y video profesional, planificación de contenido y dirección creativa para que tu contenido destaque y atraiga suscriptores.',
      faqQuestion5: '¿Qué hace diferente a su agencia?',
      faqAnswer5: 'Ofrecemos un servicio integral, desde creación de contenido hasta marketing. Nuestra experiencia ayudando a creadores a llegar al top 1% nos distingue.',
      faqQuestion6: '¿Cuánto tiempo necesito dedicar?',
      faqAnswer6: 'Recomendamos dedicar entre 1 y 4 horas diarias. Al principio puede ser más para establecer tu presencia, pero con nuestro apoyo optimizarás tu tiempo y maximizarás resultados.',
      faqQuestion7: '¿Con qué frecuencia necesito proporcionar contenido?',
      faqAnswer7: `Para maximizar tu éxito, sugerimos un flujo constante de contenido:\n\n• 2 fotos y 3 videos cortos diarios\n• 7-10 fotos semanales para el feed\n• 1-2 álbumes de sexting semanales\n• 6-9 TikToks o Reels diarios\n• 20-40 videos cortos mensuales para Reddit\n\nCon nuestro apoyo, crearás un flujo sostenible que mantenga a tus fans comprometidos y atraiga nuevos suscriptores.`,

      // Join Us / Form
      joinUsTitle: "¿Listo para Alcanzar el Top 1%?", // Added key
      joinUsSubtitle: "Asóciate con Vivid Agency y desbloquea todo tu potencial. Proporcionamos las herramientas, estrategia y soporte que necesitas para triunfar.", // Added key
      applyModalTitle: "Aplica para Unirte a Vivid", // Added key
      submissionSuccess: '¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.',
      submissionError: 'Error al enviar la solicitud: Por favor, revisa tus datos e inténtalo de nuevo.',
      submitting: 'Enviando...',
      submit: 'Enviar Solicitud',
      cancel: 'Cancelar',
      // Form Labels
      fullNameLabel: "Nombre Completo",
      emailLabel: "Correo Electrónico",
      phoneNumberLabel: "Número de Teléfono",
      ageLabel: "Edad",
      countryOriginLabel: "País de Origen",
      primaryLanguageLabel: "Idioma Principal",
      preferredContactLabel: "Método de Contacto Preferido",
      whatsappLabel: "Número de WhatsApp",
      telegramLabel: "Usuario de Telegram",
      hasOfAccountLabel: "¿Tienes actualmente una cuenta de OnlyFans?",
      isOfVerifiedLabel: "¿Está verificada tu cuenta de OnlyFans?",
      hasVerifiedPaymentLabel: "¿Has verificado un método de pago en OnlyFans?",
      earningsLabel: "Ganancias Aprox. Últimos 30 Días (Opcional)",
      whyJoinLabel: '¿Por qué quieres unirte a Vivid Agency?',
      uploadFilesLabel: 'Subir Imágenes (Mín. 5)',
      ageConfirmLabel: "Confirmo que tengo 18 años o más.",
      selectPlaceholder: "Seleccionar...",
      yes: "Sí",
      no: "No",
      sameAsPhone: "Igual que Teléfono",
      enterDifferentWhatsApp: "Ingresar Otro #",

      // Contact
      contactTitle: "Ponte en Contacto",
      contactSubtitle: "¿Tienes preguntas? Estamos aquí para ayudar. Contáctanos por correo electrónico.",

      // Footer
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
      allRightsReserved: 'Todos los derechos reservados.',
    },
    ru: {
      // Russian translations (initially copy English or placeholders)
      home: 'Главная',
      about: 'О нас',
      services: 'Услуги',
      whyUs: 'Почему мы',
      howItWorks: 'Как это работает',
      faq: 'Вопросы и ответы',
      contact: 'Контакты',
      language: 'Язык',
      darkMode: 'Темная тема',
      lightMode: 'Светлая тема',
      applyNow: 'Подать заявку',

      welcomeToVivid: 'МЫ ПОМОГАЕМ СОЗДАТЕЛЯМ ДОСТИЧЬ ТОП-1% НА ONLYFANS.',
      heroSubtitle: 'Сосредоточьтесь на контенте, а мы позаботимся об остальном. Экспертное управление, продвижение и стратегии роста.',
      learnMore: 'Узнать больше',

      aboutUs: 'О нас',
      aboutDescription: 'Vivid — ведущая агентство по управлению, помогающее создателям OnlyFans достичь максимального успеха.',
      aboutDescription2: 'Наша команда берет на себя все сложности, чтобы вы могли сосредоточиться на создании контента.',
      strategicGrowth: 'Индивидуальная стратегия',
      strategicGrowthDesc: 'Планы, разработанные для устойчивого роста и вовлеченности.',
      discreetProfessional: 'Дискретность и профессионализм',
      discreetProfessionalDesc: 'Мы ценим вашу конфиденциальность и работаем профессионально.',
      expertTeam: 'Экспертная команда',
      expertTeamDesc: 'Работайте с профессионалами, которые знают индустрию.',
      provenSuccess: 'Доказанный успех',
      provenSuccessDesc: 'Наши методы помогают создателям достигать топовых результатов.',

      ourServices: 'Наши услуги',
      servicesSubtitle: 'Комплексные решения для роста на OnlyFans.',
      talentManagement: 'Полное управление аккаунтом',
      talentManagementDesc: 'Ведение аккаунта, публикации, продвижение и взаимодействие с фанатами.',
      bookingServices: 'Маркетинг и продвижение',
      bookingServicesDesc: 'Стратегическое продвижение для увеличения подписчиков.',
      modelTraining: 'Управление чатами 24/7',
      modelTrainingDesc: 'Команда, которая отвечает на сообщения и увеличивает доход.',
      videoProduction: 'Стратегия видеоконтента',
      videoProductionDesc: 'Планирование и оптимизация видео для вовлечения и дохода.',
      photoShoots: 'Поддержка создания контента',
      photoShootsDesc: 'Помощь в создании качественных фото и видео.',
      analytics: 'Аналитика',
      analyticsDesc: 'Отслеживание результатов и понимание аудитории.',

      howItWorksTitle: 'Как это работает',
      howItWorksSubtitle: 'Наш процесс для вашего успеха.',
      step1Title: '1. Подайте заявку онлайн',
      step1Desc: 'Заполните форму и загрузите необходимые материалы.',
      step2Title: '2. Рассмотрение заявки',
      step2Desc: 'Мы внимательно изучим вашу заявку и профиль.',
      step3Title: '3. Звонок для знакомства',
      step3Desc: 'Обсудим стратегию и детали сотрудничества.',
      step4Title: '4. Рост и управление',
      step4Desc: 'Реализуем стратегии для увеличения дохода и подписчиков.',

      whyChooseUsTitle: 'Почему выбирают Vivid',
      whyChooseUsSubtitle: 'Мы обеспечиваем поддержку и экспертизу для вашего роста.',
      acceleratedGrowth: 'Быстрый рост',
      acceleratedGrowthDesc: 'Наш маркетинг быстро расширит вашу аудиторию.',
      maximizedEarnings: 'Максимальный доход',
      maximizedEarningsDesc: 'Оптимизация продаж и взаимодействия с фанатами.',
      focusOnCraft: 'Сосредоточьтесь на творчестве',
      focusOnCraftDesc: 'Мы берем на себя бизнес, вы — творчество.',
      dedicatedPartnership: 'Индивидуальный подход',
      dedicatedPartnershipDesc: 'Персональная поддержка и стратегия для вас.',

      faqTitle: 'Часто задаваемые вопросы',
      faqQuestion1: 'Какие услуги вы предоставляете создателям OnlyFans?',
      faqAnswer1: 'Наш сервис предоставляет комплексную поддержку, чтобы вы могли сосредоточиться на создании контента, а мы займемся остальным. Включает:\n\n• Полный маркетинг и продвижение: мы покрываем все расходы и применяем проверенные стратегии для расширения вашей аудитории.\n\n• Стратегия контента и анализ трендов: вы получаете идеи и советы для актуального и привлекательного контента.\n\n• Управление чатами 24/7: наша команда отвечает на сообщения, увеличивая доход и избавляя вас от неприятных разговоров.\n\n• Подробная аналитика: отслеживаем данные для оптимизации и стабильного роста.\n\n• Персональная поддержка: постоянная помощь и консультации от нашей команды.\n\nМы делаем все, чтобы вы могли расти и зарабатывать больше, не отвлекаясь на рутину.',
      faqQuestion2: 'Когда я увижу результаты?',
      faqAnswer2: 'Результаты зависят от качества контента, вовлеченности и рынка, но обычно заметный рост происходит в течение 30–60 дней.\n\nВ это время мы:\n\n• Оптимизируем контент\n• Улучшаем вовлеченность подписчиков\n• Активно продвигаем вас\n\nМы постоянно анализируем и корректируем стратегию для максимального роста и дохода.',
      faqQuestion3: 'Как начать работать с вами?',
      faqAnswer3: 'Очень просто! Заполните нашу анкету, и мы поможем вам с созданием аккаунта, стратегией и продвижением.',
      faqQuestion4: 'Помогаете ли вы с созданием контента?',
      faqAnswer4: 'Да! Мы предоставляем услуги фото- и видеосъемки, помогаем с идеями и планированием, чтобы ваш контент был привлекательным и продавал.',
      faqQuestion5: 'Чем вы отличаетесь от других агентств?',
      faqAnswer5: 'Мы предлагаем полный комплекс услуг: от создания контента до маркетинга и управления. Наш опыт и результаты наших клиентов подтверждают нашу эффективность.',
      faqQuestion6: 'Сколько времени нужно уделять?',
      faqAnswer6: 'Рекомендуем уделять от 1 до 4 часов в день. В начале — больше для быстрого старта, потом — для поддержания вовлеченности и роста. Мы поможем вам оптимизировать время и увеличить доход.',
      faqQuestion7: 'Как часто нужно создавать контент?',
      faqAnswer7: 'Для успеха важно регулярно публиковать контент:\n\n• 2 фото и 3 коротких видео в день\n• 7–10 фото в неделю в ленту\n• 1–2 альбома для приватных сообщений в неделю\n• 6–9 TikTok или Reels в день\n• 20–40 коротких видео в месяц для Reddit\n\nС нашей помощью вы сможете создать стабильный поток контента, который привлечет и удержит подписчиков.',

      joinUsTitle: 'Готовы попасть в топ 1%?',
      joinUsSubtitle: 'Присоединяйтесь к Vivid Agency и раскройте свой потенциал.',
      applyModalTitle: 'Подать заявку в Vivid',
      submissionSuccess: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
      submissionError: 'Ошибка при отправке. Проверьте данные и попробуйте снова.',
      submitting: 'Отправка...',
      submit: 'Отправить заявку',
      cancel: 'Отмена',
      fullNameLabel: 'Полное имя',
      emailLabel: 'Электронная почта',
      phoneNumberLabel: 'Телефон',
      ageLabel: 'Возраст',
      countryOriginLabel: 'Страна',
      primaryLanguageLabel: 'Язык',
      preferredContactLabel: 'Предпочтительный способ связи',
      whatsappLabel: 'WhatsApp',
      telegramLabel: 'Telegram',
      hasOfAccountLabel: 'У вас есть аккаунт OnlyFans?',
      isOfVerifiedLabel: 'Ваш аккаунт верифицирован?',
      hasVerifiedPaymentLabel: 'Платежный метод подтвержден?',
      earningsLabel: 'Доход за последние 30 дней (опционально)',
      whyJoinLabel: 'Почему вы хотите присоединиться к Vivid?',
      uploadFilesLabel: 'Загрузите изображения (минимум 5)',
      ageConfirmLabel: 'Мне 18 лет или больше.',
      selectPlaceholder: 'Выбрать...',
      yes: 'Да',
      no: 'Нет',
      sameAsPhone: 'Такой же, как телефон',
      enterDifferentWhatsApp: 'Ввести другой номер',

      contactTitle: 'Связаться с нами',
      contactSubtitle: 'Есть вопросы? Мы поможем. Свяжитесь с нами любым удобным способом.',

      privacyPolicy: 'Политика конфиденциальности',
      termsOfService: 'Условия использования',
      allRightsReserved: 'Все права защищены.',
    }
  };

  // Function to get translation, falling back to key or default value
  const t = (key: string, defaultValue?: string): string => {
    const translation = translations[language]?.[key];
    // Fallback order: translation -> defaultValue -> key
    return translation ?? defaultValue ?? key;
  };

  // Show loading indicator while detecting language
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
