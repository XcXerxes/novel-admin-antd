import * as React from 'react'
import { Progress } from 'antd'

interface IMiniProgressProps {
  strokeLinecap?: string;
  percent: any;
}

export default ({strokeLinecap="square", percent=0}: IMiniProgressProps) => (
  <Progress strokeLinecap="square" percent={percent}  />
)
