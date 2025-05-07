import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, ScrollView, TextInput, Button, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { ChatContext } from '../context/ChatContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { UserContext } from '../context/UserContext';

type ChatRoomScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>;

export default function ChatRoomScreen({ route }: ChatRoomScreenProps) {
    const { roomId, roomName } = route.params;
    const { socket } = useContext(ChatContext);
    const { user } = useContext(UserContext);

    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState('');
    const scrollRef = useRef<ScrollView>(null);

    // Load history
    useEffect(() => {
        fetch(`http://10.0.2.2:3000/chatRooms/${roomId}/messages`)
            .then(r => r.json())
            .then(data => setMessages(data));

        socket.emit('joinRoom', roomId);
        socket.on('message', (msg: any) => {
            if (String(msg.roomId) === String(roomId)) {
                setMessages(prev => [...prev, msg]);
            }
        });
        return () => {
            socket.off('message');
        };
    }, [roomId]);

    // Scroll to bottom anytime messages change
    useEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => {
                scrollRef.current?.scrollToEnd({ animated: false });
            }, 0);
        }
    }, [messages]);

    const send = async () => {
        const userId = Number(await AsyncStorage.getItem('loggedInUserId'));
        if (!text.trim()) return;
        socket.emit('newMessage', { roomId, userId, text });
        setText('');
    };

    // Helper function to format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Helper function to check if two dates are on the same day
    const isSameDay = (date1: string, date2: string) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return d1.toDateString() === d2.toDateString();
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={styles.scrollContent}
            >
                {messages.map((item, index) => {
                    const isMine = user && item.username === user.username;
                    const showDate =
                        index === 0 || !isSameDay(item.created_at, messages[index - 1].created_at);

                    return (
                        <React.Fragment key={item.id}>
                            {showDate && (
                                <View style={styles.dateSeparator}>
                                    <Text style={styles.dateText}>{formatDate(item.created_at)}</Text>
                                </View>
                            )}
                            <View
                                style={
                                    isMine
                                        ? styles.myMessageContainer
                                        : styles.otherMessageContainer
                                }
                            >
                                <View style={isMine ? styles.myBubble : styles.otherBubble}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
                                    <Text style={styles.messageText}>{item.text}</Text>
                                    <Text style={styles.timestamp}>
                                        {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </View>
                            </View>
                        </React.Fragment>
                    );
                })}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    style={styles.input}
                    placeholder={`Message - ${roomName}`}
                />
                <Button title="Send" onPress={send} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: {
        paddingVertical: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginRight: 8,
    },
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
    myBubble: {
        backgroundColor: '#DCF8C6',
        padding: 10,
        borderRadius: 16,
        borderBottomRightRadius: 0,
        maxWidth: '75%',
    },
    otherBubble: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 16,
        borderBottomLeftRadius: 0,
        maxWidth: '75%',
    },
    messageText: { fontSize: 16, color: '#000' },
    timestamp: {
        fontSize: 10,
        color: '#666',
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    dateSeparator: {
        alignItems: 'center',
        marginVertical: 8,
    },
    dateText: {
        fontSize: 12,
        color: '#666',
        backgroundColor: '#EEE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
});
