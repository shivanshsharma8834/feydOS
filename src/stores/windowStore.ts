import { WindowTypes } from '@/types/windowTypes';
import { title } from 'process';
import { create } from 'zustand';

type Window = {
    id: string;
    title: string;
    type: WindowTypes;
    position: { x: number , y: number };
    size: { width: number , height: number };
    zIndex: number;
    minimized: boolean;
    maximized: boolean;
};

type WindowStore = {
    windows: Window[];
    focusedWindow: string | null;
    maxZIndex: number;
    openWindow: (type : WindowTypes, title: string) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    toggleMinimize: (id: string) => void;
    toggleMaximize: (id: string) => void;
    updatePosition: (id: string, position: { x: number, y: number }) => void;
    updateSize: (id: string, size: { width: number, height: number }) => void; 
}

const useWindowStore = create<WindowStore>((set) => ({
    windows: [],
    focusedWindow: null,
    maxZIndex: 100,

    openWindow: (type, title) => set((state) => {
        const newWindow : Window = {
            id : `window-${Date.now()}`,
            type: type,
            title: title,
            position: { x: state.windows.length * 30 + 100, y: state.windows.length * 30 + 100 },
            size: {width: 600, height: 400 },
            zIndex: state.maxZIndex + 1,
            minimized: false,
            maximized: false,
        };

        return {
            windows: [...state.windows, newWindow]
        }

    }),

    closeWindow: (id) => set((state) => ({
        windows: state.windows.filter(window => window.id !== id)
    })),

    focusWindow: (id) => set((state) => {
        const newZIndex = state.maxZIndex + 1;
        return {
            windows: state.windows.map(window => 
                window.id === id
                ? {...window, zIndex: newZIndex}
                : window
            ),  
            maxZIndex: newZIndex,
            focusedWindow: id
        }
    }),

    toggleMinimize: (id) => set((state) => ({
        windows: state.windows.map(window => 
            window.id === id
            ? { ...window, minimized: !window.minimized}
            : window
        )
    })),

    toggleMaximize: (id) => set((state) => ({
        windows: state.windows.map(window => 
            window.id === id 
            ? { ...window, maximized: !window.maximized}
            : window
        )
    })),

    updatePosition: (id, position) => set((state) => ({
        windows: state.windows.map(window => 
            window.id === id 
            ? {...window, position} 
            : window
        )
    })),

    updateSize: (id, size) => set((state) => ({
        windows: state.windows.map(window => 
            window.id === id 
            ? {...window, size}
            : window
        )
    }))
}));

export default useWindowStore;