import React, { useState } from 'react'
import './global.sass'
import { DrinkCard } from './components/Drink'
import { Drinks } from './data/drinks'
import Dropdown from './components/Dropdown'
import css from './Main.module.sass'
import { Drink } from './data/types'

const SORT_VALS = [
  'Alphabetically - A to Z',
  'Alphabetically - Z to A',
  'Ingredients - Low to High',
  'Ingredients - High to Low',
]

const FILTER_KEY = []

export default function Main() {
  const [ingredientMap, setIngredientMap] = useState<Map<string, number>>(
    new Map()
  )
  const [ingredientList, setIngredientList] = useState<string[]>([])
  const [filterKey, setFilterKey] = useState('')
  const [sortKey, setSortKey] = useState(SORT_VALS[0])
  const [curPage, setCurPage] = useState(1)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  let addDrink = (name: string, ingredients: string[]) => {
    if (favorites.has(name)) return
    let temp = favorites
    temp.add(name)
    setFavorites(temp)
    let map = ingredientMap
    for (let ingredient of ingredients) {
      map.set(ingredient, (map.get(ingredient) ?? 0) + 1)
    }
    setIngredientMap(map)
    setIngredientList(Array.from(ingredientMap.keys()))
  }

  let removeDrink = (name: string, ingredients: string[]) => {
    if (!favorites.has(name)) return
    let temp = favorites
    temp.delete(name)
    setFavorites(temp)
    let map = ingredientMap
    for (let ingredient of ingredients) {
      if (!map.has(ingredient)) continue
      map.set(ingredient, (map.get(ingredient) ?? 1) - 1)
      if ((map.get(ingredient) ?? 1) === 0) map.delete(ingredient)
    }
    setIngredientMap(map)
    setIngredientList(Array.from(ingredientMap.keys()))
  }

  let sortData = () => {
    let fn: (a: Drink, b: Drink) => number
    switch (sortKey) {
      case 'Alphabetically - A to Z':
        fn = (a: Drink, b: Drink) => a.name.localeCompare(b.name)
        break
      case 'Alphabetically - Z to A':
        fn = (a: Drink, b: Drink) => b.name.localeCompare(a.name)
        break
      case 'Ingredients - Low to High':
        fn = (a: Drink, b: Drink) => a.numIngredients - b.numIngredients
        break
      case 'Ingredients - High to Low':
        fn = (a: Drink, b: Drink) => b.numIngredients - a.numIngredients
        break
    }

    data.sort((a: Drink, b: Drink) => fn(a, b))
  }

  let data = Drinks.slice(0, 10)
  sortData()
  return (
    <div className={css.container}>
      <div className={css.titleText}>
        <h1 className='title'>ivrogne</h1>
        <h2 className='subtitle'>drinking alone again I see</h2>
      </div>
      <div className={css.contentContainer}>
        <div className={css.menu}>
          <div className={css.sort}>
            <Dropdown
              title='Sort By'
              curItem={sortKey}
              setItem={setSortKey}
              values={SORT_VALS}
            >
              Hey lol
            </Dropdown>
          </div>
          <div className={css.filters}></div>
          <div className={css.favorites}></div>
        </div>
        <div className={css.drinks}>
          {data.map((ele, _) => (
            <DrinkCard drink={ele} add={addDrink} remove={removeDrink} />
          ))}
        </div>
        <div className={css.ingredients}>
          Necessary Ingredients
          {ingredientList.map((ingredient, _) => (
            <p key={ingredient}>{ingredient}</p>
          ))}
        </div>
      </div>
      {/* <DrinkPage {...x} /> */}
    </div>
  )
}
