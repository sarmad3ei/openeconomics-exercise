import sqlite3 from 'sqlite3';
import { Specie } from '../models/specie';

sqlite3.verbose();

const db = new sqlite3.Database('./db/database.sqlite');

export const initDB = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS species (
      id INTEGER PRIMARY KEY,
      kingdom TEXT,
      phylum TEXT,
      class TEXT,
      "order" TEXT,
      family TEXT,
      genus TEXT,
      scientificName TEXT,
      taxonomicAuthority TEXT,
      infraRank TEXT,
      infraName TEXT,
      population TEXT,
      category TEXT,
      mainCommonName TEXT,
      region TEXT,
      conservationMeasures TEXT
    )
  `);
};

const runAsync = (sql: string, params: any[] = []) => new Promise<void>((resolve, reject) => {
  db.run(sql, params, function (err) {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

const allAsync = (sql: string, params: any[] = []) => new Promise<any[]>((resolve, reject) => {
  db.all(sql, params, function (err, rows) {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
  });
});

export const saveSpecies = async (species: Specie) => {
  const sqlquery = `
    INSERT OR REPLACE INTO species (
      id, kingdom, phylum, class, "order", family, genus, scientificName,
      taxonomicAuthority, infraRank, infraName, population, category,
      mainCommonName, region, conservationMeasures
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await runAsync(sqlquery, [
    species.id, species.kingdom, species.phylum, species.class, species.order,
    species.family, species.genus, species.scientificName, species.taxonomicAuthority,
    species.infraRank, species.infraName, species.population, species.category,
    species.mainCommonName, species.region, species.conservationMeasures
  ]);
};

export const getAllSpecies = async (): Promise<Specie[]> => {
  try {
    const rows = await allAsync('SELECT * FROM species');
    return rows as Specie[];
  } catch (err) {
    console.error('Error retrieving species:', err);
    throw err;
  }
};