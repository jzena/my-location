import React, { useEffect, useState } from 'react';
import LiveLocation from './components/LiveLocation';
import Position from './components/Position';

interface Coordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
}

const POSITION_VIEW = 'position'
const LIVE_LOCATION_VIEW = 'live-location'

const App: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState(POSITION_VIEW)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
          });
        },
        () => {
          setError('Unable to retrieve your location.');
        }
      );
    }
  }, []);

  const handlePositionClick = () => {
    setView(POSITION_VIEW)
  }
  const handleLiveLocationClick = () => {
    setView(LIVE_LOCATION_VIEW)
  }

  return (
    <div className='w-[100%] h-screen'>
      <div className='w-[100%] flex justify-center text-[24px] font-[600] font-mono mt-[10px]'>My location</div>
      <div className='w-[100%] flex justify-center space-x-2 mt-[40px]'>
        <div
          className={`px-3 border rounded text-[14px] text-white cursor-pointer hover:bg-[purple]/80
          ${view === POSITION_VIEW ? 'bg-[purple] shadow shadow-[purple]' : 'bg-[#5F005F]'} `}
          onClick={handlePositionClick}
        >
          Position
        </div>
        <div
          className={`px-3 border rounded text-[14px] text-white cursor-pointer hover:bg-[purple]/80
          ${view === LIVE_LOCATION_VIEW ? 'bg-[purple] shadow shadow-[purple]' : 'bg-[#5F005F]'} `}
          onClick={handleLiveLocationClick}
        >
          Live Location
        </div>
      </div>

      <div className='w-[90%] lg:w-[40%] mx-auto border rounded border-gray-100 flex justify-center mt-[20px] p-2 shadow shadow-lg'>
        {
          view === POSITION_VIEW ? 
          ( <Position
              error={error}
              location={location}
            /> ) :
          ( <LiveLocation /> )
        }
      </div>


    </div>
  )
};

export default App;
