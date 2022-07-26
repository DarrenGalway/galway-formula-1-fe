import * as React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { IConstructorStandingsResponse } from '../types'
import Constructor from '../components/Constructor'

interface PageData {
  data: {
    constructors: {
      data: IConstructorStandingsResponse
    }
  }
}

export const ConstructorsPage = ({
  data: {
    constructors: { data },
  },
}: PageData) => {
  return (
    <Layout
      title="Constructors leaders"
      description="Formula 1 constructors championship leaders"
    >
      <div className="container mx-auto px-4">
        <div className="flex p-4">
          <span className="flex-none w-16 text-xs uppercase tracking-wider text-gray-400">
            Pos
          </span>
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Constructor
          </span>
          <span className="flex-1 hidden lg:block text-xs uppercase tracking-wider text-gray-400">
            Nationality
          </span>
          <span className="flex-none w-16 text-xs uppercase tracking-wider text-gray-400">
            Points
          </span>
        </div>
        <ul className="border border-gray-800 rounded">
          {data?.ConstructorStandings.map((constructor) => (
            <Constructor
              {...constructor}
              key={constructor.Constructor.constructorId}
            />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    constructors {
      data {
        ConstructorStandings {
          points
          position
          positionText
          wins
          Constructor {
            constructorId
            name
            nationality
            url
          }
        }
        round
        season
      }
    }
  }
`

export default ConstructorsPage
