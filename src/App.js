import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from './image/background1.jpg'


const App = () => {
    const styles = {
        wrapper : {
            fontFamily:'sans-serif',
            fontWeight: 'bold',
            minWidth:'100vw',
            minHeight:'100vh',
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage:`url(${backgroundImage})`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            flexDirection:"column"
        },
        input: {
            width:'250px',
            height: '40px',
            padding:'15px',
            border:'none',
            borderRadius:'15px',
            outline: 'none',
            marginBottom:'5%'
        },
        weatherContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius:'20px',
            padding:'45px 10%',
            background:'#fff',
            flexDirection: 'column',
        },
        sup:{
            fontSize:'0.75rem',
            padding:'10px',
            color : '#fff',
            backgroundColor:'#F39C12',
            borderRadius:'30px'
        },
        temp : {
            fontSize:'5rem',
            marginTop: '10px',
            color: '#1e2432',
            textAlign: 'center'
        },
        inf : {
            display:'flex',
            alignItems:'center',
            flexDirection:'column'
        },
        infImg : {
            marginTop: '10px',
            width: '100px',
            height: '100px'
        },
        err : {
            fontSize:'3rem',
            color:'#C0392B ',
            width:'50%',
            marginBottom:'150px',
            textAlign:'center',
        }
        
    }
    const [err,setErr] = useState('');
    const [weatherData,setWeatherData] = useState({}); 
    const [input,setInput] = useState('');
    const WEATHER_API_KEY = '2d2db8e484a7560be641e8d6742cf87b';
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${WEATHER_API_KEY}`
    const fetchWeatherData = async () => {
        try{
            const { data } = await axios.get(WEATHER_API,{params:{units:'metric'}});
        setWeatherData(data);
        setInput('');
        setErr('');
        } catch(err){
            setErr(err.message)
            setWeatherData({});
        }
        
    }
    
    const search = (e) => {
        if(e.key === 'Enter') {
            fetchWeatherData(input);
        }
    }
    
    return (
        <div style={styles.wrapper}>
             {err && (
                <div style={styles.err}>{err}</div>
            )}
            <input
            style={styles.input} 
            type="text"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={search}
            />
            {weatherData.main && (
                <div style={styles.weatherContainer}>
                    <h2 style={{fontSize:'2.5rem'}}>
                        <span>{weatherData.name}</span>
                        <sup style={styles.sup}>{weatherData.sys.country}</sup>
                    </h2>
                    <div style={styles.temp}>
                        {Math.round(weatherData.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div style={{margin:'20px'}}> Feels : {Math.round((weatherData.main.feels_like))}<sup>&deg;C</sup></div>
                    <div style={styles.inf}>
                        <img style={styles.infImg} src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/>
                        <p style={{marginTop:'10px',letterSpacing:'2.5px',textTransform:'capitalize'}}>{weatherData.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App;