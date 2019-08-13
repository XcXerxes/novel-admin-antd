import * as React from 'react'
import classnames from 'classnames'
import { Icon } from 'antd'
import * as styles from './index.scss'

interface INumberInfoProps {
  theme?: string | boolean;
  title?: string;
  subTitle?: string | React.ReactNode;
  total?:any;
  status?: string;
  subTotal?: any;
  gap?: number;
  suffix?: string;
}

export default ({theme, title, subTitle, total, status, subTotal, gap=8, suffix}:INumberInfoProps) => (
  <div className={
    classnames(styles.numberInfo, {
      [styles[`numberInfo${theme}`]]: theme
    })
  }>
    {title && <div className={styles.numberInfoTitle}>{title}</div>}
    {subTitle && <div className={styles.numberInfoSubTitle}>{subTitle}</div>}
    <div className={styles.numberInfoValue} style={{ marginTop: gap }}>
      <span>
        {total}
        {suffix && <em className={styles.suffix}>{suffix}</em>}
      </span>
      {(status || subTotal) && (
        <span className={styles.subTotal}>
          {subTotal}
          {status && <Icon type={`caret-${status}`} />}
        </span>
      )}
    </div>
  </div>
)

