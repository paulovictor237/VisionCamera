import React, { FC, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import { checkNumbre } from './assets/check-numbre';
import { useLayout } from './hooks/layout';
import { BarcodeMaskProps } from './types';
import { AnimationFrame } from './components/animation-frame';

const DEFAULT_WIDTH = 280;
const DEFAULT_HEIGHT = 300;

export const BarcodeMask: FC<BarcodeMaskProps> = ({
  width: defaultWidth = DEFAULT_WIDTH,
  height: defaultHeight = DEFAULT_HEIGHT,
  backgroundColor = '#000',
  outerMaskOpacity = 1,
  showAnimatedLine = true,
  onPress = undefined,
  edgeBorderWidth = 4,
  ...rest
}) => {
  const maskHight = useSharedValue<any>(defaultHeight);
  const maskWidth = useSharedValue<any>(defaultWidth);
  const outMaskWidthHight = useSharedValue<any>(0);
  const outMaskWidthWidth = useSharedValue<any>(0);
  const outMaskHightHight = useSharedValue<any>(0);
  const { width, height, portrait } = useLayout();
  const opacity = outerMaskOpacity || 1;

  const springConfig: WithSpringConfig = {
    damping: 15,
    stiffness: 100,
    mass: 0.5,
  };

  const statusBarHeight = checkNumbre(StatusBar.currentHeight, 35);

  const outMaskStyleWidth = useAnimatedStyle(() => {
    return {
      height: outMaskWidthWidth.value,
      width: outMaskWidthHight.value,
    };
  });

  const outMaskStyleHight = useAnimatedStyle(() => {
    return { height: outMaskHightHight.value };
  });

  const setAnimation = (
    value: any,
    config: WithSpringConfig = springConfig,
  ) => {
    'worklet';
    return withSpring(value, config);
  };

  useEffect(() => {
    maskHight.value = setAnimation(checkNumbre(defaultHeight, DEFAULT_HEIGHT));
    maskWidth.value = setAnimation(checkNumbre(defaultWidth, DEFAULT_WIDTH));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultHeight, defaultWidth]);

  useEffect(() => {
    const _maskHight = checkNumbre(defaultHeight, DEFAULT_HEIGHT);
    const _maskWidth = checkNumbre(defaultWidth, DEFAULT_WIDTH);
    outMaskHightHight.value =
      (height - (!portrait ? _maskHight + statusBarHeight : _maskHight)) / 2;
    outMaskWidthWidth.value = _maskHight;
    outMaskWidthHight.value = (width - _maskWidth) / 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width, defaultHeight, defaultWidth, portrait]);

  return (
    <View className="absolute flex-1 justify-center items-center inset-y-0 inset-x-0">
      {Array.from({ length: 2 }).map((_, index) => {
        return (
          <Reanimated.View
            key={index.toString()}
            className="absolute"
            style={[
              { backgroundColor, opacity, left: 0, right: 0 },
              index % 2 === 0 ? { top: 0 } : { bottom: 0 },
              outMaskStyleHight,
            ]}
          />
        );
      })}
      {Array.from({ length: 2 }).map((_, index) => {
        return (
          <Reanimated.View
            key={index.toString()}
            className="absolute"
            style={[
              { backgroundColor, opacity },
              index % 2 === 0 ? { left: 0 } : { right: 0 },
              outMaskStyleWidth,
            ]}
          />
        );
      })}
      <AnimationFrame
        width={defaultWidth}
        height={defaultHeight}
        backgroundColor={backgroundColor}
        outerMaskOpacity={outerMaskOpacity}
        showAnimatedLine={showAnimatedLine}
        onPress={onPress}
        edgeBorderWidth={edgeBorderWidth}
        {...rest}
      />
    </View>
  );
};
