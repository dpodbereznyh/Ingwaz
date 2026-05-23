import { Link } from 'react-router-dom'

type LegalStubPageProps = {
  title: string
  intro: string
}

export function LegalStubPage({ title, intro }: LegalStubPageProps) {
  return (
    <article className="legal-page">
      <h1>{title}</h1>
      <p className="legal-notice">
        <strong>Черновик.</strong> Текст для юридической выверки; страница не индексируется поисковиками.
      </p>
      <p>{intro}</p>
      <p>
        Согласие на аналитику хранится в <code>localStorage</code> браузера (ключ{' '}
        <code>ingwaz:cookie-consent:v1</code>). Яндекс.Метрика подключается только после явного согласия пользователя.
      </p>
      <p>
        <Link to="/">← На главную</Link>
      </p>
    </article>
  )
}
