import * as React from 'react'
import { Chart, Axis, Tooltip, Geom } from 'bizcharts'
import * as styles from '../index.scss'

type Props = {
  height: number;
  data: Array<any>;
  forceFit: boolean;
  color?: string;
  borderColor?: string;
  scale?: any;
  borderWidth?: number;
  line?: boolean;
  xAxis?: any;
  yAxis?: any;
  animate?: boolean;
}

class MiniArea extends React.PureComponent<Props> {
  public static defaultProps = {
    data: [],
    height: 40,
    forceFit: true,
    color: 'rgba(24, 144, 255, .2)',
    borderColor: '#1089ff',
    scale: {},
    borderWidth: 2,
    animate: true
  }
  public render() {
    const {
      height,
      data,
      color,
      scale,
      forceFit,
      borderColor,
      borderWidth,
      line,
      xAxis,
      yAxis,
      animate
    } = this.props
    const padding:any = [36, 5, 30, 5];
    const scaleProps = {
      x: {
        type: 'cat',
        range: [0, 1],
        ...scale.x
      },
      y: {
        min: 0,
        ...scale.y
      }
    }
    const tooltip:any = [
      'x*y',
      (x:string, y:string) => ({
        name: x,
        value: y
      })
    ]
    return (
      <div className={styles.miniChart} style={{ height }} >
        <div className={styles.chartContent}>
            <Chart
              animate={animate}
              height={height + 54}
              forceFit={forceFit}
              data={data}
              scale={scaleProps}
              padding={padding}
            >
              <Axis 
                key="axis-x"
                name="x"
                label={false}
                line={false}
                tickLine={false}
                grid={false}
                {...xAxis}
              />
              <Axis 
                key="axis-y"
                name="y"
                label={false}
                line={false}
                tickLine={false}
                grid={false}
                {...yAxis}
              />
              <Tooltip showTitle={false} />
              <Geom 
                type="area"
                position="x*y"
                color={color}
                tooltip={tooltip}
                shape="smooth"
                style={{ fillOpacity: 1}}

              />
              { line ? (
                <Geom 
                  type="line"
                  position="x*y"
                  shape="smooth"
                  color={borderColor}
                  size={borderWidth}
                  tooltip={false}
                />
              ) : (
                <span style={{ display: 'none' }} />
              )}
            </Chart>
        </div>
      </div>
    )
  }
}

export default MiniArea
