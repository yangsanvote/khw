import { motion } from 'framer-motion';

interface RegionToggleProps {
  activeRegion: '양주동' | '동면';
  onChange: (region: '양주동' | '동면') => void;
}

const RegionToggle = ({ activeRegion, onChange }: RegionToggleProps) => {
  return (
    <div className="flex rounded-full bg-white p-1 shadow-sm w-full max-w-xs mx-auto">
      <button
        className={`relative flex-1 rounded-full py-2 text-sm font-medium transition-colors focus:outline-none ${
          activeRegion === '양주동' ? 'text-white' : 'text-[#623D91]'
        }`}
        onClick={() => onChange('양주동')}
      >
        {activeRegion === '양주동' && (
          <motion.div
            className="absolute inset-0 bg-[#623D91] rounded-full"
            layoutId="regionToggle"
            transition={{ type: 'spring', duration: 0.5 }}
          />
        )}
        <span className="relative z-10">양주동</span>
      </button>
      
      <button
        className={`relative flex-1 rounded-full py-2 text-sm font-medium transition-colors focus:outline-none ${
          activeRegion === '동면' ? 'text-white' : 'text-[#623D91]'
        }`}
        onClick={() => onChange('동면')}
      >
        {activeRegion === '동면' && (
          <motion.div
            className="absolute inset-0 bg-[#623D91] rounded-full"
            layoutId="regionToggle"
            transition={{ type: 'spring', duration: 0.5 }}
          />
        )}
        <span className="relative z-10">동면</span>
      </button>
    </div>
  );
};

export default RegionToggle; 