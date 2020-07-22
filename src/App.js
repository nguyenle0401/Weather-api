
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap"


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



    async getWeather(latitude, longitude) {
        console.log('getWeather')
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        console.log('data:', data)
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
        if (this.state.currentWeather === null) {
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
                        
                        
                        <Card style={{ width: '35rem'}} className="card-style1">
                        <h2 className="col-12 color-1">{this.state.currentWeather.name}</h2>
                        <h3 className="col-12 color-1">{this.state.currentWeather.main.temp}</h3>
                        <h3 className="col-12 color-1">{this.state.currentWeather.weather[0].description}</h3>
                        </Card>
                       
                       

                    </div>
                    <div>
                        <Button variant="success mr-1" onClick={() => this.callWeather("saigon")}>Sai Gon </Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("paris")}>Paris</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("New York")}>New York</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("Miami")}>Miami</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("San Francisco")}>San Francisco</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("Moscow")}>Moscow</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("Tokyo")}>Tokyo</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("Vancouver")}>Vancouver</Button>
                    </div>
                </div>
            </div>


        )
    }
}