import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const thisWeek = [
  { id: '1', name: 'City Hospital', time: 'Today · Waited 42 min', level: 'high' },
  { id: '2', name: 'Nabil Bank', time: 'Yesterday · Waited 18 min', level: 'med' },
];
const lastWeek = [
  { id: '3', name: 'Govt Office', time: 'Mon · Waited 9 min', level: 'low' },
  { id: '4', name: 'City Hospital', time: 'Sat · Waited 55 min', level: 'high' },
  { id: '5', name: 'Nabil Bank', time: 'Fri · Waited 12 min', level: 'med' },
];

const wc: any = {
  low:  { bg: '#DCFCE7', text: '#15803D' },
  med:  { bg: '#FEF9C3', text: '#B45309' },
  high: { bg: '#FEE2E2', text: '#DC2626' },
};

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
        <TextInput style={s.searchInput} placeholder="Search history..." placeholderTextColor="#94A3B8" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        <Text style={s.groupLabel}>This Week</Text>
        {thisWeek.map((h) => (
          <View key={h.id} style={s.card}>
            <View style={[s.ico, { backgroundColor: wc[h.level].bg }]}>
              <Ionicons name="business-outline" size={18} color={wc[h.level].text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.cardName}>{h.name}</Text>
              <Text style={s.cardTime}>{h.time}</Text>
            </View>
            <View style={[s.done, { backgroundColor: wc[h.level].bg }]}>
              <Text style={[s.doneText, { color: wc[h.level].text }]}>Done ✓</Text>
            </View>
          </View>
        ))}
        <Text style={s.groupLabel}>Last Week</Text>
        {lastWeek.map((h) => (
          <View key={h.id} style={[s.card, { opacity: 0.6 }]}>
            <View style={[s.ico, { backgroundColor: wc[h.level].bg }]}>
              <Ionicons name="business-outline" size={18} color={wc[h.level].text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.cardName}>{h.name}</Text>
              <Text style={s.cardTime}>{h.time}</Text>
            </View>
            <View style={[s.done, { backgroundColor: wc[h.level].bg }]}>
              <Text style={[s.doneText, { color: wc[h.level].text }]}>Done ✓</Text>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { backgroundColor: '#fff', padding: 16, borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  back: { fontSize: 14, color: '#1677FF', marginBottom: 6, fontWeight: '600' },
  title: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', margin: 16,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: '#0F172A' },
  groupLabel: { fontSize: 12, fontWeight: '600', color: '#94A3B8', marginBottom: 8, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    borderWidth: 0.5, borderColor: '#E2E8F0', gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  ico: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  cardName: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  cardTime: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  done: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  doneText: { fontSize: 11, fontWeight: '700' },
});