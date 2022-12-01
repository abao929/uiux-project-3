import React, { useEffect, useState } from 'react'
import './global.sass'
import { DrinkCard } from './components/Drink'
import { Drinks } from './data/drinks'
import Dropdown from './components/Dropdown'
import css from './Main.module.sass'
import { Drink, Alcoholic } from './data/types'
import { SORT_VALS, ALCOHOL_TYPES } from './Constants'

const FILTER_KEY = []
const ALL_ALC_TYPES = new Set(Array.from(ALCOHOL_TYPES.keys()))
const ALC_TAGS: Alcoholic[] = [
  'All',
  'Alcoholic',
  'Non alcoholic',
  'Optional alcohol',
]
export default function Main() {
  const [ingredientMap, setIngredientMap] = useState<Map<string, number>>(
    new Map()
  )
  const [ingredientList, setIngredientList] = useState<string[]>([])
  const [alcs, setAlcs] = useState(new Set(ALL_ALC_TYPES))
  const [sortKey, setSortKey] = useState(SORT_VALS[0])
  const [alcoholic, setAlcoholic] = useState<Alcoholic>('All')
  const [curPage, setCurPage] = useState(1)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showFavorites, setShowFavorites] = useState(false)
  const [drinks, setDrinks] = useState([...Drinks])

  let addDrink = (name: string, ingredients: string[]) => {
    if (favorites.has(name)) return
    let temp = favorites
    temp.add(name)
    setFavorites(new Set(temp))
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
    setFavorites(new Set(temp))
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
  }

  let filterTypes = () => {
    let ingredientSet = new Set()
    alcs.forEach((alc) => {
      ALCOHOL_TYPES.get(alc)?.forEach((a) => ingredientSet.add(a))
    })
    // console.log(ingredientSet)
    let temp = [...Drinks]
    if (showFavorites) temp = temp.filter((drink) => favorites.has(drink.name))
    if (alcoholic !== 'All')
      temp = temp.filter((drink) => drink.alcoholic === alcoholic)
    if (alcoholic === 'Non alcoholic' || alcoholic === 'Optional alcohol')
      return temp
    temp = temp.filter((drink) => {
      for (let i of drink.ingredients) {
        if (ingredientSet.has(i)) return true
      }
      return false
    })
    return temp
    // setDrinks(temp)
  }

  let filterAlcoholic = () => {}

  let sortData = (data: Drink[]) => {
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
    return data.sort((a: Drink, b: Drink) => fn(a, b))
    // setDrinks([...drinks])
    // let temp = drinks
    // temp.sort((a: Drink, b: Drink) => fn(a, b))
    // setDrinks(temp)
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
    console.log('rerender')
    let temp = filterTypes()
    temp = sortData(temp)
    setDrinks(temp)
  }, [alcs, alcoholic, sortKey, showFavorites, favorites])

  return (
    <div className={css.container}>
      {/* {drinks.length} {Array.from(favorites)} */}
      <div className={css.titleText}>
        <h1 className={css.title}>ivrogne</h1>
        <h2 className={css.subtitle}>drinking alone again I see</h2>
      </div>
      <div className={css.contentContainer}>
        <div className={css.menu}>
          <Dropdown
            title='Sort By'
            curItem={sortKey}
            setItem={setSortKey}
            values={SORT_VALS}
          />
          <Dropdown
            title='Alcoholic'
            curItem={alcoholic}
            setItem={setAlcoholic}
            values={ALC_TAGS}
          />
          {(alcoholic === 'All' || alcoholic === 'Alcoholic') && (
            <div className={css.alcoholTypes}>
              Alcohol Type
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
          )}
          <div className={css.favorites}>
            <input
              type='checkbox'
              value='false'
              checked={showFavorites}
              onChange={() => setShowFavorites(!showFavorites)}
            />
            <label>Favorites</label>
          </div>
          <div className={css.ingredients}>
            Necessary Ingredients
            {ingredientList.map((ingredient, _) => (
              <p key={ingredient}>{ingredient}</p>
            ))}
          </div>
        </div>
        <div className={css.drinks}>
          {drinks.length ? (
            drinks.map((ele, _) => (
              <DrinkCard
                key={ele.name}
                drink={ele}
                add={addDrink}
                remove={removeDrink}
                addedInit={favorites.has(ele.name)}
              />
            ))
          ) : (
            <div>Please select some alcohol types to get started</div>
          )}
        </div>
      </div>
      {/* <DrinkPage {...x} /> */}
    </div>
  )
}
