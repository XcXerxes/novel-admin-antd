import * as React from 'react'

type Props = {
  target: number | any;
  format?: (time: number) => any
  onEnd?: () => void;
}

type State = {
  lastTime: number;
}

const fixedZero = (num: number) => num * 1 < 10 ? `0${num}` : num

export default class CountDown extends React.PureComponent<Props, State> {
  public timer: any = 0
  public interval:number = 1000
  constructor(props:Props) {
    super(props)
    const { lastTime } = this.initTime(props)
    this.state = {
      lastTime
    }
  }

  public componentDidMount() {
    this.tick()
  }
  public componentWillUnmount() {
    clearTimeout(this.timer)
    this.timer = null
  }

  public initTime = (props: Props) => {
    let lastTime:number = 0
    let targetTime:number = 0
    try {
      if (Object.prototype.toString.call(props.target) === '[Object Date]') {
        targetTime = props.target.getTime()
      } else {
        targetTime = new Date(props.target).getTime()
      }
    } catch (error) {
      throw error ('invalid target prop', error)
    }
    lastTime = targetTime - new Date().getTime()
    return {
      lastTime: lastTime < 0 ? 0 : lastTime
    }
  }
  public defaultFormat = (time: number) => {
    const hours = 60 * 60 * 1000
    const minutes = 60 * 1000

    const h:number = Math.floor(time / hours)
    const m:number = Math.floor((time - h * hours) / minutes)
    const s:number = Math.floor((time - h * hours - m * minutes) / 1000)
    return (
      <span>
        {fixedZero(h)}
        :
        {fixedZero(m)}
        :
        {fixedZero(s)}
      </span>
    )
  }

  public tick = () => {
    const { onEnd } = this.props
    let { lastTime } = this.state
    this.timer = setTimeout(() => {
      if (lastTime < this.interval) {
        clearTimeout(this.timer)
        this.setState({
          lastTime: 0
        }, () => {
          if (onEnd) {
            onEnd()
          }
        })
      } else {
        lastTime -= this.interval
        this.setState({
          lastTime
        }, () => {
          this.tick()
        })
      }
    }, this.interval)
  }

  public render() {
    const {format = this.defaultFormat, ...rest} = this.props
    const result = format(this.state.lastTime)
    return <span {...rest} >{result}</span>
  }
}