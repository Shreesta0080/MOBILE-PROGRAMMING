import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  TouchableOpacity, FlatList, StyleSheet, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth } from '../../firebaseConfig';

const services = [
  { id: '1', icon: 'medical-outline', name: 'City Hospital', dept: 'Outpatient Dept', distance: '0.4 km', wait: '~42 min', level: 'high' },
  { id: '2', icon: 'business-outline', name: 'Nabil Bank', dept: 'Main Branch', distance: '0.7 km', wait: '~18 min', level: 'med' },
  { id: '3', icon: 'business-outline', name: 'Government Office', dept: 'Citizenship Dept', distance: '1.1 km', wait: '~9 min', level: 'low' },
];

const waitColors: any = {
  low:  { bg: '#DCFCE7', text: '#15803D' },
  med:  { bg: '#FEF9C3', text: '#B45309' },
  high: { bg: '#FEE2E2', text: '#DC2626' },
};

export default function HomeScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  const quickActions = [
    { id: '1', icon: 'clipboard-outline', label: 'Report Queue', sub: 'Help others', bg: '#EFF6FF', color: '#1677FF', route: '/report' },
    { id: '2', icon: 'map-outline', label: 'Nearby Map', sub: 'All locations', bg: '#F0FDF4', color: '#16A34A', route: '/(tabs)/map' },
    { id: '3', icon: 'notifications-outline', label: 'Notifications', sub: '3 new alerts', bg: '#FFFBEB', color: '#D97706', route: '/(tabs)/notifications' },
    { id: '4', icon: 'time-outline', label: 'My History', sub: 'Past visits', bg: '#FAF5FF', color: '#9333EA', route: '/history' },
  ];

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={s.header}>
        <View>
          <Text style={s.headerTitle}>Queue Tracker</Text>
          <Text style={s.headerSub}>Kathmandu, Nepal</Text>
        </View>
        <View style={s.headerRight}>
          <TouchableOpacity
            style={s.iconBtn}
            onPress={() => router.push('/(tabs)/notifications')}>
            <Ionicons name="notifications-outline" size={20} color="#1677FF" />
          </TouchableOpacity>
          <TouchableOpacity style={s.avatar}>
            <Text style={s.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO CARD */}
        <View style={s.heroCard}>
          <View style={s.heroBadge}>
            <Text style={s.heroBadgeText}>📍 Live queue data</Text>
          </View>
          <Text style={s.heroTitle}>Save your time today</Text>
          <Text style={s.heroSub}>
            Check real-time queue status before you leave home.
          </Text>
          <TouchableOpacity
            style={s.heroBtn}
            onPress={() => router.push('/(tabs)/map')}>
            <Ionicons name="search-outline" size={14} color="#1677FF" />
            <Text style={s.heroBtnText}>Find a Queue ›</Text>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View style={s.statsRow}>
          {[
            { num: '12', label: 'Locations', color: '#1677FF' },
            { num: '8', label: 'Live Queues', color: '#16A34A' },
            { num: '18m', label: 'Avg Wait', color: '#D97706' },
          ].map((stat) => (
            <View key={stat.label} style={s.statCard}>
              <Text style={[s.statNum, { color: stat.color }]}>{stat.num}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* QUICK ACTIONS */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={s.actionsGrid}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={s.actionBtn}
              onPress={() => router.push(a.route as any)}>
              <View style={[s.actionIconWrap, { backgroundColor: a.bg }]}>
                <Ionicons name={a.icon as any} size={20} color={a.color} />
              </View>
              <View>
                <Text style={s.actionLabel}>{a.label}</Text>
                <Text style={s.actionSub}>{a.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* NEARBY SERVICES */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Nearby Services</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/map')}>
            <Text style={s.seeAll}>See all ›</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const wc = waitColors[item.level];
            return (
              <TouchableOpacity style={s.serviceCard}>
                <View style={[s.serviceIconWrap, { backgroundColor: wc.bg }]}>
                  <Ionicons name={item.icon as any} size={20} color={wc.text} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.serviceName}>{item.name}</Text>
                  <Text style={s.serviceSub}>{item.distance} · {item.dept}</Text>
                </View>
                <View>
                  <View style={[s.waitBadge, { backgroundColor: wc.bg }]}>
                    <Text style={[s.waitText, { color: wc.text }]}>{item.wait}</Text>
                  </View>
                  <Text style={s.chevron}>›</Text>
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

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    backgroundColor: '#fff', paddingHorizontal: 20,
    paddingVertical: 14, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  headerSub: { fontSize: 12, color: '#94A3B8', marginTop: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center',
  },
  avatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#1677FF', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  heroCard: {
    backgroundColor: '#1677FF', borderRadius: 20,
    padding: 20, margin: 16, marginBottom: 0,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 4, marginBottom: 10,
  },
  heroBadgeText: { color: '#fff', fontSize: 12 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 6 },
  heroSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 16, lineHeight: 20 },
  heroBtn: {
    backgroundColor: '#fff', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 10,
    flexDirection: 'row', alignItems: 'center',
    gap: 6, alignSelf: 'flex-start',
  },
  heroBtnText: { color: '#1677FF', fontSize: 13, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row', paddingHorizontal: 16,
    gap: 10, marginTop: 16, marginBottom: 16,
  },
  statCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14,
    padding: 12, alignItems: 'center',
    borderWidth: 0.5, borderColor: '#E2E8F0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  statNum: { fontSize: 22, fontWeight: '700', marginBottom: 2 },
  statLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '500' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, marginBottom: 10,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  seeAll: { fontSize: 13, color: '#1677FF', fontWeight: '500' },
  actionsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 10, marginBottom: 16,
  },
  actionBtn: {
    width: '47.5%', backgroundColor: '#fff', borderRadius: 14,
    padding: 14, flexDirection: 'row', alignItems: 'center',
    gap: 10, borderWidth: 0.5, borderColor: '#E2E8F0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  actionIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  actionLabel: { fontSize: 12, fontWeight: '600', color: '#0F172A' },
  actionSub: { fontSize: 10, color: '#94A3B8', marginTop: 1 },
  serviceCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    marginHorizontal: 16, marginBottom: 8,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 0.5, borderColor: '#E2E8F0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  serviceIconWrap: {
    width: 42, height: 42, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  serviceName: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  serviceSub: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  waitBadge: {
    borderRadius: 8, paddingHorizontal: 8,
    paddingVertical: 4, marginBottom: 2, alignItems: 'center',
  },
  waitText: { fontSize: 11, fontWeight: '700' },
  chevron: { fontSize: 16, color: '#CBD5E1', textAlign: 'center' },
});