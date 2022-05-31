

export default function ArticlePage () {
    return (
        <div className="article-page">
        <div className="article">
        <img src={post.image} />
        <h1>{post.category}</h1>
        <h2>{post.title}</h2>
        <p>{post.info}</p>
        </div>
        <div className="user-card">
        <img src={user.image} />
        <h3>{user.name}</h3>
        <h4>{user.address}</h4>
        </div>
        </div>
    )
}