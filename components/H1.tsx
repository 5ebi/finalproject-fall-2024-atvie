import { Montserrat_900Black, useFonts } from '@expo-google-fonts/montserrat';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.black2,
    marginBottom: 20,
    textAlign: 'center', // Centers the text
    fontFamily: 'Montserrat_900Black',
  },
});

type H1Props = {
  children: React.ReactNode; // The content to be displayed
};

export default function H1({ children }: H1Props) {
  const [fontsLoaded] = useFonts({
    Montserrat_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
  return <Text style={[styles.h1]}>{children}</Text>;
}
