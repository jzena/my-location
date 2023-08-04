import { useState } from 'react'
import CircularProgress from './CircularProgress';

interface IPosition {
  error: any;
  location: any;
}

const FEET = 'feet'
const METERS = 'meters'
const Position = (props: IPosition) => {
  const {
    error,
    location
  } = props;
  const [unit, setUnit] = useState(FEET)

  const getAltitude = () => {
    const altitudeInMeters = location.altitude
    const altitudeInFeet = location.altitude * 3.28084
    return (
      (location.altitude && unit === FEET) ? `${altitudeInMeters.toFixed(2)} m` :
      (location.altitude && unit === METERS) ? `${altitudeInFeet.toFixed(2)} ft` :
      'Not available in your device'
    )
  }

  // handlers
  const handleUnitClick = () => {
    if (unit === METERS) {
      setUnit(FEET)
    } else if (unit === FEET) {
      setUnit(METERS)
    }
  }
  
  return (
    <div className='w-full my-[10px] px-[5px] flex justify-center'>
      {error ? (
        <div className='font-[300]'>Error: {error}</div>
      ) : location ? (
        <div className='w-full flex flex-col space-y-3'>
          <div className='w-[95%] mx-auto flex space-x-2 md:justify-center'>
            <span className='w-[70px] min-w-[70px] font-bold text-[13px]'>
              Latitude:
            </span>
            <span className='flex grow md:grow-0 md:!w-[250px] text-[13px] font-[300] border rounded px-2'>
              {location.latitude}
            </span>
          </div>

          <div className='w-[95%] mx-auto flex space-x-2 md:justify-center'>
            <span className='w-[70px] min-w-[70px] font-bold text-[13px]'>
              Longitude:
            </span>
            <span className='flex grow md:grow-0 md:!w-[250px] text-[13px] font-[300] border rounded px-2'>
              {location.longitude}
            </span>
          </div>

          <div className='w-[95%] mx-auto flex space-x-2 justify-start md:justify-center'>
            <span className='w-[70px] min-w-[70px] font-bold text-[13px]'>
              Altitude:
            </span>
            <span className={`${location.altitude ? 'grow md:grow-0 md:w-[198px]' : 'grow md:grow-0 md:w-[250px]'} flex text-[13px] font-[300] border rounded px-2`}>
              {getAltitude()}
            </span>
            {location.altitude && (
              <button
                className='rounded bg-black hover:bg-black/80 text-white text-[12px] font-[400] px-1 h-[21.5px]
                tracking-tighter flex items-center w-[44px] justify-center'
                onClick={handleUnitClick}
              >
                {unit}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className='flex space-x-2 items-center'>
          <span className='font-[300]'>Getting location...</span>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

export default Position