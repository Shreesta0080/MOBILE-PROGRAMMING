import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const todayNotifs = [
  { id: '1', text: 'City Hospital queue reduced to 20 min', time: '2 min ago' },
  { id: '2', text: 'Nabil Bank — your turn is near', time: '15 min ago' },
  { id: '3', text: 'Govt Office open — 9 min wait', time: '1 hr ago' },
];
const yesterdayNotifs = [
  { id: '4', text: 'Queue report submitted successfully', time: 'Yesterday' },
  { id: '5', text: 'City Hospital wait time updated', time: 'Yesterday' },
  { id: '6', text: 'New location added near you', time: 'Yesterday' },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Notifications</Text>
        <Text style={s.sub}>3 new alerts</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={s.scroll}>
        <Text style={s.groupLabel}>Today</Text>
        {todayNotifs.map((n) => (
          <View key={n.id} style={s.card}>
            <View style={s.iconWrap}>
              <Ionicons name="notifications-outline" size={16} color="#1677FF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.nText}>{n.text}</Text>
              <Text style={s.nTime}>{n.time}</Text>
            </View>
          </View>
        ))}
        <Text style={s.groupLabel}>Yesterday</Text>
        {yesterdayNotifs.map((n) => (
          <View key={n.id} style={[s.card, { opacity: 0.5 }]}>
            <View style={s.iconWrap}>
              <Ionicons name="notifications-outline" size={16} color="#94A3B8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.nText}>{n.text}</Text>
              <Text style={s.nTime}>{n.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { padding: 16, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  sub: { fontSize: 12, color: '#64748B' },
  scroll: { paddingHorizontal: 16 },
  groupLabel: { fontSize: 12, fontWeight: '600', color: '#94A3B8', marginBottom: 8, marginTop: 8 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 12,
    flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8,
    borderWidth: 0.5, borderColor: '#E5E7EB', gap: 10,
  },
  iconWrap: {
    width: 32, height: 32, borderRadius: 8, backgroundColor: '#EFF6FF',
    alignItems: 'center', justifyContent: 'center',
  },
  nText: { fontSize: 13, color: '#0F172A', lineHeight: 18 },
  nTime: { fontSize: 11, color: '#94A3B8', marginTop: 3 },
});