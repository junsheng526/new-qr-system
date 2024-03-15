import React from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type AppBarProp = {
  onBack?: () => void
  title?: string
  onPressSave?: () => void
  titleColor?: string
}

const AppBar = (props: AppBarProp) => {
  const {
    onBack,
    title,
    onPressSave,
    titleColor = "#000000"
  } = props

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={{
        padding: 20,
      }}>
        <Text>Cancel</Text>
      </TouchableOpacity>
      <View>
        <Text style={[styles.titleWrapper, { color: titleColor }]}>
          {title}
        </Text>
      </View>
      <TouchableOpacity onPress={onPressSave} style={{
        padding: 20,
      }}>
        <Text>Save</Text>
      </TouchableOpacity>
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
