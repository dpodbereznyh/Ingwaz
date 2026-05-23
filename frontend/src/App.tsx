import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { LegalStubPage } from './pages/LegalStubPage'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="privacy"
          element={
            <LegalStubPage
              title="Политика конфиденциальности"
              intro="На этой странице будет опубликована политика обработки персональных данных для витрины ingwaz.space и связанных сервисов."
            />
          }
        />
        <Route
          path="cookies"
          element={
            <LegalStubPage
              title="Cookies и localStorage"
              intro="Здесь будет описание категорий cookies, localStorage и порядка управления согласием на аналитику."
            />
          }
        />
      </Route>
    </Routes>
  )
}
