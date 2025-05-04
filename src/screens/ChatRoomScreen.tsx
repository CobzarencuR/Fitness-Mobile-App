import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, FlatList, TextInput, Button, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { ChatContext } from '../context/ChatContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { UserContext } from '../context/UserContext';

type ChatRoomScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>;

export default function ChatRoomScreen({ route }: ChatRoomScreenProps) {
    const { roomId, roomName } = route.params;
    const { socket } = useContext(ChatContext);
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState('');
    const flatRef = useRef<FlatList>(null);
    const { user } = useContext(UserContext);

    // Scroll to bottom as soon as the component first mounts
    useEffect(() => {
        if (flatRef.current) {
            // delay until after layout
            setTimeout(() => {
                flatRef.current?.scrollToEnd({ animated: false });
            }, 0);
        }
    }, []);

    // And still scroll whenever new messages arrive
    useEffect(() => {
        if (messages.length && flatRef.current) {
            setTimeout(() => {
                flatRef.current?.scrollToEnd({ animated: true });
            }, 0);
        }
    }, [messages]);

    // load history
    useEffect(() => {
        fetch(`http://10.0.2.2:3000/chatRooms/${roomId}/messages`)
            .then(r => r.json())
            .then(data => setMessages(data));  // triggers the scroll‐effect above

        socket.emit('joinRoom', roomId);

        socket.on('message', (msg: any) => {
            if (String(msg.roomId) === String(roomId)) {
                setMessages(m => [...m, msg]);  // also triggers scroll
            }
        });
        return () => void socket.off('message');
    }, [roomId]);

    const send = async () => {
        const userId = Number(await AsyncStorage.getItem('loggedInUserId'));
        if (!text.trim()) return;
        socket.emit('newMessage', { roomId, userId, text });
        setText('');
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <FlatList
                ref={flatRef}
                data={messages}
                keyExtractor={m => String(m.id)}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
                onContentSizeChange={() => {
                    flatRef.current?.scrollToEnd({ animated: false });
                }}
                renderItem={({ item }) => {
                    const isMine = user && item.username === user.username;
                    return (
                        <View style={isMine
                            ? styles.myMessageContainer
                            : styles.otherMessageContainer}>
                            <View style={isMine
                                ? styles.myBubble
                                : styles.otherBubble}>
                                <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
                                <Text style={styles.messageText}>{item.text}</Text>
                                <Text style={styles.timestamp}>
                                    {new Date(item.created_at).toLocaleTimeString()}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />

            <View style={{ flexDirection: 'row', padding: 8 }}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    style={{ flex: 1, borderWidth: 1, borderRadius: 5, padding: 8 }}
                    placeholder={`Message #${roomName}`}
                />
                <Button title="Send" onPress={send} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    // outer wrapper for each message
    myMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 4,
        paddingHorizontal: 8,
    },
    otherMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 4,
        paddingHorizontal: 8,
    },

    // the “bubble” itself
    myBubble: {
        backgroundColor: '#DCF8C6',      // light green like WhatsApp
        padding: 10,
        borderRadius: 16,
        borderBottomRightRadius: 0,      // “tail” effect
        maxWidth: '75%',
    },
    otherBubble: {
        backgroundColor: '#FFF',         // white
        padding: 10,
        borderRadius: 16,
        borderBottomLeftRadius: 0,
        maxWidth: '75%',
    },

    messageText: {
        fontSize: 16,
        color: '#000',
    },

    timestamp: {
        fontSize: 10,
        color: '#666',
        alignSelf: 'flex-end',
        marginTop: 4,
    },
});
