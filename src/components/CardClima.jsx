
export const CardClima = ({temperatura, vento, umidade, sensacao, data, descricao, icone}) => {
    return (
        <div id="card" className="weather">
            <div className="details">
                <div className="temp">
                    {temperatura}
                    <span>&deg;</span>
                </div>
                <div className="right">
                    <div id="summary">{descricao}</div>
                    <div style={{ fontWeight: "bold", marginTop: "4px" }}>{data}</div>
                </div>
            </div>
            <img className="weatherimg" alt="image1" src={`${icone}.svg`} />
            <div className="infos">
                <img
                    alt="umidade1"
                    className="umidadeimg"
                    style={{ width: "5", height: "5" }}
                    src="umidade.svg"
                ></img>
                <div className="umidade">Úmidade: {umidade}%</div>
                <img
                    alt="sensacao1"
                    className="sensacaoimg"
                    style={{ width: "5", height: "5" }}
                    src="sensacao.svg"
                ></img>
                <div className="sensacao">Sensação térmica: {sensacao}<span>&deg;</span></div>
                <img
                    alt="vento1"
                    className="ventoimg"
                    style={{ width: "5", height: "5" }}
                    src="vento.svg"
                ></img>
                <div className="vento">Vel. do vento: {vento} km/h</div>
            </div>
        </div>
    );
};
