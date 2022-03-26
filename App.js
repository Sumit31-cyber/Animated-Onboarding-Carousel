import React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, FlatList, interpolate } from 'react-native';
const { width, height } = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    "key": "3571572",
    "title": "Multi-lateral intermediate moratorium",
    "description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    "image": "https://cdn-icons-png.flaticon.com/512/6457/6457122.png"
  },
  {
    "key": "3571747",
    "title": "Automated radical data-warehouse",
    "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    "image": "https://cdn-icons-png.flaticon.com/512/6457/6457258.png"
  },
  {
    "key": "3571680",
    "title": "Inverse attitude-oriented system engine",
    "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    "image": "https://cdn-icons.flaticon.com/png/512/3305/premium/3305673.png?token=exp=1648308317~hmac=83d666db40e6d57655f4a8a1e2e9ffef"
  },
  {
    "key": "3571603",
    "title": "Monitored global data-warehouse",
    "description": "We need to program the open-source IB interface!",
    "image": "https://cdn-icons-png.flaticon.com/512/6457/6457192.png"
  }
]
const Indicator = ({ scrollX }) => {

  return <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row', }}>
    {DATA.map((_, i) => {
      const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
      const scale = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [0.8, 1.4, 0.8],
        extrapolate: 'clamp'
      })
      const opacity = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [0.6, 0.9, 0.6],
        extrapolate: 'clamp'
      })
      return (
        <Animated.View
          key={`indicator-${i}`}
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            transform: [
              { scale }
            ],
            margin: 10,
            backgroundColor: '#fff',
            opacity

          }}
        />
      );
    })}
  </View>
}
const BackDrop = ({ scrollX }) => {

  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg)
  })

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor
        }
      ]}
    />
  )
}

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(Animated.divide(
    Animated.modulo(scrollX, width),
    new Animated.Value(width)
  ), 1);
  const rotate = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: ['35deg', '-0deg', '35deg']
  })
  const translateX = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, -height, 0]
  })
  return (
    <Animated.View
      style={{
        width: height,
        height,
        backgroundColor: '#FFF',
        borderRadius: 86,
        position: 'absolute',
        left: -height * 0.3,
        top: -height * .6,
        transform: [
          { rotate, },
          { translateX }
        ]
      }}
    />
  )
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        contentContainerStyle={{ paddingBottom: 100, }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={DATA}
        pagingEnabled
        keyExtractor={item => item.key}
        scrollEventThrottle={32}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } },],
          { useNativeDriver: false }
        ,)}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: 'center' }}>
              <View style={{ flex: 0.7, justifyContent: 'center', padding: 20 }}>
                <Image style={{ width: width / 2, height: height / 2 }}
                  source={{ uri: item.image }}
                  resizeMode='contain'
                />
              </View>
              <View style={{ flex: .3 }}>
                <Text style={{ color: '#fff', fontWeight: '800', fontSize: 28, marginBottom: 10 }}>{item.title}</Text>
                <Text style={{ color: '#fff', fontWeight: '300' }}>{item.description}</Text>
              </View>

            </View>

          )
        }}
      />
      <Indicator
        scrollX={scrollX}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});