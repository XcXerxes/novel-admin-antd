import * as React from 'react'
import classnames from 'classnames'
import * as styles from './index.scss'
import { Icon } from 'antd'

interface ITrendProps {
  colorful?: boolean;
  reverseColor?: boolean;
  flag?: string;
  children?: React.ReactNode;
  className?: string;
  style?: any;
}

export default ({ colorful = true, reverseColor = false, flag, children, className, ...rest }:ITrendProps) => {
  const classString = classnames(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful
    }
  )
  return (
    <div {...rest} className={classString}>
      <span className={styles.value}>{children}</span>
      {flag && (
        <span className={styles[flag]}>
          <Icon type={`caret-${flag}`} />
        </span>
      )}
    </div>
  )
}
