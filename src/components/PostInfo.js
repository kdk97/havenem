

export default function PostInfo () {

    const [info, setInfo] = useState("");

    useEffect(() => {  
        if (localStorage.getItem("info") === null) {
        setInfo(null)
          } else {
            setInfo(localStorage.getItem("info"))    
          }
    },[])

    function submitInfo(event){
        event.preventDefault();
        localStorage.setItem("info", info)
        navigate("/post-created");
    }

    return (
        <div className="post-info">
            <h2>Her kan du skrive yderligere information omkring det produkt, du vil udleje.</h2>
            <form onSubmit={submitInfo}>
            <input
            className="post-info-text"
            type="text"
            placeholder="Skriv her"
            />
            <button>Opret</button>
            </form>
        </div>
    )
}