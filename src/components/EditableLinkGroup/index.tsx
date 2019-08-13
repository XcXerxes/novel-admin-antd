import * as React from 'react'
import { Button } from 'antd'
import * as styles from './index.scss'

type Props = {
  links: Array<any>;
  linkElement: string;
  onAdd?: () => any;
}

export default class EditableLinkGroup extends React.PureComponent<Props> {
  public static defaultProps = {
    links: [],
    linkElement: 'a'
  }
  public render() {
    const { links, linkElement, onAdd } = this.props
    return (
      <div className={styles.linkGroup}>
        {links.map((link:any, key: number) => React.createElement(
          linkElement,
          {
            key,
            to: link.href,
            href: link.href
          },
          link.title
        ))}
        <Button size="small" type="primary" ghost={true} onClick={onAdd} icon="plus" >
          添加
        </Button>
      </div>
    )
  }
}