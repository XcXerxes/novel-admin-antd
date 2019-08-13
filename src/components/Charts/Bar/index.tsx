import * as React from 'react'
import { Chart, Axis, Tooltip, Geom } from 'bizcharts'
import * as styles from '../index.scss'

type Props = {
  height: number;
  title?: string;
  forceFit: boolean;
  padding?: string;
  data?: any;
  color?: string;
  animate: boolean;
}

class Bar extends React.PureComponent<Props> {
  public static defaultProps = {
    height: 295,
    forceFit: true,
    data: [],
    color: 'rgba(24, 144, 255, 0.85)',
    animate: true
  }
  public render() {
    const {
      height,
      title,
      forceFit,
      data,
      padding,
      color,
      animate
    } = this.props
    const tooltip:any = [
      'x*y',
      (x: string, y: string) => ({
        name: x,
        value: y,
      }),
    ]
    return (
      <div className={styles.chart} style={{height}}>
        <div>
          {title && <h4 style={{ marginBottom: 20}}>{ title }</h4>}
          <Chart
            animate={animate}
            height={title ? height - 41 : height}
            forceFit={forceFit}
            data={data}
            padding={padding || 'auto'}
          >
            <Axis 
              name="x"
            />
            <Axis 
              name="y"
            />
            <Tooltip 
              showTitle={false}
            />
            <Geom 
              type="interval" position="x*y" color={color} tooltip={tooltip}
            />
          </Chart>
        </div>
      </div>
    )
  }
}

export default Bar
