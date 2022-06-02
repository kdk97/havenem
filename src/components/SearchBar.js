export default function SearchBar({ setValue }) {

    function handleSearch(event) {
      setValue(event.target.value.toLowerCase());
    }
  
    return (
      
      <div className="searchbar">
        <input type="search" placeholder="Search" onChange={handleSearch} />
      </div>
    );
  }
  