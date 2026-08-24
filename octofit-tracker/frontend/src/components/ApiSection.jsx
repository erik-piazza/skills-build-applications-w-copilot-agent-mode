import { useEffect, useMemo, useState } from 'react'

function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results
    }

    if (Array.isArray(payload.items)) {
      return payload.items
    }

    if (Array.isArray(payload.data)) {
      return payload.data
    }
  }

  return []
}

export default function ApiSection({ title, requestUrl, renderItem }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const normalizedRequestUrl = useMemo(() => requestUrl, [requestUrl])

  useEffect(() => {
    let isMounted = true

    async function loadItems() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(normalizedRequestUrl)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const normalizedItems = normalizeCollectionResponse(payload)

        if (isMounted) {
          setItems(normalizedItems)
        }
      } catch (fetchError) {
        if (isMounted) {
          setItems([])
          setError(fetchError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadItems()

    return () => {
      isMounted = false
    }
  }, [normalizedRequestUrl])

  return (
    <section className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h2 className="mb-0">{title}</h2>
        <small className="text-body-secondary">GET {normalizedRequestUrl}</small>
      </div>

      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <div className="alert alert-danger mb-0">{error}</div>}
      {!isLoading && !error && items.length === 0 && (
        <div className="alert alert-secondary mb-0">No records found.</div>
      )}
      {!isLoading && !error && items.length > 0 && (
        <div className="list-group">
          {items.map((item, index) => (
            <div className="list-group-item" key={item.id ?? item._id ?? index}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
