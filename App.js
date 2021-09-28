import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
        setIndex((index + 1) % (10 + 1));
    }, 1000)

    return () => {    
        clearTimeout(interval);
    }
}, [index])


const Progress = ({ step, steps, height }) => {

    const [width, setWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const reactive = useRef(new Animated.Value(-1000)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [])

    useEffect(() => {           
        reactive.setValue(-width + (width * step) / steps);            
    }, [step, width])


    return (
        <>

            <Text style={styles.textStyle} >
                {step}/{steps}
            </Text>
            <View
                onLayout={(e) => {
                    const newWidth = e.nativeEvent.layout.width;
                    setWidth(newWidth);
                }}
                style={{
                    height,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: height,
                    overflow: 'hidden'
                }}
            >
                <Animated.View style={{
                    height,
                    width: '100%',
                    borderRadius: height,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: [{
                        translateX: animatedValue
                    }]
                }}>
                </Animated.View>
            </View>
        </>
    )

}

  return (
      <View style={styles.mainView}>
         <Progress step={index} steps={10} height={50} />
      </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff', 
    justifyContent: 'center',
    padding: 20
  },
  textStyle: {
    fontSize: 12,
    fontWeight: '900', 
    marginBottom: 8
  },

});

export default App;
