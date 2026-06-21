import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function ReportScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('Short');
  const [location, setLocation] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [dept, setDept] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!location || !waitTime) {
      Alert.alert('Error', 'Please fill location and wait time');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'reports'), {
        location, queueLength: selected,
        waitTime, dept, notes,
        userId: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
      });
      Alert.alert('Success! ✅', 'Queue report submitted! Thank you for helping others.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Text style={s.back}>← Back</Text>
          </TouchableOpacity>
          <Text style={s.title}>Report Queue</Text>
          <Text style={s.subtitle}>Help others by reporting current queue status at a location.</Text>
        </View>
        <View style={s.body}>
          <Text style={s.label}>Location Name</Text>
          <TextInput
            style={s.input}
            placeholder="Select location..."
            value={location}
            onChangeText={setLocation}
          />
          <Text style={s.label}>Queue Length</Text>
          <View style={s.pillRow}>
            {['Short', 'Medium', 'Long'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[s.pill, selected === item && s.pillSelected]}
                onPress={() => setSelected(item)}>
                <Text style={[s.pillText, selected === item && s.pillTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={s.label}>Est. Wait Time</Text>
          <TextInput
            style={s.input}
            placeholder="e.g. 20 minutes"
            value={waitTime}
            onChangeText={setWaitTime}
          />
          <Text style={s.label}>Department / Counter</Text>
          <TextInput
            style={s.input}
            placeholder="e.g. Outpatient Dept"
            value={dept}
            onChangeText={setDept}
          />
          <Text style={s.label}>Additional Notes</Text>
          <TextInput
            style={[s.input, s.textarea]}
            placeholder="Any extra info..."
            value={notes}
            onChangeText={setNotes}
            multiline
          />
          <TouchableOpacity
            style={[s.btnPrimary, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}>
            <Text style={s.btnPrimaryText}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnOutline} onPress={() => router.back()}>
            <Text style={s.btnOutlineText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { backgroundColor: '#fff', padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  backBtn: { marginBottom: 8 },
  back: { fontSize: 14, color: '#1677FF', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#64748B', lineHeight: 20 },
  body: { padding: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#0F172A', marginBottom: 6 },
  input: {
    backgroundColor: '#fff', borderWidth: 1.5,
    borderColor: '#E2E8F0', borderRadius: 12,
    padding: 14, fontSize: 14, color: '#0F172A', marginBottom: 14,
  },
  textarea: { height: 100, textAlignVertical: 'top' },
  pillRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  pill: {
    flex: 1, paddingVertical: 10, borderRadius: 10,
    borderWidth: 1.5, borderColor: '#E2E8F0',
    alignItems: 'center', backgroundColor: '#fff',
  },
  pillSelected: { borderColor: '#1677FF', backgroundColor: '#EFF6FF' },
  pillText: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  pillTextSelected: { color: '#1677FF', fontWeight: '700' },
  btnPrimary: {
    backgroundColor: '#1677FF', borderRadius: 14,
    padding: 16, alignItems: 'center', marginBottom: 10,
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  btnOutline: {
    backgroundColor: '#fff', borderRadius: 14, padding: 15,
    alignItems: 'center', borderWidth: 1.5, borderColor: '#E2E8F0',
  },
  btnOutlineText: { color: '#64748B', fontSize: 14, fontWeight: '600' },
});