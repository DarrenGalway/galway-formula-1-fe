import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

interface LayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export const Layout = ({ children, title, description }: LayoutProps) => {
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="min-h-screen pb-24">
        <header className="border-b border-gray-800 mb-8">
          <nav className="container mx-auto flex items-center">
            <Link className="p-4 mr-auto" to="/">
              Galway Formula 1
            </Link>

            <div className="relative">
              <button
                className="lg:hidden p-4"
                onClick={() => setShowMenu(!showMenu)}
              >
                Menu
              </button>
              <div
                className={`border lg:border-none border-gray-600 rounded lg:rounded-none bg-gray-900 flex flex-col absolute lg:static lg:top-0 lg:right-0 lg:block top-[100%] right-2 ${
                  showMenu ? 'block' : 'hidden'
                }`}
              >
                <Link
                  className="p-4"
                  to="/schedule"
                  activeClassName="text-teal-300"
                >
                  Schedule
                </Link>
                <Link
                  className="p-4"
                  to="/drivers"
                  activeClassName="text-teal-300"
                >
                  Drivers
                </Link>
                <Link
                  className="p-4"
                  to="/constructors"
                  activeClassName="text-teal-300"
                >
                  Constructors
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {children}
      </div>
    </>
  )
}
