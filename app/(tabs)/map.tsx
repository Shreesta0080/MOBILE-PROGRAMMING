import React from 'react';
import {
  SafeAreaView, View, Text, TextInput,
  TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const results = [
  { id: '1', name: 'City Hospital', dist: '0.4 km', wait: '~42 min', level: 'high' },
  { id: '2', name: 'Nabil Bank', dist: '0.7 km', wait: '~18 min', level: 'med' },
  { id: '3', name: 'Govt Office', dist: '1.1 km', wait: '~9 min', level: 'low' },
  { id: '4', name: 'Civil Hospital', dist: '1.4 km', wait: '~25 min', level: 'med' },
];

const wc: any = {
  low:  { bg: '#DCFCE7', text: '#15803D' },
  med:  { bg: '#FEF9C3', text: '#B45309' },
  high: { bg: '#FEE2E2', text: '#DC2626' },
};

export default function MapScreen() {
  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Nearby Map</Text>
        <Text style={s.sub}>All locations</Text>
      </View>
      <View style={s.searchWrap}>
        <Ionicons name="search-outline" size={16} color="#94A3B8" />
        <TextInput style={s.searchInput} placeholder="Search location..." placeholderTextColor="#94A3B8" />
      </View>
      <View style={s.mapBox}>
        <Ionicons name="map-outline" size={40} color="#94A3B8" />
        <Text style={s.mapText}>Map View</Text>
        <Text style={s.mapSub}>Location pins shown here</Text>
      </View>
      <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
        <Text style={s.listTitle}>Nearby Results</Text>
        {results.map((r) => (
          <TouchableOpacity key={r.id} style={s.row}>
            <View style={[s.rowIcon, { backgroundColor: wc[r.level].bg }]}>
              <Ionicons name="business-outline" size={18} color={wc[r.level].text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.rowName}>{r.name}</Text>
              <Text style={s.rowDist}>{r.dist}</Text>
            </View>
            <View style={[s.badge, { backgroundColor: wc[r.level].bg }]}>
              <Text style={[s.badgeText, { color: wc[r.level].text }]}>{r.wait}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { padding: 16, paddingBottom: 8, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  title: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  sub: { fontSize: 12, color: '#94A3B8' },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', margin: 16,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: '#0F172A' },
  mapBox: {
    backgroundColor: '#E8EDF2', borderRadius: 16, marginHorizontal: 16,
    height: 180, alignItems: 'center', justifyContent: 'center',
    marginBottom: 16, borderWidth: 1.5, borderColor: '#D1D5DB',
    borderStyle: 'dashed', gap: 6,
  },
  mapText: { fontSize: 16, fontWeight: '600', color: '#64748B' },
  mapSub: { fontSize: 12, color: '#94A3B8' },
  list: { flex: 1, paddingHorizontal: 16 },
  listTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  row: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    borderWidth: 0.5, borderColor: '#E2E8F0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  rowIcon: {
    width: 40, height: 40, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  rowName: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  rowDist: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  badge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  badgeText: { fontSize: 12, fontWeight: '700' },
});