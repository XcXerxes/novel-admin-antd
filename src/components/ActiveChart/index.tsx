import * as React from 'react'
import { MiniArea } from '../Charts'
import NumberInfo from '../NumberInfo'
import * as styles from './index.scss'

type State = {
  activeData?: Array<any>;
}

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

const getActiveData = () => {
  return Array.from({length: 24}).map((item: any, i: number) => {
    return {
      x: `${fixedZero(i)}:00`,
      y: Math.floor(Math.random() * 200) + i * 50
    }
  })
}

export default class ActiveChart extends React.PureComponent<State> {
  public timer: any;
  public state = {
    activeData: getActiveData()
  }
  public componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        activeData: getActiveData()
      })
    }, 1000)
  }
  public componentWillUnmount() {
    clearInterval(this.timer)
  }
  public render() {
    const { activeData = [] } = this.state
    return (
      <div className={styles.activeChart}>
        <NumberInfo 
          subTitle="目标评估"
          total="有望达到预期"
        />
        <div style={{ marginTop: 32 }}>
          <MiniArea 
          animate={false}
          line={true}
          borderWidth={2}
          height={84}
          scale={{
            y: {
              tickCount: 3
            }
          }}
          yAxis={{
            tickLine: false,
            label: false,
            title: false,
            line: false
          }}
          data={activeData}
          />
        </div>
        {activeData && (
          <div className={styles.activeChartGrid}>
            <p>{[...activeData].sort()[activeData.length - 1].y + 200} 亿元</p>
            <p>{[...activeData].sort()[Math.floor(activeData.length / 2)].y} 亿元</p>
          </div>
        )}
      </div>
    )
  }
}
