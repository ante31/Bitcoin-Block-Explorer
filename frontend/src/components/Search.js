import React, { useState } from "react";

function Search({ handleSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const onSubmit = (e) => {
    handleSearch(e, searchInput);
  };

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Unesite hash bloka, transakcije ili adresu"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Pretraži
        </button>
      </div>
    </form>
  );
}

export default Search;
