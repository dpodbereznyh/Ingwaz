import homeFaqContent from './homeFaq.content.json'

export const HOME_FAQ_JSON_LD_SCRIPT_ID = 'ingwaz-jsonld-faqpage'

export type HomeFaqItem = {
  question: string
  answer: string
}

export const HOME_FAQ_ITEMS: readonly HomeFaqItem[] = homeFaqContent.items

export function buildHomeFaqPageJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqContent.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
