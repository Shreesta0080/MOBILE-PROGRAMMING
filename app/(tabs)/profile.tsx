import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  TouchableOpacity, StyleSheet, Switch, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function ProfileScreen() {
  const router = useRouter();
  const [notif, setNotif] = useState(false);
  const user = auth.currentUser;

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out', style: 'destructive',
        onPress: async () => {
          await signOut(auth);
          router.replace('/signin');
        },
      },
    ]);
  };

  const rows = [
    { label: 'Edit Profile', icon: 'person-outline' },
    { label: 'My Visit History', icon: 'time-outline', action: () => router.push('/history') },
    { label: 'Language', icon: 'language-outline' },
    { label: 'About App', icon: 'information-circle-outline' },
    { label: 'Help & Support', icon: 'help-circle-outline' },
  ];

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>My Profile</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.avatarSection}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={s.name}>Ram Bahadur</Text>
          <Text style={s.email}>{user?.email || 'user@email.com'}</Text>
          <Text style={s.location}>📍 Kathmandu, Nepal</Text>
        </View>
        <View style={s.body}>
          {rows.map((row) => (
            <TouchableOpacity
              key={row.label}
              style={s.row}
              onPress={row.action || (() => {})}>
              <View style={s.rowIconWrap}>
                <Ionicons name={row.icon as any} size={18} color="#1677FF" />
              </View>
              <Text style={s.rowLabel}>{row.label}</Text>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          ))}
          <View style={s.row}>
            <View style={s.rowIconWrap}>
              <Ionicons name="notifications-outline" size={18} color="#1677FF" />
            </View>
            <Text style={s.rowLabel}>Push Notifications</Text>
            <Switch
              value={notif}
              onValueChange={setNotif}
              trackColor={{ true: '#1677FF', false: '#E2E8F0' }}
              style={{ marginLeft: 'auto' }}
            />
          </View>
          <TouchableOpacity style={s.signOut} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text style={s.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  title: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  avatarSection: { alignItems: 'center', paddingVertical: 24, backgroundColor: '#fff', marginBottom: 16 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#1677FF', alignItems: 'center',
    justifyContent: 'center', marginBottom: 12,
    shadowColor: '#1677FF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  email: { fontSize: 13, color: '#64748B', marginBottom: 4 },
  location: { fontSize: 13, color: '#94A3B8' },
  body: { paddingHorizontal: 16 },
  row: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    borderWidth: 0.5, borderColor: '#E2E8F0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  rowIconWrap: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: '#EFF6FF', alignItems: 'center',
    justifyContent: 'center', marginRight: 12,
  },
  rowLabel: { fontSize: 14, color: '#0F172A', fontWeight: '500' },
  signOut: {
    backgroundColor: '#FEF2F2', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 8, gap: 8, borderWidth: 0.5, borderColor: '#FECACA',
  },
  signOutText: { fontSize: 15, color: '#EF4444', fontWeight: '700' },
});