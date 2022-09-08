import axios from "axios";

export async function getClima(estado, cidade) {
    try {
        const responseLatLon = (await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cidade},${estado},BR&limit=1&appid=66702a80769284fba466ee239850d5ca`
        )).data[0];
        if(responseLatLon){
            const { lat, lon } = responseLatLon;
            const responseClima = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=20&appid=66702a80769284fba466ee239850d5ca&units=metric&lang=pt_br`
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
            return retorno;
        }
        return null;
    } catch (e) {
        console.error(e);
    }
}
