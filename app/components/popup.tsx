import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

interface props {
  dispaly: boolean | undefined;
  setDisplay: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  children: React.ReactNode;
  btn1: string
}

const PopupAlert: React.FC<props> = ({ dispaly, setDisplay, children, btn1 }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-150); // Initial position top the screen
  const [shouldRender, setShouldRender] = useState(dispaly);

  useEffect(() => {
    if (dispaly) {
      setShouldRender(true); // Ensure modal is rendered
      opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.quad) }); // Fade in
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) }); // Slide into place
    } else {
      opacity.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.quad) }, (isFinished) => {
        if (isFinished) {
          runOnJS(setShouldRender)(false); // Remove modal after animation
        }
      });
      translateY.value = withTiming(-150, { duration: 300, easing: Easing.in(Easing.cubic) }); // Slide out
    }
  }, [dispaly]);

  const isModalToggle = () => setDisplay(false);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!shouldRender) return null;

  return (
    <Animated.View style={[styles.overlay, overlayStyle]}>
      <Pressable style={styles.overlay} onPress={isModalToggle} />
      <Animated.View style={[styles.modal, modalStyle]}>
        {children}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={isModalToggle} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>{btn1}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default PopupAlert

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#EFF0A3",
    padding: 10,
    width: wp(20),
    borderRadius: 15,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#212121",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
});