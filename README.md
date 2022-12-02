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

## Layout & Hierarchy Considerations

I created dropdown menus since there are a lot of different sort and filter options. While sort and the alcoholic radio buttons both have 4 options and are mutually exclusive, I opted to make sort a dropdown since I see sort dropdowns a lot online and followed convention. Additionally, having the radio buttons for alcoholic options broke up the flow of the menu and looked better than having many dropdown menus. I chose to make the alcohol type filter and ingredients list both dropdowns since the former contains 13 types and the latter could exceed hundreds.

I decided it was necessary to paginate the results since having all 500+ drinks on one page made for a rough browsing experience. I chose to cap it at 20 after playing around for a bit and feeling like it was similar in height to sites like google that also paginate results. Additionally 20 allows for some amount of scrolling without bringing one too far away from the sort menu. I opted to not make the side menu sticky as it interfered with the dropdown menu scrolling experience.
