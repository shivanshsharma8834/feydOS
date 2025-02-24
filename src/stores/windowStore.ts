import { create } from 'zustand';

type Window = {
    id: string;
    title: string;
    type: 'explorer' | 'settings' | 'document';
    position: { x: number , y: number };
    size: { width: number , height: number };
    zIndex: number;
    minimized: boolean;
};

type WindowStore = {
    windows: Window[];
    focusedWindow: string | null;
    maxZIndex: number;
    openWindow: (config: Omit<Window, 'id' | 'zIndex' | 'minimized'>) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    toggleMinimize: (id: string) => void;
    updatePosition: (id: string, position: { x: number, y: number }) => void;
    updateSize: (id: string, size: { width: number, height: number }) => void; 
}

const useWindowStore = create<WindowStore>((set) => ({
    windows: [],
    focusedWindow: null,
    maxZIndex: 100,

    openWindow: (config) => set((state) => {
        const newZIndex = state.maxZIndex + 1;
        return {
            windows: [...state.windows, {
                ...config,
                id: `window_${Date.now()}`,
                zIndex: newZIndex,
                minimized: false
            }],
            maxZIndex: newZIndex,
            focusedWindow: `window_${Date.now()}`
        };
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