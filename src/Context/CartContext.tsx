import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../utils/ToastUtil";
import { getItemsMesa } from "../services/contaService";
import { getCartItemCount } from '../utils/cartUtils';
import { Conta } from '../@types/Conta';

interface ICartProviderProps {
    children: ReactNode;
}

interface ICartContextData {
    cartItems: any[];
    setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
    totalPedido: number;
    totalServico: number;
    setTotalServico: React.Dispatch<React.SetStateAction<number>>;
    totalCouvert: number;
    totalFinal: number;
    cartItemCount: number;
    setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
    calcularTotais: () => void;
    numeroMesa: number | null;
    setNumeroMesa: React.Dispatch<React.SetStateAction<number | null>>;
    fetchNumeroMesa: () => void;
    fetchCartItems: (numeroMesa: number) => void;
    numMesa: string;
    setNumMesa: React.Dispatch<React.SetStateAction<string>>;
    fetchCartItemCount: () => void;
    fetchNumMesa: () => void;
    empId: string;
    setEmpId: React.Dispatch<React.SetStateAction<string>>;
    atendente: number;
    setAtendente: React.Dispatch<React.SetStateAction<number>>;
    fetchUserData: () => void;
    antecipacao: number;
    setAntecipacao: React.Dispatch<React.SetStateAction<number>>;
    taxaServico: number;
    setTaxaServico: React.Dispatch<React.SetStateAction<number>>;
    desconto: number;
    setDesconto: React.Dispatch<React.SetStateAction<number>>;
    temContaMaxDigital: boolean;
    setTemContaMaxDigital: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartContext = createContext<ICartContextData>({} as ICartContextData);

export const CartProvider = ({ children }: ICartProviderProps) => {
    const [cartItems, setCartItems] = useState<Conta[]>([]);
    const [totalPedido, setTotalPedido] = useState(0);
    const [totalServico, setTotalServico] = useState(0);
    const [taxaServico, setTaxaServico] = useState(0);
    const [totalCouvert, setTotalCouvert] = useState(0);
    const [totalFinal, setTotalFinal] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [numeroMesa, setNumeroMesa] = useState<number | null>(null);
    const [numMesa, setNumMesa] = useState('');
    const [empId, setEmpId] = useState('');
    const [atendente, setAtendente] = useState(0);
    const [antecipacao, setAntecipacao] = useState<number>(0);
    const [temContaMaxDigital, setTemContaMaxDigital] = useState(false);

    function calcularTotais() {
        let pedido = 0;
        let desconto = 0;
        let final = 0;
        let servico = 0;

        cartItems.forEach((item) => {
            pedido += item.valorTotal;
            final += item.valorLiquido;
            desconto += item.desconto;
            servico += item.vlrOutrasDesp;
        });

        setTotalPedido(pedido);
        setTotalFinal(final);
        setDesconto(desconto);
        setTotalServico(servico);
    }

    async function fetchNumeroMesa() {
        try {
            const mesa = await AsyncStorage.getItem("numMesa");
            if (mesa !== null) {
                setNumeroMesa(parseInt(mesa));
            } else {
                showToast("Número da mesa não encontrado no AsyncStorage!", 'error');
            }
        } catch (error) {
            showToast("Erro ao carregar número da mesa!", 'error');
        }
    };

    async function fetchCartItems(numeroMesa: number) {
        try {
            const items = await getItemsMesa(numeroMesa);
            if (items.length === 0) {
                setCartItems([]);
            } else {
                setCartItems(items);
            }
        } catch (error) {
            showToast("Erro ao carregar itens da mesa!", 'error');
        }
    }


    const fetchCartItemCount = async () => {
        const itemCount = await getCartItemCount();
        setCartItemCount(itemCount);
    };

    const fetchNumMesa = async () => {
        try {
            const mesa = await AsyncStorage.getItem("numMesa");
            if (mesa) {
                setNumMesa(mesa);
            }
        } catch (error) {
            showToast("Erro ao obter número da mesa!", 'error');
        }
    };

    const fetchUserData = async () => {
        try {
            const empId = await AsyncStorage.getItem("empId");
            const operador = await AsyncStorage.getItem("atendente");

            setNumMesa(numMesa || "");
            setEmpId(empId || "1");
            if (operador) {
                setAtendente(parseInt(operador));
            }
        } catch (error) {
            showToast("Erro ao carregar dados do usuário/atendente!", 'error');
        }
    };

    return (
        <CartContext.Provider
            value={{
                calcularTotais,
                cartItems,
                setCartItems,
                totalPedido,
                totalServico,
                setTotalServico,
                totalCouvert,
                totalFinal,
                cartItemCount,
                setCartItemCount,
                numeroMesa,
                setNumeroMesa,
                fetchNumeroMesa,
                fetchCartItems,
                numMesa,
                setNumMesa,
                fetchCartItemCount,
                fetchNumMesa,
                empId,
                setEmpId,
                atendente,
                setAtendente,
                fetchUserData,
                antecipacao,
                setAntecipacao,
                temContaMaxDigital,
                setTemContaMaxDigital,
                taxaServico,
                setTaxaServico,
                desconto,
                setDesconto
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
