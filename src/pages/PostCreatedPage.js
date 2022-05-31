import succes from "../assets/img/succes.png"

export default function() {

    const navigate = useNavigate();

    function handleMineAnnoncer(event) {
        event.preventDefault();
        navigate("/mine-annoncer");
    }

    return (
        <div className="post-created">
            <h1>Din annonce er nu oprettet.</h1>
            <img src={succes} alt="Succes" />
            <form>
            <button onSubmit={handleMineAnnoncer}>Mine annoncer</button>
            </form>
        </div>
    )
}