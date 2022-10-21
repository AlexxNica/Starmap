import { ScaleTime } from 'd3'
import NextLink from 'next/link';
import dayjs from 'dayjs'

import { getLinkForRoadmapChild } from '../../lib/client/linkUtils';
import { IssueData } from '../../lib/types'

function RoadmapItem({childIssue, scale, index}: {childIssue: IssueData, scale: ScaleTime<number, number>, index: number}) {

  const x = 50
  const y = 50
  const xPadding = 5
  const yPadding = 5
  const etaX = scale(dayjs(childIssue.dueDate).toDate())
  const ySpacingBetweenItems = 20
  const rectangleHeight = 50
  const rectConfig = {
    width: 300,
    height: 80,
    strokeWidth: 2
  }
  const minimumY = 90
  const yLocation = Math.max(y + yPadding + ((rectConfig.height + ySpacingBetweenItems) * index+1), minimumY)
  const textPadding = 10
  const rxSize = 10

  const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
  // TODO: Add on hover to show clickability
  return (
    <NextLink key={`roadmapItem-${index}`} href={getLinkForRoadmapChild(childIssue)} passHref>
      <g cursor={'pointer'}>
        <rect
          x={etaX-rectConfig.width}
          y={yLocation}
          width={rectConfig.width}
          height={rectConfig.height}
          fill="white"
          opacity={0.5}
          rx={rxSize}
          strokeWidth={rectConfig.strokeWidth}
          stroke="darkblue"
        />
        <rect
          x={etaX-rectConfig.width}
          y={yLocation}
          // width={rectConfig.width * (randomIntFromInterval(0, 100) / 100)}
          width={rectConfig.width * (childIssue.percent_done / 100)}
          height={rectConfig.height}
          fill="#93DEFF"
          // fill={'lightgreen'}
          opacity={0.95}
          rx={rxSize}
          ry={rxSize}
          // strokeWidth={rectConfig.strokeWidth}
          // stroke="black"
        />
        {/* <text dominantBaseline="text-before-edge" x={etaX-rectConfig.strokeWidth-textPadding} y={yLocation+yPadding} dy={'.05em'} fontSize={12} textAnchor="end">{childIssue.percent_done}% complete</text> */}
        {/* <text dominantBaseline="text-before-edge" x={etaX-rectConfig.width + rectConfig.width * (childIssue.percent_done / 100)+ 15} y={yLocation+yPadding+30} dy={'.05em'} fontSize={12} textAnchor="end">{childIssue.percent_done}%</text> */}
        <text dominantBaseline="text-before-edge" x={etaX-rectConfig.width+rectConfig.strokeWidth+textPadding} y={yLocation+yPadding} dy={'.05em'} fontSize={20} textAnchor="start">{childIssue.title}</text>
        {/* <text dominantBaseline="text-before-edge" x={etaX-rectConfig.width+rectConfig.strokeWidth+textPadding} y={yLocation+yPadding*6} dy={'.05em'} fontSize={16} textAnchor="start">state: {childIssue.state}</text> */}

        <text dominantBaseline="text-before-edge" x={etaX-rectConfig.strokeWidth-textPadding} y={yLocation+rectConfig.height-yPadding-textPadding*1.8} dy={'.05em'} fontSize={14} textAnchor="end">{childIssue.dueDate}</text>
      </g>
    </NextLink>
  )
}

export default RoadmapItem
//
