import Select from "react-select";
import { useCidades } from "../hooks/useCidades";

export const SelectCidade = ({ uf, selectedCidade, setSelectedCidade }) => {
    const { cidades, loading: loadingCidades } = useCidades({
        uf
    });

    const cidadeOptions = cidades.map((cidade) => ({
        value: cidade.nome.split(' (')[0],
        label: cidade.nome.split(' (')[0]
    }));

    const selectedOptionCidade = cidadeOptions.find(
        (e) => e.value === selectedCidade
    );

    const handleCidadeUpdate = (event) => {
        setSelectedCidade(event.value);
    };
    return (
        <Select
            isLoading={loadingCidades}
            loadingMessage={() => "Carregando as cidades, aguarde ..."}
            isDisabled={loadingCidades || cidadeOptions.length === 0}
            options={cidadeOptions}
            placeholder="Selecione uma cidade"
            value={selectedOptionCidade}
            onChange={handleCidadeUpdate}
        />
    );
};
