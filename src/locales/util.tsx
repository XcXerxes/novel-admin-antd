import localesData from './index'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'

const defaultLanguage = 'zh_CN'
const defaultLocal = localesData[defaultLanguage]
const languageKey = 'babelLang'

console.info(localesData)

/**
 * 
 * @param messages 本地化文本的对象
 * @param prefix   本地化文本的key
 */
export function getMessages (messages: any, prefix: string) {
  const output = {}
  for (const id in messages) {
    if (messages.hasOwnProperty(id)) {
      const key = prefix ? `${prefix}.${id}` : id
      const message = messages[id]
      output[key] = message
    }
  }
  return output
}

/**
 * 获取语言
 */
export function getCurrentLanguage () {
  let lang = window.localStorage.getItem(languageKey)
  if (lang !== 'en_US' && lang !== 'zh_CN') {
    lang = defaultLanguage
  }
  return lang
}

/**
 * 
 * @param lang 语言的key
 */
export function setCurrentLanguage (lang: string) {
  window.localStorage.setItem(languageKey, lang || defaultLanguage)
}

/**
 * 选择语言
 * @param lang 语言
 */
export function chooseLocale (lang: string) {
  const newLang = lang || getCurrentLanguage()
  switch (newLang) {
    case 'zh_CN':
      return localesData.zh_CN
    case 'en_US':
      return localesData.en_US
    default:
      return defaultLocal
  }
}

/**
 * 获取当前本地化语言包
 * @param id 
 */
export function getCurrentLocalesData (id: string) {
  return chooseLocale(id)
}

/**
 * 获取当前本地化语言包的值
 * @param id 
 */
export function getValue (id: string) {
  return chooseLocale(getCurrentLanguage())[id]|| ''
}

/**
 * 获取当前本地化语言包的值
 * @param id 
 */
export function $t (id: string) {
  return getValue(id)
}

/**
 * 
 * @param lang 
 */
export function getAntdLocal (lang: string) {
  if (lang === 'zh_CN') {
    return zh_CN
  } else if (lang === 'en_US') {
    return en_US
  }
  return zh_CN
}
