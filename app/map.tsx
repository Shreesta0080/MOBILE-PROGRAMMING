import React from 'react';
import {
  SafeAreaView, View, Text,
  TextInput, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const results = [
  { id: '1', name: 'City Hospital', dist: '0.4 km', wait: '~42 min', level: 'high' },
  { id: '2', name: 'Nabil Bank', dist: '0.7 km', wait: '~18 min', level: 'med' },
  { id: '3', name: 'Govt Office', dist: '1.1 km', wait: '~9 min', level: 'low' },
  { id: '4', name: 'Civil Hospital', dist: '1.4 km', wait: '~25 min', level: 'med' },
];

const waitColor: any = {
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
        <TextInput style={s.searchInput} placeholder="Search location..." />
      </View>
      <View style={s.mapBox}>
        <Ionicons name="location-outline" size={32} color="#94A3B8" />
        <Text style={s.mapText}>Map View</Text>
        <Text style={s.mapSub}>Location pins shown here</Text>
      </View>
      <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
        <Text style={s.listTitle}>Nearby Results</Text>
        {results.map((r) => {
          const wc = waitColor[r.level];
          return (
            <TouchableOpacity key={r.id} style={s.row}>
              <View style={s.rowIcon}>
                <Ionicons name="business-outline" size={18} color="#64748B" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.rowName}>{r.name}</Text>
                <Text style={s.rowDist}>{r.dist}</Text>
              </View>
              <View style={[s.badge, { backgroundColor: wc.bg }]}>
                <Text style={[s.badgeText, { color: wc.text }]}>{r.wait}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { padding: 16, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  sub: { fontSize: 12, color: '#64748B' },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 16,
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 12,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 13, color: '#0F172A' },
  mapBox: {
    backgroundColor: '#E5E7EB', borderRadius: 12, marginHorizontal: 16,
    height: 160, alignItems: 'center', justifyContent: 'center',
    marginBottom: 14, borderWidth: 1.5, borderColor: '#D1D5DB',
    borderStyle: 'dashed',
  },
  mapText: { fontSize: 14, fontWeight: '600', color: '#64748B', marginTop: 6 },
  mapSub: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  list: { flex: 1, paddingHorizontal: 16 },
  listTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  row: {
    backgroundColor: '#fff', borderRadius: 12, padding: 12,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    borderWidth: 0.5, borderColor: '#E5E7EB',
  },
  rowIcon: {
    width: 36, height: 36, borderRadius: 8, backgroundColor: '#F1F5F9',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  rowName: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
  rowDist: { fontSize: 11, color: '#94A3B8', marginTop: 1 },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontSize: 11, fontWeight: '600' },
});