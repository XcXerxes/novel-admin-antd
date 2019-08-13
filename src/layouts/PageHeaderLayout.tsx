import * as React from 'react'
import PageHeader from '../components/PageHeader'
import * as styles from './PageHeaderLayout.scss'

interface IPageHeaderProps {
  children: React.ReactNode;
  wrapperClassName?: string;
  top?: any;
  content?: React.ReactNode;
  extraContent?: string | React.ReactNode;
}
export default ({ children, wrapperClassName, ...restProps}: IPageHeaderProps) => (
  <div style={{ margin: '-24px -24px 0'}}>
    <PageHeader key="pageheader" {...restProps}  />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
)
