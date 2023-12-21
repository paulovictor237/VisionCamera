import type { FC } from 'react';
import React from 'react';
import { checkNumbre } from '../../assets/check-numbre';
import { Edge } from '../edge';
import { SharedValue } from 'react-native-reanimated';

export type Props = {
  maskWidth: SharedValue<any>;
  lineAnimationDuration?: number;
  showAnimatedLine?: boolean;
  animatedLineOrientation?: 'vertical' | 'horizontal';
  animatedLineThickness?: number;
  width?: number;
  height?: number;
  outerMaskOpacity?: number;
  backgroundColor?: string;
  edgeColor?: string;
  edgeWidth?: number;
  edgeHeight?: number;
  edgeBorderWidth?: number;
  edgeRadius?: number;
  animatedLineColor?: string;
  isActive?: boolean;
};

export const FourEdge: FC<Props> = ({
  edgeBorderWidth,
  maskWidth,
  ...rest
}) => {
  const EDGE_BORDER_WIDTH = checkNumbre(edgeBorderWidth, 4);

  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => {
        return (
          <Edge
            key={index.toString()}
            index={index}
            {...rest}
            maskWidth={maskWidth}
            edgeBorderWidth={edgeBorderWidth}
            style={{
              top: -(EDGE_BORDER_WIDTH - 1),
              transform: [{ rotate: index % 2 === 0 ? '270deg' : '90deg' }],
            }}
          />
        );
      })}
      {Array.from({ length: 2 }).map((_, index) => {
        return (
          <Edge
            key={index.toString()}
            index={index}
            {...rest}
            maskWidth={maskWidth}
            edgeBorderWidth={edgeBorderWidth}
            style={{
              bottom: -(EDGE_BORDER_WIDTH - 1),
            }}
          />
        );
      })}
    </>
  );
};
