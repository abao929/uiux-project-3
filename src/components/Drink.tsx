import React, { useState } from 'react'
import { Drink } from '../data/types'
import css from './Drink.module.sass'

type Props = {
  drink: Drink
  add: (name: string, ingredients: string[]) => void
  remove: (name: string, ingredients: string[]) => void
}

let DrinkCard = ({ drink, add, remove }: Props) => {
  const [added, setAdded] = useState(false)
  let addButton = (
    <button
      className='add'
      onClick={() => {
        add(strDrink, ingredients)
        setAdded(true)
      }}
    >
      Add to Favorites
    </button>
  )
  let removeButton = (
    <button
      className='remove'
      onClick={() => {
        remove(strDrink, ingredients)
        setAdded(false)
      }}
    >
      Remove from Favorites
    </button>
  )
  return (
    <div className={css.container}>
      <img
        src={require(`../data/${thumbnailFilename}`)}
        alt={`${strDrink}`}
      ></img>
      {strDrink}
      {added ? removeButton : addButton}
    </div>
  )
}

// let DrinkPage = ({
//   strDrink,
//   strCategory,
//   strAlcoholic,
//   strInstructions,
//   thumbnailFilename,
//   strIngredient1,
//   strIngredient2,
//   strIngredient3,
//   strIngredient4,
//   strIngredient5,
//   strIngredient6,
//   strIngredient7,
//   strIngredient8,
//   strIngredient9,
//   strIngredient10,
//   strIngredient11,
//   strIngredient12,
//   strIngredient13,
//   strIngredient14,
//   strIngredient15,
//   strMeasure1,
//   strMeasure2,
//   strMeasure3,
//   strMeasure4,
//   strMeasure5,
//   strMeasure6,
//   strMeasure7,
//   strMeasure8,
//   strMeasure9,
//   strMeasure10,
//   strMeasure11,
//   strMeasure12,
//   strMeasure13,
//   strMeasure14,
//   strMeasure15,
// }: drink) => {
//   let ingredients = [
//     strIngredient1,
//     strIngredient2,
//     strIngredient3,
//     strIngredient4,
//     strIngredient5,
//     strIngredient6,
//     strIngredient7,
//     strIngredient8,
//     strIngredient9,
//     strIngredient10,
//     strIngredient11,
//     strIngredient12,
//     strIngredient13,
//     strIngredient14,
//     strIngredient15,
//   ]
//   let measures = [
//     strMeasure1,
//     strMeasure2,
//     strMeasure3,
//     strMeasure4,
//     strMeasure5,
//     strMeasure6,
//     strMeasure7,
//     strMeasure8,
//     strMeasure9,
//     strMeasure10,
//     strMeasure11,
//     strMeasure12,
//     strMeasure13,
//     strMeasure14,
//     strMeasure15,
//   ]
//   console.log(ingredients, measures)
//   let numIngredients = 15
//   for (let i = 0; i < ingredients.length; i++) {
//     if (!ingredients[i]) {
//       numIngredients = i
//       break
//     }
//   }
//   ingredients = ingredients.slice(0, numIngredients)
//   measures = measures.slice(0, numIngredients)
//   let zippedIngredients = []
//   for (let i = 0; i < numIngredients; i++) {
//     let m = measures[i] ? `${measures[i]} of ` : ''
//     let s = `${m}${ingredients[i]}`
//     console.log(s)
//     zippedIngredients.push(<li>{s}</li>)
//   }
//   console.log(ingredients, measures)
//   return (
//     <div>
//       {strDrink}
//       <img
//         src={require(`../data/${thumbnailFilename}`)}
//         alt={`${strDrink}`}
//       ></img>
//       <h2>Ingredients:</h2>
//       {zippedIngredients.map((ele, _) => ele)}
//       <div className='instr'>{strInstructions}</div>
//     </div>
//   )
// }

export { DrinkCard }

