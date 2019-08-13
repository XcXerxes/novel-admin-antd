import * as React from 'react'
import * as styles from './Workplace.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchWorkplace } from '../../redux/actions/workplace'
import {
  Row,
  Col,
  Avatar,
  Card,
  List
} from 'antd'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import EditableLinkGroup from '../../components/EditableLinkGroup'

type Props = {
  loading: boolean;
  workplace?: any;
  fetchWorkplace: () => any;
}

class Workplace extends React.PureComponent<Props> {
  public renderActivities = (item:any) => {
    const events:Array<any> = item.template.split(/@\{([^{}]*)\}/gi).map((key:number) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        )
      }
      return key
    })
    return (
      <List.Item>
        <List.Item.Meta 
          avatar={<Avatar src={item.user.avatar} />}
          title={<span>
            <a className={styles.username}>{item.user.name}</a>
            &nbsp;
            <span className={styles.event}>{events}</span>
          </span>}
          description={
            <span className={styles.datetime}>
              123213
            </span>
          }
        />
      </List.Item>
    )
  }
  public async componentDidMount() {
    try {
      await this.props.fetchWorkplace()
    } catch (error) {
      throw error
    }
  }
  public render() {
    const {loading, workplace } = this.props
    const { activities } = workplace
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar 
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>早安，祝你开心每一天！</div>
          <div className={styles.contentCaption}>前端开发工程师 | 某某某事业群 - 某某平台部 - 某某技术部 - FED</div>
        </div>
      </div>
    )
    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>60</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排行</p>
          <p>8
            <span>/ 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    )
    const links = [
      {
        title: '操作一',
        href: ''
      },
      {
        title: '操作二',
        href: ''
      },
      {
        title: '操作三',
        href: ''
      },
      {
        title: '操作四',
        href: ''
      },
      {
        title: '操作五',
        href: ''
      },
      {
        title: '操作六',
        href: ''
      },
    ]
    const members = [
      {
        id: 'members-1',
        title: '科学搬砖组',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        link: '',
      },
      {
        id: 'members-2',
        title: '程序员日常',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
        link: '',
      },
      {
        id: 'members-3',
        title: '设计天团',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
        link: '',
      },
      {
        id: 'members-4',
        title: '中二少女团',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
        link: '',
      },
      {
        id: 'members-5',
        title: '骗你学计算机',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
        link: '',
      },
    ]
    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent} {...this.props} >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24} >
            <Card title="进行中的项目"
              loading={loading} 
              bordered={false}
              style={{ marginBottom: 24 }}
              bodyStyle={{ padding: 0 }}
              extra={<Link to="/">全部项目</Link>}
            >
              <span>1234</span>
            </Card>
            <Card
              bordered={false}
              loading={loading}
              bodyStyle={{ padding: 0 }}
              className={styles.activeCard}
              title="动态"
            >
              <List itemLayout="horizontal" size="large"
                renderItem={this.renderActivities}
                dataSource={activities}
                className={styles.activitiesList}
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24} >
            <Card
              loading={loading}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
              style={{ marginBottom: 24 }}
            >
              <EditableLinkGroup links={links} />
            </Card>
            <Card
              loading={loading}
              title="XX 指数"
              bordered={false}
              bodyStyle={{ padding: 0 }}
              style={{ marginBottom: 24 }}
            >
              <EditableLinkGroup links={links} />
            </Card>
            <Card
              loading={loading}
              title="团队"
              bordered={false}
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {members.map((item: any, index: number) => (
                    <Col span={12} key={index}>
                      <Link to={item.link}>
                        <Avatar 
                          src={item.logo} size="small"
                        />
                        <span className={styles.member}>{item.title}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    )
  }
}

export default connect((state: any) => ({
  loading: state.fetchWorkplace.loading,
  workplace: state.fetchWorkplace.workplace
}), { fetchWorkplace })(Workplace)
