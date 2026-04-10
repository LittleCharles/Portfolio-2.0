import React from 'react';

const BASE_URL = 'https://littlecharles.github.io/Portfolio-2.0';

interface StructuredDataProps {
  lang: 'pt' | 'en';
}

export const StructuredData: React.FC<StructuredDataProps> = ({ lang }) => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Luis Carlos Vieira",
    "url": BASE_URL,
    "image": `${BASE_URL}/assets/ImageProfile2-800.webp`,
    "jobTitle": lang === 'pt' ? "Desenvolvedor Full Stack" : "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Lionsoft Inc."
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Votorantim",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "email": "luis.carlos.vieira@live.com",
    "sameAs": [
      "https://github.com/LittleCharles",
      "https://www.linkedin.com/in/luis-carlos-vieira/"
    ],
    "knowsAbout": [
      "JavaScript", "TypeScript", "React.js", "Next.js",
      "Node.js", "Express.js", "AWS", "Docker",
      "Tailwind CSS", "React Native"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Facens"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Luis Carlos Vieira - Portfolio",
    "url": BASE_URL,
    "inLanguage": ["pt-BR", "en"],
    "author": {
      "@type": "Person",
      "name": "Luis Carlos Vieira"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};
