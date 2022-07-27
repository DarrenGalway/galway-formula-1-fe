import * as React from 'react'
import { Layout } from '../components/Layout'
import { IDriverStandings } from '../types'
import { getColor } from '../config/teams'
import { graphql } from 'gatsby'
import { motion, useAnimation } from 'framer-motion'

const Driver = React.forwardRef<
  HTMLLIElement,
  { driver: IDriverStandings; pointsDelta: number }
>(({ driver, pointsDelta }, ref) => (
  <li
    className="flex border-b border-gray-800 last:border-none p-4"
    {...{ ref }}
  >
    <span className="flex-none w-16">{driver.position}</span>
    <span className="flex-1">
      {driver.Driver.givenName} {driver.Driver.familyName}
    </span>
    <span
      style={{ color: getColor(driver.Constructors[0].constructorId) }}
      className="flex-1 hidden lg:block"
    >
      {driver.Constructors[0].name}
    </span>
    <span className="hidden lg:block flex-1">{driver.Driver.nationality}</span>
    <span className="flex-none w-24 flex items-center">
      <span>{driver.points}</span>
      {pointsDelta > 0 && (
        <span className="text-red-400 text-xs ml-auto">-{pointsDelta}</span>
      )}
    </span>
  </li>
))

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

const MotionDriver = motion(Driver)

export const DriversPage = ({
  data: {
    drivers: { data },
  },
}: PageData) => {
  const controls = useAnimation()
  React.useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 },
    }))
  }, [data])

  return (
    <Layout
      title="Drivers leaders"
      description="Formula 1 drivers championship leaders"
    >
      <div className="container mx-auto px-4">
        <div className="flex p-4">
          <span className="flex-none w-16 text-xs uppercase tracking-wider text-gray-400">
            Pos
          </span>
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Driver
          </span>
          <span className="flex-1 hidden lg:block text-xs uppercase tracking-wider text-gray-400">
            Team
          </span>
          <span className="flex-1 hidden lg:block text-xs uppercase tracking-wider text-gray-400">
            Nationality
          </span>
          <span className="flex-none w-24 text-xs uppercase tracking-wider text-gray-400">
            Points
          </span>
        </div>
        <ul className="border border-gray-800 rounded">
          {data?.DriverStandings.map((driver, i) => (
            <MotionDriver
              custom={i}
              animate={controls}
              initial={{ opacity: 0, x: -10 }}
              {...{
                driver,
                pointsDelta:
                  parseInt(data?.DriverStandings[0].points) -
                  parseInt(driver.points),
              }}
              key={driver.Driver.driverId}
            />
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
