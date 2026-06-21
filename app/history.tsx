import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  TouchableOpacity, TextInput, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const thisWeek = [
  { id: '1', name: 'City Hospital', time: 'Today · Waited 42 min' },
  { id: '2', name: 'Nabil Bank', time: 'Yesterday · Waited 18 min' },
];
const lastWeek = [
  { id: '3', name: 'Govt Office', time: 'Mon · Waited 9 min' },
  { id: '4', name: 'City Hospital', time: 'Sat · Waited 55 min' },
  { id: '5', name: 'Nabil Bank', time: 'Fri · Waited 12 min' },
];

export default function HistoryScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>My Visit History</Text>
      </View>
      <View style={s.searchWrap}>
        <Ionicons name="search-outline" size={16} color="#94A3B8" />
        <TextInput style={s.searchInput} placeholder="Search history..." />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        <Text style={s.groupLabel}>This Week</Text>
        {thisWeek.map((h) => (
          <View key={h.id} style={s.card}>
            <View style={s.ico}><Ionicons name="business-outline" size={18} color="#64748B" /></View>
            <View style={{ flex: 1 }}>
              <Text style={s.cardName}>{h.name}</Text>
              <Text style={s.cardTime}>{h.time}</Text>
            </View>
            <View style={s.done}><Text style={s.doneText}>Done ✓</Text></View>
          </View>
        ))}
        <Text style={s.groupLabel}>Last Week</Text>
        {lastWeek.map((h) => (
          <View key={h.id} style={[s.card, { opacity: 0.6 }]}>
            <View style={s.ico}><Ionicons name="business-outline" size={18} color="#64748B" /></View>
            <View style={{ flex: 1 }}>
              <Text style={s.cardName}>{h.name}</Text>
              <Text style={s.cardTime}>{h.time}</Text>
            </View>
            <View style={s.done}><Text style={s.doneText}>Done ✓</Text></View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { padding: 16, paddingBottom: 8 },
  back: { fontSize: 14, color: '#1677FF', marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 16,
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 12,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 13 },
  groupLabel: { fontSize: 12, fontWeight: '600', color: '#94A3B8', marginBottom: 8, marginTop: 4 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 12,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    borderWidth: 0.5, borderColor: '#E5E7EB', gap: 10,
  },
  ico: {
    width: 36, height: 36, borderRadius: 8,
    backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center',
  },
  cardName: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
  cardTime: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  done: { backgroundColor: '#F1F5F9', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  doneText: { fontSize: 11, color: '#64748B', fontWeight: '600' },
});