

export default function UserCard () {
    
    return (
        <div className="user-card">
        <img src={user.image} />
        <h3>{user.name}</h3>
        <h3>{user.address}, {user.city}</h3>
        </div>
    )
}