import { EMAIL, GITHUB_URL, PHONE_TEL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    alternateName: ["Jr Tagalogon", "Jr Romeo Tagalogon"],
    jobTitle: "Web Developer and AI Engineer",
    description: SITE_DESCRIPTION,
    email: EMAIL,
    telephone: PHONE_TEL,
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.webp`,
    sameAs: [GITHUB_URL],
    knowsAbout: [
      "Web development",
      "AI receptionists",
      "Chatbots",
      "Workflow automation",
      "WordPress",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
