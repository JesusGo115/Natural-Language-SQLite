import sqlite3 from "sqlite3";
import fs from "fs";
import CC from "./ConsoleColors.mjs";
export default class DatabaseConnection {
  constructor(dbLocation, createStatements = null, importStatements = null) {
    // open the database
    this.dbLocation = dbLocation;
    
    console.log(CC.applyTheme("THEME", "Using database: " + CC.use(CC.get("RESPONSE")) + dbLocation));
    this.readiness = this.#runSetup(createStatements, importStatements);
  }
  async isReady() {
    return this.readiness;
  }

  async #runSetup(createStatements, importStatements) {
    try {
      if (createStatements) {
        fs.writeFileSync(this.dbLocation, "", { encoding: "utf8", flag: "w" }); // create db if it doesnt exist already
        await this.#runSQLFromFile(createStatements, "Running create statements:");
      }
      if (importStatements) 
        await this.#runSQLFromFile(importStatements, "Running import statements:");
    }
    catch (e){
      console.log(CC.use(CC.get("ERROR"), "\n"+e))
      process.exit(1);
    }
    return true;
  }
  async #runSQLFromFile(file, description = null){
    const exists = fs.existsSync(file)
    if (description) 
      console.log(CC.effect("dim", description + CC.color(exists?"green":"red") + file));

    if (exists){
      let dataSQL = fs.readFileSync(file, "utf-8");
      await this.#exec(dataSQL);
    }
    else{
      throw new Error("SQL file does not exist: "+file);
    }
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

  remove(){
    if (this.db) this.db.close();
    console.log(CC.get("THEME")+"Closing...");

    fs.unlinkSync(this.dbLocation);
  }
}
