"use client"
import { useState } from 'react';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';
import HomePage from '@/pages/HomePage';
import useWindowStore from '@/stores/windowStore';
import { WindowTypes } from '@/types/windowTypes';

interface DesktopIcon {
  id: string;
  name: string;
  type: WindowTypes;
  position: { x: number; y: number };
}

const Desktop = () => {
  const [desktopIcons, setDesktopIcons] = useState<DesktopIcon[]>([
    { id: '1', name: 'Folder', type: 'folder', position: { x: 50, y: 50 } },
    { id: '2', name: 'Settings', type: 'settings', position: { x: 50, y: 150 } },
    { id: '3', name: 'Readme', type: 'document', position: { x: 50, y: 250 } },
    { id: '4', name: 'Home', type: 'home', position: { x: 50, y: 350 } },
  ]);

  const windows = useWindowStore((state) => state.windows);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const openWindow = useWindowStore((state) => state.openWindow);
  const minimizeWindow = useWindowStore((state) => state.toggleMinimize);
  const maximizeWindow = useWindowStore((state) => state.toggleMaximize);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  return (
    <div>
      <div className="relative w-screen h-screen bg-gray-900 bg-[url('/background3.jpg')] bg-cover bg-no-repeat bg-center"
      >
        {/* Desktop Icons */}
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            type={icon.type}
            name={icon.name}
            position={icon.position}
            onDoubleClick={() => openWindow(icon.type, icon.name)}
          />
        ))}

        {/* Windows */}
        {windows.map((window) => (
          <Window
            key={window.id}
            title={window.title}
            initialPosition={window.position}
            initialSize={window.size}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            isMaximized={window.minimized}
            isMinimized={window.maximized}
            zIndex={window.zIndex}
            focusWindow={() => focusWindow(window.id)}
          >
            <div className="p-4">
              {window.type === 'folder' && (
                <div>Folder Contents</div>
              )}
              {window.type === 'settings' && (
                <div>Settings Panel</div>
              )}
              {window.type === 'document' && (
                <div>Document Content</div>
              )}
              {window.type == 'home' && (
                <HomePage/>
              )}
            </div>
          </Window>
        ))}
      </div>
    </div>
  );
};

export default Desktop;