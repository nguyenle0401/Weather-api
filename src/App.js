
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
// import Loading from "./components/Loading";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";



const apikey = process.env.REACT_APP_APIKEY
const override = css`
  display: block;
  margin: 0 auto;
  justify-self: center;
`;
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
        let res = await data.ok;
        if(!res) throw "Data could not be fetched";
        console.log("result", result)
        this.setState({ currentWeather: result })
    }

    callWrongWeather = async (name) => {
        let url = `https://api.openweatherma.org/data/2.5/weather?q=${name}&appid=${apikey}&units=metric`
        let data = await fetch(url)
        let result = await data.json()
        let res = await data.ok;
        if(!res) throw "Data could not be fetched";
        console.log("result", result)
        this.setState({ currentWeather: result })
    }

    render() {
        if (this.state.currentWeather === null) {
            return (
                <div className="sweet-loading style-loading">
            <CircleLoader
              css={override}
              size={150}
              color={"green"}
              loading={this.state.loading}
            />
          </div>
            )
        }
        return (
            <div className="container-fluid text-white my-auto">
                <div className="container mx-auto my-4 py-4">
                    <div className="row justify-content-center text-center">
                    <div>
                        <Button variant="success mr-1" onClick={async () => 
                        {
                            try{ 
                                 await this.callWeather("saigon")}
                            catch (e){
                                alert(e.message);
                            }
                        }
                            }>Sai Gon </Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("paris")}>Paris</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("New York")}>New York</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("Miami")}>Miami</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("San Francisco")}>San Francisco</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("Moscow")}>Moscow</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("Tokyo")}>Tokyo</Button>
                        <Button variant="success mr-1" onClick={() => this.callWeather("Vancouver")}>Vancouver</Button>
                        
                    </div>
                    <div>
                        {/* <input type="text"></input> */}
                        <Button onClick={async () => {
                            try{ 
                                await this.callWrongWeather("saigon")}
                            catch (_e){
                                alert("Data could not be fetched from  https://api.openweatherma.org");
                                this.state.loading = true;
                            }
                        }}>Check Wrong Api</Button></div>
                    <h1 className="col-12 display-4 my-2 py-3 style-h1">
                            Awesome Weather App
                        </h1>
                        
                        <div>
                        <Card style={{ width: '35rem',height:"35rem"}} className="card-style1 row justify-content-center text-center">
                            <div>
                            <h2 className="col-12 color-1 pb-5">{this.state.currentWeather.name}</h2>
                            <h3 className="col-12 color-2 pb-5">{this.state.currentWeather.main.temp}&#8451;</h3>
                            <h3 className="col-12 color-3 ">{this.state.currentWeather.weather[0].description}</h3>
                            </div>
                        
                        </Card>
                        </div>
                        
                       
                       

                    </div>
                    
                </div>
            </div>


        )
    }
}