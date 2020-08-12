/* eslint-disable object-property-newline */
import { GlobalOptions } from '../types/GlobalOptions'
import { FormattingStrategy } from '../types/FormattingStrategy'

// prettier-ignore
const CURRENCIES = {
  AED: 1, AFN: 1, ALL: 1, AMD: 1, ANG: 1, AOA: 1,
  ARS: 1, AUD: 1, AWG: 1, AZN: 1, BAM: 1, BBD: 1,
  BDT: 1, BGN: 1, BHD: 1, BIF: 1, BMD: 1, BND: 1,
  BOB: 1, BRL: 1, BSD: 1, BTC: 1, BTN: 1, BWP: 1,
  BYN: 1, BZD: 1, CAD: 1, CDF: 1, CHF: 1, CLF: 1,
  CLP: 1, CNH: 1, CNY: 1, COP: 1, CRC: 1, CUC: 1,
  CUP: 1, CVE: 1, CZK: 1, DJF: 1, DKK: 1, DOP: 1,
  DZD: 1, EGP: 1, ERN: 1, ETB: 1, EUR: 1, FJD: 1,
  FKP: 1, GBP: 1, GEL: 1, GGP: 1, GHS: 1, GIP: 1,
  GMD: 1, GNF: 1, GTQ: 1, GYD: 1, HKD: 1, HNL: 1,
  HRK: 1, HTG: 1, HUF: 1, IDR: 1, ILS: 1, IMP: 1,
  INR: 1, IQD: 1, IRR: 1, ISK: 1, JEP: 1, JMD: 1,
  JOD: 1, JPY: 1, KES: 1, KGS: 1, KHR: 1, KMF: 1,
  KPW: 1, KRW: 1, KWD: 1, KYD: 1, KZT: 1, LAK: 1,
  LBP: 1, LKR: 1, LRD: 1, LSL: 1, LYD: 1, MAD: 1,
  MDL: 1, MGA: 1, MKD: 1, MMK: 1, MNT: 1, MOP: 1,
  MRO: 1, MRU: 1, MUR: 1, MVR: 1, MWK: 1, MXN: 1,
  MYR: 1, MZN: 1, NAD: 1, NGN: 1, NIO: 1, NOK: 1,
  NPR: 1, NZD: 1, OMR: 1, PAB: 1, PEN: 1, PGK: 1,
  PHP: 1, PKR: 1, PLN: 1, PYG: 1, QAR: 1, RON: 1,
  RSD: 1, RUB: 1, RWF: 1, SAR: 1, SBD: 1, SCR: 1,
  SDG: 1, SEK: 1, SGD: 1, SHP: 1, SLL: 1, SOS: 1,
  SRD: 1, SSP: 1, STD: 1, STN: 1, SVC: 1, SYP: 1,
  SZL: 1, THB: 1, TJS: 1, TMT: 1, TND: 1, TOP: 1,
  TRY: 1, TTD: 1, TWD: 1, TZS: 1, UAH: 1, UGX: 1,
  USD: 1, UYU: 1, UZS: 1, VEF: 1, VES: 1, VND: 1,
  VUV: 1, WST: 1, XAF: 1, XAG: 1, XAU: 1, XCD: 1,
  XDR: 1, XOF: 1, XPD: 1, XPF: 1, XPT: 1, YER: 1,
  ZAR: 1, ZMW: 1, ZWL: 1
}

const CURRENCY_NAMES = Object.keys(CURRENCIES) as Currency[]

type Currency = keyof typeof CURRENCIES

type Config = { locale: string } & Intl.NumberFormatOptions

type CurrencyFormat = Config &
  {
    [c in keyof typeof CURRENCIES]?: number
  }

const isCurrency = ([key, value]: any[]) =>
  CURRENCY_NAMES.includes(key) && typeof value === 'number'

const getCurrencyAndValue = (obj: any) => {
  if (!obj) return []
  return (Object.entries<number>(obj).find(isCurrency) || []) as [Currency, number]
}

export const fits = (obj: any): obj is CurrencyFormat => {
  return Object.entries(obj).some(isCurrency)
}

export const format = (obj: CurrencyFormat, globalOptions: GlobalOptions = {}) => {
  if (!fits(obj)) return obj
  const [currency, amount] = getCurrencyAndValue(obj)

  const locale = obj.locale || globalOptions.locale || 'pt-BR'

  return amount.toLocaleString(locale, { style: 'currency', currency, ...globalOptions, ...obj })
}

export const currency: FormattingStrategy<CurrencyFormat> = {
  fits,
  format
}

export default currency
