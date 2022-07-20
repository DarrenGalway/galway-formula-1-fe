import * as React from 'react'
import { Layout } from '../components/Layout'
import { IDriverStandings } from '../types'
import { getColor } from '../config/teams'
import { graphql } from 'gatsby'

const Driver = (driver: IDriverStandings) => (
  <li className="flex border-b border-gray-800 last:border-none p-4 text-gray-400">
    <span className="flex-1">{driver.position}</span>
    <span className="flex-1">
      {driver.Driver.givenName} {driver.Driver.familyName}
    </span>
    <span className="flex-1">{driver.Driver.nationality}</span>
    <span
      className="flex-1"
      style={{
        color: getColor(driver.Constructors[0].constructorId),
      }}
    >
      {driver.Constructors[0].name}
    </span>
    <span className="flex-1">{driver.points}</span>
  </li>
)

interface PageData {
  data: {
    drivers: {
      data: {
        DriverStandings: IDriverStandings[]
        round: string
        season: string
      }
    }
  }
}
export const DriversPage = ({
  data: {
    drivers: { data },
  },
}: PageData) => {
  return (
    <Layout
      title="Drivers leaders"
      description="Formula 1 drivers championship leaders"
    >
      <div className="container mx-auto px-4">
        <div className="flex p-4">
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Pos
          </span>
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Driver
          </span>
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Nationality
          </span>
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Team
          </span>
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Points
          </span>
        </div>
        <ul className="border border-gray-800 rounded">
          {data?.DriverStandings.map((driver: any) => (
            <Driver {...driver} key={driver.Driver.driverId} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    drivers {
      id
      data {
        DriverStandings {
          Constructors {
            constructorId
            name
            nationality
            url
          }
          Driver {
            code
            dateOfBirth
            driverId
            familyName
            nationality
            givenName
            permanentNumber
            url
          }
          points
          position
          positionText
          wins
        }
        round
        season
      }
    }
  }
`

export default DriversPage
