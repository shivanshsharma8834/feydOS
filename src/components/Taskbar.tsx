'use client'

import useWindowStore from "@/stores/windowStore";
import { WindowTypes } from "@/types/windowTypes";
import { 
    Battery50Icon, ChevronUpIcon, ClockIcon, CogIcon, ComputerDesktopIcon, 
    DocumentIcon, FolderIcon, SpeakerWaveIcon, WifiIcon, PhotoIcon, 
    MusicalNoteIcon, PuzzlePieceIcon, MagnifyingGlassIcon, PowerIcon, LockClosedIcon,
    UserCircleIcon, ChevronRightIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

// A simple Windows logo icon component
const WindowsLogoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.025 4.5H4.5V11.025H11.025V4.5Z" fill="white"/>
        <path d="M19.5 4.5H12.975V11.025H19.5V4.5Z" fill="white"/>
        <path d="M11.025 12.975H4.5V19.5H11.025V12.975Z" fill="white"/>
        <path d="M19.5 12.975H12.975V19.5H19.5V12.975Z" fill="white"/>
    </svg>
);

// Define interfaces for our menu items
interface MenuItem {
    id: string;
    type: WindowTypes;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
}

const Taskbar = () => {
    const openWindow = useWindowStore((state) => (state.openWindow));
    const windows = useWindowStore((state) => (state.windows));
    const [showStartMenu, setShowStartMenu] = useState(false);
    const [time, setTime] = useState(new Date());

    // Left Pane Applications
    const startMenuApps: MenuItem[] = [
        { id: '1', type: 'explorer', name: 'File Explorer', icon: FolderIcon },
        { id: '2', type: 'settings', name: 'Settings', icon: CogIcon },
        { id: '3', type: 'document', name: 'New Document', icon: DocumentIcon },
        { id: '4', type: 'photo-gallery', name: 'Photo Gallery', icon: PhotoIcon },
        { id: '5', type: 'media-player', name: 'Media Player', icon: MusicalNoteIcon },
    ];

    // Right Pane System Links
    const startMenuSystemLinks: Omit<MenuItem, 'type'>[] = [
        { id: 'sys1', name: 'Documents', icon: DocumentIcon },
        { id: 'sys2', name: 'Pictures', icon: PhotoIcon },
        { id: 'sys3', name: 'Music', icon: MusicalNoteIcon },
        { id: 'sys4', name: 'Games', icon: PuzzlePieceIcon },
        { id: 'sys5', name: 'Computer', icon: ComputerDesktopIcon },
        { id: 'sys6', name: 'Control Panel', icon: CogIcon },
    ]

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const startMenu = document.getElementById('start-menu');
            if (showStartMenu && startMenu && !startMenu.contains(event.target as Node)) {
                setShowStartMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showStartMenu]);

    const getIcon = (type: WindowTypes) => {
        switch (type) {
            case 'folder': return <FolderIcon className="w-5 h-5 text-yellow-300" />;
            case 'settings': return <CogIcon className="w-5 h-5 text-gray-300" />;
            case 'document': return <DocumentIcon className="w-5 h-5 text-white" />;
            case 'home': return <ComputerDesktopIcon className="w-5 h-5 text-blue-300" />
            default: return <FolderIcon className="w-5 h-5" />;
        }
    };

    return (
        // Main Taskbar - Styled like Windows Vista
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-black/80 to-black/95 backdrop-blur-md flex items-center justify-between px-2 border-t border-sky-300/50 shadow-2xl z-50">
            {/* Left side: Start Orb and Open Windows */}
            <div className="flex items-center h-full">
                {/* Start Button and Menu */}
                <div className="relative flex items-center h-full">
                    <button
                        className={`relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700 rounded-full shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.6)]`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowStartMenu(!showStartMenu);
                        }}
                    >
                        <WindowsLogoIcon />
                    </button>

                    {showStartMenu && (
                         // VISTA START MENU - Two-pane layout
                        <div 
                            id="start-menu"
                            className="absolute bottom-14 left-0 w-[34rem] h-[30rem] flex flex-row rounded-lg shadow-2xl border border-sky-400/50 overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // Prevents menu from closing when clicking inside
                        >
                            {/* Left Pane (Light) */}
                            <div className="w-1/2 bg-gradient-to-b from-slate-100 to-slate-200 p-2 flex flex-col">
                                <div className="flex-grow space-y-1">
                                    {startMenuApps.map((app) => (
                                        <button key={app.id} onClick={() => openWindow(app.type, app.name)}
                                            className="flex items-center w-full px-3 py-2 text-black rounded-md hover:bg-blue-300/70 transition-colors text-left"
                                        >
                                            <app.icon className="w-6 h-6 mr-3 text-blue-600"/>
                                            <span className="font-medium">{app.name}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-400/50 pt-2 mt-2">
                                     <button className="flex items-center justify-between w-full p-2 text-black rounded-md hover:bg-blue-300/70 font-semibold">
                                        All Programs
                                        <ChevronRightIcon className="w-4 h-4" />
                                     </button>
                                </div>
                                <div className="mt-2 p-1 bg-gradient-to-b from-gray-200 to-gray-300 rounded-md border border-gray-400/80 shadow-inner flex items-center">
                                    <input type="text" placeholder="Start Search" className="bg-transparent flex-grow focus:outline-none px-2 text-black placeholder-gray-600"/>
                                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 mr-1"/>
                                </div>
                            </div>
                            
                            {/* Right Pane (Dark/Glassy) */}
                            <div className="w-1/2 bg-black/70 backdrop-blur-lg p-2 flex flex-col text-white">
                                 <div className="flex items-center p-2 mb-2 space-x-3 border-b border-white/20">
                                    <UserCircleIcon className="w-12 h-12 text-gray-300" />
                                    <span className="font-bold text-lg">Bill</span>
                                 </div>
                                <div className="flex-grow space-y-1">
                                    {startMenuSystemLinks.map((link) => (
                                        <button key={link.id} className="flex items-center w-full px-3 py-2 text-white rounded-md hover:bg-sky-500/40 transition-colors text-left">
                                            <link.icon className="w-6 h-6 mr-3"/>
                                            <span className="font-semibold">{link.name}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-end items-center pt-2 mt-2 border-t border-white/20 space-x-3 pr-2">
                                     <button className="p-1 rounded-md hover:bg-sky-500/50"><LockClosedIcon className="w-6 h-6" /></button>
                                     <button className="p-1 rounded-md hover:bg-red-500/50"><PowerIcon className="w-6 h-6" /></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Open Windows */}
                <div className="flex flex-row items-center h-full ml-2">
                    {windows.map((window) => (
                        <button key={window.id} className="text-white h-10 px-3 transition-all duration-200 rounded-md flex items-center gap-x-2 mx-1 bg-black/20 border border-white/20 border-t-white/40 hover:bg-sky-400/30 shadow-md">
                            {getIcon(window.type)}
                            <span className="truncate max-w-28 text-sm">{window.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* System Tray */}
            <div className="flex items-center space-x-3 pr-2 h-full">
                <div className="flex items-center space-x-2">
                    <ChevronUpIcon className="w-4 h-4 text-gray-300" />
                    <WifiIcon className="w-5 h-5 text-gray-300" />
                    <SpeakerWaveIcon className="w-5 h-5 text-gray-300" />
                    <Battery50Icon className="w-5 h-5 text-gray-300" />
                </div>
                <div className="flex items-center px-2 py-1 space-x-2">
                    <span className="text-gray-200 text-sm">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <ClockIcon className="w-4 h-4 text-gray-300" />
                </div>
            </div>
        </div>
    )
}

export default Taskbar;