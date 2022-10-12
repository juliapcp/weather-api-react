import axios from "axios";

export async function getClima(estado, cidade) {
    try {
        const responseLatLon = (await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cidade},${estado},BR&limit=1&appid=66702a80769284fba466ee239850d5ca`
        )).data[0];
        if(responseLatLon){
            const { lat, lon } = responseLatLon;
            const responseClima = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=66702a80769284fba466ee239850d5ca&units=metric&lang=pt_br`
            );
            const listagem = responseClima.data.list;
            let datas = [];
            let retorno = [];
            listagem.forEach(item => {
                if(datas.indexOf(item.dt_txt.split(' ')[0]) === -1 && retorno.length < 3){
                    retorno.push(item);
                    datas.push(item.dt_txt.split(' ')[0]);
                }
            });
            retorno.forEach(async item =>{
                await postWeatherInfo(parseInt(item.main.temp_max), lat, lon, parseInt(item.main.temp), item.wind.speed, item.main.humidity, parseInt(item.main.feels_like), new Date(item.dt_txt), item.weather[0].description, item.weather[0].icon)
            });
            return retorno;
        }
        return null;
    } catch (e) {
        console.error(e);
    }
}

export async function postWeatherInfo(temperaturaMaxima, lat, long, temperatura, vento, umidade, sensacao, data, descricao, icone){
    try {
        const body = { temperaturaMaxima, lat, long, temperatura, vento, umidade, sensacao, data, descricao, icone };
        const response = (await axios.post(
            `http://localhost:5000/weather`, body
        )).data[0];
    } catch (e) {
        console.error(e);
    }
}