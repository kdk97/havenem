import React from "react";

export default function SelectCategory() {

    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {  
        if (localStorage.getItem("category") === null) {
        setCategory("diverse")
          } else {
            setCategory(localStorage.getItem("category"))    
          }
    },[])

    function submitCategory(event){
        event.preventDefault();
        localStorage.setItem("category", category)
        navigate("/post-info");
    }

    return (
        <div className="select-category">
            <h2>Vælg kategori</h2>
        <form onSubmit={submitCategory} className="category-form">
        <div className="category-button">
          <label>
          <input
            type="button"
            value="haveartikler"
            checked={category === 'haveartikler'}
          /> Haveartikler
          </label>
        </div>
        <div className="category-button">
          <label>
          <input
            type="button"
            value="maskiner"
            checked={category === 'maskiner'}
          /> Maskiner
          </label>
        </div>
        <div className="category-button">
          <label>
          <input
            type="button"
            value="moebler"
            checked={category === 'moebler'}
          /> Møbler
          </label>
        </div>
        <div className="category-button">
          <label>
          <input
            type="button"
            value="redskaber"
            checked={category === 'redskaber'}
          /> Redskaber
          </label>
          </div>
          <div className="category-button">
          <label>
          <input
            type="button"
            value="leg-og-fritid"
            checked={category === 'leg-og-fritid'}
          /> Leg og fritid
          </label>
        </div>
        <button>Vælg</button>
        </form>
        </div>
    )

}