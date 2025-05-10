import React, { useCallback, useState, useContext } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

export default function WeightGraph() {
    const { t } = useLocalization();
    const { user } = useContext(UserContext);
    const [history, setHistory] = useState<{ date: string; weight: number }[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    const fetchHistory = useCallback(async () => {
        setLoadingHistory(true);
        try {
            const username = user?.username;
            if (!username) {
                setHistory([]);
                return;
            }
            const res = await fetch(
                `http://10.0.2.2:3000/getWeightHistory?username=${encodeURIComponent(username)}`
            );
            if (!res.ok) throw new Error('Failed to load history');
            const data: { date: string; weight: number }[] = await res.json();
            setHistory(data);
        } catch (err) {
            console.error('Weight history error', err);
        } finally {
            setLoadingHistory(false);
        }
    }, [user?.username]);

    // how many labels you actually want to see:
    const MAX_LABELS = 3;
    // split your full history length into roughly equal chunks:
    const step = Math.ceil(history.length / MAX_LABELS);

    // now build labels: only show every `step`-th point (and always show the last point)
    const formattedLabels = history.map((h, idx) => {
        const raw = h.date.split('T')[0];
        const [year, month, day] = raw.split('-');
        const label = `${year}/${day}/${month}`;
        // only show on the 0th, step, 2*step, … or the last index
        if (idx % step === 0 || idx === history.length - 1) {
            return label;
        }
        return '';
    });

    useFocusEffect(
        useCallback(() => {
            fetchHistory();
        }, [fetchHistory])
    );

    return (
        <View>
            {loadingHistory ? (
                <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#007AFF" />
            ) : history.length > 0 ? (
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>{t('Weight')}</Text>
                    <LineChart
                        data={{
                            labels: formattedLabels,
                            datasets: [{ data: history.map(h => h.weight) }],
                        }}
                        width={Dimensions.get('window').width - 48}
                        height={200}
                        yAxisSuffix="kg"
                        withInnerLines={true}        // draw horizontal grid lines
                        withVerticalLines={false}     // turn off vertical grid (optional)
                        withOuterLines={false}        // turn off outer border
                        chartConfig={{
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            decimalPlaces: 1,
                            color: () => '#007AFF',
                            labelColor: () => '#333',
                            style: { borderRadius: 8 },
                            propsForDots: { r: '4', strokeWidth: '2', stroke: '#007AFF' },
                            propsForBackgroundLines: {
                                strokeDasharray: '',      // solid grid lines
                            },
                        }}
                        bezier
                        style={styles.chart}
                        segments={3}               // number of horizontal stripes
                    />
                </View>
            ) : (
                <Text style={{ textAlign: 'center', marginVertical: 20, color: '#666' }}>
                    {t('No weight history available')}
                </Text>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    chartCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 16,
        // iOS shadow
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        // Android elevation
        elevation: 4,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    chart: {
        marginVertical: 0,
        borderRadius: 8,
        alignSelf: 'center',
        marginLeft: -16
    },
});