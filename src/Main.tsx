import React, { useEffect, useState } from 'react'
import './global.sass'
import { DrinkCard } from './components/Drink'
import { Drinks } from './data/drinks'
import Dropdown from './components/Dropdown'
import css from './Main.module.sass'
import { Drink } from './data/types'
import { SORT_VALS, ALCOHOL_TYPES } from './Constants'

const FILTER_KEY = []
const ALL_ALC_TYPES = new Set(Array.from(ALCOHOL_TYPES.keys()))

export default function Main() {
  const [ingredientMap, setIngredientMap] = useState<Map<string, number>>(
    new Map()
  )
  const [ingredientList, setIngredientList] = useState<string[]>([])
  const [alcs, setAlcs] = useState(new Set(ALL_ALC_TYPES))
  const [sortKey, setSortKey] = useState(SORT_VALS[0])
  const [curPage, setCurPage] = useState(1)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [drinks, setDrinks] = useState(Drinks)

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

  let toggleCheckbox = (alc: string) => {
    // console.log('what')
    let temp = alcs
    if (alcs.has(alc)) {
      temp.delete(alc)
    } else {
      temp.add(alc)
    }
    setAlcs(new Set(temp))
    console.log('what', temp)
  }

  let filterData = () => {
    let ingredientSet = new Set()
    alcs.forEach((alc) => {
      ALCOHOL_TYPES.get(alc)?.forEach((a) => ingredientSet.add(a))
    })
    console.log(ingredientSet)
    let temp = Drinks.filter((drink) => {
      for (let i of drink.ingredients) {
        if (ingredientSet.has(i)) return true
      }
      return false
    })
    setDrinks(temp)
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

    drinks.sort((a: Drink, b: Drink) => fn(a, b))
  }
  let checkboxes: JSX.Element[] = []
  ALL_ALC_TYPES.forEach((type) => {
    checkboxes.push(
      <div>
        <input
          type='checkbox'
          value={type}
          checked={alcs.has(type)}
          onChange={() => toggleCheckbox(type)}
        />
        <label>{type}</label>
      </div>
    )
  })
  useEffect(() => {
    filterData()
    sortData()
  }, [alcs, sortKey])

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
              values={SORT_VALS}
            />
            <div className='alcFilter'>
              <div>
                <input
                  type='checkbox'
                  value='all'
                  checked={alcs.size === ALL_ALC_TYPES.size}
                  onChange={() => {
                    if (alcs.size === ALL_ALC_TYPES.size) setAlcs(new Set())
                    else setAlcs(new Set(ALL_ALC_TYPES))
                  }}
                />
                <label>Select/Deselect All</label>
              </div>
              {checkboxes.map((a) => a)}
            </div>
          </div>
          <div className={css.filters}></div>
          <div className={css.favorites}></div>
        </div>
        <div className={css.drinks}>
          {drinks.length ? (
            drinks.map((ele, _) => (
              <DrinkCard drink={ele} add={addDrink} remove={removeDrink} />
            ))
          ) : (
            <div>Please select some alcohol types to get started</div>
          )}
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
