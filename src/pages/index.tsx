import { Link } from 'gatsby'
import * as React from 'react'
import { Layout } from '../components/Layout'

export const IndexPage = () => {
  return (
    <Layout title="Galway formula 1" description="Galway formula 1">
      <div className="container mx-auto px-4">
        <ul>
          <li>
            <Link className="text-teal-300 underline" to="/schedule/">
              Schedule
            </Link>
          </li>
          <li>
            <Link className="text-teal-300 underline" to="/drivers/">
              Drivers
            </Link>
          </li>
          <li>
            <Link className="text-teal-300 underline" to="/constructors/">
              Constructors
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default IndexPage
