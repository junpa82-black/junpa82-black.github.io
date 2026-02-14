import { useState } from 'react'
import './App.css'

const FEED_IMAGES = [
  'img01.png', 'img02.jpg', 'img03.jpg', 'img04.png', 'img05.jpg',
  'img06.jpg', 'img07.jpg', 'img08.jpg', 'img09.jpg', 'img10.jpg'
]

const POSTS = FEED_IMAGES.map((img, i) => ({
  id: i + 1,
  profileImage: i % 2 === 0 ? 'man.jpg' : 'woman.jpg',
  username: i % 2 === 0 ? 'travel_man' : 'daily_woman',
  image: img,
  likes: Math.floor(Math.random() * 500) + 100,
  caption: i % 2 === 0
    ? '오늘도 좋은 하루 🌞'
    : '잊지 못할 순간 ✨',
  commentCount: Math.floor(Math.random() * 30)
}))

function App() {
  const [liked, setLiked] = useState({})

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const imgUrl = (name) => `/profile_images/${name}`

  return (
    <div className="app">
      {/* 헤더 */}
      <header className="header">
        <h1 className="logo">Instagram</h1>
        <div className="header-actions">
          <span className="icon">❤</span>
          <span className="icon">✉</span>
        </div>
      </header>

      {/* 스토리 */}
      <section className="stories">
        <div className="story-scroll">
          <div className="story-item">
            <div className="story-ring">
              <img src={imgUrl('man.jpg')} alt="man" />
            </div>
            <span>남성</span>
          </div>
          <div className="story-item">
            <div className="story-ring">
              <img src={imgUrl('woman.jpg')} alt="woman" />
            </div>
            <span>여성</span>
          </div>
          {POSTS.slice(0, 4).map((p, i) => (
            <div key={p.id} className="story-item">
              <div className="story-ring">
                <img src={imgUrl(p.image)} alt="" />
              </div>
              <span>스토리 {i + 1}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 피드 */}
      <main className="feed">
        {POSTS.map((post) => (
          <article key={post.id} className="post">
            <div className="post-header">
              <div className="post-profile">
                <img src={imgUrl(post.profileImage)} alt={post.username} />
                <span className="post-username">{post.username}</span>
              </div>
              <button type="button" className="post-more">⋯</button>
            </div>
            <div className="post-image-wrap">
              <img
                src={imgUrl(post.image)}
                alt=""
                className="post-image"
              />
            </div>
            <div className="post-actions">
              <button
                type="button"
                className={`action-btn ${liked[post.id] ? 'liked' : ''}`}
                onClick={() => toggleLike(post.id)}
                aria-label="좋아요"
              >
                {liked[post.id] ? '❤' : '🤍'}
              </button>
              <span className="action-btn">💬</span>
              <span className="action-btn">↗</span>
              <span className="action-btn save">🔖</span>
            </div>
            <div className="post-likes">
              좋아요 {post.likes + (liked[post.id] ? 1 : 0)}개
            </div>
            <div className="post-caption">
              <strong>{post.username}</strong> {post.caption}
            </div>
            {post.commentCount > 0 && (
              <button type="button" className="post-comments-link">
                댓글 {post.commentCount}개 모두 보기
              </button>
            )}
          </article>
        ))}
      </main>

      {/* 하단 네비 */}
      <nav className="bottom-nav">
        <span className="nav-item active">🏠</span>
        <span className="nav-item">🔍</span>
        <span className="nav-item">➕</span>
        <span className="nav-item">❤</span>
        <span className="nav-item">👤</span>
      </nav>
    </div>
  )
}

export default App
