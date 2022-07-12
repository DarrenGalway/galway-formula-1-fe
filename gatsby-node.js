// const fetch = (...args) =>
//   import(`node-fetch`).then(({ default: fetch }) => fetch(...args))

// exports.sourceNodes = async ({
//   actions: { createNode },
//   createContentDigest,
// }) => {
//   const response = await fetch(`http://${process.env.GATSBY_API_URL}/drivers`)
//   const { data } = await response.json()
//   createNode({
//     id: `driver-data`,
//     parent: null,
//     children: [],
//     data: data,
//     internal: {
//       type: `drivers`,
//       contentDigest: createContentDigest(data),
//     },
//   })
// }

// exports.sourceNodes = async ({
//   actions: { createNode },
//   createContentDigest,
// }) => {
//   const response = await fetch(
//     `http://${process.env.GATSBY_API_URL}/constructors`
//   )
//   const { data } = await response.json()
//   createNode({
//     id: `constructor-data`,
//     parent: null,
//     children: [],
//     data: data,
//     internal: {
//       type: `constructors`,
//       contentDigest: createContentDigest(data),
//     },
//   })
// }

// exports.sourceNodes = async ({
//   actions: { createNode },
//   createContentDigest,
// }) => {
//   const response = await fetch(`http://${process.env.GATSBY_API_URL}/schedule`)
//   const { data } = await response.json()
//   createNode({
//     id: `schedule-data`,
//     parent: null,
//     children: [],
//     data: data,
//     internal: {
//       type: `schedule`,
//       contentDigest: createContentDigest(data),
//     },
//   })
// }
