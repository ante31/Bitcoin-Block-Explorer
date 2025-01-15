import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import PaginationComponent from './components/Pagination'; 
import Transactions from './components/InputOutputTransactions';  

function BlockDetails({ block, handleSearch }) {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      const startIdx = (currentPage - 1) * transactionsPerPage;
      const endIdx = currentPage * transactionsPerPage;
      const limitedTransactions = block.tx.slice(startIdx, endIdx); 
      const txDetails = await Promise.all(
        limitedTransactions.map(async (txid) => {
          try {
            const response = await fetch(`/api/transaction/${txid}`);
            if (response.ok) {
              return await response.json();
            }
          } catch (err) {
            console.error(`Error fetching transaction for txid: ${txid}`, err);
          }
          return { txid, error: true };
        })
      );
      setTransactions(txDetails);
    };
    fetchTransactions();
  }, [block.tx, currentPage]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    .catch((err) => {
      console.error('Error copying text: ', err);
    });
  };

  const totalPages = Math.ceil(block.tx.length / transactionsPerPage);

  const handleBlockNavigation = async (blockHash) => {
    if (blockHash) {
      await handleSearch({ preventDefault: () => {} }, blockHash);  
      setCurrentPage(1);  
    }
  };
  

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <Button 
          variant="secondary" 
          onClick={() => handleBlockNavigation(block.previousblockhash)} 
          disabled={!block.previousblockhash}
        >
          Prethodni blok
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => handleBlockNavigation(block.nextblockhash)}  
          disabled={!block.nextblockhash}
        >
          Sljedeći blok
        </Button>
      </div>

      <Card className="mt-4 mb-4">
        <Card.Body>
          <Card.Title>Detalji Bloka</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Visina:</strong> {block.height}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Hash:</strong>
              <div className="d-flex align-items-center">
                <span className="nowrap">{block.hash}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item><strong>Broj transakcija:</strong> {block.tx.length}</ListGroup.Item>
            <ListGroup.Item><strong>Veličina:</strong> {block.size} bajta</ListGroup.Item>
            <ListGroup.Item><strong>Težina:</strong> {block.weight}</ListGroup.Item>
            <ListGroup.Item><strong>Merkle root:</strong> {block.merkleroot}</ListGroup.Item>
            <ListGroup.Item><strong>Nonce:</strong> {block.nonce}</ListGroup.Item>
            <ListGroup.Item><strong>Težina rudarenja:</strong> {block.difficulty}</ListGroup.Item>
            <ListGroup.Item><strong>Vrijeme:</strong> {new Date(block.time * 1000).toLocaleString()}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Transactions transactions={transactions} handleCopy={handleCopy} />

      <PaginationComponent 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default BlockDetails;
