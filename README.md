
## Johdanto

Demo-projektin frontend Code bootcampille.
Projekti on react-sovellus, jossa on käytetty mm. reduxia ja semantic-ui:tä.

## Esittely

Sovelluksen perustavanlaatuisena komponenttina toimii Exercises, missä voidaan lisätä ja muokata entiteettejä (harjoituksia) ExerciseForm-komponentissa. Lisäksi samassa näkymässä on nähtävillä ExerciseTable, missä käyttäjän lisäämät harjoitukset näkyvät taulukkomuodossa sekä SummaryTable, joka summaa esimerkiksi viikottain kertyneen matkan.

Lisäksi sovellukseen on toteutettu Rekisteröinti ja Kirjautumis toiminnot.

## TODOS

- Ilmoitukset ja virheviestit harjoitusten lisäämisiin, muokkaamisiin ja poistamisiin
- Virheiden käsittely edellä mainittuihin
- Yhteenvetoja lisää, mm. kuukausittaiset ja kausittaiset matkat
- Ajan yhteistuloksen laskeminen
- matka-aika yms. graafit

- Mobiili-yhteensopivuutta (Menu stackable, taulukot mobiilinäkyviksi)

## Backend

Backendin toteutus löytyy  [githubista](https://github.com/tkettu/exercise-demo-back)

## English
## Introduction
This is demo react frontend app for Code bootcamp using semantic-ui and redux.

## Requirements

Npm and Git

## Setup

Fork and clone project to local machine, then install required packages.

```sh
git clone https://github.com/<USER-NAME>/exercise-demo-react.
cd base-react-redux
npm install
```
and verify that working
````sh
npm start
````




