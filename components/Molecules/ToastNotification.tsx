/**
 * ToastNotification Molecule
 *
 * Inline toast view for quick messages.
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import { CustomView, CustomText, Icon, Spacer } from '~/components/Atoms';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastNotificationProps {
  type?: ToastType;
  title?: string;
  message?: string;
  style?: ViewStyle;
}

const containerStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  type = 'info',
  title,
  message,
  style,
}) => {
  const iconName =
    type === 'success'
      ? 'checkmark-circle'
      : type === 'error'
        ? 'close-circle'
        : type === 'warning'
          ? 'warning'
          : 'information-circle';

  const bgVariant =
    type === 'success'
      ? 'success'
      : type === 'error'
        ? 'error'
        : type === 'warning'
          ? 'warning'
          : 'info';

  const textVariant =
    type === 'error'
      ? 'error'
      : type === 'warning'
        ? 'warning'
        : type === 'success'
          ? 'success'
          : 'info';

  return (
    <CustomView bg={bgVariant} padding="3" rounded="md" style={[containerStyle, style]}>
      <Icon family="Ionicons" name={iconName} variant={textVariant as any} />
      <Spacer size="2" horizontal />
      <CustomText variant="body-md" color={textVariant as any}>
        {title ?? ''}
      </CustomText>
      {message ? (
        <>
          <Spacer size="2" horizontal />
          <CustomText variant="body-sm" color={textVariant as any}>
            {message}
          </CustomText>
        </>
      ) : null}
    </CustomView>
  );
};

export default ToastNotification;
