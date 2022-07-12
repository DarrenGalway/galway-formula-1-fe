import * as React from 'react'
import { Layout } from '../components/Layout'
import { IDriverStandings, IDriverStandingsResponse } from '../types'
import { getColor } from '../config/teams'

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

export const DriversPage = () => {
  const [driversData, setDriversData] =
    React.useState<IDriverStandingsResponse>()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      const response = await fetch(`${process.env.GATSBY_API_URL}/drivers`)
      const { data } = await response.json()
      setDriversData(data[0])
      setLoading(false)
    })()
  }, [])

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
        {loading && <div className="flex justify-center">Loading...</div>}
        {!loading && (
          <ul className="border border-gray-800 rounded">
            {driversData?.DriverStandings.map((driver) => (
              <Driver {...driver} key={driver.Driver.driverId} />
            ))}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default DriversPage
