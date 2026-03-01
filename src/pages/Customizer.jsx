import React, {useState, useEffect} from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config'
import state from '../store';
import {download} from '../assets';
import {downloadCanvasToImage, reader} from '../config/helpers';
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants';
import {fadeAnimation, slideAnimation} from '../config/motion';
import { AIpicker, ColorPicker, CustomButtom,FilePicker,Tab } from '../components';
import { step } from 'three/src/nodes/math/MathNode.js';

const Customizer = () => {
  const snap = useSnapshot(state)
  return (
    <div>
      <AnimatePresence>
        {!snap.intro && (
          <>
            <motion.div
            key="custom"
            className='absolute top-100 left-0 z-10'
            {...slideAnimation('left')}
            >
              <div className='flex items-center min-h-scren'> 
                <div className='editortabs-container tabs'>
                  {EditorTabs.map((tab)=>(
                    <Tab
                      key={tab.key}
                      tab={tab}
                      handleClick={() => {}}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              className='absolute z-10 top-5 right-5'
              {...slideAnimation('right')}
            >
              <CustomButtom
              type="filled"
              title="go Back"
              handleClick={()=> state.intro = true}
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
              >

              </CustomButtom>
            </motion.div>
            <motion.div
             className='filtertabs-container'
              {...slideAnimation('up')}
            >
              {FilterTabs.map((tab)=>(
                    <Tab
                      key={tab.key}
                      tab={tab}
                      isFilter
                      isActiveTab=""
                      handleClick={() => {}}
                    />
                  ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Customizer