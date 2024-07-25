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
        <th>Kingdom</th>
        <th>Class</th>
        <th>Population</th>
        <th>Category</th>
        <th>Main Common Name</th>
        <th>Region</th>
        <th>Conservation Measures</th>
      </tr>
    </thead>
    <tbody>
      {species.map(specie => (
        <tr key={specie.id}>
          <td>{specie.id}</td>
          <td>{specie.kingdom}</td>
          <td>{specie.class}</td>
          <td>{specie.population}</td>
          <td>{specie.category}</td>
          <td>{specie.mainCommonName}</td>
          <td>{specie.region}</td>
          <td>{specie.conservationMeasures}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SpeciesTable;
