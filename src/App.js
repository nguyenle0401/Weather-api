
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap"


const apikey = process.env.REACT_APP_APIKEY
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // weather: null,
            currentWeather: null,
        }
    }
    componentDidMount() {
        this.getLocation()
    }
    //Edit
    showLocation(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        alert("Latitude : " + latitude + " Longitude: " + longitude);
    }

    errorHandler(err) {
        if (err.code == 1) {
            alert("Error: Access is denied!");
        } else if (err.code == 2) {
            alert("Error: Position is unavailable!");
        }
    }

    // getLocation() {

    //     if (navigator.geolocation) {

    //         // timeout at 60000 milliseconds (60 seconds)
    //         var options = { timeout: 60000 };
    //         navigator.geolocation.getCurrentPosition(this.showLocation, this.errorHandler, options);
    //     } else {
    //         alert("Sorry, browser does not support geolocation!");
    //     }
    // }

    async getWeather(latitude, longitude) {
        console.log('getWeather')
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        console.log('data:',data)
        this.setState({
            currentWeather: data
        });
    };
   

    getLocation = () => {
        console.log('getLocation')
        navigator.geolocation.getCurrentPosition((post) => {
            this.getWeather(post.coords.latitude, post.coords.longitude)
        })
    }





    // 1.Change city
    // 2. Change current location
    callWeather = async (name) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apikey}&units=metric`
        let data = await fetch(url)
        let result = await data.json()
        console.log("result", result)
        this.setState({ currentWeather: result })
    }

    render() {
        if (this.state.currentWeather === null ) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div className="container-fluid text-white my-auto">
                <div className="container mx-auto my-4 py-4">
                    <div className="row justify-content-center text-center">
                        <h1 className="col-12 display-4 my-2 py-3 text-success">
                            Awesome Weather App
                        </h1>
                        <h2 className="col-12">{this.state.currentWeather.name}</h2>
                        <h3 className="col-12">{this.state.currentWeather.main.temp}</h3>
                        <h3 className="col-12">{this.state.currentWeather.weather[0].description}</h3>
                       
                    </div>
                    <div>
                            <Button variant="primary" onClick ={()=> this.callWeather()}>Primary</Button>
                            <Button variant="secondary" onClick ={()=> this.callWeather("london")}>London</Button>
                            <Button variant="success" onClick ={()=> this.callWeather()}>Success</Button>
                            <Button variant="warning" onClick ={()=> this.callWeather()}>Warning</Button>
                            <Button variant="danger" onClick ={()=> this.callWeather()}>Danger</Button> 
                            <Button variant="light" onClick ={()=> this.callWeather()}>Light</Button> 
                            <Button variant="dark" onClick ={()=> this.callWeather()}>Link</Button>
                    </div>
                </div>
            </div>


        )
    }
}