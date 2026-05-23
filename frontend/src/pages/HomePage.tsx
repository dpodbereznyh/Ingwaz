import { METRIKA_GOALS, reachMetrikaGoal } from '../analytics/metricaGoals'
import { MAINTENANCE_TOOLS, PORTFOLIO_TOOLS, PRIMARY_TOOL } from '../config/tools'

function ToolLink({
  tool,
  variant,
}: {
  tool: (typeof PORTFOLIO_TOOLS)[number]
  variant: 'primary' | 'secondary' | 'maintenance'
}) {
  function onClick() {
    reachMetrikaGoal(
      tool.primary ? METRIKA_GOALS.CTA_COMMENT_SIGNAL : METRIKA_GOALS.CTA_OTHER_TOOL,
      { tool: tool.id },
    )
  }

  const className =
    variant === 'primary'
      ? 'tool-card tool-card--primary'
      : variant === 'maintenance'
        ? 'tool-card tool-card--maintenance'
        : 'tool-card'

  return (
    <a href={tool.href} className={className} onClick={onClick} rel="noopener noreferrer">
      <h3 className="tool-card-title">{tool.name}</h3>
      <p className="tool-card-desc">{tool.description}</p>
      <span className="tool-card-cta">{variant === 'primary' ? 'Открыть CommentSignal →' : 'Перейти →'}</span>
    </a>
  )
}

export function HomePage() {
  const secondaryTools = PORTFOLIO_TOOLS.filter((t) => !t.primary)

  return (
    <>
      <header className="hero">
        <p className="eyebrow">ingwaz.space</p>
        <h1>Сигнал аудитории</h1>
        <p className="tagline">От комментариев и обратной связи — к решениям по контенту</p>
        <p className="thesis">
          Инструменты <strong>audience intelligence</strong> для авторов экспертного контента: YouTube long-form,
          образование и B2B-экспертиза. Не «всё для блогеров» — один фокус: понять, что говорит аудитория, и
          превратить это в следующий выпуск или продуктовое решение.
        </p>
      </header>

      <section className="section section-primary" aria-labelledby="primary-tool-heading">
        <h2 id="primary-tool-heading" className="section-title">
          Главный инструмент
        </h2>
        <ToolLink tool={PRIMARY_TOOL} variant="primary" />
      </section>

      {secondaryTools.length > 0 ? (
        <section className="section" aria-labelledby="other-tools-heading">
          <h2 id="other-tools-heading" className="section-title">
            Другие инструменты
          </h2>
          <ul className="tool-grid">
            {secondaryTools.map((tool) => (
              <li key={tool.id}>
                <ToolLink tool={tool} variant="secondary" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="section section-muted" aria-labelledby="maintenance-heading">
        <h2 id="maintenance-heading" className="section-title section-title--small">
          Также в портфеле
        </h2>
        <ul className="tool-grid tool-grid--compact">
          {MAINTENANCE_TOOLS.map((tool) => (
            <li key={tool.id}>
              <ToolLink tool={tool} variant="maintenance" />
            </li>
          ))}
        </ul>
      </section>

      <section className="section section-seo" aria-labelledby="about-heading">
        <h2 id="about-heading" className="section-title section-title--small">
          Для кого эта витрина
        </h2>
        <p>
          Если вы ведёте экспертный канал и хотите опираться на реальный feedback — начните с CommentSignal: он
          собирает сигналы из комментариев и помогает приоритизировать темы. Остальные утилиты на поддоменах
          закрывают смежные задачи (SEO-бриф, конкуренты) и не дублируют продуктовый контент этой страницы.
        </p>
      </section>
    </>
  )
}
