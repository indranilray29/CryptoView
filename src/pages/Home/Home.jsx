import React, { useEffect, useState } from 'react'
import './Home.css'
import { useContext } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

  const { allCoin, currency } = useContext(CoinContext);
  const [ displayCoin, setDisplayCoin ] = useState([]);
  const [ input, setInput ] = useState("");

  const inputHandler = ( event ) => {
    setInput(event.target.value);
    if( event.target.value === "" ) {
      setDisplayCoin( allCoin );
    }
  }

 const searchHandler = async (event) => {
  event.preventDefault();
  const coins = await allCoin.filter( (item) => {
    return item.name.toLowerCase().includes(input.toLowerCase())
  })
  setDisplayCoin(coins);
 }

  useEffect( () => {
    setDisplayCoin(allCoin);
  }, [allCoin])

  return (
    <div className='home'>
      <div className="hero">
        <h1>Real-Time Updated <br/> Cyptocurrency List</h1>
        <p>Get the list of all trending cryptocurrencies. Click on any cryptocurrency to view all the details.
        </p>
        <form onSubmit={ searchHandler }>
          <input onChange={ inputHandler } value={ input } list='coinlist' type="text" placeholder='Search Cryptocurrency...' required />

          <datalist id='coinlist'>
            { allCoin.map( (item,index) => (<option key={ index } value={ item.name }/>))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>Rank</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{textAlign: "center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map( (item,index) => (
            <Link to={ `/coin/${ item.id }` } className="table-layout" key={ index }>
              <p style={{paddingLeft: "10px"}} className='rank'> { item.market_cap_rank }</p>
              <div>
                <img src={ item.image } alt="" />
                <p>{ item.name + " - " + item.symbol }</p>
              </div>
              <p className='.price' style={{paddingLeft: "5px"}} >  { currency.symbol +" " + item.current_price.toLocaleString()} </p>

              <p style={{textAlign: "center"}} className={ item.price_change_percentage_24h >= 0 ? "green" : "red" }>

                { Math.floor(item.price_change_percentage_24h * 100 ) / 100 + " " + "%"}

              </p>
              <p className='market-cap'>{ currency.symbol } { item.market_cap.toLocaleString() }</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home