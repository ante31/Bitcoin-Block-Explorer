import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { FaArrowRight, FaArrowLeft, FaCopy } from 'react-icons/fa'; // Import copy icon
import './index.css';

function TransactionDetails({ transaction }) {
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    // Fetch the values for each input
    const fetchInputValues = async () => {
      if (transaction.vin) {
        const values = await Promise.all(
          transaction.vin.map(async (input) => {
            if (input.txid && input.vout >= 0) {
              try {
                const response = await fetch(`/api/transaction/${input.txid}`);
                if (response.ok) {
                  const prevTransaction = await response.json();
                  return {
                    txid: input.txid,
                    vout: input.vout,
                    value: prevTransaction.vout[input.vout]?.value || "Unknown",
                  };
                }
              } catch (err) {
                console.error(`Error fetching transaction for txid: ${input.txid}`, err);
              }
            }
            return { txid: input.txid, vout: input.vout, value: "Error" };
          })
        );
        setInputValues(values);
      }
    };

    fetchInputValues();
  }, [transaction.vin]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    .catch((err) => {
      console.error('Error copying text: ', err);
    });
  };

  return (
    <Card className="mt-4 mb-4">
      <Card.Body>
        <Card.Title>Detalji Transakcije</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>TxID:</strong>
            <div className="d-flex align-items-center">
              <div className="nowrap">{transaction.txid}</div>
              <span style={{ marginLeft: '7px' }}>
                <FaCopy
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCopy(transaction.txid)}
                />
              </span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Veličina:</strong> {transaction.size} bajta
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Blok:</strong>
            <div className="d-flex align-items-center">
              <div className="nowrap">{transaction.blockhash}</div>
              <span style={{ marginLeft: '7px' }}>
                <FaCopy
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCopy(transaction.blockhash)}
                />
              </span>
            </div>
          </ListGroup.Item>
        </ListGroup>


        {/* Transaction Inputs (VIN) and Outputs (VOUT) */}
        <h2 className="mt-4">Protok</h2>
        <Row className="d-flex justify-content-between">
          {/* Input Transactions (VIN) */}
          <Col xs={12} md={12} lg={12} xl={6}>
            <h5>Ulazne Transakcije (VIN)</h5>
            <div>
              {inputValues.map((input, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center small-text">
                  <div>
                    <div className="d-flex" style={{ alignItems: 'center' }}>
                      <div className="d-flex nowrap">
                        <FaArrowLeft style={{ color: 'red', marginRight: '8px' }} /> 
                        <span className="veryshort">{input.txid || "N/A"}</span>
                      </div>
                      <span style={{ marginLeft: 7 }}>
                        <FaCopy
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleCopy(input.txid || "N/A")}
                        />
                      </span>
                    </div>
                  </div>
                  <strong style={{ color: 'red' }}>{input.value} BTC</strong>
                </div>
              ))}
            </div>
          </Col>

          {/* Output Transactions (VOUT) */}
          <Col xs={12} md={12} lg={12} xl={6}>
            <h5>Izlazne Transakcije (VOUT)</h5>
            <div>
              {transaction.vout && transaction.vout.map((output, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center small-text">
                  <div>
                    <div className="d-flex" style={{ alignItems: 'center' }}>
                      <div className="d-flex nowrap">
                          <FaArrowRight style={{ color: 'green', marginRight: '8px' }} /> 
                          <span className="veryshort">{output.scriptPubKey?.address || "N/A"}</span>
                      </div>
                        <span style={{marginLeft:7}}><FaCopy
                          style={{ cursor: 'pointer'}}
                          onClick={() => handleCopy(output.scriptPubKey?.address || "N/A")}
                        /></span>
                    </div>
                  </div>
                  <strong style={{ color: 'green' }}>{output.value} BTC</strong>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TransactionDetails;
