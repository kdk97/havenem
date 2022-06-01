

export default function ArticleContent () {
    
    return (
        <div className="article">
        <img src={post.image} />
        <h1>{post.category}, {post.name}</h1>
        <p>{post.about}</p>
        </div>
    )
}