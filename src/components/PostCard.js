import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`plan/${post.id}`);
    }

    return (
        <article onClick={handleClick}>
            <img className="image-preview" src={post.image} alt="preview"/>
            <h2 className="pad">{post.name}</h2>
        </article>
    );
}