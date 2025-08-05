"use client"
import { WindowTypes } from '@/types/windowTypes';
import { FolderIcon, CogIcon, DocumentIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

interface DesktopIconProps {
  id: string;
  type: WindowTypes;
  name: string;
  position: { x: number; y: number };
  onDoubleClick: () => void;
}

const DesktopIcon = ({ name, type, position, onDoubleClick }: DesktopIconProps) => {

  // CHANGE: Updated icon colors and added a drop shadow for the Vista look
  const getIcon = () => {
    const iconStyle = "w-12 h-12 drop-shadow-lg"; // Common style for all icons
    switch (type) {
      case 'folder':
        return <FolderIcon className={`${iconStyle} text-yellow-500`} />;
      case 'settings':
        return <CogIcon className={`${iconStyle} text-slate-400`} />;
      case 'document':
        return <DocumentIcon className={`${iconStyle} text-slate-100`} />;
      case 'home':
        return <ComputerDesktopIcon className={`${iconStyle} text-blue-300`} />
      default:
        return <FolderIcon className={iconStyle} />;
    }
  };

  return (
    <div
      className="absolute flex flex-col items-center w-24 p-1 rounded-md cursor-pointer transition-colors hover:bg-sky-400/30 focus:bg-sky-500/50 focus:outline-none border border-transparent focus:border-sky-400/60"
      style={{
        left: position.x,
        top: position.y,
      }}
      onDoubleClick={onDoubleClick}
      tabIndex={0} // Makes the div focusable for selection effect
    >
      {/* The container for the icon no longer needs special styling */}
      <div>
        {getIcon()}
      </div>
      
      {/* CHANGE: Added a text-shadow for readability */}
      <span 
        className="px-1 text-sm text-center text-white"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
      >
        {name}
      </span>
    </div>
  );
};

export default DesktopIcon;