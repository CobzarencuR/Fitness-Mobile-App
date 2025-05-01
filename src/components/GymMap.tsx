import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const GOOGLE_API_KEY = 'AIzaSyAywQXcdigOxUX6R3EimTwu1LR8mN-K6Nc';

export default function GymMap() {
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [gyms, setGyms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const permission = await requestLocationPermission();

            if (!permission) {
                console.warn('[GymMap] Location permission denied');
                setLoading(false);
                return;
            }

            Geolocation.getCurrentPosition(
                pos => {
                    const { latitude, longitude } = pos.coords;

                    if (!latitude || !longitude) {
                        console.error('[GymMap] Invalid latitude or longitude received:', pos.coords);
                        setLoading(false);
                        return;
                    }

                    setUserLocation({ latitude, longitude });
                    fetchNearbyGyms(latitude, longitude);
                },
                error => {
                    console.warn('[GymMap] Error getting position:', error.message);
                    setLoading(false);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );

        })();
    }, []);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Access',
                    message: 'We need your location to show nearby gyms.',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const fetchNearbyGyms = async (latitude: number, longitude: number) => {
        try {
            const url =
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json` +
                `?location=${latitude},${longitude}` +
                `&rankby=distance` +
                `&type=establishment` +
                `&keyword=gym` +
                `&key=${GOOGLE_API_KEY}`;

            const res = await fetch(url);
            const data = await res.json();

            if (data?.results) {
                setGyms(data.results);
            }
        } catch (error) {
            console.warn('Failed to fetch gyms', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !userLocation) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.mapContainer}>
            <MapView
                style={StyleSheet.absoluteFillObject}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                followsUserLocation
                region={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* Optional: mark the user explicitly */}
                <Marker
                    coordinate={userLocation}
                    title="You are here"
                    pinColor="blue"
                />

                {/* Render all the gyms you fetched */}
                {gyms.map(gym => (
                    <Marker
                        key={gym.place_id}
                        coordinate={{
                            latitude: gym.geometry.location.lat,
                            longitude: gym.geometry.location.lng,
                        }}
                        title={gym.name}
                        description={gym.vicinity}
                    />
                ))}
            </MapView>
        </View>
    );

}
const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 300,
        marginTop: 16,
        borderRadius: 10,
        overflow: 'hidden',
    },
});