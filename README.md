# Natural-Language-SQLite

This is a natural language interface to a SQLite database written in Node.js. 
The package provides an example database with ficticious data representing the classes a school would offer, including registration, grades, instructors and departments. See the diagram below for more information.

# Running the interface

The program can be installed and run with Node.js as follows with npm: (Assuming that you have a valid OpenAI key in the file ```apikey.secret```)
* ```npm install```
* ```npm start```

# Design Choices
Deciding how to generate the prompts for GPT was difficult. I spent a lot of time fine-tuning them. I had tried to provide examples of proper input in some cases to the AI, but I found that including more details tended to confuse the AI more. Simpler seemed to be better. In the end, I opted for a one-off style approach.

# Example Commands
It should be noted that commands produce varying outputs at the whim of the AI. Our AI output has too much noise. I believe there is a way to fine tune it, but I have been unable to successfully do so to eliminate noise to date.

Successful commands have incuded:
1. What is the average grade for Jacob's classes?
1. What is Jacob's GPA?
1. What class is largest?
1. What class has the most students?
1. How many classes do not have students enrolled?

Unsucessful commands have incuded:
1. What is Jacob's GPA?
1. What class is largest?

Success varies apparently randomly. I believe that using GPT 4 instead of 3.5 would provide substantially more reliable results.

# Changing Version
The version is selected from the plain-text list of gpt model versions found in ```version.chat```. The first recognized version will be selected. Versions should be deliminated with new lines.
