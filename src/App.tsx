import { useState, FormEvent } from 'react'

import './App.css'
import logoImg from './assets/logo.png'

interface infoProps{
  title: string,
  gasolina: string | number,
  alcool: string | number
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<infoProps>()

  function calcular(event: FormEvent){
    event.preventDefault();

    let calculo = (alcoolInput / gasolinaInput);

    if(calculo <= 0.7){
      setInfo({
        title: "Compensa usar Alcool",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })      
    } else{
      setInfo({
        title: "Compensa usar Gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }

  }

function formatarMoeda(valor: number){
  let valorFormatado = valor.toLocaleString("pt-br", 
  {
    style: "currency",
    currency: "BRL"

  })

  return valorFormatado

}
  

  return (
    <div>
      <main className="container">
        <img
        className='Logo'
        src={logoImg}
        alt='Imagem do Posto de Gasolina'
        />
        <h1 className='title'>Qual a melhor Opçao?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Alcool (Preço por litro):</label>
          <input 
          className='Input'
          type="Number"
          placeholder='4,90'
          min="1"
          step="0.1"
          required
          value={alcoolInput}
          onChange={(e) =>  setAlcoolInput(Number(e.target.value))}
          />

          <label>Gasolina (Preço por litro):</label>
          <input 
          className='Input'
          type="Number"
          placeholder='5,90'
          min="1"
          step="0.1"
          required
          value={gasolinaInput}
          onChange={(e) => setGasolinaInput(Number(e.target.value))}
          />

        <input className="button" type="submit" value="Calcular" />
        </form>

        {info && Object.keys(info).length > 0 && (
           <section className="result">
           <h2 className='result-title'>
            {info.title}
           </h2>
 
           <span>{info.alcool}</span>
           <span>{info.gasolina}</span>
         </section>
        )}


      </main>
    </div>
  )
}

export default App
