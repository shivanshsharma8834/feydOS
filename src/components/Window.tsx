"use client"
import { Rnd } from 'react-rnd';
import { XMarkIcon, MinusIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

interface WindowProps {
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  outlineColor?: string;
  className?: string;
}

const Window = ({
  title,
  children,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 400, height: 300 },
  className,
}: WindowProps) => {
  return (
    <Rnd
      default={{
        ...initialPosition,
        ...initialSize,
      }}
      dragGrid={[1, 1]} 
      resizeGrid={[1, 1]}
      minWidth={300}
      minHeight={200}
      bounds="window"
      dragHandleClassName="drag-handle"
      enableResizing={{
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
        top: true,
        topLeft: true,
        topRight: true,
      }}
      className={twMerge("transition-transform duration-150 ease-out shadow-xl border-[3px] rounded-lg overflow-hidden border-[#e06d75] backdrop-blur-sm", className)}
    >
      <div className="drag-handle flex items-center justify-between px-4 py-2 bg-gray-700/80 cursor-move select-none border-b-[3px] border-[#e06d75] backdrop-blur-sm">
        <h3 className="text-gray-200 font-semibold">{title}</h3>
        <div className="flex space-x-3">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400"
            >
              <MinusIcon className="w-3 h-3 text-gray-900" />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400"
          >
            <XMarkIcon className="w-3 h-3 text-gray-900" />
          </button>
        </div>
      </div>
      <div className="p-4 h-[calc(100%-40px)] text-gray-100 overflow-auto bg-gray-800/90">
        {children}
      </div>
    </Rnd>
  );
};

export default Window;