import React, { useState } from "react";
import LastBlocksTable from "./LastBlocksTable";
import BlockDetails from "./BlockDetails";
import TransactionDetails from "../src/TransactionDetails";
import AddressDetails from "../src/AddressDetails";
import Search from "./components/Search";

function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e, blockHash) => {
    e.preventDefault();
    setError("");
    setSearchResult(null);
  
    const searchInputValue = blockHash || searchInput; 
  
    if (searchInputValue.length === 0) {
      return;
    }
  
    if (!searchInputValue) {
      setError("Unesite valjan hash, visinu bloka ili adresu.");
      return;
    }
  
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: searchInputValue }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Došlo je do pogreške.");
      }
      const resultData = await response.json();
      console.log(resultData);
      setSearchResult(resultData);
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Bitcoin Block Explorer</h1>
        <p className="lead">Pretražujte blokove, transakcije i adrese na blockchainu.</p>
        <Search handleSearch={handleSearch} />
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>

      {searchResult && (
        <div className="mt-5">
          {searchResult.type === "block" && (
            <BlockDetails
              block={searchResult.data}
              handleSearch={handleSearch}
              searchInput={searchInput}/>
          )}
          {searchResult.type === "transaction" && <TransactionDetails transaction={searchResult.data} />}
          {searchResult.type === "address" && <AddressDetails address ={searchResult.data} />}
        </div>
      )}

      {!searchResult && <div className="mt-5">
        <h3>Zadnji blokovi</h3>
        <LastBlocksTable  />
        </div>}
    </div>
  );
}

export default HomePage;
