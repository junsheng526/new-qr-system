import React from 'react'
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ArrowBack from './Svg/ArrowBack'

type AppBarProp = {
    onBack?: () => void
    title?: string
    titleColor?: string
    rightIcon?: React.ReactNode
    onPressRightIcon?: () => void
}

const AppBar = (props: AppBarProp) => {
    const {
        onBack,
        title,
        titleColor = "#000000",
        rightIcon,
        onPressRightIcon,
    } = props

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={{
                padding: 20,
            }}>
                <ArrowBack fill={'#252525'} width={20} height={20} />
            </TouchableOpacity>
            <View>
                <Text style={[styles.titleWrapper, { color: titleColor }]}>
                    {title}
                </Text>
            </View>
            {
                rightIcon ? (
                    <TouchableOpacity onPress={onPressRightIcon} style={{
                        padding: 20,
                    }}>
                        {rightIcon}
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 50 }}></View>
                )
            }

        </View>
    )
}

export default AppBar

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal: 16,
        // backgroundColor: '#ececec'
    },
    titleWrapper: {
        alignSelf: 'center',
        fontSize: 16
    },
})
