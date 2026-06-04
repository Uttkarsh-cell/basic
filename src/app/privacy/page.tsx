import type { Metadata } from 'next';
import { LegalShell } from '@/components/layout/LegalShell';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How GameVerse collects, uses and protects your data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="June 2026">
      <p>
        This is a sample privacy policy for the GameVerse demo. Replace it with your reviewed legal
        text before launch. It outlines the categories of data the platform may process and how it is
        handled.
      </p>
      <h2>Information we collect</h2>
      <p>
        Account details (when you sign in), gameplay data such as favorites, history and scores, and
        standard technical data like device type and anonymized analytics events.
      </p>
      <h2>How we use it</h2>
      <p>
        To save your progress and preferences, power leaderboards and recommendations, keep the
        platform secure, and improve the experience. In this demo, profile data is stored locally in
        your browser only.
      </p>
      <h2>Advertising</h2>
      <p>
        GameVerse may display ads (e.g. Google AdSense). Ad partners may use cookies to serve relevant
        ads in accordance with their own privacy policies.
      </p>
      <h2>Your choices</h2>
      <p>
        You can clear local data at any time from your browser, and request deletion of any
        server-stored account data once backend accounts are enabled.
      </p>
      <h2>Contact</h2>
      <p>Questions? Reach us via the contact page.</p>
    </LegalShell>
  );
}
