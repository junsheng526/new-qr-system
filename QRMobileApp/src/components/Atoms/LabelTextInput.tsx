import React from 'react';
import {
    TouchableOpacity,
    Text,
    ViewStyle,
    StyleProp,
    TextStyle,
    View,
    TextInput,
} from 'react-native';

export interface TextInputProps {
    label?: string
    labelStyle?: StyleProp<TextStyle> | undefined;
    value?: string | undefined
    onChangeText?: ((text: string) => void) | undefined;
}

const LabelTextInput = (props: TextInputProps) => {
    const {
        label,
        labelStyle,
        value,
        onChangeText,
    } = props;

    return (
        <View style={{
            paddingBottom: 16
        }}>
            <Text style={labelStyle}>
                {label}
            </Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={{ borderBottomColor: '#E5E4E2', borderBottomWidth: 2 }}
            />
        </View>
    );
};

export default LabelTextInput;
