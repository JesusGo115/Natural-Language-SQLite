import sqlite3 from "sqlite3";
import fs from "fs";
import CC from "./ConsoleColors.mjs";
export default class DatabaseConnection {
  constructor(restoreDefault = true) {
    // open the database
    this.dbLocation = "./db/database.db";
    this.readiness = true;

    if (restoreDefault) {
      this.readiness = this.#runSetup();
    }
  }
  async isReady() {
    return this.readiness;
  }
  async #runSetup() {
    console.log(CC.applyTheme("THEME", "Preparing database connection"));

    fs.writeFileSync(this.dbLocation, "", { encoding: "utf8", flag: "w" });

    // console.log(CC.effect("dim")+"Creating tables...");
    let setUpSQL = fs.readFileSync("./db/tables.sql", "utf-8");
    await this.#exec(setUpSQL);
    // console.log(CC.effect("dim")+"Loading data...");
    let dataSQL = fs.readFileSync("./db/data.sql", "utf-8");
    await this.#exec(dataSQL);

    return true;
  }

  async #exec(sqlContent) {
    this.db = new sqlite3.Database(this.dbLocation);

    return new Promise((resolve) => {
      this.db.exec(sqlContent, (err) => {
        // close the database connection
        this.db.close();

        if (err) {
          throw err;
        }

        resolve();
      });
    });
  }

  async query(query) {
    this.db = new sqlite3.Database(this.dbLocation);

    return new Promise((resolve) => {
      this.db.all(query, [], (err, rows) => {
        // close the database connection
        this.db.close();
        console.log(CC.get("RESPONSE")+CC.effect("dim")+"SQLite query: "+query);

        if (err) {
        //   console.log("");
          console.log(CC.applyTheme("ERROR",err));
          rows = JSON.stringify(err);
        }

        resolve(rows);
      });
    });
  }
}
