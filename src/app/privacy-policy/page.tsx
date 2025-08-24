import Image from "next/image";

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-clash font-semibold">Privacy & Policies</h1>
        </div>

        <div className="text-sm opacity-80 mb-6 text-theme-text">
          Effective Date: June 16, 2025
        </div>

        <div className="space-y-6">
          <p className="text-lg">Thank you for using Referin. Your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect
          your personal information.</p>

          <div className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
              <p className="text-lg">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Personal information: Name, email address, phone number, date of birth, gender</li>
                <li>Application Details: Resume/CV, cover letters, education background, job preferences</li>
                <li>Device information: IP address, browser type, device type, operating system</li>
                <li>Usage Data: How you interact with the site (e.g. pages viewed, features used)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
              <p className="text-lg">We use your information to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Help you apply for jobs, internships, or academic opportunities</li>
                <li>Improve your user experience</li>
                <li>Contact you about updates, new features, or support</li>
                <li>Comply with legal requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
              <p className="text-lg">We do not sell your personal data.</p>
              <p className="text-lg">We may share data with:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Employers, universities, or organizations you apply to via Referin</li>
                <li>Third-party service providers (e.g. hosting, analytics) under confidentiality agreements</li>
                <li>Government or law enforcement if legally required</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. How We Protect Your Data</h2>
              <ul className="list-disc pl-6">
                <li>We use encryption (HTTPS), secure servers, and regular audits to keep your data safe</li>
                <li>Only authorized personnel have access to sensitive data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
              <p className="text-lg">You have the right to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Access, update, or delete your personal information</li>
                <li>Withdraw your consent at any time</li>
                <li>Request a copy of the data we hold on you</li>
                <li>To make any request, email us at support@referin.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Cookies & Tracking</h2>
              <p className="text-lg">We use cookies to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Save your login info</li>
                <li>Understand how users interact with Referin</li>
                <li>Improve our services</li>
              </ul>
              <p className="mt-2 text-lg">You can turn off cookies in your browser settings, but some features may not work properly.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
              <p className="text-lg">Referin may contain links to other websites. We are not responsible for their privacy practices.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
              <p className="text-lg">We may update this Privacy Policy. If we do, we&rsquo;ll notify you via email or in-app notification.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
              <p className="text-lg">If you have questions or concerns, contact us at:</p>
              <p className="mt-2 text-lg">📧 support@referin.com</p>
              <p className="text-lg">🌐 www.referin.com</p>
            </section>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-theme-text/20 text-center text-sm opacity-60 text-theme-text">
          Powered by <span className="font-semibold">Referin</span> · Copyright 2025
        </div>
      </div>
    </div>
  );
}