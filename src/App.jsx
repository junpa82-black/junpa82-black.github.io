import { useMemo, useState } from 'react'
import './App.css'

const INITIAL_PLACES = [
  {
    id: 1,
    name: '강남역 브런치 카페',
    description: '밝은 분위기 / 브런치 메뉴 다양',
    votes: 3,
  },
  {
    id: 2,
    name: '홍대 파스타 맛집',
    description: '예약 가능 / 단체석 있음',
    votes: 5,
  },
  {
    id: 3,
    name: '여의도 한강 피크닉존',
    description: '날씨 좋을 때 야외 모임 추천',
    votes: 2,
  },
]

function App() {
  const [places, setPlaces] = useState(INITIAL_PLACES)
  const [selectedPlaceId, setSelectedPlaceId] = useState(null)
  const [newPlaceName, setNewPlaceName] = useState('')
  const [newPlaceDescription, setNewPlaceDescription] = useState('')

  const totalVotes = useMemo(
    () => places.reduce((sum, place) => sum + place.votes, 0),
    [places],
  )

  const sortedPlaces = useMemo(
    () => [...places].sort((a, b) => b.votes - a.votes),
    [places],
  )

  const handleVote = (nextPlaceId) => {
    setPlaces((prev) =>
      prev.map((place) => {
        if (place.id === selectedPlaceId && selectedPlaceId !== nextPlaceId) {
          return { ...place, votes: Math.max(0, place.votes - 1) }
        }

        if (place.id === nextPlaceId && selectedPlaceId !== nextPlaceId) {
          return { ...place, votes: place.votes + 1 }
        }

        return place
      }),
    )
    setSelectedPlaceId(nextPlaceId)
  }

  const handleAddPlace = (event) => {
    event.preventDefault()
    const trimmedName = newPlaceName.trim()
    const trimmedDescription = newPlaceDescription.trim()

    if (!trimmedName) {
      return
    }

    const nextId = places.length > 0 ? Math.max(...places.map((p) => p.id)) + 1 : 1

    setPlaces((prev) => [
      ...prev,
      {
        id: nextId,
        name: trimmedName,
        description: trimmedDescription || '설명 없음',
        votes: 0,
      },
    ])
    setNewPlaceName('')
    setNewPlaceDescription('')
  }

  return (
    <div className="app">
      <header className="header">
        <p className="meeting-label">이번 주 모임</p>
        <h1>모임 장소 투표</h1>
        <p className="meeting-meta">총 투표수: {totalVotes}표</p>
      </header>

      <main className="content">
        <section className="vote-card">
          <h2>장소 선택</h2>
          <p className="section-desc">원하는 장소를 1곳 선택해 주세요. 다시 누르면 선택은 유지됩니다.</p>

          <ul className="place-list">
            {sortedPlaces.map((place) => {
              const percentage = totalVotes === 0 ? 0 : Math.round((place.votes / totalVotes) * 100)
              const isSelected = selectedPlaceId === place.id

              return (
                <li key={place.id} className={`place-item ${isSelected ? 'selected' : ''}`}>
                  <button
                    type="button"
                    className="place-button"
                    onClick={() => handleVote(place.id)}
                  >
                    <div className="place-row">
                      <div>
                        <p className="place-name">{place.name}</p>
                        <p className="place-desc">{place.description}</p>
                      </div>
                      <div className="place-score">
                        <strong>{place.votes}표</strong>
                        <span>{percentage}%</span>
                      </div>
                    </div>
                    <div className="progress-track" aria-hidden="true">
                      <div
                        className="progress-bar"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="vote-card add-card">
          <h2>장소 제안</h2>
          <p className="section-desc">원하는 장소가 없다면 새 후보를 추가할 수 있어요.</p>
          <form className="add-form" onSubmit={handleAddPlace}>
            <label className="field">
              <span>장소 이름</span>
              <input
                type="text"
                value={newPlaceName}
                onChange={(event) => setNewPlaceName(event.target.value)}
                placeholder="예: 성수동 루프탑 바"
              />
            </label>
            <label className="field">
              <span>간단 설명</span>
              <input
                type="text"
                value={newPlaceDescription}
                onChange={(event) => setNewPlaceDescription(event.target.value)}
                placeholder="예: 야경 좋고 대화하기 편함"
              />
            </label>
            <button type="submit" className="add-button">후보 추가하기</button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
