import "./index.css";
import { useState, useEffect } from "react";
import { SelectEstado } from "./components/SelectEstado";
import { SelectCidade } from "./components/SelectCidade";
import { getClima } from "./api/weather-api";
import { CardClima } from "./components/CardClima";

export default function App() {
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCidade, setSelectedCidade] = useState(null);
  const [clima, setClima] = useState([])
  const atualizaClima = async () => {
    if(selectedCidade){
      const response = await getClima(selectedUf, selectedCidade.split(' (')[0]);
      if(response){
        setClima(response);
      }
    }
  }
  
  useEffect(() => {
    atualizaClima();
  }, [selectedCidade]) 

  return (
    <div className="App">
      <div className="container">
        <div className="form">
          <SelectEstado onChange={setSelectedUf} />
          <SelectCidade uf={selectedUf} selectedCidade={selectedCidade} setSelectedCidade={setSelectedCidade}/>
          </div>
        <div className="cards">
          {clima ? (
            clima.map((dia, index) => (
              <CardClima key={dia.dt} vento={dia.wind.speed} temperatura={parseInt(dia.main.temp)} umidade={dia.main.humidity} sensacao={parseInt(dia.main.feels_like)} data={new Date(dia.dt_txt).toLocaleDateString()} descricao={dia.weather[0].description} icone={dia.weather[0].icon}/>
            ))
          ) : null }
        </div>
      </div>
    </div>
  );
}
