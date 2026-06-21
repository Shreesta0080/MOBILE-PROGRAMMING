import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  TouchableOpacity, TextInput, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ReportScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('Short');
  const [location, setLocation] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [dept, setDept] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <SafeAreaView style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={s.back}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={s.body}>
          <Text style={s.title}>Report Queue</Text>
          <Text style={s.subtitle}>
            Help others by reporting current queue status at a location.
          </Text>

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

          <TouchableOpacity style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>Submit Report</Text>
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
  header: { padding: 16, paddingBottom: 0 },
  back: { fontSize: 16, color: '#1677FF', fontWeight: '500' },
  body: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#64748B', marginBottom: 20, lineHeight: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#0F172A', marginBottom: 6 },
  input: {
    backgroundColor: '#fff', borderWidth: 1.5,
    borderColor: '#E5E7EB', borderRadius: 10,
    padding: 12, fontSize: 13, color: '#0F172A', marginBottom: 14,
  },
  textarea: { height: 90, textAlignVertical: 'top' },
  pillRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  pill: {
    flex: 1, paddingVertical: 8, borderRadius: 8,
    borderWidth: 1.5, borderColor: '#E5E7EB',
    alignItems: 'center', backgroundColor: '#fff',
  },
  pillSelected: { borderColor: '#1677FF', backgroundColor: '#EFF6FF' },
  pillText: { fontSize: 13, color: '#64748B' },
  pillTextSelected: { color: '#1677FF', fontWeight: '700' },
  btnPrimary: {
    backgroundColor: '#1677FF', borderRadius: 12,
    padding: 15, alignItems: 'center', marginBottom: 10,
  },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  btnOutline: {
    backgroundColor: '#fff', borderRadius: 12,
    padding: 14, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E5E7EB',
  },
  btnOutlineText: { color: '#64748B', fontSize: 14 },
});