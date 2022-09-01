import "./index.css";
import { useState } from "react";
import { SelectEstado } from "./components/SelectEstado";
import { SelectCidade } from "./components/SelectCidade";

export default function App() {
  const [selectedUf, setSelectedUf] = useState("");

  console.log(selectedUf);

  return (
    <div className="App">
      <SelectEstado onChange={setSelectedUf} />

      <SelectCidade uf={selectedUf} />

      {/* <select value={selectedEstado} onChange={handleEstadoUpdate}>
        {estados.map((estado) => (
          <option key={estado.id} value={estado.sigla}>
            {estado.nome}
          </option>
        ))}
      </select>

      {loadingCidades ? (
        <p>Carregando cidades... aguarde</p>
      ) : (
        <select>
          {cidades.map((cidade) => (
            <option key={cidade.codigo_ibge}>{cidade.nome}</option>
          ))}
        </select>
      )} */}
    </div>
  );
}
