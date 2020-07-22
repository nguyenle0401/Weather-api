import React, { Component } from 'react'
const apikey = process.env.REACT_APP_APIKEY
export default class App extends Component {
    constructor(props){
        super(props)
        this.state ={
            weather:null
        }
    }
    componentDidMount(){
        this.callWeather()
        this.state = {
            weather:null
        }
    }
    // 1.Change city
    // 2. Change current location
    callWeather = async() => {
        let url =`http://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=${apikey}&units=metric`
        let data = await fetch(url)
        let result = await data.json()
        console.log("result",result)
        this.setState({weather:result})
    }
    render() {
        if(this.state.weather === null){
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div>
                <h1>{this.state.weather.name}</h1>
                <h2>{this.state.weather.main.temp}</h2>
                <h3>{this.state.weather.weather[0].description}</h3>
            </div>
        )
    }
}


