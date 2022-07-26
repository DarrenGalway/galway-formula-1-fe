import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { getColor } from '../config/teams'
import { IConstructorStandings } from '../types'

const Constructor = (constructor: IConstructorStandings) => {
  const { images } = useStaticQuery(graphql`
    query carQuery {
      images: allFile(filter: { relativeDirectory: { eq: "cars" } }) {
        edges {
          node {
            image: childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  `)

  const imageData = images.edges
    .map((point: any) => point.node.image)
    .find((image: any) => {
      return image.gatsbyImageData.images.fallback.src.includes(
        constructor.Constructor.constructorId
      )
    })

  return (
    <li className="flex items-center border-b border-gray-800 last:border-none p-4">
      <span className="flex-none w-16">{constructor.position}</span>
      <span
        className="flex-1 flex items-center"
        style={{ color: getColor(constructor.Constructor.constructorId) }}
      >
        <GatsbyImage
          image={getImage(imageData)!}
          className="w-36 hidden lg:block flex-none mr-4"
          alt={constructor.Constructor.name}
        />
        {constructor.Constructor.name}
      </span>
      <span className="flex-1 hidden lg:block">
        {constructor.Constructor.nationality}
      </span>
      <span className="flex-none w-16">{constructor.points}</span>
    </li>
  )
}

export default Constructor
