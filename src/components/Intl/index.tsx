import * as React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import * as zh_CN from 'react-intl/locale-data/zh'
import * as en_US from 'react-intl/locale-data/en'
import { chooseLocale, getAntdLocal } from '../../locales/util'
import { LocaleProvider } from 'antd'

addLocaleData ([...zh_CN, ...en_US])

export interface IIntlProps {
  children: React.ReactNode;
}

const Intl:React.FC<IIntlProps> = (props) => {
  const localeData = chooseLocale('zh_CN')
  const localeAntdData = getAntdLocal('zh_CN')
  return (
    <LocaleProvider locale={localeAntdData}>
      <IntlProvider locale="zh" messages={localeData}>
        {props.children}
      </IntlProvider>
    </LocaleProvider>
  )
}

export default Intl
