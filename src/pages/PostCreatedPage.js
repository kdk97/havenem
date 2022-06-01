import succes from "../assets/img/succes.png"

export default function() {

    const navigate = useNavigate();

    function handleClick () {
        navigate("/mine-annoncer");
    }

    return (
        <div className="post-created">
            <h1>Din annonce er nu oprettet.</h1>
            <img src={succes} alt="Succes" />
            <button onClick={handleClick}>Mine annoncer</button>
        </div>
    )
}