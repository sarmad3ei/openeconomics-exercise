import sqlite3 from 'sqlite3';
import { Specie } from '../models/specie';
import { promisify } from 'util';
sqlite3.verbose();

const db = new sqlite3.Database('./db/database.sqlite');

export const initDB = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS species (
      id TEXT PRIMARY KEY,
      name TEXT,
      region TEXT,
      status TEXT,
      class TEXT,
      conservationMeasures TEXT
    )
  `);
};
const runAsync = promisify(db.run.bind(db));
const allAsync = promisify(db.all.bind(db));

export const saveSpecies = (specie: Specie) => {
  const sqlquery = db.prepare(`
    INSERT OR REPLACE INTO species (id, name, region, status, class, conservationMeasures)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  sqlquery.run(specie.id, specie.name, specie.region, specie.status, specie.class, specie.conservationMeasures);
  sqlquery.finalize();
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