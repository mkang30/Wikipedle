import React from 'react'

type StatTileProps = {
    icon: string,
    value: string,
    label: string
}

function StatTile(props: StatTileProps) {
  return (
    <div className='stat-tile-wrapper' aria-label={props.label + ': ' + props.value}>
        <div className='stat-tile-icon'>
            {props.icon}
        </div>
        <div className='stat-tile-data'>
            <h3>{props.value}</h3>
            <p>{props.label}</p>
        </div>
    </div>
  )
}

export default StatTile