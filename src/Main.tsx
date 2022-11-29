import React, { useState } from 'react'
import './global.sass'
import { DrinkCard } from './components/Drink'
import { Drinks } from './data/drinks'
import Dropdown from './components/Dropdown'
import css from './Main.module.sass'
import { Drink } from './data/types'

export default function Main() {
  const [ingredientMap, setIngredientMap] = useState<Map<string, number>>(
    new Map()
  )
  const [ingredientList, setIngredientList] = useState<string[]>([])
  const [filterKey, setFilterKey] = useState('')
  const [sortKey, setSortKey] = useState('Alphabetically - A to Z')
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

  let sortVals = [
    'Alphabetically - A to Z',
    'Alphabetically - Z to A',
    'Ingredients - Low to High',
    'Ingredients - High to Low',
  ]

  let sortData = () => {
    let fn
    switch (sortKey) {
      case 'Alphabetically - A to Z':
        fn = (a: drink, b: drink) => a.strDrink.localeCompare(b.strDrink)
        break
      case 'Alphabetically - Z to A':
        fn = (a: drink, b: drink) => b.strDrink.localeCompare(a.strDrink)
        break
      case 'Ingredients - Low to High':
      // fn = (a: drink, b: drink) => a.drink - b.drink
    }

    data.sort()
  }

  let data = drinks.slice(0, 10)
  return (
    <div>
      <h1 className='title'>ivrogne</h1>
      <h2 className='subtitle'>drinking alone again I see</h2>
      <div className={css.container}>
        <div className={css.menu}>
          <div className={css.sort}>
            <Dropdown
              title='Sort By'
              curItem={sortKey}
              setItem={setSortKey}
              values={sortVals}
            >
              Hey lol
            </Dropdown>
          </div>
          <div className={css.filters}></div>
          <div className={css.favorites}></div>
        </div>
        <div className={css.drinks}>
          {data.map((ele, _) => (
            <DrinkCard
              drink={ele}
              add={addDrink}
              remove={removeDrink}
            />
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
