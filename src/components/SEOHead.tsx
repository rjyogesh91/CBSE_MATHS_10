import React from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEOHead({
  title = "MathAce Test Series - Class 10 CBSE Mathematics Test Series",
  description = "Join our comprehensive Class 10 CBSE Mathematics test series with online and offline options. Weekend tests every Saturday and Sunday from 7 AM to 10 AM. Expert guidance, performance tracking, and detailed analytics.",
  keywords = "Class 10 mathematics, CBSE test series, online math tests, offline math tests, math tuition, weekend tests, exam preparation, chapter wise marking, student analytics, CBSE board exam preparation",
  image = "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
  url = "https://mathace-test-series.com"
}: SEOHeadProps) {
  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, keywords, image, url]);

  return null;
}