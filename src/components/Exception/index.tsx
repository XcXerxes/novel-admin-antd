import * as React from 'react'
import * as styles from './index.scss'
import classnames from 'classnames'
import config from './typeConfig'
import { Button } from 'antd'

interface IExceptionProps {
  className?: string;
  linkElement: string | any;
  type?: number | string | any;
  title?: string;
  desc?: string;
  img?: string;
  actions?: React.ReactNode;
  style?: any;
}

export default ({ className, linkElement = 'a', type, title, desc, img, actions, ...rest }: IExceptionProps) => {
  const pageType:any = type in config ? type : 404
  const newClassName = classnames(styles.exception, className)
  return (
    <div className={newClassName} {...rest} >
      <div className={styles.imgWrapper}>
        <div className={styles.imgEle} style={{ backgroundImage: `url(${img || config[pageType].img})` }} />
      </div>
      <div className={styles.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={styles.desc}>{desc || config[pageType].desc}</div>
        <div className={styles.actions}>
          {actions || 
            React.createElement(
              linkElement,
              {
                to: '/',
                href: '/'
              },
              <Button type="primary" >返回首页</Button>
            )
          }
        </div>
      </div>
    </div>
  )
}
