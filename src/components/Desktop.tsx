"use client"
import { useState } from 'react';
import DesktopIcon from '@/components/DesktopIcon';
import Window from '@/components/Window';
import HomePage from '@/pages/HomePage';
import useWindowStore from '@/stores/windowStore';

interface DesktopItem {
  id: string;
  type: 'folder' | 'settings' | 'document' | 'home';
  name: string;
  position: { x: number; y: number };
}

const Desktop = () => {
  const [icons, setIcons] = useState<DesktopItem[]>([
    { id: '1', type: 'folder', name: 'Documents', position: { x: 50, y: 50 } },
    { id: '2', type: 'settings', name: 'Settings', position: { x: 50, y: 150 } },
    { id: '3', type: 'document', name: 'Readme', position: { x: 50, y: 250 } },
    { id: '4', type: 'home', name: 'Home', position: { x: 50, y: 350 } },
  ]);

  const windows = useWindowStore((state) => state.windows);

  // const [windows, setWindows] = useState<Array<{
  //   id: string;
  //   type: string;
  //   title: string;
  //   position: { x: number; y: number };
  //   size: { width: number; height: number };
  // }>>([]);

//   const handleIconMove = (id: string, newPosition: { x: number; y: number }) => {
//     setIcons(prev => prev.map(icon => 
//       icon.id === id ? { ...icon, position: newPosition } : icon
//     ));
//   };

  // const openWindow = (type: string) => {
  //   const newWindow = {
  //     id: `window-${Date.now()}`,
  //     type,
  //     title: type.charAt(0).toUpperCase() + type.slice(1),
  //     position: { x: windows.length * 30 + 100, y: windows.length * 30 + 100 },
  //     size: { width: 600, height: 400 },
  //   };
  //   setWindows(prev => [...prev, newWindow]);
  // };
  
  // const closeWindow = (id: string) => {
  //   setWindows(prev => prev.filter(window => window.id !== id));
  // };

  const closeWindow = useWindowStore((state) => state.closeWindow);

  const openWindow = useWindowStore((state) => state.openWindow);

  return (
    <div>
      <div className="relative w-screen h-screen bg-gray-900 bg-[url('/background3.jpg')] bg-cover bg-no-repeat bg-center"
      >
        {/* Desktop Icons */}
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            name={icon.name}
            type={icon.type}
            position={icon.position}
            onDoubleClick={() => openWindow(icon.type)}
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