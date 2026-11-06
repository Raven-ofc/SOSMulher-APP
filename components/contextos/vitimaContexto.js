import React, { createContext, useContext, useState } from "react"

const VitimaContexto = createContext(null)

export function ProvedorVitima({ children, vitimaLogada: vitimaInicial }) {
    const [vitimaLogada, setVitimaLogada] = useState(vitimaInicial)
    const [distanciaAgressor, setDistanciaAgressor] = useState(null);
    const [statusAlerta, setStatusAlerta] = useState('aguardando');

    const atualizarVitima = (dados) => {
        setVitimaLogada((vitimaAtual) => ({
            ...vitimaAtual, ...dados
        }))
    }

    const sairDaConta = () => {
        setVitimaLogada(null)
        setDistanciaAgressor(null)
        setStatusAlerta('aguardando')
    }
    return (
        <VitimaContexto.Provider value={{ vitimaLogada, atualizarVitima, sairDaConta, distanciaAgressor, setDistanciaAgressor, statusAlerta, setStatusAlerta }}>
            {children}
        </VitimaContexto.Provider>
    )
}

export function usarVitima() {
    const contexto = useContext(VitimaContexto)

    if (!contexto) {
        throw new Error(
            'UsarVitima deve ser usado dentro de um provedor da vitima'
        )
    }
    return contexto
}