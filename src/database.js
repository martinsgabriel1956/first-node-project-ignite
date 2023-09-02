import fs from "fs";

const databasePath = new URL("../database.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, (error, data) => {
      if (error) {
        this.#persist();
      }

      if (data) {
        this.#database = JSON.parse(data);
      } else {
        this.#persist();
      }
    });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database), (error) =>
      console.log(error)
    );
  }
  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    const tableExists = Array.isArray(this.#database[table]);
    
    if (tableExists) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    const registerExists = rowIndex > -1;

    if(registerExists) {
      this.#database[table][rowIndex] = {id, ...data};
      this.#persist();
    }
  }
  
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    const registerExists = rowIndex > -1;

    if(registerExists) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
