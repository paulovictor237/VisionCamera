import { View, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { useState, type FC } from 'react';
import { SwitchCamera } from 'lucide-react-native';
import { useGetSize } from '../../hooks/sizes';
import { Camera, CameraPosition, PhotoFile } from 'react-native-vision-camera';

export type Props = {
  camera: React.RefObject<Camera>;
  setCameraType: React.Dispatch<React.SetStateAction<CameraPosition>>;
};

export const PhotoButton: FC<Props> = ({ camera, setCameraType }) => {
  const { headerStatusBar } = useGetSize();
  const [photo, setPhoto] = useState<PhotoFile>();

  const toggleCamera = () =>
    setCameraType((type) => (type === 'front' ? 'back' : 'front'));

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      setPhoto(photo);
      console.log('🐞 ~ photo:', photo);
    } catch (error) {
      console.log('🐞 ~ error:', error);
    }
  };

  return (
    <View className="flex-1" style={{ marginTop: headerStatusBar }}>
      <View className="absolute right-4">
        <TouchableOpacity
          onPress={toggleCamera}
          className="rounded-full bg-gray-500/50 p-2"
        >
          <SwitchCamera className="text-white" size={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={takePhoto}
        className="absolute h-20 w-20 rounded-full border-[12px] border-[#d9d9d934] bottom-12 self-center bg-[#D9D9D9]"
      />

      <Modal
        visible={!!photo}
        onRequestClose={() => setPhoto(undefined)}
        animationType="fade"
        // collapsable
        // transparent
      >
        <View className="flex-1 justify-center items-center">
          <Image
            style={{
              width: Dimensions.get('window').height,
              height: Dimensions.get('window').width,
              borderColor: 'red',
              borderWidth: 4,
              transform: [{ rotate: '90deg' }],
            }}
            source={{ uri: 'file://' + photo?.path }}
          />
        </View>
      </Modal>
    </View>
  );
};
