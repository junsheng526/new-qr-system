import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

export interface ProfileMenuActions {
    init: () => void
}

export let ProfileMenu: React.FC<ProfileMenuActions> = ({ init }) => {
    useEffect(() => { init(); }, [init]);
    return (
        <View>
            <Text>Menu Page</Text>
        </View>
    );
}