import React from 'react'
import Link from 'next/link'

export default () => (
  <ul>
    <li><Link href='/'><a>list</a></Link></li>
    <li><Link href='/detail/123'><a>detail</a></Link></li>
  </ul>
)
