# 1001 Cocktails

A website to view a few hundred (not 1001) cocktails.

## Inspiration and Goal

I don't drink alcohol, but simply chose this theme because [this](https://www.thecocktaildb.com/api.php) was the first api that popped up when looking for free apis, and I thought all the data and images would make for a good set of item cards.  
I used [this repository](https://github.com/lauriharpf/thecocktaildb-downloader) to download the information into a json, then cleaned the data up using cleaning.py.

You can filter the drinks by whether or not it is alcoholic as well as using a list of ingredients that a cocktail contains. Additionally, you can sort the filtered data alphabetically or by number of ingredients.

You can also favorite a drink and the site will show all the necessary ingredients to make all your favorite drinks

## Components

Main contains all the filter, sort, and pagination related logic.

data/drinks.ts and data/types.ts were just data files generated from the aforementioned repository and then cleaned by me.  
Constants.tsx just exports all the constants used by Main

I created two components, Drink, and Dropdown. The Drink component displays each drink's card. There are two variations of the Dropdown component, one that allows for only 1 selection, and one that allows for multiple, the former used for sorting, and the latter for filtering. While those are technically the only two React components, the site also uses buttons used for pagination, which could have been abstracted to be a separate component.

## Usability principles
