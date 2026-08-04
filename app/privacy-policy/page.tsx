import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the free dividend calculator tools.',
};

export default function PrivacyPage() {
  return (
    <div className="prose">
      <h1>Privacy Policy</h1>
      <p>Last updated: August 2026</p>

      <h2>Overview</h2>
      <p>
        This tool is a free calculator website. It does not require an account, and you do not need to
        provide any personal information to use it. All calculations happen in your browser.
      </p>

      <h2>Advertising</h2>
      <p>
        We may display advertising served by third-party advertising companies, including Google
        AdSense. These companies may use cookies or similar technologies to serve ads based on your
        prior visits to this and other websites.
      </p>
      <ul>
        <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet.</li>
        <li>You may opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads">Google Ads Settings</a>.</li>
        <li>You can also learn about Google&apos;s use of data at{' '}
          <a href="https://policies.google.com/technologies/partner-sites">policies.google.com/technologies/partner-sites</a>.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use cookies only for basic site functionality and, if enabled, for advertising measurement
        by third parties. You can disable cookies in your browser settings.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use privacy-respecting analytics to understand how the calculators are used. Analytics
        data is aggregate and does not identify individual users.
      </p>

      <h2>Contact</h2>
      <p>Questions about this policy can be sent via the contact form on this website.</p>
    </div>
  );
}
