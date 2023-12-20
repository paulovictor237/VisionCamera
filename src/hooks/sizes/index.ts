import { Dimensions, StatusBar } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

export const useGetSize = () => {
  const header = useHeaderHeight();

  const statusBar = StatusBar.currentHeight || 24;
  const screen = Dimensions.get('screen').height; // device height
  const windows = Dimensions.get('window').height;

  const headerStatusBar = header + statusBar;

  return { screen, statusBar, windows, headerStatusBar };
};
