import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

type TextBoxVariant = 'default' | 'outline' | 'filled' | 'underline';

interface TextBoxProps extends TextInputProps {
  variant?: TextBoxVariant;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({
  variant = 'default',
  placeholder = '',
  onChangeText,
  ...props
}) => {
  const { colors } = useTheme()

  const getVariantStyle = (): string => {
    switch (variant) {
      case 'outline':
        return 'border border-gray-300 p-2 rounded-md';
      case 'filled':
        return 'bg-gray-100 p-2 rounded-md';
      case 'underline':
        return 'border-b-2 border-gray-300 p-2';
      default:
        return 'border p-2 rounded-md';
    }
  };

  return (
    <View>
      <TextInput
        className={getVariantStyle()}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={{backgroundColor: colors.background, color: colors.text}}
        {...props}
      />
    </View>
  );
};

export default TextBox;