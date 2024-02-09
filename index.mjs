import GPTSession from "./GPTSession.mjs";
import { createInterface } from "readline";
import DBConnection from "./DatabaseConnection.mjs";
import CC from "./ConsoleColors.mjs";
import { error } from "console";

CC.setTheme("THEME", CC.RESET);
CC.setTheme("RESPONSE", CC.effect("bright")+CC.color("blue"));
CC.setTheme("INPUT", CC.effect("dim"));
CC.setTheme("ERROR", CC.effect("dim")+CC.color("red"));


const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (process.argv.length < 5){
  throw new error("Need more params")
}

const getContext = async () => 
  (await GPTSession.retrieveContext("./personality.chat")) +
  (await GPTSession.retrieveContext(process.argv[3]));

const gpt = new GPTSession(getContext());
await gpt.isReady();

console.log(CC.RESET+"\n");
const database = new DBConnection(process.argv[2], process.argv[3], process.argv[4]);
await database.isReady();

console.log(CC.RESET+"\n");
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

// process.on('SIGTERM', () => {
//   database.remove();
//   process.exit(0);
// });
// process.on('SIGINT', () => {
//   database.remove();
//   process.exit(0);
// });
