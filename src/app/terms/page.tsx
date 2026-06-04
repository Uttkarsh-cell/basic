import type { Metadata } from 'next';
import { LegalShell } from '@/components/layout/LegalShell';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of GameVerse.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="June 2026">
      <p>
        These sample terms govern your use of the GameVerse demo. Replace with your own reviewed terms
        before going live.
      </p>
      <h2>Using GameVerse</h2>
      <p>
        You agree to use the platform lawfully and not to disrupt, exploit or abuse the service,
        other players, or the underlying systems.
      </p>
      <h2>Accounts</h2>
      <p>
        You are responsible for activity under your account. We may suspend accounts that violate
        these terms or our community guidelines.
      </p>
      <h2>Content & games</h2>
      <p>
        Games and content are provided &quot;as is.&quot; Third-party games remain the property of their
        respective developers. Report any content that violates our policies.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, GameVerse is not liable for indirect or incidental
        damages arising from use of the service.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms; continued use constitutes acceptance of the latest version.</p>
    </LegalShell>
  );
}
