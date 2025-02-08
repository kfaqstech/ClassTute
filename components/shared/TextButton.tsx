import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  title: string;
  className?: string
}

const TextButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  title,
  className,
  ...props
}) => {
  const getVariantStyle = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 px-4 py-2 rounded-md';
      case 'secondary':
        return 'bg-green-500 px-4 py-2 rounded-md';
      case 'outline':
        return 'border border-blue-500 px-4 py-2 rounded-md';
      case 'ghost':
        return 'px-4 py-2 rounded-md';
      default:
        return 'bg-blue-500 px-4 py-2 rounded-md';
    }
  };

  // Function to determine text styling based on variant
  const getTextStyle = (): string => {
    switch (variant) {
      case 'primary':
        return 'text-white text-center font-bold';
      case 'secondary':
        return 'text-white text-center font-bold';
      case 'outline':
        return 'text-blue-500 text-center font-bold';
      case 'ghost':
        return 'text-gray-700 text-center font-bold';
      default:
        return 'text-white text-center font-bold';
    }
  };

  return (
    <TouchableOpacity className={`${getVariantStyle()} ${className}`} {...props}>
      <Text className={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;