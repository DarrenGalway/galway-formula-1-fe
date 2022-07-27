import * as React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { IConstructorStandingsResponse } from '../types'
import Constructor from '../components/Constructor'
import { motion, useAnimation } from 'framer-motion'

interface PageData {
  data: {
    constructors: {
      data: IConstructorStandingsResponse
    }
  }
}

const MotionConstructor = motion(Constructor)

export const ConstructorsPage = ({
  data: {
    constructors: { data },
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
          {data?.ConstructorStandings.map((builder, i) => (
            <MotionConstructor
              custom={i}
              animate={controls}
              initial={{ opacity: 0, x: -10 }}
              {...{ builder }}
              key={builder.Constructor.constructorId}
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
