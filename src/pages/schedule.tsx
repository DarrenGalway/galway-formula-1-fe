import * as React from 'react'
import { DateTime } from 'luxon'
import { Layout } from '../components/Layout'
import { IRace } from '../types'
import { graphql } from 'gatsby'

const Race = (race: IRace) => {
  const formatDate = React.useCallback((date: string, time: string) => {
    const parsedDate = DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)
    const parsedTime = DateTime.fromISO(time).toLocaleString(
      DateTime.TIME_SIMPLE
    )
    return `${parsedDate} at ${parsedTime}`
  }, [])

  const isComplete = React.useMemo(
    () =>
      DateTime.now().startOf('day') >
      DateTime.fromISO(race.date).startOf('day').plus({ hours: 12 }),
    [race.date]
  )
  return (
    <li
      className={`grid lg:grid-cols-2 border-b border-gray-800 p-4 ${
        isComplete && 'opacity-50'
      }`}
    >
      <span>{race.raceName}</span>
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

interface PageData {
  data: {
    schedule: {
      data: IRace[]
    }
  }
}

export const SchedulePage = ({
  data: {
    schedule: { data },
  },
}: PageData) => {
  const [upcoming, setUpcoming] = React.useState(true)
  const completedRaces = React.useMemo(
    () =>
      data
        .filter(
          (race) =>
            DateTime.now().startOf('day') >
            DateTime.fromISO(race.date).startOf('day').plus({ hours: 12 })
        )
        .reverse(),
    [data]
  )

  const upcomingRaces = React.useMemo(
    () =>
      data?.filter(
        (race) =>
          DateTime.now().startOf('day') <
          DateTime.fromISO(race.date).startOf('day').plus({ hours: 12 })
      ),
    [data]
  )

  const races = React.useMemo(
    () => (upcoming ? upcomingRaces : completedRaces),
    [upcoming]
  )

  return (
    <Layout title="Schedule" description="Formula 1 schedule">
      <div className="container mx-auto px-4">
        <div className="flex mb-4 border-b border-gray-800 py-2">
          <button
            className={`p-4 mr-2 uppercase tracking-wider text-sm ${
              upcoming && 'text-teal-300 bg-gray-800 rounded'
            }`}
            onClick={() => setUpcoming(true)}
          >
            Upcoming
          </button>
          <button
            className={`p-4 uppercase tracking-wider text-sm ${
              !upcoming && 'text-teal-300 bg-gray-800 rounded'
            }`}
            onClick={() => setUpcoming(false)}
          >
            Completed
          </button>
        </div>

        <div className="hidden lg:grid grid-cols-2 p-4 text-gray-400 uppercase tracking-wider text-xs">
          <span>Name</span>
          <span>Date</span>
        </div>

        <ul className="border border-gray-800 rounded">
          {races?.map((race: IRace) => (
            <Race {...race} key={race.raceName} />
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
