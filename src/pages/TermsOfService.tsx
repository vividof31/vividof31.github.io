import React from 'react';

const TermsOfService = () => {
  const agencyName = "Vivid Agency"; // Replace if needed
  const websiteUrl = "[Your Website URL]"; // Replace with actual URL
  const lastUpdated = "[Date - e.g., April 8, 2025]"; // Replace with date

  return (
    <div className="container mx-auto px-4 py-12 pt-24 md:pt-32">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
        <p><strong>Last Updated: {lastUpdated}</strong></p>

        <h2 className="text-xl font-semibold mt-6 mb-3">1. Agreement to Terms</h2>
        <p>
          By accessing our website at {websiteUrl}, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">2. Use License</h2>
        <ol type="a" className="list-decimal list-inside space-y-2">
          <li>
            Permission is granted to temporarily download one copy of the materials (information or software) on {agencyName}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on {agencyName}'s website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </li>
          <li>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by {agencyName} at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
          </li>
        </ol>

        <h2 className="text-xl font-semibold mt-6 mb-3">3. Disclaimer</h2>
        <p>
          The materials on {agencyName}'s website are provided on an 'as is' basis. {agencyName} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        <p>
          Further, {agencyName} does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">4. Limitations</h2>
        <p>
          In no event shall {agencyName} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {agencyName}'s website, even if {agencyName} or a {agencyName} authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">5. Accuracy of Materials</h2>
        <p>
          The materials appearing on {agencyName}'s website could include technical, typographical, or photographic errors. {agencyName} does not warrant that any of the materials on its website are accurate, complete or current. {agencyName} may make changes to the materials contained on its website at any time without notice. However {agencyName} does not make any commitment to update the materials.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">6. Links</h2>
        <p>
          {agencyName} has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by {agencyName} of the site. Use of any such linked website is at the user's own risk.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">7. Modifications</h2>
        <p>
          {agencyName} may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">8. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of [Your State/Country] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>

        <p className="mt-8 text-sm italic">
          Disclaimer: This is a template terms of service document and does not constitute legal advice. You must consult with a qualified legal professional to create terms that are appropriate for your specific services and comply with all applicable laws. Remember to replace bracketed placeholders like [Your Website URL], [Date], and [Your State/Country].
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
