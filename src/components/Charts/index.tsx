import * as numeral from 'numeral'
import Field from './Field'
import MiniArea from './MiniArea'
import MiniBar from './MiniBar'
import MiniPorgress from './MiniProgress'
import Bar from './Bar'
import TimelineChart from './TimelineChart'
import Gauge from './Gauge'
import WaterWave from './WaterWave'

const yuan = (val:(string|number)) => `¥ ${numeral(val).format('0,0')}`

const Charts = {
  yuan,
  Field,
  MiniArea,
  MiniBar,
  MiniPorgress,
  Bar,
  TimelineChart,
  Gauge,
  WaterWave
}
export {
  Charts as default,
  yuan,
  Field,
  MiniArea,
  MiniBar,
  MiniPorgress,
  Bar,
  TimelineChart,
  Gauge,
  WaterWave
}
