import * as React from 'react'
import { Layout } from '../components/Layout'
import { getColor } from '../config/teams'
import { IConstructorStandings, IConstructorStandingsResponse } from '../types'

const Constructor = (constructor: IConstructorStandings) => (
  <li className="flex border-b border-gray-800 last:border-none p-4">
    <span className="flex-1">{constructor.position}</span>
    <span
      style={{
        color: getColor(constructor.Constructor.constructorId),
      }}
      className="flex-1 flex"
    >
      <span
        className="w-1 h-full rounded mr-2"
        style={{
          backgroundColor: getColor(constructor.Constructor.constructorId),
        }}
      ></span>
      {constructor.Constructor.name}
    </span>
    <span className="flex-1">{constructor.Constructor.nationality}</span>
    <span className="flex-1">{constructor.points}</span>
  </li>
)
export const ConstructorsPage = () => {
  const [constructorsData, setConstructorsData] =
    React.useState<IConstructorStandingsResponse>()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      const response = await fetch(`${process.env.GATSBY_API_URL}/constructors`)
      const { data } = await response.json()
      setConstructorsData(data[0])
      console.log(data)
      setLoading(false)
    })()
  }, [])

  return (
    <Layout
      title="Constructors leaders"
      description="Formula 1 constructors championship leaders"
    >
      <div className="container mx-auto px-4">
        <div className="flex p-4">
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Pos
          </span>
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Constructor
          </span>
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Nationality
          </span>
          <span className="flex-1 text-xs uppercase tracking-wider text-gray-400">
            Points
          </span>
        </div>
        {loading && <div className="flex justify-center">Loading...</div>}
        {!loading && (
          <ul className="border border-gray-800 rounded">
            {constructorsData?.ConstructorStandings.map((constructor) => (
              <Constructor
                {...constructor}
                key={constructor.Constructor.constructorId}
              />
            ))}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default ConstructorsPage
