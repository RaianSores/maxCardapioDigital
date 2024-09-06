import React, { useState, createContext, ReactNode } from 'react';
import { IProdutosAdditional, IProdutosOptions } from '../@types/Produto';
import { consultAdditionalProducts } from '../services/additionalProducts';
import { consultOptionalProducts } from '../services/optionalProducts';

interface IAdditionalContext {
  fetchDataAdditional: (proId: number) => Promise<void>;
  fetchDataOptional: (proId: number) => Promise<void>;
  additionalData: IProdutosAdditional[] | null;
  additionalCounters: { [key: string]: number };
  additionalCart: IProdutosAdditional[];
  optionsData: IProdutosOptions[];
  setOptionsData: React.Dispatch<React.SetStateAction<IProdutosOptions[]>>;
  setAdditionalCounters: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  setAdditionalCart: React.Dispatch<React.SetStateAction<IProdutosAdditional[]>>;
}

interface IAdditionalProps {
  children: ReactNode;
}

export const AdditionalContext = createContext<IAdditionalContext | undefined>(undefined);

export function AdditionalProvider({ children }: IAdditionalProps) {
  const [additionalCounters, setAdditionalCounters] = useState<{ [key: string]: number }>({});
  const [additionalData, setAdditionalData] = useState<IProdutosAdditional[] | null>(null);
  const [additionalCart, setAdditionalCart] = useState<IProdutosAdditional[]>([]);
  const [optionsData, setOptionsData] = useState<IProdutosOptions[]>([]);

  async function fetchDataAdditional(proId: number) {
    const additionals = await consultAdditionalProducts(proId);
    if (additionals && additionals.length > 0) {
      setAdditionalData(additionals);
    } else {
      setAdditionalData([]);
    }
  };

  async function fetchDataOptional(proId: number) {
    const options = await consultOptionalProducts(proId);
    if (options && options.length > 0) {
      const optionsWithState = options.map(option => ({ ...option, isSelected: false }));
      setOptionsData(optionsWithState);
    } else {
      setOptionsData([]);
    }
  };

  return (
    <AdditionalContext.Provider
      value={{
        fetchDataAdditional,
        fetchDataOptional,
        additionalData,
        additionalCounters,
        additionalCart,
        optionsData,
        setOptionsData,
        setAdditionalCounters,
        setAdditionalCart,
      }}
    >
      {children}
    </AdditionalContext.Provider>
  );
}
