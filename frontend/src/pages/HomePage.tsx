import { Fragment } from 'react'
import { METRIKA_GOALS, reachMetrikaGoal } from '../analytics/metricaGoals'
import {
  MAINTENANCE_TOOLS,
  PORTFOLIO_TOOLS,
  PRIMARY_TOOL,
  toolUrl,
  UTM_CONTENT,
} from '../config/tools'
import { HOME_FAQ_ITEMS } from '../seo/homeFaq'

function trackToolClick(toolId: string, primary?: boolean) {
  reachMetrikaGoal(
    primary ? METRIKA_GOALS.CTA_COMMENT_SIGNAL : METRIKA_GOALS.CTA_OTHER_TOOL,
    { tool: toolId },
  )
}

const MAINTENANCE_LABEL = MAINTENANCE_TOOLS.map((t) => t.name).join(', ')

export function HomePage() {
  const secondaryTools = PORTFOLIO_TOOLS.filter((t) => !t.primary)
  const heroCsUrl = toolUrl(PRIMARY_TOOL, UTM_CONTENT.HERO_PRIMARY)
  const screenshotCsUrl = toolUrl(PRIMARY_TOOL, UTM_CONTENT.SCREENSHOT_CTA)

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Для авторов YouTube, образовательных проектов и экспертного контента</p>
        <h1>Сигнал аудитории</h1>
        <p className="tagline">
          Находите повторяющиеся вопросы, боли и темы в комментариях YouTube, чтобы понимать, что аудитория хочет
          увидеть следующим.
        </p>
        <p className="thesis">
          «Сигнал аудитории» — минимальная витрина инструментов для авторов экспертного контента: YouTube,
          образование, B2B и нишевая экспертиза. Основной фокус — понимание аудитории через комментарии, паттерны
          вопросов и контент-сигналы, а не «ИИ ради ИИ».
        </p>
      </header>

      <section className="section section-primary" aria-labelledby="primary-cta-heading">
        <h2 id="primary-cta-heading" className="visually-hidden">
          Главный инструмент
        </h2>
        <a
          href={heroCsUrl}
          className="primary-cta"
          onClick={() => trackToolClick(PRIMARY_TOOL.id, true)}
          rel="noopener noreferrer"
        >
          Найти сигналы в комментариях
        </a>
        <p className="primary-cta-caption">Анализ комментариев YouTube без доступа к вашему каналу.</p>
      </section>

      <section className="section" aria-labelledby="evidence-heading">
        <h2 id="evidence-heading" className="section-title">
          Как выглядит сигнал
        </h2>
        <div className="evidence-layout">
          <figure className="evidence-screenshot">
            <a
              href={screenshotCsUrl}
              className="evidence-screenshot-link"
              onClick={() => trackToolClick(PRIMARY_TOOL.id, true)}
              rel="noopener noreferrer"
            >
              <img
                src="/images/commentsignal-screenshot.png"
                alt="CommentSignal: идеи для роликов из комментариев YouTube"
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption className="evidence-note">
              Скриншот сервиса CommentSignal на{' '}
              <a
                href={toolUrl(PRIMARY_TOOL, UTM_CONTENT.SCREENSHOT_IMAGE)}
                onClick={() => trackToolClick(PRIMARY_TOOL.id, true)}
                rel="noopener noreferrer"
              >
                commentsignal.ingwaz.space
              </a>
              .
            </figcaption>
          </figure>
          <ul className="evidence-bullets">
            <li>какие вопросы повторяются чаще всего</li>
            <li>какие темы аудитория ждёт</li>
            <li>что записать следующим видео</li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="audience-heading">
        <h2 id="audience-heading" className="section-title">
          Для авторов экспертного контента
        </h2>
        <p className="audience-fit">
          <strong>Подходит:</strong> образовательные YouTube-каналы; B2B-эксперты; нишевые авторы; команды авторов
          вокруг экспертизы.
        </p>
        <p className="audience-exclude">
          <strong>Не для:</strong> массового развлекательного контента, вирусных Shorts, универсального «ИИ-конвейера
          контента».
        </p>
      </section>

      {secondaryTools.length > 0 ? (
        <section className="section section-secondary" aria-labelledby="secondary-heading">
          <h2 id="secondary-heading" className="section-title section-title--small">
            Смежные инструменты
          </h2>
          <ul className="tool-list-compact">
            {secondaryTools.map((tool) => (
              <li key={tool.id}>
                <a
                  href={toolUrl(tool)}
                  className="tool-list-link"
                  onClick={() => trackToolClick(tool.id)}
                  rel="noopener noreferrer"
                >
                  {tool.name}
                </a>
                <span className="tool-list-desc"> — {tool.description}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="section section-faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="section-title section-title--small">
          Частые вопросы
        </h2>
        <dl className="faq-list">
          {HOME_FAQ_ITEMS.map((item) => (
            <Fragment key={item.question}>
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section className="section section-experiments section-muted" aria-labelledby="experiments-heading">
        <h2 id="experiments-heading" className="section-title section-title--small">
          Другие эксперименты
        </h2>
        <p className="experiments-compact">
          Архив экспериментов: {MAINTENANCE_LABEL} и другие внутренние MVP — не основное направление платформы.
        </p>
      </section>
    </>
  )
}
