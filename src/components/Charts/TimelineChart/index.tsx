import * as React from 'react'
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts'
import DataSet from '@antv/data-set'

type Props = {
  height: number;
  title?: string;
  padding: any,
  titleMap: any;
  borderWidth: number;
  data: Array<any>;
}

export default class TimelineChart extends React.PureComponent<Props> {
  public static defaultProps = {
    height: 400,
    padding: [60, 20, 40, 40],
    titleMap: {
      y1: 'y1',
      y2: 'y2'
    },
    borderWidth: 2,
    data: [
      {
        x: 0,
        y1: 0,
        y2: 0
      }
    ]
  }
  public render() {
    const {
      title,
      height,
      padding,
      borderWidth,
      titleMap,
      data
    } = this.props
    data.sort((a:any, b:any) => a.x - b.x)
    let max: number|undefined
    if (data[0] && data[0].y1 && data[0].y2) {
      max = Math.max(
        [...data].sort((a, b) => b.y1 - a.y1)[0].y1,
        [...data].sort((a, b) => b.y2 - a.y2)[0].y2
      )
    }

    const ds = new DataSet({
      state: {
        start: data[0].x,
        end: data[data.length - 1].x
      }
    })

    const dv = ds.createView()
    dv.source(data)
      .transform({
        type: 'filter',
        callback: (obj: any) => {
          const date: any = obj.x
          return date <= ds.state.end && date >= ds.state.start
        }
      })
      .transform({
        type: 'map',
        callback(row:any) {
          const newRow = { ...row }
          newRow[titleMap.y1] = row.y1
          newRow[titleMap.y2] = row.y2
          return newRow;
        }
      })
      .transform({
        type: 'fold',
        fields: [titleMap.y1, titleMap.y2], // 展开字段集
        key: 'key', // key字段
        value: 'value' // value字段
      })

    const timeScale:any = {
      type: 'time',
      tickInterval: 60 * 60 * 1000,
      mask: 'HH:mm',
      range: [0, 1]
    }
    const cols:any = {
      x: timeScale,
      value: {
        max,
        min: 0
      }
    }

    return (
      <div style={{ height: height + 30 }}>
        <div>
          {title && <h4>{title}</h4>}
          <Chart height={height} padding={padding} data={dv} scale={cols} forceFit={true}>
            <Axis name="x" />
            <Tooltip />
            <Legend name="key" position="top" />
            <Geom type="line" position="x*value" size={borderWidth} color="key" />
          </Chart>
          <div style={{ marginRight: -20 }} />
        </div>
      </div>
    )
  }
}