import { Alert, Share, Platform } from 'react-native';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';

export const exportService = {
  /**
   * Compiles data array into an Excel sheet and saves it to the local device storage framework
   */
  exportToExcel: async (data: Array<Record<string, any>>, filename: string): Promise<void> => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Dashboard Report');
      
      const b64Data = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
      const path = `${RNFS.DocumentDirectoryPath}/${filename}.xlsx`;
      
      await RNFS.writeFile(path, b64Data, 'base64');
      
      if (Platform.OS === 'ios') {
        await Share.share({ url: path, title: 'Export Report' });
      } else {
        Alert.alert('Success', `Excel spreadsheet saved safely to: ${path}`);
      }
    } catch (error: any) {
      Alert.alert('Export Error', error.message || 'Failed to compile Excel matrix');
    }
  },

/**
   * Compiles data into a structured layout and shares it out as a PDF/Text document
   */
  exportToPDF: async (data: Array<Record<string, any>>, title: string): Promise<void> => {
    try {
      // Create a lightweight text representation for standard cross-platform document sharing
      let cleanTextReport = `${title.toUpperCase()}\n====================\n\n`;
      
      data.forEach((item, index) => {
        // CHANGED HERE: Replaced 'Metric Group' with 'User'
        cleanTextReport += `User ${index + 1}:\n`;
        
        Object.entries(item).forEach(([key, val]) => {
          cleanTextReport += `  ${key}: ${val}\n`;
        });
        cleanTextReport += `--------------------\n`;
      });

      const filename = `${title.toLowerCase().replace(/\s+/g, '_')}.txt`;
      const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
      await RNFS.writeFile(path, cleanTextReport, 'utf8');
      
      if (Platform.OS === 'ios') {
        await Share.share({
          url: path,
          title: `Share ${title}`,
          message: `Check out the exported ${title}`,
        });
      } else {
        await Share.share({
          message: cleanTextReport,
          title: `Share ${title}`,
        });
      }
    } catch (error: any) {
      Alert.alert('Export Error', error.message || 'Failed to compile report document');
    }
  }
}