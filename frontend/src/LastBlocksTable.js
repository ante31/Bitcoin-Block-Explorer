import React, { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { FaCopy } from 'react-icons/fa';

const LastBlocksTable = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch('/api/last-blocks');
        const data = await response.json();
        setBlocks(data);
      } catch (err) {
        console.error('Error fetching blocks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    .catch((err) => {
      console.error('Error copying text: ', err);
    });
  };

  if (loading) 
    return (
      <div className="d-flex justify-content-center mt-3" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  
  return (
    <div className="my-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Visina</th>
            <th>Hash</th>
            <th>Transakcije</th>
            <th>Veličina (bytes)</th>
          </tr>
        </thead>
        <tbody>
        
        {blocks && blocks.length > 0 ? (
  blocks.map((block, index) => (
    <tr key={index}>
      <td>{block.height}</td>
      <td>
        <div className="d-flex align-items-center">
          <span className="nowrap veryshort">{block.hash}</span>
          <span style={{ marginLeft: '7px' }}>
            <FaCopy
              style={{ cursor: 'pointer' }}
              onClick={() => handleCopy(block.hash)}
            />
          </span>
        </div>
      </td>
      <td>{block.transactions}</td>
      <td>{block.size}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="4" style={{ textAlign: 'center' }}>
      Nema interneta.
    </td>
  </tr>
)}



        </tbody>
      </Table>
    </div>
  );
};

export default LastBlocksTable;
