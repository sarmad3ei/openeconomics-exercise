import sqlite3 from 'sqlite3';
import { Specie} from '../models/specie';
sqlite3.verbose();

const db = new sqlite3.Database('./db/database.sqlite');

export const initDB = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS species (
      id TEXT PRIMARY KEY,
      name TEXT,
      region TEXT,
      status TEXT,
      conservationMeasures TEXT
    )
  `);
};

export const saveSpecies = (species: Specie) => {
  const sqlquery = db.prepare(`
    INSERT OR REPLACE INTO species (id, name, region, status, conservationMeasures)
    VALUES (?, ?, ?, ?, ?)
  `);
  sqlquery.run(species.id, species.name, species.region, species.status, species.conservationMeasures);
  sqlquery.finalize();
};
