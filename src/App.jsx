import "./index.css";
import { useState, useEffect } from "react";
import { SelectEstado } from "./components/SelectEstado";
import { SelectCidade } from "./components/SelectCidade";
import { getClima } from "./api/weather-api";
import { CardClima } from "./components/CardClima";
import LineChart from "./components/LineChart";

export default function App() {
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCidade, setSelectedCidade] = useState(null);
  const [clima, setClima] = useState([])
  const [labels, setLabels] = useState([])
  const [datasetTemperatura, setdatasetTemperatura] = useState([1, 1, 1])
  const [datasetSensacao, setdatasetSensacao] = useState([1, 1, 1])

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperatura",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: datasetTemperatura,
        type: "line"

      }, 
      {
        label: "Sensação térmica",
        backgroundColor: "rgb(53, 162, 235)",
        borderColor: "rgb(53, 162, 235)",
        data: datasetSensacao,
        type: "line"
      },
    ],
  };
  const atualizaClima = async () => {
    if(selectedCidade){
      const response = await getClima(selectedUf, selectedCidade.split(' (')[0]);
      if(response){
        setClima(response);
        setLabels(getLabels(response))
        setdatasetTemperatura(getTemperaturas(response))
        setdatasetSensacao(getSensacaoTermica(response))
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
        {
          labels.length > 0 ?
          <div>
              <h1 style={{
                color: "#888", textAlign: "center"}}>Temperatura/Sensação Térmica por dia</h1>
            <LineChart data={data}/>
          </div> : null }
      </div>
    </div>
  );
}

function getLabels(response){
  const labels = [];
  for (const item of response){
    labels.push(new Date(item.dt_txt).toLocaleDateString());
  }
  return labels;
}

function getTemperaturas(response) {
  const temperaturas = [];
  for (const item of response) {
    temperaturas.push(parseInt(item.main.temp));
  }
  return temperaturas;
}
function getSensacaoTermica(response) {
  const sensacaoTermica = [];
  for (const item of response) {
    sensacaoTermica.push(parseInt(item.main.feels_like));
  }
  return sensacaoTermica;
}