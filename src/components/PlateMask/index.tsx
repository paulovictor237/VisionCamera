import { View } from 'react-native';
import type { FC } from 'react';
import React from 'react';

export type Props = {};

export const PlateMask: FC<Props> = ({}) => {
  return (
    <View className="absolute inset-y-0 inset-x-0">
      <View className="flex-1 bg-neutral-500/50" />
      <View className="flex-row">
        <View className="flex-1 bg-neutral-500/50" />
        <View className="h-28 aspect-[3/1]  z-10">
          <View className="absolute -inset-x-[6px] -inset-y-[6px] border-[6px] border-green-500 rounded-2xl" />
        </View>
        <View className="flex-1 bg-neutral-500/50" />
      </View>
      <View className="flex-1 bg-neutral-500/50" />
    </View>
  );
};
