import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';

type ChatListNavProp = NativeStackNavigationProp<RootStackParamList, 'ChatList'>;

export default function ChatListScreen() {
    const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);
    const nav = useNavigation<ChatListNavProp>();   // ← tell TS which params are allowed

    useEffect(() => {
        fetch('http://10.0.2.2:3000/chatRooms')
            .then(r => r.json())
            .then(setRooms);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={rooms}
                keyExtractor={r => String(r.id)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ padding: 16, borderBottomWidth: 1 }}
                        onPress={() =>
                            nav.navigate('ChatRoom', { roomId: item.id, roomName: item.name })
                        }
                    >
                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
