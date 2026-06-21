import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput,
  TouchableOpacity, StyleSheet, Alert,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirm) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll}>
          <View style={s.logoWrap}>
            <View style={s.logo}>
              <Text style={s.logoText}>🎫</Text>
            </View>
            <Text style={s.appName}>Queue Tracker</Text>
          </View>
          <View style={s.card}>
            <Text style={s.title}>Sign Up</Text>
            <Text style={s.sub}>Create your account to get started.</Text>
            <Text style={s.label}>Email</Text>
            <TextInput
              style={s.input}
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={s.label}>Password</Text>
            <TextInput
              style={s.input}
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Text style={s.label}>Confirm Password</Text>
            <TextInput
              style={s.input}
              placeholder="Repeat your password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
            />
            <TouchableOpacity
              style={[s.btnPrimary, loading && { opacity: 0.7 }]}
              onPress={handleSignUp}
              disabled={loading}>
              <Text style={s.btnPrimaryText}>
                {loading ? 'Creating account...' : 'Continue'}
              </Text>
            </TouchableOpacity>
            <View style={s.bottomRow}>
              <Text style={s.bottomText}>Have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/signin')}>
                <Text style={s.link}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  scroll: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  logoWrap: { alignItems: 'center', marginBottom: 28 },
  logo: {
    width: 70, height: 70, borderRadius: 20,
    backgroundColor: '#EFF6FF', alignItems: 'center',
    justifyContent: 'center', marginBottom: 10,
    borderWidth: 2, borderColor: '#1677FF',
  },
  logoText: { fontSize: 32 },
  appName: { fontSize: 24, fontWeight: '700', color: '#0F172A' },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 10, elevation: 3,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  sub: { fontSize: 13, color: '#64748B', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#0F172A', marginBottom: 6 },
  input: {
    backgroundColor: '#F8FAFC', borderWidth: 1.5,
    borderColor: '#E2E8F0', borderRadius: 12,
    padding: 14, fontSize: 14, color: '#0F172A', marginBottom: 14,
  },
  btnPrimary: {
    backgroundColor: '#1677FF', borderRadius: 12,
    padding: 16, alignItems: 'center', marginTop: 4, marginBottom: 16,
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  bottomRow: { flexDirection: 'row', justifyContent: 'center' },
  bottomText: { fontSize: 14, color: '#64748B' },
  link: { fontSize: 14, color: '#1677FF', fontWeight: '700' },
});