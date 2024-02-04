# Natural Language SQLite Interface with OpenAI's GPT Models

This is a natural language interface to a SQLite database written in Node.js. 
The package provides an example database with ficticious data representing the classes a school would offer, including registration, grades, instructors and departments. See the diagram below for more information.
Any resemblance to real people/circumstances is purely coincidental and unintended.

# Running the Interface

The program can be installed and run with Node.js as follows with npm: (Assuming that you have a valid OpenAI key in the file ```apikey.secret```)
* ```npm install```
* ```npm start```

![image](https://github.com/vviseguy/Natural-Language-SQLite/assets/16418680/416bb54c-d52b-4179-b274-3195991dca91)

From here you will be asked to provide type a question for the AI. Select ENTER when you would like to send the prompt to the AI. You will see in dark blue the query the AI is running, as well as the result in bright blue.

> ![image](https://github.com/vviseguy/Natural-Language-SQLite/assets/16418680/eae54b18-6c4a-475e-bfa2-92d43b44ab69)


# Design Choices
Deciding how to generate the prompts for GPT was difficult. I spent a lot of time fine-tuning them. I had tried to provide examples of proper input in some cases to the AI, but I found that including more details tended to confuse the AI more. Simpler seemed to be better. In the end, I opted for a one-off style approach.

# Example Commands
It should be noted that commands produce varying outputs at the whim of the AI. Success apparently varies randomly, yet **success seems *much* more probable when using a variant of GPT 4**. 

## Successful Commands Have Incuded:
1. What is the average grade for Jacob's classes?
1. What is Jacob's GPA?
1. What class is largest?
1. What class has the most students?
1. How many classes do not have students enrolled?

See below for a few examples of successful prompts:

> ![image](https://github.com/vviseguy/Natural-Language-SQLite/assets/16418680/69ee6917-14c7-49c5-93aa-4b3292e91b74)

> ![image](https://github.com/vviseguy/Natural-Language-SQLite/assets/16418680/7981532c-ebf8-4d15-a507-d0fcf68e321b)

> ![image](https://github.com/vviseguy/Natural-Language-SQLite/assets/16418680/8ed965ff-562e-4f5a-abd5-c3f6ca5ebaa6)


## Unsucessful Commands Have Incuded:
1. What is Jacob's GPA?
1. What class is largest?

Below are a few examples of queries which resulted in unusual behavior.

> ![image](https://github.com/vviseguy/Natural-Language-SQLite/assets/16418680/449ae9c9-577c-41ad-bbe6-bb654700f15c)

> ![image](https://github.com/vviseguy/Natural-Language-SQLite/assets/16418680/26280866-c8ea-43e3-a010-194532d80dd2)

> ![image](https://github.com/vviseguy/Natural-Language-SQLite/assets/16418680/74c10d66-892e-4521-9662-7c61b1243c0c)

The last example is somewhat counterintuitive. While there exist classes which have more than 2 students, no teacher is assigned to them. Additionally, due to a data entry error, CS312 claimed a teacher, but had no instructor to match the id entered either. So while counterintuitive, this is the correct answer. It is worth noting that the query does not accomodate for ties.


# Changing the GPT Version
The version is selected from the plain-text list of gpt model versions found in ```version.chat```. The first recognized version will be selected. Versions should be deliminated with new lines.

Invalid versions will be rejected until a recognized GPT version is located.

> ![image](https://github.com/vviseguy/Natural-Language-SQLite/assets/16418680/3df335af-b66a-4ec2-968e-fbdcae10d46e)




