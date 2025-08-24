import Image from "next/image";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-8">
      {/* <button className="flex items-center mb-8 hover:opacity-80">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path 
            d="M19 12H5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 19L5 12L12 5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span>Back</span>
      </button> */}

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Image 
            src="/referinLOGO.svg" 
            alt="Referin Logo" 
            width={52} 
            height={16} 
            className="mb-4"
          />
          <h1 className="text-3xl font-clash font-semibold">Terms & Conditions</h1>
        </div>

        <div className="text-sm opacity-80 mb-6">
          Last updated: 14th June,2025
        </div>

        <div className="space-y-6">
          <p className="text-2xl font-clash font-semibold">Welcome to Referin!</p>
          
          <p className="text-lg">Please read these Terms and Conditions (&quot;Terms&quot;) carefully before using our website or app operated by Referin.
          By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you
          may not access the service.</p>

          <div className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Use of Service</h2>
              <p className="text-lg">You agree to use the website/app only for lawful purposes and in a way that does not harm or violate the rights of others.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
              <p className="text-lg">If you create an account with us, you must provide accurate and complete information. You are responsible for keeping your
              password secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Content Ownership</h2>
              <p className="text-lg">All content, trademarks, logos, and images are owned by Referin unless otherwise stated. You may not use them without
              permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Prohibited Activities</h2>
              <p className="text-lg">You agree not to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Hack, spam, or upload viruses</li>
                <li>Use our services to break laws</li>
                <li>Copy or steal content from the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
              <p className="text-lg">We may suspend or terminate access to our services at any time, without notice, if you break the Terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
              <p className="text-lg">We may update these Terms from time to time. Changes will be posted on this page, and by continuing to use the service, you
              accept the new terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
              <p className="text-lg">If you have any questions about these Terms, please contact us at: support@referin.com</p>
            </section>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-theme-text/20 text-center text-sm opacity-60">
          Powered by <span className="font-semibold">Referin</span> · Copyright 2025
        </div>
      </div>
    </div>
  );
}