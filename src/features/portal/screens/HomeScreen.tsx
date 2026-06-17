import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { userService, UserRecord } from '../services/userService';
import { exportService } from '../services/exportService';
import { Button } from '../../../components/ui/Button';
import { UserRowItem } from '../components/UserRowItem';
import { UserModal } from '../components/UserModal';
import { useStripe } from '@stripe/stripe-react-native';

export default function HomeScreen() {
  const { theme, fontFamily, fontSize } = useTheme();
  const [usersList, setUsersList] = useState<UserRecord[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const fetchPage = async (pageNum: number, isInitial = false) => {
    try {
      if (isInitial) setLoading(true); else setLoadingMore(true);
      const data = await userService.getUsersPage(pageNum, 20);
      setUsersList(prev => isInitial ? data.users : [...prev, ...data.users]);
      setTotalCount(data.total);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPage(1, true);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage);
  }, [page, hasMore, loadingMore]);

  const handleOpenAddModal = () => {
    setSelectedUser(null);
    setModalVisible(true);
  };

  const handleOpenEditModal = (user: UserRecord) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handlePayNow = async () => {
    try {
      const res = await fetch('http://192.168.31.142:5050/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 5000, currency: 'inr' }), // ₹50.00
      });
      const data: { clientSecret: string } = await res.json();
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Your App Name',
        paymentIntentClientSecret: data.clientSecret,
      });
      if (initError) {
        Alert.alert('Error', initError.message);
        return;
      }
      const { error: presentError } = await presentPaymentSheet();
      if (presentError) {
        Alert.alert('Payment failed', presentError.message);
      } else {
        Alert.alert('Success', 'Payment completed!');
      }
    } catch (err) {
  console.error('Pay now error:', err);
  Alert.alert('Error', 'Something went wrong.');
}
  };

  const handleSaveUser = async (formData: any) => {
    try {
      if (selectedUser) {
        await userService.updateUser(selectedUser._id, {
          firstname: formData.name.trim(),
          surname: formData.surname.trim(),
          email: formData.email.trim().toLowerCase(),
        });
      } else {
        await userService.createUser({
          firstname: formData.name.trim(),
          surname: formData.surname.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password || 'bypass_pass',
        });
      }
      Alert.alert('Success', selectedUser ? 'User updated successfully.' : 'New user added successfully.');
      setModalVisible(false);
      fetchPage(1, true);
      setPage(1);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong.');
    }
  };

  const handleDeleteUser = async (_email: string) => {
    try {
      if (!selectedUser) return;
      await userService.deleteUser(selectedUser._id);
      setModalVisible(false);
      fetchPage(1, true);
      setPage(1);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to delete user.');
    }
  };

  const triggerExcelExport = () => {
    if (usersList.length === 0) {
      Alert.alert('No user accounts available to parse.');
      return;
    }
    exportService.exportToExcel(usersList, 'registered_users_report');
  };

  const triggerPDFExport = () => {
    if (usersList.length === 0) {
      Alert.alert('No user accounts available to parse.');
      return;
    }
    exportService.exportToPDF(usersList, 'Registered Users Database');
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { padding: 20 },
    statsRow: { backgroundColor: theme.surface, padding: 18, borderRadius: 14, borderWidth: 1, borderColor: theme.border, marginBottom: 20 },
    metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    statValue: { fontSize: fontSize + 16, fontWeight: '900', color: theme.text, fontFamily },
    statLabel: { fontSize: fontSize - 2, color: theme.subtext, fontFamily, textTransform: 'uppercase', letterSpacing: 0.5 },
    sectionLabel: { fontSize: fontSize - 1, fontWeight: '700', color: theme.primary, fontFamily, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
    exportRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
    exportBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
    emptyText: { textAlign: 'center', marginVertical: 20, color: theme.subtext, fontFamily },
    footerLoader: { paddingVertical: 16 },
  });

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.inner}
        data={usersList}
        keyExtractor={(item) => item.email}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            <View style={styles.statsRow}>
              <View style={styles.metricHeader}>
                <View>
                  <Text style={styles.statValue}>{totalCount}</Text>
                  <Text style={styles.statLabel}>Total Signed Up Users</Text>
                </View>
                <View style={{ flexDirection: 'column', gap: 10, alignItems: 'stretch' }}>
                  <Button label="+ Add User" onPress={handleOpenAddModal} style={{ paddingVertical: 10, paddingHorizontal: 14 }} />
                  <Button label="Pay Now" onPress={handlePayNow} style={{ paddingVertical: 10, paddingHorizontal: 14 }} />
                </View>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Export User</Text>
            <View style={styles.exportRow}>
              <TouchableOpacity style={[styles.exportBtn, { backgroundColor: theme.primary + '15', borderColor: theme.primary }]} onPress={triggerExcelExport}>
                <Text style={{ color: theme.primary, fontWeight: '700', fontSize: fontSize - 1, fontFamily }}>📊 Export Excel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.exportBtn, { backgroundColor: theme.accent + '15', borderColor: theme.accent }]} onPress={triggerPDFExport}>
                <Text style={{ color: theme.accent, fontWeight: '700', fontSize: fontSize - 1, fontFamily }}>📄 Export PDF</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionLabel}>Registered Account</Text>
          </>
        }
        renderItem={({ item, index }) => (
          <UserRowItem
            idIndex={index + 1}
            name={item.firstname}
            surname={item.surname}
            email={item.email}
            onEditPress={() => handleOpenEditModal(item)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No accounts found.</Text>}
        ListFooterComponent={loadingMore ? <ActivityIndicator style={styles.footerLoader} color={theme.primary} /> : null}
        ListFooterComponentStyle={{ paddingBottom: 20 }}
      />
      <UserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
        initialData={selectedUser ? {
          name: selectedUser.firstname,
          surname: selectedUser.surname,
          email: selectedUser.email,
        } : null}
      />
    </>
  );
}