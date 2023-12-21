import { ViewProps } from 'react-native';
import type { FC } from 'react';
import React from 'react';
import Reanimated, {
  SharedValue,
  WithSpringConfig,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { checkNumbre } from '../../assets/check-numbre';

export type Props = ViewProps & {
  maskWidth: SharedValue<any>;
  index: number;
  edgeColor?: string;
  lineAnimationDuration?: number;
  showAnimatedLine?: boolean;
  animatedLineOrientation?: 'vertical' | 'horizontal';
  animatedLineThickness?: number;
  width?: number;
  height?: number;
  outerMaskOpacity?: number;
  backgroundColor?: string;
  edgeWidth?: number;
  edgeHeight?: number;
  edgeBorderWidth?: number;
  edgeRadius?: number;
  animatedLineColor?: string;
  isActive?: boolean;
};

export const Edge: FC<Props> = ({
  index,
  style,
  edgeWidth = 25,
  edgeHeight = 25,
  edgeColor = '#fff',
  edgeBorderWidth = 4,
  edgeRadius = 0,
  maskWidth,
  ...rest
}) => {
  const EDGE_WIDTH = checkNumbre(edgeWidth, 25);
  const EDGE_HEIGHT = checkNumbre(edgeHeight, 25);
  const EDGE_BORDER_WIDTH = checkNumbre(edgeBorderWidth, 4);
  const EDGE_RADIUS = checkNumbre(edgeRadius, 0);

  const springConfig: WithSpringConfig = {
    damping: 15,
    stiffness: 100,
    mass: 0.5,
  };

  const setAnimation = (
    value: any,
    config: WithSpringConfig = springConfig,
  ) => {
    'worklet';
    return withSpring(value, config);
  };

  const edgeAnimationStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      right: setAnimation(
        index % 2 === 0
          ? -(EDGE_BORDER_WIDTH - 1)
          : maskWidth.value - EDGE_WIDTH + EDGE_BORDER_WIDTH,
        springConfig,
      ),
    };
  });
  return (
    <Reanimated.View
      className="absolute"
      style={[
        {
          width: EDGE_WIDTH,
          height: EDGE_HEIGHT,
          borderColor: edgeColor,
          borderWidth: EDGE_BORDER_WIDTH,
          borderLeftWidth: index % 2 === 0 ? 0 : EDGE_BORDER_WIDTH,
          borderRightWidth: index % 2 === 0 ? EDGE_BORDER_WIDTH : 0,
          borderTopWidth: 0,
          borderBottomRightRadius: index % 2 === 0 ? EDGE_RADIUS : 0,
          borderBottomLeftRadius: index % 2 === 0 ? 0 : EDGE_RADIUS,
        },
        style,
        edgeAnimationStyle,
      ]}
      {...rest}
    />
  );
};
