import React from 'react';
import { Specie } from '../models/Specie';
import './SpeciesTable.css';

interface SpeciesTableProps {
  species: Specie[];
}

const SpeciesTable: React.FC<SpeciesTableProps> = ({ species }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Region</th>
        <th>Status</th>
        <th>Class</th>
        <th>Conservation Measures</th>
      </tr>
    </thead>
    <tbody>
      {species.map(specie => (
        <tr key={specie.id}>
          <td>{specie.id}</td>
          <td>{specie.name}</td>
          <td>{specie.region}</td>
          <td>{specie.status}</td>
          <td>{specie.class}</td>
          <td>{specie.conservationMeasures}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SpeciesTable;
