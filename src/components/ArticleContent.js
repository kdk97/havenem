

export default function ArticleContent () {
    
    return (
        <div className="article">
        <img src={post.image} />
        <h1>{post.category}</h1>
        <h2>{post.title}</h2>
        <p>{post.info}</p>
        </div>
    )
}