"use client"
import { Rnd } from 'react-rnd';
// I've imported the new icons we'll need for the control buttons
import { XMarkIcon, MinusIcon, StopIcon, Square2StackIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

interface WindowProps {
  title: string;
  icon?: React.ReactNode; // Optional icon for the title bar
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  focusWindow: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  className?: string;
}

const Window = ({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  onMaximize,
  zIndex,
  focusWindow,
  isMinimized,
  isMaximized,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 520, height: 400 },
  className,
}: WindowProps) => {

  // Don't render the window if it's minimized
  if (isMinimized) {
    return null;
  }

  return (
    <Rnd
      default={{
        ...initialPosition,
        ...initialSize,
      }}
      dragGrid={[1, 1]}
      resizeGrid={[1, 1]}
      minWidth={350}
      minHeight={200}
      bounds="window"
      dragHandleClassName="drag-handle"
      enableResizing={!isMaximized} // Disable resizing when maximized
      size={isMaximized ? { width: '100vw', height: 'calc(100vh - 48px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      style={{ zIndex: zIndex }}
      // CHANGE: Updated styling for the main window frame for the "Aero" glass effect
      className={twMerge(
        "transition-transform duration-150 ease-out shadow-2xl shadow-black/40 border border-black/30 rounded-md overflow-hidden bg-black/20 backdrop-blur-xl", 
        className
      )}
    >
      {/* CHANGE: Title bar updated to have a glassy look and new buttons */}
      <div
        onClick={focusWindow}
        className="drag-handle h-10 flex items-center justify-between pl-2 pr-1 cursor-move select-none bg-gradient-to-b from-white/10 to-transparent"
      >
        <div className="flex items-center gap-x-2">
            {icon}
            <h3 className="text-white font-medium text-sm" style={{textShadow: '1px 1px 2px #000'}}>{title}</h3>
        </div>

        {/* CHANGE: Replaced macOS buttons with Vista-style buttons */}
        <div className="flex items-center space-x-1">
          <button onClick={onMinimize} className="w-8 h-6 flex items-center justify-center rounded-sm transition-colors hover:bg-blue-500/50">
            <MinusIcon className="w-5 h-5 text-white" style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />
          </button>
          
          <button onClick={onMaximize} className="w-8 h-6 flex items-center justify-center rounded-sm transition-colors hover:bg-blue-500/50">
            {isMaximized ? (
                 <Square2StackIcon className="w-5 h-5 text-white" style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />
            ) : (
                <StopIcon className="w-5 h-5 text-white" style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />
            )}
          </button>

          <button onClick={onClose} className="w-8 h-6 flex items-center justify-center rounded-sm transition-colors hover:bg-red-600">
            <XMarkIcon className="w-5 h-5 text-white" style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />
          </button>
        </div>
      </div>

      {/* CHANGE: Content area now has a solid white background */}
      <div
        onClick={focusWindow}
        className="h-[calc(100%-40px)] text-black overflow-auto bg-white"
      >
        {children}
      </div>
    </Rnd>
  );
};

export default Window;