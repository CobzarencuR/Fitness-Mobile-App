import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

type ChatListNavProp = NativeStackNavigationProp<RootStackParamList, 'ChatList'>;

export default function ChatListScreen() {
    const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);
    const nav = useNavigation<ChatListNavProp>();

    useEffect(() => {
        fetch('http://10.0.2.2:3000/chatRooms')
            .then(r => r.json())
            .then(setRooms);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={rooms}
                keyExtractor={r => String(r.id)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() =>
                            nav.navigate('ChatRoom', {
                                roomId: item.id,
                                roomName: item.name,
                            })
                        }
                    >
                        <Text style={styles.channelName}># {item.name}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingVertical: 8,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
        marginVertical: 4,
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    channelName: {
        fontSize: 16,
        fontWeight: '500',
    },
});
