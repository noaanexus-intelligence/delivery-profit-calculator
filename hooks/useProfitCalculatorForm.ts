'use client';

import { useMemo, useReducer } from 'react';
import {
  calculate,
  validateInput,
  type CalculationInput,
  type CalculationResult,
  type GpBase,
  type DiscountType,
} from '@/lib/calculation-engine';

export interface RawFormState {
  menuName: string;
  appPrice: string;
  ingredientCost: string;
  packagingCost: string;
  laborCost: string;
  otherCost: string;
  gpPercent: string;
  gpBase: GpBase;
  vatPercent: string;
  discountType: DiscountType;
  discountValue: string;
  campaignFee: string;
  otherPlatformFee: string;
  volumeEnabled: boolean;
  estimatedOrdersPerDay: string;
  sellingDaysPerMonth: string;
}

type RawFormAction =
  | { type: 'SET_FIELD'; field: keyof RawFormState; value: string | boolean }
  | { type: 'TOGGLE_VOLUME' };

const initialState: RawFormState = {
  menuName: '',
  appPrice: '',
  ingredientCost: '',
  packagingCost: '',
  laborCost: '',
  otherCost: '',
  gpPercent: '',
  gpBase: 'beforeDiscount',
  vatPercent: '7',
  discountType: 'percent',
  discountValue: '',
  campaignFee: '',
  otherPlatformFee: '',
  volumeEnabled: false,
  estimatedOrdersPerDay: '',
  sellingDaysPerMonth: '',
};

function reducer(state: RawFormState, action: RawFormAction): RawFormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE_VOLUME':
      return { ...state, volumeEnabled: !state.volumeEnabled };
    default:
      return state;
  }
}

function toNumber(raw: string): number {
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export interface UseProfitCalculatorForm {
  raw: RawFormState;
  setField: (field: keyof RawFormState, value: string | boolean) => void;
  toggleVolume: () => void;
  parsedInput: CalculationInput;
  errors: string[];
  result: CalculationResult | null;
}

export function useProfitCalculatorForm(): UseProfitCalculatorForm {
  const [raw, dispatch] = useReducer(reducer, initialState);

  const setField = (field: keyof RawFormState, value: string | boolean) =>
    dispatch({ type: 'SET_FIELD', field, value });

  const toggleVolume = () => dispatch({ type: 'TOGGLE_VOLUME' });

  const parsedInput = useMemo<CalculationInput>(
    () => ({
      menu: {
        menuName: raw.menuName,
        appPrice: toNumber(raw.appPrice),
        ingredientCost: toNumber(raw.ingredientCost),
        packagingCost: toNumber(raw.packagingCost),
        laborCost: toNumber(raw.laborCost),
        otherCost: toNumber(raw.otherCost),
      },
      platform: {
        gpPercent: toNumber(raw.gpPercent),
        gpBase: raw.gpBase,
        vatPercent: toNumber(raw.vatPercent),
        storeDiscount: {
          type: raw.discountType,
          value: toNumber(raw.discountValue),
        },
        campaignFee: toNumber(raw.campaignFee),
        otherPlatformFee: toNumber(raw.otherPlatformFee),
      },
      volume: raw.volumeEnabled
        ? {
            estimatedOrdersPerDay: toNumber(raw.estimatedOrdersPerDay),
            sellingDaysPerMonth: toNumber(raw.sellingDaysPerMonth),
          }
        : undefined,
    }),
    [raw]
  );

  const errors = useMemo(
    () => validateInput(parsedInput.menu, parsedInput.platform, parsedInput.volume),
    [parsedInput]
  );

  const result = useMemo(
    () => (errors.length === 0 ? calculate(parsedInput) : null),
    [errors, parsedInput]
  );

  return { raw, setField, toggleVolume, parsedInput, errors, result };
}
