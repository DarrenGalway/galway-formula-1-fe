import * as React from 'react'
import { DateTime } from 'luxon'
import { Layout } from '../components/Layout'
import { IRace } from '../types'
import { graphql } from 'gatsby'
import { motion, useAnimation } from 'framer-motion'

const createDateTime = (date: string, time: string) =>
  DateTime.fromISO(`${date}T${time}`)

const formatDate = (date: string, time: string) =>
  createDateTime(date, time).toFormat("ccc LLL, d 'at' h:mma")

const isComplete = (date: string, time: string) =>
  DateTime.now() > createDateTime(date, time).plus({ hours: 2 })

const CompletedVisual = ({
  completed,
  total,
}: {
  completed: number
  total: number
}) => {
  return (
    <div className="w-full h-1 flex-none bg-gray-800">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(completed / total) * 100}%` }}
        transition={{ ease: 'easeOut', duration: 1.5 }}
        className="bg-teal-300 text-teal-900 h-full text-xs text-center"
      ></motion.div>
    </div>
  )
}

const Race = React.forwardRef<HTMLLIElement, { race: IRace }>(
  ({ race }, ref) => {
    return (
      <li
        {...{ ref }}
        className={`text-sm lg:text-base grid lg:grid-cols-2 border-b border-gray-800 p-4 ${
          isComplete(race.date, race.time) && 'text-gray-500'
        }`}
      >
        <span className="mb-4 lg:mb-0">{race.raceName}</span>
        <div className="grid grid-cols-2">
          <span className="border-b py-2 border-gray-800">FP1:</span>
          <span className="border-b py-2 border-gray-800">
            {formatDate(race.FirstPractice.date, race.FirstPractice.time)}
          </span>
          <span className="border-b py-2 border-gray-800">FP2:</span>
          <span className="border-b py-2 border-gray-800">
            {formatDate(race.SecondPractice.date, race.SecondPractice.time)}
          </span>
          {race.ThirdPractice && (
            <>
              <span className="border-b py-2 border-gray-800">FP3:</span>
              <span className="border-b py-2 border-gray-800">
                {formatDate(race.ThirdPractice.date, race.ThirdPractice.time)}
              </span>
            </>
          )}
          <span className="border-b py-2 border-gray-800">Quali:</span>
          <span className="border-b py-2 border-gray-800">
            {formatDate(race.Qualifying.date, race.Qualifying.time)}
          </span>
          {race.Sprint && (
            <>
              <span className="border-b py-2 border-gray-800">Sprint:</span>
              <span className="border-b py-2 border-gray-800">
                {formatDate(race.Sprint.date, race.Sprint.time)}
              </span>
            </>
          )}
          <span className="py-2">Race:</span>
          <span className="py-2">{formatDate(race.date, race.time)}</span>
        </div>
      </li>
    )
  }
)

interface PageData {
  data: {
    schedule: {
      data: IRace[]
    }
  }
}

const MotionRace = motion(Race)

export const SchedulePage = ({
  data: {
    schedule: { data },
  },
}: PageData) => {
  const controls = useAnimation()
  const [upcoming, setUpcoming] = React.useState(true)
  const completedRaces = React.useMemo(
    () => data.filter(({ date, time }) => isComplete(date, time)).reverse(),
    [data]
  )
  React.useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }))
  }, [data, upcoming])

  const upcomingRaces = React.useMemo(
    () => data.filter(({ date, time }) => !isComplete(date, time)),
    [data]
  )

  const races = React.useMemo(
    () => (upcoming ? upcomingRaces : completedRaces),
    [upcoming]
  )

  return (
    <Layout title="Schedule" description="Formula 1 schedule">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap mb-4 items-center py-2">
          <button
            className={`p-4 flex-1 lg:flex-none mr-2 uppercase tracking-wider text-sm ${
              upcoming && 'text-teal-300 bg-gray-800 rounded'
            }`}
            onClick={() => setUpcoming(true)}
          >
            Upcoming ({upcomingRaces.length})
          </button>
          <button
            className={`p-4 flex-1 lg:flex-none uppercase tracking-wider text-sm ${
              !upcoming && 'text-teal-300 bg-gray-800 rounded'
            }`}
            onClick={() => setUpcoming(false)}
          >
            Completed ({completedRaces.length})
          </button>
          <CompletedVisual
            completed={completedRaces.length}
            total={data.length}
          />
        </div>

        <div className="hidden lg:grid grid-cols-2 p-4 text-gray-400 uppercase tracking-wider text-xs">
          <span>Name</span>
          <span>Date (year: {DateTime.now().toFormat('y')})</span>
        </div>

        <ul className="border border-gray-800 rounded">
          {races?.map((race, i) => (
            <MotionRace
              custom={i}
              animate={controls}
              initial={{ opacity: 0 }}
              {...{ race }}
              key={race.raceName}
            />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    schedule {
      data {
        Circuit {
          circuitName
          circuitId
          url
          Location {
            country
            lat
            locality
            long
          }
        }
        FirstPractice {
          time
          date
        }
        Qualifying {
          date
          time
        }
        SecondPractice {
          date
          time
        }
        Sprint {
          date
          time
        }
        ThirdPractice {
          date
          time
        }
        date
        raceName
        round
        season
        time
        url
      }
    }
  }
`

export default SchedulePage
