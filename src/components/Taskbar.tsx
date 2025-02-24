'use client'

import { Battery50Icon, ChevronUpIcon, ClockIcon, CogIcon, DocumentIcon, FolderIcon, SpeakerWaveIcon, WifiIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const Taskbar = () => {

    const [showStartMenu, setShowStartMenu] = useState(false);
    const [time, setTime] = useState(new Date());

    const startMenuApps = [
        {id: 'explorer', name: 'File Explorer', icon: FolderIcon },
        {id: 'settings', name: 'Settings', icon: CogIcon },
        {id: 'document', name: 'New Docuement', icon: DocumentIcon }
    ]

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = () => {
            if (showStartMenu) setShowStartMenu(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showStartMenu]);

    return (
        // Main Taskbar
        <div className="fixed bottom-2 left-0 right-0 w-full h-12 bg-gray-800/20 backdrop-blur-sm flex items-center justify-between px-2 border-t border-gray-700/50 rounded-xl md:left-1/2 md:right-auto md:w-3/4 md:-translate-x-1/2 border-2">
            {/* Start Button and Menu */}
            <div className="relative flex flex-row items-center h-full flex-grow">
                <button className={`h-9 px-3 flex flex-row items-center space-x-2 ${
                    showStartMenu ? 'bg-gray-700/50' : 'hover:bg-gray-700/30'
                } rounded-xl transition-colors` }
                onClick={(e) => {
                    e.stopPropagation();
                    setShowStartMenu(!showStartMenu);
                }}
                >
                    <span className="text-2xl font-bold text-blue-400">⌘</span>
                    <span className="text-white font-medium">Start</span>
                </button>

            {showStartMenu && (
                <div className="absolute bottom-12 left-2 w-64 bg-gray-800/80 rounded-lg shadow-xl backdrop-blur-sm border border-gray-700">
                    <div className="p-2 border-b border-gray-700">
                        <h2 className="text-white font-semibold px-2">Applications</h2>
                    </div>
                    <div className="py-2">
                        {startMenuApps.map((app) => (
                             <button
                             key={app.id}
                             onClick={() => {}}
                             className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700/50"
                             >
                                <app.icon className="w-5 h-5 mr-3 "/>
                                {app.name}
                             </button>
                        )  
                        )}
                    </div>
                </div>
            )}

            {/* Open Windows */}
            <div className="flex flex-1 items-center h-full ml-2 overflow-x-auto">
                Open windows
            </div>

            {/* System Tray */}
            <div className=" flex space-x-3 pr-2">
                {/* Tray Icons */}
                <div className="flex flex-row items-center space-x-2">
                    <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                    <WifiIcon className="w-5 h-5 text-gray-400" />
                    <SpeakerWaveIcon className="w-5 h-5 text-gray-400" />
                    <Battery50Icon className="w-5 h-5 text-gray-400" />
                </div>
                {/* Clock */}
                <div className="flex flex-row items-center px-2 py-1 bg-gray-700/50 rounded-xl space-x-2">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-200 text-sm">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
                    </span>
                </div>
            </div>
           
            </div> 
        </div>
    )
}

export default Taskbar;