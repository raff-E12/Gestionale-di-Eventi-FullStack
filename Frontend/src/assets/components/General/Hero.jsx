import React from 'react'
import HeroImg from "../../../../public/imgs/image-1.png"

export default function Hero() {
  return (<>
  <div className='hero-sc'>
    <div className='text-hero'>
        <h3 className='text-3xl font-lexend font-extrabold text-amber-700'>Il tuo evento, la nostra missione: zero stress, solo festa!</h3>
        <p className='font-bold text-amber-900 text-xl'>Crea, gestisci e vivi ogni momento senza pensieri.</p>
        <button>Clicca per Info</button>
    </div>
    <div className='hero-img' style={{backgroundImage:`url(${HeroImg})`}}></div>
  </div>
  </>)
}
