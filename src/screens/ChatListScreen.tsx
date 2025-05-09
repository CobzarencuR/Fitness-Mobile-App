import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';

type ChatListNavProp = NativeStackNavigationProp<RootStackParamList, 'ChatList'>;

export default function ChatListScreen() {
    const [rooms, setRooms] = useState<{ id: number; name_en: string, name_ro: string }[]>([]);
    const nav = useNavigation<ChatListNavProp>();
    const { t, td } = useLocalization();

    useEffect(() => {
        fetch('http://10.0.2.2:3000/chatRooms')
            .then(r => r.json())
            .then(data => {
                const ordered = data.sort((a: { id: number }, b: { id: number }) => a.id - b.id);
                setRooms(ordered);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('Chat Rooms')}</Text>
            <FlatList
                data={rooms}
                keyExtractor={r => String(r.id)}
                renderItem={({ item, index }) => (
                    <>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() =>
                                nav.navigate('ChatRoom', {
                                    roomId: item.id,
                                    roomName: td(item, 'name'),
                                })
                            }
                        >
                            <Text style={styles.channelName}>{td(item, 'name')}</Text>
                        </TouchableOpacity>
                        {(index === 2 || index === 4 || index === 6) && <View style={styles.separator} />}
                    </>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    listContent: {
        flex: 1,
        justifyContent: 'center',
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
    separator: {
        height: 1.5,
        backgroundColor: 'black',
        marginVertical: 16,
        marginHorizontal: 12,
    },
});
