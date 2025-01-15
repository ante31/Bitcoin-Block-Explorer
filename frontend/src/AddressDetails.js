import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FaCopy } from 'react-icons/fa';

function AddressDetails({ address }) {
  console.log(address)
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .catch((err) => console.error('Error copying text:', err));
  };

  return (
    <Card className="mt-4 mb-4">
      <Card.Body>
        <Card.Title>Detalji Adrese</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Adresa:</strong>
            <div className="d-flex align-items-center">
              <div className="nowrap">{address.address}</div>
              <span style={{ marginLeft: '7px' }}>
                <FaCopy
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCopy(address.address)}
                />
              </span>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default AddressDetails;
