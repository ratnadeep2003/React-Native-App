import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';

interface UserRowItemProps {
  idIndex: number;
  name: string;
  surname: string;
  email: string;
  onEditPress: () => void;
}

export const UserRowItem = ({ idIndex, name, surname, email, onEditPress }: UserRowItemProps) => {
  const { theme, fontFamily, fontSize } = useTheme();

  const styles = StyleSheet.create({
    dataRow: { 
      backgroundColor: theme.card, 
      padding: 16, 
      borderRadius: 10, 
      borderWidth: 1, 
      borderColor: theme.border, 
      marginBottom: 8,
      flexDirection: 'row',       
      justifyContent: 'space-between',
      alignItems: 'center',       
    },
    leftColumn: {
      flex: 1,                    
      gap: 6,                     
    },
    rightColumn: {
      alignItems: 'flex-end',    
      gap: 8,                     
      justifyContent: 'center',
    },
    rowTitle: { 
      fontSize: fontSize, 
      fontWeight: '700', 
      color: theme.text, 
      fontFamily 
    },
    rowMeta: { 
      fontSize: fontSize - 2, 
      color: theme.subtext, 
      fontFamily 
    },
    idText: {
      fontSize: fontSize - 2, 
      color: theme.primary, 
      fontFamily,
      fontWeight: '600',
    },
    editContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editLink: { 
      fontSize: fontSize - 1, 
      fontWeight: '700', 
      color: theme.accent, 
      fontFamily 
    }
  });

  return (
    <View style={styles.dataRow}>
      <View style={styles.leftColumn}>
        <Text style={styles.rowTitle}>{`${name} ${surname}`.trim()}</Text>
        <Text style={styles.rowMeta}>Email: {email}</Text>
      </View>

      <View style={styles.rightColumn}>
        <Text style={styles.idText}>ID: {idIndex}</Text>
        
        <TouchableOpacity style={styles.editContainer} onPress={onEditPress} activeOpacity={0.7}>
          <Text style={styles.editLink}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};