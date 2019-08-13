import * as React from 'react'
import * as styles from './index.scss'

interface IFieldProps {
  label?: string;
  value?: string | React.ReactElement<any>;
}

export default ({label, value, ...rest}:IFieldProps) => (
  <div className={styles.field} {...rest} >
    <span>{label}</span>
    <span>{value}</span>
  </div>
)
