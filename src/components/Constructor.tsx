import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { getColor } from '../config/teams'
import { IConstructorStandings } from '../types'

const Constructor = React.forwardRef<
  HTMLLIElement,
  { builder: IConstructorStandings; pointsDelta: number }
>(({ builder, pointsDelta }, ref) => {
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
        builder.Constructor.constructorId
      )
    })

  return (
    <li
      className="flex items-center border-b border-gray-800 last:border-none p-4"
      {...{ ref }}
    >
      <span className="flex-none w-16">{builder.position}</span>
      <span
        className="flex-1 flex items-center"
        style={{ color: getColor(builder.Constructor.constructorId) }}
      >
        <GatsbyImage
          image={getImage(imageData)!}
          className="w-36 hidden lg:block flex-none mr-4"
          alt={builder.Constructor.name}
        />
        {builder.Constructor.name}
      </span>
      <span className="flex-1 hidden lg:block">
        {builder.Constructor.nationality}
      </span>
      <span className="flex-none w-24 flex items-center">
        <span>{builder.points}</span>
        {pointsDelta > 0 && (
          <span className="text-red-400 text-xs ml-auto">-{pointsDelta}</span>
        )}
      </span>
    </li>
  )
})

export default Constructor
