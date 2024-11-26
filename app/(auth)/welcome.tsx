import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import FullPageContainer from '../../components/FullPageContainer';
import Logo from '../../components/Logo';
import Slogan from '../../components/Slogan';
import { colors } from '../../constants/colors';

export default function Welcome() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    logoContainer: {
      alignItems: 'center',
      paddingTop: 40,
    },
    buttonsContainer: {
      marginTop: 'auto',
      paddingBottom: 20,
      gap: 5,
    },
    button: {
      alignSelf: 'center',
      width: 330,
      padding: 3,
      marginBottom: 10,
      backgroundColor: colors.text,
    },
    button2: {
      alignSelf: 'center',
      width: 330,
      marginBottom: 10,
      padding: 3,
      backgroundColor: colors.text2,
    },
  });

  return (
    <FullPageContainer>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo>Paw Match</Logo>
          <Slogan>find the pawfect match.</Slogan>
        </View>

        <Button
          style={styles.button2}
          mode="contained"
          onPress={() => router.push('/(auth)/addFirstDog')}
        >
          adddog
        </Button>

        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => router.push('/(auth)/register')}
          >
            Sign up
          </Button>

          <Button
            style={styles.button2}
            mode="contained"
            onPress={() => router.push('/(auth)/login')}
          >
            I already have an account
          </Button>
        </View>
      </View>
    </FullPageContainer>
  );
}
