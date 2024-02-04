import GPTSession from "./GPTSession.mjs";
import { createInterface } from "readline";
import DBConnection from "./DatabaseConnection.mjs";
import CC from "./ConsoleColors.mjs";

CC.setTheme("THEME", CC.RESET);
CC.setTheme("RESPONSE", CC.effect("bright")+CC.color("blue"));
CC.setTheme("INPUT", CC.effect("dim"));
CC.setTheme("ERROR", CC.effect("dim")+CC.color("red"));


const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getContext = async () =>
  (await GPTSession.retrieveContext("./personality.chat")) +
  (await GPTSession.retrieveContext("./db/data.sql"));

const gpt = new GPTSession(getContext());
await gpt.isReady();

const database = new DBConnection();
await database.isReady();

console.log(CC.RESET+"Ready!\n");
processQuery();


function processQuery() {
  readline.question(CC.get("THEME")+"Please enter a query: " + CC.get("INPUT"), async (queryText) => {
    gpt.clearSlate();

    const query = await gpt.query(queryText); // get SQLite query from GPT
    let data = await database.query(query)
    const formatted_text = await gpt.query(data); // format data

    console.log(CC.applyTheme("RESPONSE",formatted_text + "\n"));

    

    processQuery();
  });
}
