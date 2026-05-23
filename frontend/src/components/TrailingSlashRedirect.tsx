import { Navigate, useLocation } from 'react-router-dom'

/** Канон без завершающего `/` на внутренних маршрутах (кроме корня `/`). */
export function TrailingSlashRedirect() {
  const location = useLocation()
  const { pathname, search, hash } = location

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return (
      <Navigate
        to={{
          pathname: pathname.replace(/\/+$/, ''),
          search,
          hash,
        }}
        replace
      />
    )
  }

  return null
}
