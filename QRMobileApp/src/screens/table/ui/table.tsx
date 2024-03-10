import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export interface TableActions {
    init: () => void
}

export let Table: React.FC<TableActions> = ({ init }) => {
    useEffect(() => { init(); }, [init]);
    return <View>
        <Text>Sample 1 - page 1</Text>
        <Button title="go to page2" onPress={() => { }} />
    </View>;
}