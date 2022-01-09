# ilias_survey2latex (WIP)
Fast and bad made converter that turns exported ilias_surveys into a beautiful latex code.

## Preparations
You need [Node.js](https://nodejs.org/en/), [Latex](https://www.latex-project.org/get/) and the [latex-documentclass exam](https://ctan.org/pkg/exam?lang=en) installed

## How to use
1. Copy survey (per participant) from ILIAS as csv file (Ergebnisse -> Pro Teilnehmer) with title only into `inputs` folder and rename it into `answers.csv`
2. Copy questions from ILIAS as csv file (Ergebnisse -> Überblick) with title only into `inputs` folder and rename it into `questions.csv`
3. Run `npm install` via command line in this folder
4. Run `npm run` via command line in this folder
5. The program generates a latex files and pdf files in folder `output`

## Extra
You can write `npm run uxxxx` to just generate files for this user (multiple args allowed)
