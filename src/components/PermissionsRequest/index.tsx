import { View, Button } from 'react-native';
import type { FC } from 'react';
import { usePermissions } from '../../hooks/permissions';
import { useGetSize } from '../../hooks/sizes';

export type Props = {
  children: React.ReactNode;
};

export const PermissionsRequest: FC<Props> = ({ children }) => {
  const { headerStatusBar } = useGetSize();

  const {
    hasPermission,
    hasCameraPermission,
    hasMicrophonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
  } = usePermissions();

  if (hasPermission) return children;

  return (
    <View className="flex-1" style={{ marginTop: headerStatusBar }}>
      <Button
        onPress={requestCameraPermission}
        title="Camera permission"
        disabled={hasCameraPermission}
      />

      <Button
        onPress={requestMicrophonePermission}
        title="Microphone permission"
        disabled={hasMicrophonePermission}
      />
    </View>
  );
};
