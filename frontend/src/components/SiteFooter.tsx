import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Подвал сайта">
      <div className="site-footer-links">
        <Link to="/privacy">Конфиденциальность</Link>
        <span aria-hidden="true">·</span>
        <Link to="/cookies">Cookies</Link>
      </div>
      <p className="site-footer-muted">
        Витрина проекта «Сигнал аудитории» на домене{' '}
        <a href="https://ingwaz.space" className="site-footer-domain">
          ingwaz.space
        </a>
        . Продуктовый SEO — на поддоменах инструментов.
      </p>
    </footer>
  )
}
