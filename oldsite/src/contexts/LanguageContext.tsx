import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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

const spanishSpeakingCountries = [
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ',
  'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'ES', 'UY', 'VE'
];

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectUserLanguage = async () => {
      try {
        const storedLang = localStorage.getItem('preferredLanguage');
        if (storedLang === 'es' || storedLang === 'en') {
          setLanguage(storedLang);
          setIsLoading(false);
          return;
        }

        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (spanishSpeakingCountries.includes(data.country_code)) {
          setLanguage('es');
          localStorage.setItem('preferredLanguage', 'es');
        } else {
          setLanguage('en');
          localStorage.setItem('preferredLanguage', 'en');
        }
      } catch (error) {
        console.error('Error detecting language:', error);
        setLanguage('en');
      } finally {
        setIsLoading(false);
      }
    };

    detectUserLanguage();
  }, []);

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  const translations: Record<Language, Record<string, string>> = {
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      results: 'Results',
      testimonials: 'Success Stories',
      faq: 'FAQ',
      language: 'Language',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      welcomeToVivid: 'WE HELP CREATORS REACH THE TOP 1% ON ONLYFANS.',
      joinUs: 'Join Us',
      learnMore: 'Learn More',
      aboutUs: 'About Us',
      aboutDescription: 'Vivid is a leading management agency laser-focused on empowering OnlyFans creators to achieve peak success. We specialize in navigating the unique landscape of the creator economy, providing dedicated support and expert strategies designed to maximize your earnings and audience growth on the platform.',
      aboutDescription2: 'Our experienced team understands the challenges and opportunities of OnlyFans inside and out. From targeted promotion and content strategy to full account management, we handle the complexities so you can dedicate your energy to creating the content your fans love. Partner with us to unlock your full potential.',
      strategicGrowth: 'Strategic Growth',
      strategicGrowthDesc: 'We help creators develop targeted strategies for sustainable growth and engagement.',
      fastResults: 'Fast Results',
      fastResultsDesc: 'Our proven methods deliver rapid growth while maintaining long-term sustainability.',
      expertTeam: 'Expert Team',
      expertTeamDesc: 'Work with industry professionals who understand the creator economy.',
      provenSuccess: 'Proven Success',
      provenSuccessDesc: 'Join hundreds of creators who have achieved top 1% status with our guidance.',
      ourServices: 'Our Services',
      photoShoots: 'Content Creation Support',
      photoShootsDesc: 'Guidance and resources for producing high-quality photos and videos tailored for your audience.',
      videoProduction: 'Video Content Strategy',
      videoProductionDesc: 'Planning and optimizing video content to maximize engagement and revenue on OnlyFans.',
      talentManagement: 'Full Account Management',
      talentManagementDesc: 'Complete handling of your OnlyFans account, including posting, promotion, and fan interaction.',
      bookingServices: 'Marketing & Promotion',
      bookingServicesDesc: 'Strategic promotion across relevant platforms to drive subscribers and visibility to your OnlyFans page.',
      modelTraining: '24/7 Chatter Management',
      modelTrainingDesc: 'Dedicated team managing fan messages and DMs to build relationships and maximize PPV sales.',
      ourResults: 'Our Results',
      topCreators: 'Top Creators',
      topCreatorsDesc: 'Our creators consistently rank in the top percentile',
      monthlyEarnings: 'Monthly Earnings',
      monthlyEarningsDesc: 'Average earnings of our top performers',
      growthRate: 'Growth Rate',
      growthRateDesc: 'Average growth rate in first 3 months',
      followers: 'Followers',
      followersDesc: 'Average follower count of our creators',
      testimonial1: 'Working with Vivid has been an incredible journey. They\'ve helped me grow both professionally and personally.',
      testimonial2: 'The team at Vivid is exceptional. Their guidance and support have been invaluable to my career.',
      testimonial3: 'Vivid opened doors I never thought possible. They truly care about their models\' success.',
      topCreator: 'Top Creator',
      risingTalent: 'Rising Talent',
      eliteModel: 'Elite Model',
      faqTitle: 'Frequently Asked Questions',
      faqQuestion1: 'What services do you provide for OnlyFans creators?',
      faqAnswer1: `Our service provides comprehensive support so you can focus solely on creating content while we handle everything else. Here's what's included:

• Full Marketing & Promotion: We cover all marketing costs and apply proven growth strategies to expand your audience and visibility.

• Content Strategy & Trend Analysis: Receive regular insights on trending content and ideas tailored to your niche, helping you stay current and engaging.

• 24/7 Chat Management: Our dedicated chat team manages your DMs, upselling fans and maximizing revenue, while ensuring you don't have to engage with uncomfortable messages.

• In-Depth Analytics: We track engagement and revenue data to optimize strategies and ensure steady growth month over month.

• One-on-One Support: You'll have direct access to our team of experts for personalized guidance, ensuring you feel supported every step of the way.

Our goal is to make the journey as seamless and rewarding as possible by handling the business side so you can thrive as a creator.`,
      faqQuestion2: 'How long does it take to see results?',
      faqAnswer2: `While results can vary based on factors such as content quality, audience engagement, and market dynamics, our proven strategies typically yield significant growth within the first 30 to 60 days of implementation.

During this initial phase, we focus on:

• Content Optimization: We help you refine your content to ensure it resonates with your target audience. This may involve adjusting your content style, themes, or posting frequency based on performance analytics.

• Engagement Strategies: Our team works closely with you to enhance subscriber engagement. This includes implementing effective communication techniques, utilizing promotional campaigns, and encouraging subscriber interaction.

• Marketing Tactics: We leverage various marketing channels to boost your visibility. Our efforts include social media promotion, collaborations with other creators, and strategic ads, all aimed at driving traffic to your OnlyFans profile.

We continuously monitor and analyze your performance data to make necessary adjustments and maximize your growth potential. By focusing on these key areas, many of our clients begin to see measurable increases in subscriber counts, engagement rates, and overall revenue within the outlined timeframe.

For long-term success, we believe in building a strong foundation that not only accelerates initial growth but also sustains it over time. We remain committed to your success every step of the way!`,
      faqQuestion3: 'How do I get started with OnlyFans?',
      faqAnswer3: 'Getting started is easy! Simply fill out our join form, and our team will guide you through the entire process, from account setup to content strategy.',
      faqQuestion4: 'Do you help with content creation?',
      faqAnswer4: 'Yes! We provide professional photography and videography services, content planning, and creative direction to ensure your content stands out and attracts subscribers.',
      faqQuestion5: 'What makes your agency different?',
      faqAnswer5: 'We offer a full-service approach, handling everything from content creation to marketing. Our proven track record of helping creators reach the top 1% sets us apart.',
      faqQuestion6: 'How much time do I need to spend?',
      faqAnswer6: 'To maintain a solid engagement level, plan for around 1–4 hours each day. In the beginning, this time may be closer to 2–3 hours while we establish your presence and strategies. As your fanbase grows, you might spend a bit more time interacting with paying fans, but every minute invested directly supports your success. Our team will be there to help you streamline the process, maximizing your impact and ensuring that the time you put in is truly rewarding.',
      faqQuestion7: 'How often do I need to provide content?',
      faqAnswer7: `To maximize your success on OnlyFans, we recommend a consistent content schedule. Ideally, you should aim to provide at least two new photos and three short videos each day. On days when your fans request exclusive content, the number can increase to 5–10 pieces of media daily.

Remember, content is essential for engagement and sales. Without a steady stream of new material, it becomes challenging to promote your account and satisfy your fans. Here's what we typically look for on a weekly basis:

• 7–10 OnlyFans Feed Photos: Regular uploads keep your audience excited and engaged.

• 1–2 Sexting Albums: These are key to driving sales in DMs, where we can capitalize on fan interest and generate revenue. We will collaborate on what works best for you.

• Custom Requests: Occasionally, you may be asked to provide custom snapshots or content reflecting your daily life, adding a personal touch.

For effective marketing, we also recommend:

• 6–9 TikToks/Reels per day: Short, engaging clips to capture attention across social media platforms.

• 20–40 Short Videos (around 6 seconds each) per month for Reddit: Quick videos to help drive traffic to your OnlyFans profile.

• Extra Content: Any additional material you can share will enhance our promotional efforts.

This may seem like a lot, but with our support, you can create a sustainable workflow. Ready to take the leap? Join our OnlyFans Agency—where your success is our priority—by clicking here!`,
      submissionSuccess: 'Form submitted successfully!',
      submissionError: 'Error submitting form. Please try again.',
      submitting: 'Submitting...',
      submit: 'Submit',
      cancel: 'Cancel',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      whyJoin: 'Why do you want to join?',
      uploadFiles: 'Upload Files',
      multipleFiles: 'You can select multiple files',
      selectedFiles: 'Selected Files',
      backToTop: 'Back to Top',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      allRightsReserved: 'All rights reserved.',
      growth: 'Growth',
      timeframe: 'Timeframe',
      footerTagline: 'Maximizing Revenue with Personalized Strategies.'
    },
    es: {
      home: 'Inicio',
      about: 'Acerca de',
      services: 'Servicios',
      results: 'Resultados',
      testimonials: 'Historias de Éxito',
      faq: 'Preguntas Frecuentes',
      language: 'Idioma',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro',
      welcomeToVivid: 'AYUDAMOS A LOS CREADORES A ALCANZAR EL TOP 1% EN ONLYFANS.',
      joinUs: 'Únete a nosotros',
      learnMore: 'Aprende más',
      aboutUs: 'Sobre nosotros',
      aboutDescription: 'Vivid es una agencia de modelos de primer nivel dedicada a descubrir y nutrir el mejor talento de modelaje del mundo. Con años de experiencia en la industria de la moda, ofrecemos oportunidades sin igual para que los modelos muestren su belleza y estilo únicos en plataformas globales.',
      aboutDescription2: 'Nuestro equipo de expertos de la industria trabaja incansablemente para conectar a nuestros modelos con marcas, diseñadores y fotógrafos líderes, asegurando colaboraciones exitosas que empujan los límites de la moda y la creatividad.',
      strategicGrowth: 'Crecimiento Estratégico',
      strategicGrowthDesc: 'Ayudamos a los creadores a desarrollar estrategias específicas para un crecimiento e interacción sostenibles.',
      fastResults: 'Resultados Rápidos',
      fastResultsDesc: 'Nuestros métodos probados brindan un crecimiento rápido manteniendo la sostenibilidad a largo plazo.',
      expertTeam: 'Equipo Experto',
      expertTeamDesc: 'Trabaja con profesionales de la industria que entienden la economía de los creadores.',
      provenSuccess: 'Éxito Comprobado',
      provenSuccessDesc: 'Únete a cientos de creadores que han alcanzado el estatus del 1% superior con nuestra guía.',
      ourServices: 'Nuestros servicios',
      photoShoots: 'Sesiones fotográficas',
      photoShootsDesc: 'Sesiones de fotos profesionales para diversos propósitos.',
      videoProduction: 'Producción de video',
      videoProductionDesc: 'Contenido de video de alta calidad para comerciales y más.',
      talentManagement: 'Gestión de talento',
      talentManagementDesc: 'Servicios integrales de gestión para modelos.',
      bookingServices: 'Servicios de reserva',
      bookingServicesDesc: 'Asegurando trabajos y contratos de modelaje para nuestro talento.',
      modelTraining: 'Entrenamiento de modelos',
      modelTrainingDesc: 'Desarrollo profesional y entrenamiento para modelos aspirantes.',
      ourResults: 'Nuestros Resultados',
      topCreators: 'Creadores Top',
      topCreatorsDesc: 'Nuestros creadores se ubican consistentemente en el percentil superior',
      monthlyEarnings: 'Ganancias Mensuales',
      monthlyEarningsDesc: 'Ganancias promedio de nuestros mejores creadores',
      growthRate: 'Tasa de Crecimiento',
      growthRateDesc: 'Tasa de crecimiento promedio en los primeros 3 meses',
      followers: 'Seguidores',
      followersDesc: 'Promedio de seguidores de nuestros creadores',
      testimonial1: 'Trabajar con Vivid ha sido un viaje increíble. Me han ayudado a crecer tanto profesional como personalmente.',
      testimonial2: 'El equipo de Vivid es excepcional. Su orientación y apoyo han sido invaluables para mi carrera.',
      testimonial3: 'Vivid abrió puertas que nunca pensé posibles. Realmente se preocupan por el éxito de sus modelos.',
      topCreator: 'Creador Top',
      risingTalent: 'Talento Emergente',
      eliteModel: 'Modelo Elite',
      faqTitle: 'Preguntas Frecuentes',
      faqQuestion1: '¿Qué servicios proporcionan para creadores de OnlyFans?',
      faqAnswer1: `Nuestro servicio brinda soporte integral para que puedas concentrarte únicamente en crear contenido mientras nosotros nos encargamos de todo lo demás. Esto es lo que incluye:

• Marketing y Promoción Completa: Cubrimos todos los costos de marketing y aplicamos estrategias de crecimiento probadas para expandir tu audiencia y visibilidad.

• Estrategia de Contenido y Análisis de Tendencias: Recibe información regular sobre contenido tendencia e ideas adaptadas a tu nicho, ayudándote a mantenerte actual y atractivo.

• Gestión de Chat 24/7: Nuestro equipo dedicado gestiona tus mensajes directos, aumentando las ventas a los fans y maximizando los ingresos, mientras te aseguramos que no tengas que lidiar con mensajes incómodos.

• Análisis Detallado: Rastreamos datos de engagement e ingresos para optimizar estrategias y asegurar un crecimiento constante mes a mes.

• Soporte Personalizado: Tendrás acceso directo a nuestro equipo de expertos para orientación personalizada, asegurando que te sientas apoyado en cada paso del camino.

Nuestro objetivo es hacer el viaje lo más fluido y gratificante posible, manejando el lado comercial para que puedas prosperar como creador.`,
      faqQuestion2: '¿Cuánto tiempo toma ver resultados?',
      faqAnswer2: `Si bien los resultados pueden variar según factores como la calidad del contenido, la participación de la audiencia y la dinámica del mercado, nuestras estrategias probadas generalmente producen un crecimiento significativo dentro de los primeros 30 a 60 días de implementación.

Durante esta fase inicial, nos enfocamos en:

• Optimización de Contenido: Te ayudamos a refinar tu contenido para asegurar que resuene con tu audiencia objetivo. Esto puede implicar ajustar tu estilo de contenido, temas o frecuencia de publicación según el análisis de rendimiento.

• Estrategias de Engagement: Nuestro equipo trabaja estrechamente contigo para mejorar la participación de los suscriptores. Esto incluye implementar técnicas efectivas de comunicación, utilizar campañas promocionales y fomentar la interacción con los suscriptores.

• Tácticas de Marketing: Aprovechamos varios canales de marketing para aumentar tu visibilidad. Nuestros esfuerzos incluyen promoción en redes sociales, colaboraciones con otros creadores y anuncios estratégicos, todo dirigido a dirigir tráfico a tu perfil de OnlyFans.

Monitoreamos y analizamos continuamente tus datos de rendimiento para realizar los ajustes necesarios y maximizar tu potencial de crecimiento. Al enfocarnos en estas áreas clave, muchos de nuestros clientes comienzan a ver aumentos medibles en el número de suscriptores, tasas de participación e ingresos generales dentro del plazo establecido.

¡Para el éxito a largo plazo, creemos en construir una base sólida que no solo acelere el crecimiento inicial sino que también lo mantenga en el tiempo. ¡Seguimos comprometidos con tu éxito en cada paso del camino!`,
      faqQuestion3: '¿Cómo empiezo con OnlyFans?',
      faqAnswer3: '¡Empezar es fácil! Simplemente completa nuestro formulario de registro y nuestro equipo te guiará durante todo el proceso, desde la configuración de la cuenta hasta la estrategia de contenido.',
      faqQuestion4: '¿Ayudan con la creación de contenido?',
      faqAnswer4: '¡Sí! Proporcionamos servicios profesionales de fotografía y videografía, planificación de contenido y dirección creativa para asegurar que tu contenido destaque y atraiga suscriptores.',
      faqQuestion5: '¿Qué hace diferente a su agencia?',
      faqAnswer5: 'Ofrecemos un enfoque de servicio completo, manejando todo desde la creación de contenido hasta el marketing. Nuestro historial probado de ayudar a los creadores a alcanzar el top 1% nos distingue.',
      faqQuestion6: '¿Cuánto tiempo necesito dedicar?',
      faqAnswer6: 'Para mantener un nivel sólido de engagement, planifica dedicar entre 1 y 4 horas diarias. Al principio, este tiempo puede estar más cerca de 2-3 horas mientras establecemos tu presencia y estrategias. A medida que tu base de fans crece, podrías dedicar un poco más de tiempo a interactuar con los fans que pagan, pero cada minuto invertido apoya directamente tu éxito. Nuestro equipo estará allí para ayudarte a optimizar el proceso, maximizando tu impacto y asegurando que el tiempo que dedicas sea verdaderamente gratificante.',
      faqQuestion7: '¿Con qué frecuencia necesito proporcionar contenido?',
      faqAnswer7: `Para maximizar tu éxito en OnlyFans, recomendamos un calendario de contenido constante. Idealmente, deberías proporcionar al menos dos fotos nuevas y tres videos cortos cada día. En los días en que tus fans soliciten contenido exclusivo, el número puede aumentar a 5-10 piezas de contenido diarias.

Recuerda, el contenido es esencial para el engagement y las ventas. Sin un flujo constante de material nuevo, se vuelve difícil promocionar tu cuenta y satisfacer a tus fans. Esto es lo que típicamente buscamos semanalmente:

• 7-10 Fotos para el Feed de OnlyFans: Las subidas regulares mantienen a tu audiencia emocionada y comprometida.

• 1-2 Álbumes de Sexting: Estos son clave para impulsar las ventas en DMs, donde podemos capitalizar el interés de los fans y generar ingresos. Colaboraremos en lo que funcione mejor para ti.

• Solicitudes Personalizadas: Ocasionalmente, se te puede pedir que proporciones fotos personalizadas o contenido que refleje tu vida diaria, añadiendo un toque personal.

Para un marketing efectivo, también recomendamos:

• 6-9 TikToks/Reels por día: Clips cortos y atractivos para captar la atención en las plataformas de redes sociales.

• 20-40 Videos Cortos (alrededor de 6 segundos cada uno) por mes para Reddit: Videos rápidos para ayudar a dirigir tráfico a tu perfil de OnlyFans.

• Contenido Extra: Cualquier material adicional que puedas compartir mejorará nuestros esfuerzos promocionales.

Esto puede parecer mucho, pero con nuestro apoyo, puedes crear un flujo de trabajo sostenible. ¿Lista para dar el salto? Únete a nuestra Agencia de OnlyFans, donde tu éxito es nuestra prioridad, ¡haciendo clic aquí!`,
      submissionSuccess: '¡Formulario enviado con éxito!',
      submissionError: 'Error al enviar el formulario. Por favor, inténtalo de nuevo.',
      submitting: 'Enviando...',
      submit: 'Enviar',
      cancel: 'Cancelar',
      name: 'Nombre',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      whyJoin: '¿Por qué quieres unirte?',
      uploadFiles: 'Subir archivos',
      multipleFiles: 'Puedes seleccionar múltiples archivos',
      selectedFiles: 'Archivos seleccionados',
      backToTop: 'Volver arriba',
      quickLinks: 'Enlaces rápidos',
      contactUs: 'Contáctanos',
      allRightsReserved: 'Todos los derechos reservados.',
      growth: 'Crecimiento',
      timeframe: 'Periodo de tiempo',
      footerTagline: 'Maximizando Ingresos con Estrategias Personalizadas.'
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
