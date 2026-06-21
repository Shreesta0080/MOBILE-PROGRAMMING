import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const services = [
  {
    id: '1',
    icon: '🏥',
    name: 'City Hospital',
    dept: 'Outpatient Dept',
    distance: '0.4 km',
    wait: '~42 min',
    level: 'high',
  },
  {
    id: '2',
    icon: '🏦',
    name: 'Nabil Bank',
    dept: 'Main Branch',
    distance: '0.7 km',
    wait: '~18 min',
    level: 'med',
  },
  {
    id: '3',
    icon: '🏢',
    name: 'Government Office',
    dept: 'Citizenship Dept',
    distance: '1.1 km',
    wait: '~9 min',
    level: 'low',
  },
];
import { useRouter } from 'expo-router';

// inside your component:
const router = useRouter();

const quickActions = [
  { id: '1', icon: '📋', label: 'Report Queue', sub: 'Help others', bg: '#007AFF15', route: '/report' },
  { id: '2', icon: '🗺️', label: 'Nearby Map', sub: 'All locations', bg: '#34C75915', route: '/map' },
  { id: '3', icon: '🔔', label: 'Notifications', sub: '3 new alerts', bg: '#FF950015', route: '/notifications' },
  { id: '4', icon: '📊', label: 'My History', sub: 'Past visits', bg: '#AF52DE15', route: '/history' },
];

// Then on your TouchableOpacity:
<TouchableOpacity key={a.id} style={styles.actionBtn} onPress={() => router.push(a.route as any)}></TouchableOpacity>

const waitColors = {
  low:  { bg: '#34C75920', text: '#1E7A35' },
  med:  { bg: '#FF950020', text: '#B86A00' },
  high: { bg: '#FF3B3020', text: '#C0392B' },
};
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Queue Tracker</Text>
          <Text style={styles.headerSub}>Kathmandu, Nepal</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={{ fontSize: 18 }}>🔔</Text>
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RB</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── HERO CARD ── */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>📍 Live queue data</Text>
          </View>
          <Text style={styles.heroTitle}>Save your time today</Text>
          <Text style={styles.heroSub}>
            Check real-time queue status before you leave home.
          </Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>🔍 Find a Queue ›</Text>
          </TouchableOpacity>
        </View>

        {/* ── STATS ROW ── */}
        <View style={styles.statsRow}>
          {[
            { num: '12',  label: 'Locations',  color: '#007AFF' },
            { num: '8',   label: 'Live Queues', color: '#34C759' },
            { num: '18m', label: 'Avg Wait',    color: '#FF9500' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={[styles.statNum, { color: s.color }]}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── QUICK ACTIONS ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionsGrid}>
          {quickActions.map((a) => (
            <TouchableOpacity key={a.id} style={styles.actionBtn}>
              <View style={[styles.actionIcon, { backgroundColor: a.bg }]}>
                <Text style={{ fontSize: 16 }}>{a.icon}</Text>
              </View>
              <View>
                <Text style={styles.actionLabel}>{a.label}</Text>
                <Text style={styles.actionSub}>{a.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── NEARBY SERVICES ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Services</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all ›</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const wc = waitColors[item.level];
            return (
              <TouchableOpacity style={styles.serviceCard}>
                <View style={[styles.serviceIcon, { backgroundColor: wc.bg }]}>
                  <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.serviceSub}>
                    {item.distance} · {item.dept}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={[styles.waitBadge, { backgroundColor: wc.bg }]}>
                    <Text style={[styles.waitText, { color: wc.text }]}>
                      {item.wait}
                    </Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },

  // Header
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E5',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1C1C1E' },
  headerSub:   { fontSize: 12, color: '#8E8E93', marginTop: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  notifBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#FF950020',
    alignItems: 'center', justifyContent: 'center',
  },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#007AFF20',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: '600', color: '#007AFF' },

  // Hero
  heroCard: {
    backgroundColor: '#007AFF',
    borderRadius: 18,
    padding: 18,
    margin: 16,
    marginBottom: 0,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
  },
  heroBadgeText: { color: '#fff', fontSize: 11 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 4 },
  heroSub:   { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 14 },
  heroBtn: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  heroBtnText: { color: '#007AFF', fontSize: 13, fontWeight: '600' },

  // Stats
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E0E0E5',
  },
  statNum:   { fontSize: 22, fontWeight: '700', marginBottom: 2 },
  statLabel: { fontSize: 10, color: '#8E8E93', fontWeight: '500' },

  // Sections
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#1C1C1E' },
  seeAll:       { fontSize: 12, color: '#007AFF', fontWeight: '500' },

  // Quick Actions
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  actionBtn: {
    width: '47.5%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0.5,
    borderColor: '#E0E0E5',
  },
  actionIcon: {
    width: 36, height: 36,
    borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  actionLabel: { fontSize: 12, fontWeight: '600', color: '#1C1C1E' },
  actionSub:   { fontSize: 10, color: '#8E8E93' },

  // Services
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 13,
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E0E0E5',
  },
  serviceIcon: {
    width: 40, height: 40,
    borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  serviceName: { fontSize: 13, fontWeight: '600', color: '#1C1C1E' },
  serviceSub:  { fontSize: 11, color: '#8E8E93' },
  waitBadge: {
    borderRadius: 8, paddingHorizontal: 8,
    paddingVertical: 3, marginBottom: 3,
  },
  waitText:  { fontSize: 11, fontWeight: '600' },
  chevron:   { fontSize: 14, color: '#C7C7CC' },
});