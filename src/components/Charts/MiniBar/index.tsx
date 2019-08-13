import * as React from 'react'
import { Chart, Tooltip, Geom } from 'bizcharts'
import * as styles from '../index.scss'

type Props = {
  height: number;
  forceFit: boolean;
  color: string;
  data: any;
  animate: boolean;
}

export default class MiniBar extends React.PureComponent<Props> {
  public static defaultProps = {
    forceFit: true,
    color: '#1890ff',
    data: [],
    height: 40,
    animate: true
  }
  public render() {
    const {
      height,
      forceFit,
      color,
      animate,
      data
    } = this.props
    const scale = {
      x: {
        type: 'cat'
      },
      y: {
        min: 0
      }
    }
    const tooltip:any = [
      'x*y',
      (x:any, y:any) => ({
        name: x,
        value: y,
      }),
    ]
    const padding:any = [36, 5, 30, 5]
    return (
      <div className={styles.miniChart} style={{ height }} >
        <div className={styles.chartContent}>
          <Chart
            scale={scale}
            height={height + 54}
            forceFit={forceFit}
            data={data}
            padding={padding}
            animate={animate}
          >
            <Tooltip showTitle={false} />
            <Geom type="interval" position="x*y" color={color} tooltip={tooltip} />
          </Chart>
        </div>
      </div>
    )
  }
}
