

export default function ArticleContent () {

    const postId = data.id;
        const [post, setPost] = useState([]);

        useEffect(()=>{
        async function getPost () {
        const q = query(postsRef, where("id", "==", postId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        setPost(doc.data())
        });
        }

        getPost();
                
        },[postId])
        console.log(post);
    
    return (
        <div className="article">
        <img src={post.image} />
        <h1>{post.category}, {post.name}</h1>
        <p>{post.about}</p>
        </div>
    )
}