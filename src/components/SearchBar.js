

export default function SearchBar({ setValue }) {

    function handleSearch(event) {
      setValue(event.target.value.toLowerCase());
    }
  
    return (
      <div className="searchbar-container">
      <input type="search" placeholder="Søg" onChange={handleSearch} className="searchbar"/>
      </div>
    );
  }
  