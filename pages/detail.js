import React from 'react'
import Link from 'next/link'

const test = ({query, pathname}) =>
  <div>
    Query: {JSON.stringify(query)}<br />
    Pathname: {JSON.stringify(pathname)}<br />
    <ul>
      <li><Link href='/'><a>list</a></Link></li>
    </ul>
  </div>

test.getInitialProps = ({query, pathname}) => {
  return {query, pathname}
}
export default test
