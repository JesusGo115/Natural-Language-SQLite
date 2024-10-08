import OpenAI from "openai";
import {readFile} from 'node:fs/promises';
import CC from "./ConsoleColors.mjs";
import fs from "fs";

const apiKey = await readFile('apikey.secret')
const setup = {
    apiKey: apiKey
};


export default class GPTSession {

    constructor(context = GPTSession.retrieveContext(), version = GPTSession.retrieveGPTVersion()){
        console.log(CC.applyTheme("THEME","Initializing session with ")+CC.applyTheme("RESPONSE","Open AI"));
        this.openai = new OpenAI(setup);

        this.readiness = this.setUp(context, version);
    }

    async setUp(context, version){
        try{
            this.context = await context;
            if (context == null) throw new Error("Internal error: null context string");
            this.messages =  [{"role": "system", "content": await context}];
            this.version = await version;
            if (version == null) throw new Error("Internal error: null version string");
        }
        catch (e){
            console.log(CC.use(CC.get("ERROR"), "\n"+e))
            process.exit(1);
        }
    }

    async isReady(){
        return this.readiness;
    }

    clearSlate(){
        this.messages = [this.messages[0]];
    }

    async query(question){
        await this.isReady();

        if (question == null) throw new Error("Error: null question");
        
        question = JSON.stringify(question);
        if (question == "[]") {
            console.log(CC.use(CC.get("ERROR"),"No results found in query."));
        }


        this.messages.push({"role": "user", "content": question});

        // perform the query to the GPT API
        const response = await this.openai.chat.completions.create({
            messages: this.messages,
            model:this.version
        }).then((completion) => completion.choices[0].message.content);

        this.messages.push({"role": "assistant", "content": response});

        return response;
    }
    
    static async retrieveContext(file = 'personality.chat'){
        if (!fs.existsSync(file))
            throw new Error("GPT context file does not exist: "+file);
        
        let rtrn = await readFile(file, { encoding: 'utf8' });
        const rgx = /^v(?:ersion)?:? *(.+)/i;
        if (rtrn.match(rgx)){
            console.log(CC.use(CC.get("THEME"),"Personality version: ") + rtrn.match(rgx)[1]);
            rtrn = rtrn.replace(rgx,"").replace(/\n/g,"");
        }
        rtrn = rtrn.replace(/\n/g," ");
        rtrn = rtrn.trim();

        return rtrn + "\n";
    }

    static async retrieveGPTVersion(versionFile = 'version.chat'){
        if (!fs.existsSync(versionFile))
            throw new Error("GPT version file does not exist: "+file);

        const VERSION_OPTIONS = [
            'gpt-4o-mini',
            'gpt-4o',
        ]
        const DEFAULT_VERSION = 'gpt-3.5-turbo';
        let data = await readFile(versionFile, { encoding: 'utf8' });
        data = data.split("\n");
        data = data.map(element => element.trim());
        data.push(VERSION_OPTIONS[0]);
        
        while(!(VERSION_OPTIONS.includes(data[0]))){
            console.log(CC.effect("dim")+"Unrecognized model: " + CC.color("red", data.shift()));
            if (data.length == 0) {
                console.log(CC.effect("dim")+"Could not find recognizable version from source file, using default version: "+CC.color("green", DEFAULT_VERSION));
                return DEFAULT_VERSION;
                
            }
        }; 
        console.log(CC.effect("dim")+"Version: " + CC.color("green", data[0]));
        return data[0];
        
    }
}
