import { SwitchCamera } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  CameraPosition,
  useFrameProcessor,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useGetSize } from '../hooks/sizes';
import { usePermissions } from '../hooks/permissions';
import { BarcodeMask } from '../components';

export const Home = () => {
  const [active, setActive] = useState(false);
  const [cameraType, setCameraType] = useState<CameraPosition>('back');
  const device = useCameraDevice(cameraType);
  const camera = useRef<Camera>(null);
  const { headerStatusBar } = useGetSize();
  const {
    hasPermission,
    hasCameraPermission,
    hasMicrophonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
  } = usePermissions();

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    // console.log('🐞 ~ frame:', frame.isValid);
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['code-93'],
    onCodeScanned: (codes) => {
      console.log('🐞 ~ codes:', codes);
    },
  });
  console.log('🐞 ~ codeScanner:', codeScanner);

  const toggleCamera = () =>
    setCameraType((type) => (type === 'front' ? 'back' : 'front'));

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      console.log('🐞 ~ photo:', photo);
    } catch (error) {
      console.log('🐞 ~ error:', error);
    }
  };

  if (!device || !hasPermission) {
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
  }

  return (
    <View className="flex-1">
      <Camera
        ref={camera}
        isActive={active}
        device={device}
        photo={true}
        style={StyleSheet.absoluteFill}
        onInitialized={() => setTimeout(() => setActive(true), 150)}
        // frameProcessor={frameProcessor}
        codeScanner={codeScanner}
        fps={10}
      />
      <BarcodeMask
        lineAnimationDuration={2000}
        showAnimatedLine={true}
        width={350}
        height={160}
        outerMaskOpacity={0.6}
        backgroundColor="#000"
        edgeColor={'#fff'}
        edgeBorderWidth={3}
        edgeHeight={20}
        edgeWidth={20}
        edgeRadius={0}
        animatedLineColor={'#fff'}
        animatedLineThickness={3}
        animatedLineOrientation="horizontal"
        isActive={true}
      />
      <View className="flex-1" style={{ marginTop: headerStatusBar }}>
        <View className="absolute right-4">
          <TouchableOpacity
            onPress={toggleCamera}
            className="rounded-full bg-gray-500/50 p-2"
          >
            <SwitchCamera className="text-white" size={24} />
          </TouchableOpacity>
        </View>
        {/* <View className="absolute top-[40%] self-center h-20 aspect-[3/1] rounded-lg border-4 border-green-500" /> */}

        <TouchableOpacity
          onPress={takePhoto}
          className="absolute h-20 w-20 rounded-full border-[12px] border-[#d9d9d934] bottom-12 self-center bg-[#D9D9D9]"
        />
      </View>
    </View>
  );
};
