import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

interface LayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export const Layout = ({ children, title, description }: LayoutProps) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>

    <div className="min-h-screen pb-24">
      <header className="border-b border-gray-800 mb-8">
        <nav className="container mx-auto flex">
          <Link className="p-4 mr-auto" to="/">
            Galway Formula 1
          </Link>
          <Link className="p-4" to="/schedule" activeClassName="text-teal-300">
            Schedule
          </Link>
          <Link className="p-4" to="/drivers" activeClassName="text-teal-300">
            Drivers
          </Link>
          <Link
            className="p-4"
            to="/constructors"
            activeClassName="text-teal-300"
          >
            Constructors
          </Link>
        </nav>
      </header>

      {children}
    </div>
  </>
)
