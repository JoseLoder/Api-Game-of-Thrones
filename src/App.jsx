import { useState } from "react"
import { useEffect } from "react"
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]); // Array de personajes
  const [character, setCharacter] = useState([]); // Personaje seleccionado
  const [quotes, setQuotes] = useState([]); // Array de frases
  const [quote, setQuote] = useState([]); // Frase seleccionada

  const URL = 'https://api.gameofthronesquotes.xyz/v1/characters';

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data); // Guardamos los personajes en su estado
      })
  }, [])

  useEffect(() => { // Este useEffect Guarda las frases del personaje seleccionado
    if (character == '') return; // Si no hay personaje seleccionado, no hacemos nada
    const characterItem = characters.find((item) => item.name === character); // Buscamos el personaje seleccionado
    setQuotes(characterItem.quotes); // Guardamos las frases del personaje seleccionado
    console.log(characterItem.quotes); // Mostramos las frases del personaje seleccionado
  }, [character, characters]) // Ejecutamos el useEffect cuando cambie el personaje seleccionado o los personajes

  useEffect(() => { // Este useEffect guarda la primera frase del personaje seleccionado
    if (quotes == '') return; // Si no hay frases, no hacemos nada
    setQuote(quotes[0]); // Mostramos la primera frase del personaje seleccionado
  }, [quotes]) // Ejecutamos el useEffect cuando cambien las frases

  const nextQuote = () => { // Esta funcion muestra la siguiente frase del personaje seleccionado 
    if (quotes == '') return; // Si no hay frases, no hacemos nada (por seguridad)
    const thisQuoteIndex = quotes.findIndex(item => item === quote); // Buscamos el indice de la frase actual
    if (thisQuoteIndex === quotes.length - 1) { // Nos aseguramos si va a ser la última frase para mostrar la primera
      setQuote(quotes[0]);
    } else { // Si no es la última frase, mostramos la siguiente
      setQuote(quotes[thisQuoteIndex + 1]);
    }
  }
  return (
    <>
      <h1>Character Game of Throne</h1>
      <select onChange={(event) => setCharacter(event.target.value)}>
        <option value="">Select a character</option>
        {characters.map((character, index) => (
          <option key={index} value={character.name} >{character.name}</option>
        ))}
      </select>
      <p>
        {quote}
      </p>
      <button onClick={nextQuote}>New Quote</button>
    </>
  )
}

export default App
