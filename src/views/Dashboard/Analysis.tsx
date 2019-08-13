import * as React from 'react'
import * as numeral from 'numeral'
import * as styles from './Analysis.scss'
import {
  Row,
  Col,
  Tooltip,
  Icon,
  Card,
  Tabs,
  DatePicker,
  Dropdown,
  Menu,
  Table,
  Radio
} from 'antd'
import ChartCard from '../../components/Charts/ChartCard'
import {
  yuan,
  Field,
  MiniArea,
  MiniBar,
  MiniPorgress,
  Bar,
  TimelineChart
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { connect } from 'react-redux'
import { fakeChart } from '../../redux/actions/charts'
import { getTimeDistance } from '../../utils'

const { Fragment } = React
const { TabPane } = Tabs
const { RangePicker } = DatePicker

const Yuan = (props:any) => (
  <span dangerouslySetInnerHTML={{ __html: yuan(props.children)}} />
)

type State = {
  loading1: boolean;
  percent: number;
  rangePickerValue?:any;
  salesType: string;
  currentTabKey?: string;
}
type Props = {
  loading?: boolean;
  fakeChart: () => any;
  charts?: any;
}

const rankingListData:any = []
for (let i = 0; i < 7; i++) {
  rankingListData.push({
    title: `工专路 ${i} 门店`,
    total: 323234 + i
  })
  
}

class Analysis extends React.PureComponent<Props, State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      loading1: false,
      salesType: 'all',
      currentTabKey: '',
      percent: 0,
      rangePickerValue: getTimeDistance('year')
    }
  }
  public async componentDidMount() {
    try {
      await this.props.fakeChart()
      setTimeout(() => {
        this.setState({
          percent: 78
        })
      }, 2000)
      console.log(this.props)
    } catch (error) {
      throw error
    }
  }
  public isActive = (type:string):any => {
    const { rangePickerValue } = this.state
    const value:any = getTimeDistance(type)
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return
    }
    if (rangePickerValue[0].isSame(value[0], 'day') &&
    rangePickerValue[1].isSame(value[1], 'day')) {
      return styles.currentDate
    }
  }
  public selecteDate = (type:string) => {
    const value:any = getTimeDistance(type)
    const { rangePickerValue } = this.state
    if (!rangePickerValue[0].isSame(value[0], 'day') ||
    !rangePickerValue[1].isSame(value[1], 'day')) {
      this.setState({
        rangePickerValue: value
      }) 
    }
  }
  public handleChangeSalesType = (e:any) => {
    this.setState({
      salesType: e.target.value
    })
  }
  public handleTabChange = (key: string) => {
    this.setState({
      currentTabKey: key
    })
  }
  public render() {
    const { percent, rangePickerValue, salesType, currentTabKey } = this.state
    const { loading, charts } = this.props
    const {
      visitData,
      salesData,
      searchData,
      offlineData = [],
      offlineChartData
    } = charts
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: {marginBottom: 24}
    }

    const salesExtraBarResponsProps = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 16
    }
    const salesExtraRankResponsProps = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 8
    }
    const searchResponseProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 12
    }
    const columns = [
      {
        title: '排名',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: '搜索关键词',
        dataIndex: 'keyword',
        key: 'keyword',
        render: (text: string) => <a href="/">{text}</a>
      },
      {
        title: '用户数',
        dataIndex: 'count',
        key: 'count',
        sorter: (a: any, b: any) => a.count - b.count
      },
      {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a: any, b: any) => a.range - b.range,
        render: (text: string, record: any) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span>
              {text} %
            </span>
          </Trend>
        )
      }
    ]
    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name)
    console.log(currentTabKey)
    const CustomTab = ({data, currentTabKey: currentKey}: any) =>(
      <Row gutter={8} style={{ width: 138, margin: '8px 0'}}>
        <Col span={12}>
          <NumberInfo 
            title={data.name}
            subTitle="转化率"
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name ? 'light' : 'dark'}
          />
        </Col>
      </Row>
    )
    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={
          <Menu>
            <Menu.Item>操作一</Menu.Item>
            <Menu.Item>操作二</Menu.Item>
          </Menu>
        } placement="bottomRight" >
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    )

    const salesExtra:any = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a href="#" className={this.isActive('today')} onClick={() => this.selecteDate('today')} >今日</a>
          <a href="#" className={this.isActive('week')} onClick={() => this.selecteDate('week')} >本周</a>
          <a href="#" className={this.isActive('month')} onClick={() => this.selecteDate('month')} >本月</a>
          <a href="#" className={this.isActive('year')} onClick={() => this.selecteDate('year')} >全年</a>
        </div>
        <RangePicker
          value={rangePickerValue}
          style={{ width: 256 }}
        />
      </div>
    )
    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="总销售额"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => <Yuan>125500</Yuan> }
              footer={<Field label="日均销售额" value={<Yuan>12423</Yuan>} />}
              contentHeight={40}
            >
              <Trend flag="up" style={{marginRight: '16px'}}  >
                周同比
                <span >12%</span>
              </Trend>
              <Trend flag="down" >
                日环比
                <span>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps} >
            <ChartCard
              title="访问量"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(8848).format('0,0')}
              footer={<Field label="日均销售额" value={numeral(1234).format('0,0')} />}
              contentHeight={40}
            >
              <MiniArea data={visitData} color="#975fe4" />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="支付笔数"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(8000).format('0,0')}
              footer={<Field label="转化率" value="60%" />}
              contentHeight={40}
            >
              <MiniBar data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps} >
            <ChartCard
              title="运营活动效果"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="78%"
              footer={
                <div className={styles.activityWrap}>
                  <Trend flag="up" style={{marginRight: '16px'}}  >
                    周同比
                    <span >12%</span>
                  </Trend>
                  <Trend flag="down" >
                    日环比
                    <span>11%</span>
                  </Trend>
                </div>
              }
              contentHeight={40}
            >
              <MiniPorgress percent={percent} />
            </ChartCard>
          </Col>
        </Row>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }} >
          <Tabs tabBarExtraContent={salesExtra} size="large" className={styles.salesTabs}>
            <TabPane tab="销售额" key="1">
              <Row>
                <Col {...salesExtraBarResponsProps}>
                  <div className={styles.salesBar}>
                    <Bar title="销售额趋势" data={salesData} />
                  </div>
                </Col>
                <Col {...salesExtraRankResponsProps} >
                  <div className={styles.salesRank}>
                    <h4>门店销售额排名</h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item: any, index: number) => (
                        <li key={index} >
                          <div className={styles.rankingLeft}>
                            <span className={ index< 3 ? styles.rankingActive : ''}>{ index + 1}</span>
                            <span>{item.title}</span>
                          </div>
                          <span>{numeral(item.total).format('0,0')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="访问量" key="2">
              <Row>
                <Col {...salesExtraBarResponsProps}>
                  <div className={styles.salesBar}>
                    <Bar title="访问量趋势" data={salesData} />
                  </div>
                </Col>
                <Col {...salesExtraRankResponsProps} >
                  <div className={styles.salesRank}>
                    <h4>门店访问量排名</h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item: any, index: number) => (
                        <li key={index} >
                          <div className={styles.rankingLeft}>
                            <span className={ index< 3 ? styles.rankingActive : ''}>{ index + 1}</span>
                            <span>{item.title}</span>
                          </div>
                          <span>{numeral(item.total).format('0,0')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
        <Row gutter={24}>
          <Col {...searchResponseProps}>
            <Card
              loading={loading}
              bordered={false}
              title="线上热门搜索"
              extra={iconGroup}
              style={{ marginTop: 24 }}
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }} >
                  <NumberInfo 
                    subTitle={
                      <span>
                        搜索用户数
                        <Tooltip title="指标文案">
                          <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                        </Tooltip>
                      </span>
                    }
                    total={numeral(123200).format('0,0')}
                    status="up"
                    subTotal={17.1}
                  />
                  <MiniArea line={true} height={45} data={visitData} />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }} >
                  <NumberInfo 
                    subTitle={
                      <span>
                        人均搜索次数
                        <Tooltip title="指标文案">
                          <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                        </Tooltip>
                      </span>
                    }
                    total="2.7"
                    status="down"
                    subTotal={26.2}
                  />
                  <MiniArea line={true} height={45} data={visitData} />
                </Col>
              </Row>
              <Table 
                size="small"
                rowKey={(record: any) => record.index}
                columns={columns}
                dataSource={searchData}
                pagination={{
                  style: {marginBottom: 0},
                  pageSize: 5
                }}
              />
            </Card>
          </Col>
          <Col {...searchResponseProps}>
            <Card
              loading={loading}
              bordered={false}
              title="销售额类别占比"
              className={styles.salesCard}
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 509 }}
              extra={
                <div className={styles.salesCardExtra}>
                  {iconGroup}
                  <div className={styles.salesTypeRadio}>
                    <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value="all">全部渠道</Radio.Button>
                      <Radio.Button value="online">线上</Radio.Button>
                      <Radio.Button value="offline">门店</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
            >
              <span>1234</span>
              <h4 style={{ marginTop: 9, marginBottom: 32 }}>销售额</h4>
            </Card>
          </Col>            
        </Row>
        <Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0'}}
          style={{ marginTop: 32 }}
        >
          <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
            {offlineData.map((shop: any) => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                <div style={{ padding: '0 24px'}}>
                  <TimelineChart 
                    data={offlineChartData}
                    titleMap={{ y1: '客流量', y2: '支付笔数'}}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </Fragment>
    )
  }
}

export default connect(((state:any) => ({
  charts: state.fakeCharts.charts,
  loading: state.fakeCharts.loading
})), { fakeChart })(Analysis)
