import React, { createContext, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChatContextValue {
    socket: Socket;
}
export const ChatContext = createContext<ChatContextValue>(null!);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socket = useRef<Socket>(
        io('http://10.0.2.2:3000', {
            transports: ['websocket'],
            autoConnect: false,
        })
    ).current;

    useEffect(() => {
        socket.connect();
        AsyncStorage.getItem('auth-token').then(token => {
            if (token) {
                socket.emit('authenticate', token);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <ChatContext.Provider value={{ socket }}>
            {children}
        </ChatContext.Provider>
    );
};
