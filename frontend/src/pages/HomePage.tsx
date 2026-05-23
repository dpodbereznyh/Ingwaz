import { Fragment } from 'react'
import { METRIKA_GOALS, reachMetrikaGoal } from '../analytics/metricaGoals'
import { EVIDENCE_EXAMPLE_ROWS } from '../content/evidenceExample'
import { MAINTENANCE_TOOLS, PORTFOLIO_TOOLS, PRIMARY_TOOL } from '../config/tools'
import { HOME_FAQ_ITEMS } from '../seo/homeFaq'

function trackToolClick(toolId: string, primary?: boolean) {
  reachMetrikaGoal(
    primary ? METRIKA_GOALS.CTA_COMMENT_SIGNAL : METRIKA_GOALS.CTA_OTHER_TOOL,
    { tool: toolId },
  )
}

export function HomePage() {
  const secondaryTools = PORTFOLIO_TOOLS.filter((t) => !t.primary)

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Audience intelligence для экспертного контента</p>
        <h1>Сигнал аудитории</h1>
        <p className="tagline">
          Извлекайте темы, вопросы и повторяющиеся сигналы из комментариев аудитории — до того, как контент
          перестанет попадать в запрос.
        </p>
        <p className="thesis">
          «Сигнал аудитории» — минимальная витрина инструментов для авторов экспертного контента: YouTube,
          образование, B2B и нишевая экспертиза. Основной фокус — понимание аудитории через комментарии, паттерны
          вопросов и контент-сигналы, а не «AI ради AI».
        </p>
      </header>

      <section className="section section-primary" aria-labelledby="primary-cta-heading">
        <h2 id="primary-cta-heading" className="visually-hidden">
          Главный инструмент
        </h2>
        <a
          href={PRIMARY_TOOL.href}
          className="primary-cta"
          onClick={() => trackToolClick(PRIMARY_TOOL.id, true)}
          rel="noopener noreferrer"
        >
          Анализировать комментарии YouTube
        </a>
        <p className="primary-cta-caption">
          CommentSignal помогает находить повторяющиеся вопросы, боли и идеи для новых видео из комментариев
          аудитории.
        </p>
      </section>

      <section className="section" aria-labelledby="evidence-heading">
        <h2 id="evidence-heading" className="section-title">
          Как выглядит сигнал
        </h2>
        <div className="evidence-wrap">
          <table className="evidence-table">
            <thead>
              <tr>
                <th scope="col">Сигнал в комментариях</th>
                <th scope="col">Частота</th>
                <th scope="col">Идея для контента</th>
              </tr>
            </thead>
            <tbody>
              {EVIDENCE_EXAMPLE_ROWS.map((row) => (
                <tr key={row.signal}>
                  <td>{row.signal}</td>
                  <td className="evidence-count">{row.count}</td>
                  <td>{row.idea}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="evidence-note">Обезличенный пример формата вывода CommentSignal.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="audience-heading">
        <h2 id="audience-heading" className="section-title">
          Для авторов экспертного контента
        </h2>
        <p className="audience-fit">
          <strong>Подходит:</strong> образовательные YouTube-каналы; B2B-эксперты; нишевые авторы; creator-команды
          вокруг экспертизы.
        </p>
        <p className="audience-exclude">
          <strong>Не для:</strong> mass-entertainment, viral Shorts, универсальный «AI-контент-конвейер».
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
                  href={tool.href}
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

      <section className="section section-experiments" aria-labelledby="experiments-heading">
        <h2 id="experiments-heading" className="section-title section-title--small">
          Другие эксперименты
        </h2>
        <p className="experiments-intro">
          Несколько внутренних инструментов и MVP, которые пока не являются основным направлением платформы.
        </p>
        <ul className="experiments-list">
          {MAINTENANCE_TOOLS.map((tool) => (
            <li key={tool.id}>
              <a
                href={tool.href}
                className="experiments-link"
                onClick={() => trackToolClick(tool.id)}
                rel="noopener noreferrer"
              >
                {tool.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
