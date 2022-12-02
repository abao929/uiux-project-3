import React, { useEffect, useState } from 'react'
import './global.sass'
import { DrinkCard } from './components/Drink'
import { Drinks } from './data/drinks'
import { Dropdown, MultipleDropdown } from './components/Dropdown'
import css from './Main.module.sass'
import { Drink, Alcoholic } from './data/types'
import { SORT_VALS, ALCOHOL_TYPES, ALC_TAGS, MAX_ITEMS } from './Constants'

const ALL_ALC_TYPES = new Set(Array.from(ALCOHOL_TYPES.keys()))
export default function Main() {
  const [ingredientMap, setIngredientMap] = useState<Map<string, number>>(
    new Map()
  )
  const [ingredientList, setIngredientList] = useState<string[]>([])
  const [alcs, setAlcs] = useState(new Set(ALL_ALC_TYPES))
  const [sortKey, setSortKey] = useState(SORT_VALS[0])
  const [alcoholic, setAlcoholic] = useState<Alcoholic>('All')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showFavorites, setShowFavorites] = useState(false)
  const [drinks, setDrinks] = useState([...Drinks])
  const [curPage, setCurPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)

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
    if (alc === 'Select/Deselect All') {
      if (alcs.size === ALL_ALC_TYPES.size) setAlcs(new Set())
      else setAlcs(new Set(ALL_ALC_TYPES))
      return
    }
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
  }

  let sortData = (data: Drink[]) => {
    let fn: (a: Drink, b: Drink) => number
    switch (sortKey) {
      case 'Alphabetically - A to Z':
        fn = (a: Drink, b: Drink) => a.name.localeCompare(b.name)
        break
      case 'Alphabetically - Z to A':
        fn = (a: Drink, b: Drink) => b.name.localeCompare(a.name)
        break
      case 'Ingredients - Asc':
        fn = (a: Drink, b: Drink) => a.numIngredients - b.numIngredients
        break
      case 'Ingredients - Dsc':
        fn = (a: Drink, b: Drink) => b.numIngredients - a.numIngredients
        break
    }
    return data.sort((a: Drink, b: Drink) => fn(a, b))
  }

  useEffect(() => {
    console.log('rerender')
    let temp = filterTypes()
    temp = sortData(temp)
    setDrinks(temp)
    setPageCount(Math.ceil(temp.length / MAX_ITEMS))
  }, [alcs, alcoholic, sortKey, showFavorites, favorites])

  return (
    <div className={css.container}>
      {/* {drinks.length} {Array.from(favorites)} */}
      <div className={css.titleText}>
        <h1 className={css.title}>ivrogne</h1>
        <h2 className={css.subtitle}>drinking alone again I see...</h2>
      </div>
      <div className={css.contentContainer}>
        <div className={css.menu}>
          <Dropdown
            title='Sort'
            curItem={sortKey}
            setItem={setSortKey}
            values={SORT_VALS}
          />

          <div className={css.alcoholic}>
            <p className={css.optionTitle}>Alcoholic</p>
            {ALC_TAGS.map((alc) => {
              return (
                <div
                  className={css.inputGroup}
                  onClick={() => setAlcoholic(alc)}
                >
                  <span>
                    <input
                      type='radio'
                      value={alc}
                      name='alcType'
                      onChange={() => setAlcoholic(alc)}
                      checked={alcoholic === alc}
                    />
                  </span>
                  <label onClick={() => setAlcoholic(alc)}>{alc}</label>
                </div>
              )
            })}
          </div>

          <MultipleDropdown
            title='Alcohol Type:'
            items={alcs}
            values={['Select/Deselect All'].concat(Array.from(ALL_ALC_TYPES))}
            disabled={alcoholic !== 'All' && alcoholic !== 'Alcoholic'}
            selectItem={(item) => toggleCheckbox(item)}
          />

          <div className={css.favoriteGroup}>
            <div className={css.optionTitle}>Other</div>
            <div className={css.inputGroup}>
              <span>
                <input
                  type='checkbox'
                  value='false'
                  checked={showFavorites}
                  onChange={() => setShowFavorites(!showFavorites)}
                />
              </span>
              <label>Favorites</label>
            </div>
          </div>

          <MultipleDropdown
            title='Necessary Ingredients'
            values={ingredientList}
            disabled={false}
            selectItem={() => {}}
          />
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
