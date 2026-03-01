import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'

const Tab = ({tab, isFilterTab, isActiveTab, handleClick}) => {
  const snap = useSnapshot(state)

  const activeStyle = isFilterTab && isActiveTab 
    ? {backgroundColor: snap.color, opacity:0.5}
    : {backgroundColor: "transparent", opacity: 1}

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100':'rounded-4'}`}
      onClick={handleClick}
      style={activeStyle}
    >
      <img src={tab.icon} alt="" />
    </div>
  )
}

export default Tab