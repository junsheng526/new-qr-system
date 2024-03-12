import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

export interface ProfileMenuActions {
    init: () => void
}

export interface ProfileMenuData {
}

export let ProfileMenu: React.FC<ProfileMenuActions & ProfileMenuData> = ({ init }) => {
    useEffect(() => { init(); }, [init]);
    return (
        <View>
            <Text>Menu Page</Text>
        </View>
    );
}