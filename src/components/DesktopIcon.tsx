"use client"
import { useDrag } from 'react-dnd';
import { FolderIcon, CogIcon, DocumentIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

interface DesktopIconProps {
  id: string;
  name: string;
  type: 'folder' | 'settings' | 'document' | 'home';
  position: { x: number; y: number };
  onDoubleClick: () => void;
}

const DesktopIcon = ({ id, name, type, position, onDoubleClick }: DesktopIconProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'icon',
    item: { id, position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getIcon = () => {
    switch (type) {
      case 'folder':
        return <FolderIcon className="w-12 h-12 text-blue-400" />;
      case 'settings':
        return <CogIcon className="w-12 h-12 text-gray-400" />;
      case 'document':
        return <DocumentIcon className="w-12 h-12 text-green-400" />;
      case 'home':
        return <ComputerDesktopIcon className="w-12 h-12 text-orange-400" />
      default:
        return <FolderIcon className="w-12 h-12" />;
    }
  };

  return (
    <div
      ref={drag}
      className="absolute flex flex-col items-center w-20 gap-1 cursor-pointer group"
      style={{
        left: position.x,
        top: position.y,
        opacity: isDragging ? 0.5 : 1,
      }}
      onDoubleClick={onDoubleClick}
    >
      <div className="p-2 transition-colors rounded hover:bg-gray-700/30">
        {getIcon()}
      </div>
      <span className="px-1 text-sm text-center text-white transition-colors rounded group-hover:bg-blue-600/30">
        {name}
      </span>
    </div>
  );
};

export default DesktopIcon;