import React from 'react';
import { FaDatabase } from 'react-icons/fa';

const MainTable = () => {
  return (
    <div className="container mt-3">
      <h2>Received Documents</h2>
      <div className="icon-bar">
        <FaDatabase className="icon" />
        {/* Ajoutez d'autres icônes ici */}
      </div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Doc #</th>
            <th>Origin</th>
            <th>Situation Change Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>CRYPTO_EST</td>
            <td>2023-10-01</td>
            <td>
              <button className="btn btn-primary">View</button>
              <button className="btn btn-secondary">Download</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Invoice R.</td>
            <td>2023-10-02</td>
            <td>
              <button className="btn btn-primary">View</button>
              <button className="btn btn-secondary">Download</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;