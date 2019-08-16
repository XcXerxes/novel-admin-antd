import * as React from 'react'
import {
  Row,
  Col,
  Card,
  Tooltip
} from 'antd'
import { connect } from 'react-redux'
import { fetchMonitor } from '../../redux/actions/monitor'
import NumberInfo from '../../components/NumberInfo'
import * as numeral from 'numeral'
import CountDown from '../../components/CountDown'
import ActiveChart from '../../components/ActiveChart'
import * as styles from './Monitor.scss'
import { Gauge, WaterWave } from '../../components/Charts'

const { Fragment } = React

type Props = {
  loading: boolean;
  monitor?: any;
  fetchMonitor: () => any;
}

class Monitor extends React.PureComponent<Props> {
  public async componentDidMount () {
    try {
      await this.props.fetchMonitor()
    } catch (error) {
      // throw error
    }
  }
  public render () {
    const { loading, monitor } = this.props
    const { tags } = monitor
    console.log(tags)
    const mapResponiseProps = {
      xl: 18,
      lg: 24,
      md: 24,
      sm: 24,
      xs: 24,
      style: { marginBottom: 24 }
    }
    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...mapResponiseProps} >
            <Card title="活动实时交易情况" loading={loading} bordered={false} >
              <Row>
                <Col md={6} sm={12} xs={24} >
                  <NumberInfo 
                    subTitle="今日交易总额"
                    suffix="元"
                    total={numeral(124563233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24} >
                  <NumberInfo 
                    subTitle="销售目标完成率"
                    total="92%"
                  />
                </Col>
                <Col md={6} sm={12} xs={24} >
                  <NumberInfo 
                    subTitle="活动剩余时间"
                    total={<CountDown target={new Date().getTime() + 3900000} />}
                  />
                </Col>
                <Col md={6} sm={12} xs={24} >
                  <NumberInfo 
                    subTitle="每秒交易总额"
                    suffix="元"
                    total={234}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip title="后期实现">
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                    alt="map"
                  />
                </Tooltip>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24} >
            <Card
              loading={loading}
              title="活动情况预测"
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              <ActiveChart />
            </Card>
            <Card
              loading={loading}
              title="券核效率"
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              <Gauge title="跳出率" height={208} percent={87} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }} >
            <Card title="各品类占比" loading={loading} bordered={false} style={{ minHeight: 265}} >
              <span>类别</span>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }} >
            <Card title="热门搜索" loading={loading} bordered={false} style={{ minHeight: 265}} bodyStyle={{ overflow: 'hidden'}} >
              <span>类别</span>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }} >
            <Card title="资源剩余" loading={loading} bordered={false} style={{ minHeight: 160}} bodyStyle={{ textAlign: 'center', fontSize: 0}} >
              <WaterWave height={161} title="补贴资金剩余" percent={34} />
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default connect((state: any) => ({
  monitor: state.fetchMonitor.monitor,
  loading: state.fetchMonitor.loading
}), { fetchMonitor })(Monitor)
