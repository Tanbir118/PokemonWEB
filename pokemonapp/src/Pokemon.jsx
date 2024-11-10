import React, { useEffect, useState } from 'react'
import './index.css'
import PokemonCard from "./PokemonCard.jsx"


export const Pokemon = () => {
   const API="https://pokeapi.co/api/v2/pokemon?limit=100"


  const[pokemon,setPokemon]=useState([]);
  const[loading,setLoading]=useState(true);
  const [search, setSearch] = useState("");

  
  const fetchPokemon= async()=> {
    try {
        const res=  await fetch(API)
        const data= await res.json()
        console.log(data)


        const detaileddata= data.results.map(async(curElm)=>{
        const res= await fetch(curElm.url);
        const data= await res.json();
        return  data;})
        const detailedresponse = await Promise.all(detaileddata);
        
        setPokemon(detailedresponse);
        setLoading(false)
        
    } catch (error) {
        console.log(error)
        setLoading(false)
    }

  }

  
   
   
   useEffect(()=>{
        fetchPokemon();
    },[])
    //search functionality

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );
 
    if(loading){
        <div>
            <h1>
                Loading.....
            </h1>
        </div>
    }
 
 
 
    return (
    <>
    <section className='container'></section>
    <header>
        <h1>Lets catch pokemon</h1>
    </header>
    <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
    <div>
        <ul className='cards'>
            {
                searchData.map((item)=>{
                       return <PokemonCard key={item.id} pokemonData={item}/>

                })
            }

        </ul>
    </div>
    </>
  )
}

