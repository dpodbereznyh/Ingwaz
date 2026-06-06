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
        <strong>Черновик.</strong> Текст для юридической выверки. До публикации финальной версии страница закрыта от
        индексации (<code>noindex</code>).
      </p>
      <p>{intro}</p>
      <p>
        Согласие на аналитику сохраняется в <code>localStorage</code> (ключ{' '}
        <code>ingwaz:cookie-consent:v1</code>). Яндекс.Метрика подключается при загрузке сайта; баннер фиксирует ваш
        выбор по политике.
      </p>
      <p>
        <Link to="/">← На главную</Link>
      </p>
    </article>
  )
}