// {"'Grapes'", "'Cherries'", "'Rosso Vermouth'", "'Salt'", "'Crown Royal'", "'Jello'", "'Blended whiskey'", "'Peach nectar'", "'Agave syrup'", "'Vanilla vodka'", "'Lime vodka'", "'Aquavit'", "'Fennel seeds'", "'Iced tea'", "'Añejo rum'", "'Malibu rum'", "'Sambuca'", "'Pineapple juice'", "'Tea'", "'Brown sugar'", "'Agave Syrup'", "'Pisang Ambon'", "'Irish whiskey'", "'Cranberry Juice'", "'Maraschino liqueur'", "'Vermouth'", "'Strawberry liqueur'", "'Cherry Grenadine'", "'Allspice'", "'Carbonated water'", "'Orange spiral'", "'Jägermeister'", "'Honey'", "'Anis'", "'Peach schnapps'", "'Rum'", "'Mint syrup'", "'caramel sauce'", "'Pina colada mix'", "'Maraschino Liqueur'", "'Egg white'", "'Ginger'", "'Passion fruit syrup'", "'chocolate sauce'", "'Vanilla'", "'Yellow Chartreuse'", "'Sour mix'", "'Southern Comfort'", "'Cocoa powder'", "'Chocolate milk'", "'Caramel coloring'", "'Mezcal'", "'Blended Scotch'", "'Brandy'", "'Fruit'", "'Coffee'", "'Carbonated soft drink'", "'Sweet Vermouth'", "'Cognac'", "'Chocolate syrup'", "'Red wine'", "'Maple syrup'", "'Kummel'", "'Irish cream'", "'Sirup of roses'", "'Bourbon'", "'gin'", "'Condensed milk'", "'Kirschwasser'", "'Banana'", "'Apple cider'", "'Wild Turkey'", "'Wine'", "'Goldschlager'", "'Sweet and sour'", "'Kiwi'", "'Whipping cream'", "'Guinness stout'", "'Grapefruit juice'", "'Tequila'", "'Sugar'", "'Whipped Cream'", "'Amaretto'", "'Grapefruit Juice'", "'Sprite'", "'Apricot'", "'Bitters'", "'Sherry'", "'Pepper'", "'Gin'", "'Drambuie'", "'Champagne'", "'Coriander'", "'Gold tequila'", "'Coffee liqueur'", "'Maraschino cherry'", "'Carrot'", "'Butter'", "'Mountain Dew'", "'Cranberries'", "'White Creme de Menthe'", "'Triple Sec'", "'Glycerine'", "'Godiva liqueur'", "'Peach Bitters'", "'Jack Daniels'", "'Cumin seed'", "'Irish Whiskey'", "'Apfelkorn'", "'Melon liqueur'", "'Yoghurt'", "'Lime juice'", "'Ouzo'", "'Peppermint schnapps'", "'Club soda'", "'Cointreau'", "'Cayenne pepper'", "'Chambord raspberry liqueur'", "'Rye whiskey'", "'Banana liqueur'", "'Root beer'", "'Grape soda'", "'Half-and-half'", "'Butterscotch schnapps'", "'Milk'", "'Chocolate ice-cream'", "'Islay single malt Scotch'", "'pineapple juice'", "'Angostura Bitters'", "'Orange peel'", "'Tia maria'", "'Apple schnapps'", "'Olive Brine'", "'Applejack'", "'Campari'", "'Kahlua'", "'Angelica root'", "'White rum'", "'Orange juice'", "'Sugar syrup'", "'Lillet'", "'Orange Peel'", "'Cherry Heering'", "'Cherry'", "'Soda water'", "'Vanilla extract'", "'Sweet and Sour'", "'Egg'", "'St. Germain'", "'Grape Soda'", "'Fresh Lime Juice'", "'Sarsaparilla'", "'Fruit punch'", "'Papaya'", "'Maraschino Cherry'", "'lemon juice'", "'Blackberry brandy'", "'Cider'", "'Strawberry schnapps'", "'Cantaloupe'", "'Cornstarch'", "'Yukon Jack'", "'Apricot brandy'", "'Oreo cookie'", "'Daiquiri mix'", "'Olive'", "'Mango'", "'Peppermint extract'", "'Apple'", "'Cherry liqueur'", "'Egg Yolk'", "'Cardamom'", "'demerara Sugar'", "'Hot Damn'", "'Surge'", "'Ice'", "'Heavy cream'", "'Lemon Juice'", "'Raspberry vodka'", "'Coconut syrup'", "'Powdered sugar'", "'Tonic Water'", "'Kiwi liqueur'", "'Pink lemonade'", "'Green Creme de Menthe'", "'Tropicana'", "'Chocolate Sauce'", "'Coconut rum'", "'Coffee brandy'", "'Orange Curacao'", "'Lime juice cordial'", "'Midori melon liqueur'", "'Passion fruit juice'", "'blackstrap rum'", "'Lavender'", "'Corona'", "'Falernum'", "'Licorice root'", "'Chocolate liqueur'", "'Zima'", "'Apricot Brandy'", "'Benedictine'", "'Cachaca'", "'Ginger Beer'", "'Tomato Juice'", "'Rumple Minze'", "'Spiced rum'", "'Lemon juice'", "'Cinnamon'", "'Passoa'", "'Vanilla Ice-Cream'", "'Grenadine'", "'Candy'", "'Celery salt'", "'Grand Marnier'", "'Coca-Cola'", "'Ginger beer'", "'Blackcurrant squash'", "'Fresca'", "'Dry Vermouth'", "'Curacao'", "'Peach Vodka'", 'null', "'Triple sec'", "'Ginger Syrup'", "'Black Sambuca'", "'Lime Juice'", "'Angostura bitters'", "'Soda Water'", "'Light rum'", "'Strawberries'", "'Chocolate'", "'Dark Rum'", "'Wormwood'", "'Whipped cream'", "'Bitter lemon'", "'Coconut milk'", "'Lager'", "'Almond'", "'Absolut Kurant'", "'Apple brandy'", "'Marshmallows'", "'Rosemary'", "'White Rum'", "'Guava juice'", "'Dark rum'", "'Ginger ale'", "'Fresh Lemon Juice'", "'Pepsi Cola'", "'Nutmeg'", "'Peychaud bitters'", "'Hot chocolate'", "'Almond flavoring'", "'Lime peel'", "'Orange Bitters'", "'lemon'", "'Elderflower cordial'", "'Green Chartreuse'", "'Pineapple Syrup'", "'Vodka'", "'Scotch'", "'Corn syrup'", "'Baileys irish cream'", "'Pineapple Juice'", "'Dubonnet Rouge'", "'Kool-Aid'", "'Food coloring'", "'Orange'", "'Jagermeister'", "'7-Up'", "'Anisette'", "'Orange bitters'", "'Blue Curacao'", "'Blackcurrant cordial'", "'Ricard'", "'Erin Cream'", "'Raspberry syrup'", "'Dr. Pepper'", "'Anise'", "'Whiskey'", "'Worcestershire sauce'", "'Raspberry Liqueur'", "'Bacardi Limon'", "'Grain alcohol'", "'Lillet Blanc'", "'Water'", "'Advocaat'", "'Firewater'", "'Peachtree schnapps'", "'Everclear'", "'Prosecco'", "'Cranberry vodka'", "'orange juice'", "'Lemon peel'", "'Light cream'", "'Creme de Banane'", "'Jim Beam'", "'Pineapple'", "'Cloves'", "'Blueberry schnapps'", "'Sugar Syrup'", "'Cream of coconut'", "'Apple juice'", "'Egg yolk'", "'Mint'", "'Tabasco sauce'", "'Orgeat syrup'", "'Salted Chocolate'", "'Schweppes Russchian'", "'Mini-snickers bars'", "'Coconut liqueur'", "'Gold rum'", "'Lemon-lime soda'", "'Orange Juice'", "'Absolut Peppar'", "'Black pepper'", "'Hot Chocolate'", "'Lemon'", "'Asafoetida'", "'Whisky'", "'Absinthe'", "'Limeade'", "'Creme de Cassis'", "'maraschino
// liqueur'", "'Tomato juice'", "'Tonic water'", "'Peach brandy'", "'Sherbet'", "'Cherry brandy'", "'Tennessee whiskey'", "'Galliano'", "'Sloe gin'", "'Ale'", "'Creme de Mure'", "'Frangelico'", "'Creme de Cacao'", "'Absolut Citron'", "'151 proof rum'", "'Vanilla ice-cream'", "'Blackberries'", "'Pernod'", "'Lemonade'", "'Dark Creme de Cacao'", "'Fruit juice'", "'Grape juice'", "'Egg White'", "'Absolut Vodka'",
// "'Beer'", "'Cranberry juice'", "'Honey syrup'", "'Marjoram leaves'", "'Pisco'", "'Lemon vodka'", "'Maui'", "'Berries'", "'Cream'", "'Lime'", "'Johnnie Walker'", "'Port'", "'Espresso'", "'Aperol'"}
