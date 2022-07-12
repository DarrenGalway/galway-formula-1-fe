import * as React from 'react'
import { DateTime } from 'luxon'
import { Layout } from '../components/Layout'
import { IRace, IScheduleResponse } from '../types'

const formatDate = (date: string) =>
  DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)
const formatTime = (time: string) =>
  DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE)

const Race = (race: IRace) => {
  const isComplete =
    DateTime.now().startOf('day') > DateTime.fromISO(race.date).startOf('day')
  return (
    <li
      className={`flex border-b border-gray-800 p-4 ${
        isComplete && 'opacity-50'
      }`}
    >
      <span className="flex-1">{race.raceName}</span>
      <div className="flex-1 grid grid-cols-2">
        <span className="border-b border-gray-800">FP1:</span>
        <span className="border-b border-gray-800">
          {formatDate(race.FirstPractice.date)}
        </span>
        <span className="border-b border-gray-800">FP2:</span>
        <span className="border-b border-gray-800">
          {formatDate(race.SecondPractice.date)}
        </span>
        <span className="border-b border-gray-800">Quali:</span>
        <span className="border-b border-gray-800">
          {formatDate(race.Qualifying.date)}
        </span>
        {race.Sprint && (
          <>
            <span className="border-b border-gray-800">Sprint:</span>
            <span className="border-b border-gray-800">
              {formatDate(race.Sprint.date)}
            </span>
          </>
        )}
        <span>Race:</span>
        <span>{formatDate(race.date)}</span>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <span className="border-b border-gray-800">FP1:</span>
        <span className="border-b border-gray-800">
          {formatTime(race.FirstPractice.time)}
        </span>
        <span className="border-b border-gray-800">FP2:</span>
        <span className="border-b border-gray-800">
          {formatTime(race.SecondPractice.time)}
        </span>
        <span className="border-b border-gray-800">Quali:</span>
        <span className="border-b border-gray-800">
          {formatTime(race.Qualifying.time)}
        </span>
        {race.Sprint && (
          <>
            <span className="border-b border-gray-800">Sprint:</span>
            <span className="border-b border-gray-800">
              {formatTime(race.Sprint.time)}
            </span>
          </>
        )}
        <span>Race:</span>
        <span>{formatTime(race.time)}</span>
      </div>
    </li>
  )
}
export const SchedulePage = () => {
  const [scheduleData, setSchedleData] = React.useState<IScheduleResponse>()
  const [loading, setLoading] = React.useState(true)
  const [upcoming, setUpcoming] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      const response = await fetch(`${process.env.GATSBY_API_URL}/schedule`)
      const { data } = await response.json()
      setSchedleData(data)
      setLoading(false)
    })()
  }, [])

  const completedRaces = scheduleData
    ?.filter(
      (race) =>
        DateTime.now().startOf('day') >
        DateTime.fromISO(race.date).startOf('day')
    )
    .reverse()

  const upcomingRaces = scheduleData?.filter(
    (race) =>
      DateTime.now().startOf('day') < DateTime.fromISO(race.date).startOf('day')
  )

  const races = upcoming ? upcomingRaces : completedRaces

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

        <div className="flex p-4 text-gray-400 uppercase tracking-wider text-xs">
          <span className="flex-1">Name</span>
          <span className="flex-1">Date</span>
          <span className="flex-1">Time</span>
        </div>
        {loading && <div className="flex justify-center">Loading...</div>}
        {!loading && (
          <ul className="border border-gray-800 rounded">
            {races?.map((race: IRace) => (
              <Race {...race} key={race.raceName} />
            ))}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default SchedulePage
