import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`plan/${post.id}`);
    }

    return (
        <article className="home-page" onClick={handleClick}>
            <div className="home-page-card">
                <div>
                    <img className="image-preview" src={post.image} alt="preview"/>
                </div>
                <div>
                    <h2 className="pad">{post.name}</h2>
                    <h3 className="pad">Kategori: {post.category}</h3>
                    <h3 className="pad">{post.user}</h3>
                </div>
            </div>
        </article>
    );
}