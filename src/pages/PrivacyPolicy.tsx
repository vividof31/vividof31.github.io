const PrivacyPolicy = () => {
  const agencyName = "Vivid Agency"; // Replace if needed
  const contactEmail = "contact@vividagency.com"; // Use the correct email
  const lastUpdated = "[Date - e.g., April 8, 2025]"; // Replace with date

  return (
    <div className="container mx-auto px-4 py-12 pt-24 md:pt-32">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
        <p><strong>Last Updated: {lastUpdated}</strong></p>

        <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
        <p>
          Welcome to {agencyName}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) or use our services (such as submitting an application) and tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. Important Information and Who We Are</h2>
        <p>
          {agencyName} is the controller and responsible for your personal data (collectively referred to as "{agencyName}", "we", "us" or "our" in this privacy policy). If you have any questions about this privacy policy, including any requests to exercise your legal rights, please contact us using the details set out below.
        </p>
        <p>Contact Email: {contactEmail}</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. The Data We Collect About You</h2>
        <p>
          Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul>
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, date of birth (age).</li>
          <li><strong>Contact Data</strong> includes email address, telephone numbers, communication preferences (e.g., WhatsApp, Telegram).</li>
          <li><strong>Application Data</strong> includes information provided in your application form, such as country of origin, primary language, details about your online presence (e.g., OnlyFans account status, verification status, earnings), reasons for applying, and any images or files you upload.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
        </ul>
        <p>
          We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health and genetic and biometric data).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. How We Use Your Personal Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul>
          <li>To process and evaluate your application to join our agency.</li>
          <li>To manage our relationship with you which will include notifying you about changes to our terms or privacy policy.</li>
          <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data).</li>
          <li>To use data analytics to improve our website, services, marketing, customer relationships and experiences.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Disclosures of Your Personal Data</h2>
        <p>
          We may have to share your personal data with internal staff involved in the application review process or with external third parties such as service providers who support our IT and system administration. We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions. We do not sell your personal data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">6. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">7. Data Retention</h2>
        <p>
          We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">8. Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing. If you wish to exercise any of the rights set out above, please contact us at {contactEmail}. [Note: Specific rights depend heavily on jurisdiction, e.g., GDPR/CCPA].
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">9. Policy Updates</h2>
        <p>
          We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
        </p>

        <p className="mt-8 text-sm italic">
          Disclaimer: This is a template privacy policy and does not constitute legal advice. You must consult with a qualified legal professional to ensure compliance with all applicable laws and regulations based on your specific business practices and location.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
