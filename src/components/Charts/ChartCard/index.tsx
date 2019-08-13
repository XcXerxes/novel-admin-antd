import * as React from 'react'
import { Card } from 'antd'
import * as styles from './index.scss'

const renderTotal = (total:any) => {
  switch (typeof total) {
    case 'undefined':
      return null
    case 'function':
      return (
        <div className={styles.total}>{total()}</div>
      )
    default:
        return (
          <div className={styles.total}>{total}</div>
        )
  }
}

type Props = {
  loading?: boolean;
  title?: string;
  avatar?: string;
  action?: string | React.ReactElement<any>;
  contentHeight?: string | number;
  className?: string;
  total?: any;
  footer?: React.ReactElement<any>;
  children?: React.ReactNode;
  bordered?: boolean;
}
class ChartCard extends React.PureComponent<Props> {
  public static defaultProps = {
    loading: false,
    bordered: false
  }
  public render ():React.ReactElement<any> {
    const {
      loading,
      title,
      action,
      children,
      total,
      footer,
      contentHeight,
      ...rest
    } = this.props
    const content = (
      <div className={styles.chartCard} >
        <div className={styles.chartTop} >
          <div className={styles.metaWrap}>
            <div className={styles.meta}>
              <span className={styles.title}>{title}</span>
              <span className={styles.action}>{action}</span>
            </div>
            {renderTotal(total)}
          </div>
        </div>
        {children && (
          <div className={styles.content} style={{ height: contentHeight || 'auto' }} >
            <div className={contentHeight ? styles.contentFixed : ''}>{children}</div>
          </div>
        )}
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    )
    return (
      <Card loading={loading} {...rest} bodyStyle={{ padding: '20px 24px 8px 24px' }} >
        {content}
      </Card>
    )
  }
}

export default ChartCard
