const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args))

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const types = `
    type scheduleData {
      Sprint: SprintType
    }
    type SprintType {
      date: String
      time: String
    }
  `
  createTypes(types)
}

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const endpoint = process.env.GATSBY_API_URL
  const driversRequest = await fetch(`${endpoint}/drivers`)
  const constructorsRequest = await fetch(`${endpoint}/constructors`)
  const scheduleRequest = await fetch(`${endpoint}/schedule`)
  const resultsRequest = await fetch(`${endpoint}/results`)

  const driversData = await driversRequest.json()
  const constructorsData = await constructorsRequest.json()
  const scheduleData = await scheduleRequest.json()
  const resultsData = await resultsRequest.json()

  createNode({
    id: `constructor-data`,
    parent: null,
    children: [],
    data: constructorsData.data[0],
    internal: {
      type: `constructors`,
      contentDigest: createContentDigest(constructorsData.data),
    },
  })

  createNode({
    id: `results-data`,
    parent: null,
    children: [],
    data: resultsData.data,
    internal: {
      type: `results`,
      contentDigest: createContentDigest(resultsData.data),
    },
  })

  createNode({
    id: `schedule-data`,
    parent: null,
    children: [],
    data: scheduleData.data,
    internal: {
      type: `schedule`,
      contentDigest: createContentDigest(scheduleData.data),
    },
  })

  createNode({
    id: `driver-data`,
    parent: null,
    children: [],
    data: driversData.data[0],
    internal: {
      type: `drivers`,
      contentDigest: createContentDigest(driversData.data),
    },
  })
}
