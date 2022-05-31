

export default function UserCard () {
    
    return (
        <div className="user-card">
        <img src={user.image} />
        <h3>{user.name}</h3>
        <h4>{user.address}</h4>
        </div>
    )
}