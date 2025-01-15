// Transactions.js
import React from 'react';
import { Table } from 'react-bootstrap';
import { FaCopy } from 'react-icons/fa';

function Transactions({ transactions, handleCopy }) {
  return (
    <div>
      <h2>Transakcije</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>TxID</th>
            <th>Broj ulaza</th>
            <th>Broj izlaza</th>
            <th>Veličina</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  <span className="nowrap veryshort">{transaction.txid || "N/A"}</span>
                  <FaCopy
                    style={{ cursor: 'pointer', marginLeft: '7px' }}
                    onClick={() => handleCopy(transaction.txid || "N/A")}
                  />
                </div>
              </td>
              <td>{transaction.vin?.length || 0}</td>
              <td>{transaction.vout?.length || 0}</td>
              <td>{transaction.size || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Transactions;
