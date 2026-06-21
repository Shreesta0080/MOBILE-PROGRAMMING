import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  TouchableOpacity, StyleSheet, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [notif, setNotif] = React.useState(false);

  const rows = [
    { label: 'Edit Profile', icon: 'person-outline', action: () => {} },
    { label: 'My Visit History', icon: 'time-outline', action: () => router.push('/history') },
    { label: 'Language', icon: 'language-outline', action: () => {} },
    { label: 'About App', icon: 'information-circle-outline', action: () => {} },
    { label: 'Help & Support', icon: 'help-circle-outline', action: () => {} },
  ];

  return (
    <SafeAreaView style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.title}>My Profile</Text>
        </View>
        <View style={s.avatarSection}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>RB</Text>
          </View>
          <Text style={s.name}>Ram Bahadur</Text>
          <Text style={s.location}>Kathmandu, Nepal</Text>
        </View>
        <View style={s.body}>
          {rows.map((row) => (
            <TouchableOpacity key={row.label} style={s.row} onPress={row.action}>
              <Ionicons name={row.icon as any} size={18} color="#64748B" style={{ marginRight: 12 }} />
              <Text style={s.rowLabel}>{row.label}</Text>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          ))}
          <View style={s.row}>
            <Ionicons name="notifications-outline" size={18} color="#64748B" style={{ marginRight: 12 }} />
            <Text style={s.rowLabel}>Push Notifications</Text>
            <Switch
              value={notif}
              onValueChange={setNotif}
              trackColor={{ true: '#1677FF', false: '#E5E7EB' }}
              style={{ marginLeft: 'auto' }}
            />
          </View>
          <TouchableOpacity style={s.signOut}>
            <Text style={s.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { padding: 16, paddingBottom: 0 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  avatarSection: { alignItems: 'center', paddingVertical: 20 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#EFF6FF', borderWidth: 2,
    borderColor: '#1677FF', alignItems: 'center', justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: { fontSize: 22, fontWeight: '700', color: '#1677FF' },
  name: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  location: { fontSize: 13, color: '#64748B', marginTop: 2 },
  body: { paddingHorizontal: 16 },
  row: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    borderWidth: 0.5, borderColor: '#E5E7EB',
  },
  rowLabel: { fontSize: 14, color: '#0F172A', fontWeight: '500' },
  signOut: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    alignItems: 'center', marginTop: 8, marginBottom: 20,
    borderWidth: 1.5, borderColor: '#E5E7EB',
  },
  signOutText: { fontSize: 14, color: '#94A3B8', fontWeight: '600' },
});