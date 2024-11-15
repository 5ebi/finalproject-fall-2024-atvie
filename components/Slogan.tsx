import { Modak_400Regular, useFonts } from '@expo-google-fonts/modak';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  Slogan: {
    fontSize: 24,

    color: colors.black2,

    textAlign: 'center', // Centers the text
    fontFamily: 'Modak_400Regular',
  },
});

type LogoProps = {
  children: React.ReactNode; // The content to be displayed
};

export default function Slogan({ children }: LogoProps) {
  const [fontsLoaded] = useFonts({
    Modak_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return <Text style={[styles.Slogan]}>{children}</Text>;
}