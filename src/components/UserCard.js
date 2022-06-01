

export default function UserCard () {

    
    
    return (
        <div className="user-card">
        <img src={post.user.image} />
        <h3>{post.user.name}</h3>
        <h3>{post.user.telephone}</h3>
        <h3>{post.user.address}, {post.user.city}</h3>
        </div>
    )
}