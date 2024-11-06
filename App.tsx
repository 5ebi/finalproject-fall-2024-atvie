import { Modak_400Regular } from '@expo-google-fonts/modak';
import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import UserItem from './components/UserItem';
import { colors } from './constants/colors';

const App = () => {
  const [fontsLoaded] = useFonts({
    Modak_400Regular,
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    h2: {
      color: colors.h2,
      fontFamily: 'Montserrat_700Bold',
      fontWeight: 700,
      margin: 10,
      fontSize: 20,
      paddingLeft: 20,
      paddingRight: 20,
      letterSpacing: 2,
      lineHeight: 80,
      textAlign: 'center',
    },
    h1: {
      color: colors.h1,
      fontFamily: 'Modak_400Regular',
      fontSize: 60,
      letterSpacing: 1,
      textAlign: 'center',
      marginVertical: 35,
    },
  });

  type User = {
    id: number;
    firstName: string;
    lastName: string;
  };

  const [users, setUsers] = useState([
    { id: 1, firstName: 'Sebi', lastName: 'Speiser' },
    { id: 2, firstName: 'Jasmin', lastName: 'Speiser' },
    { id: 3, firstName: 'Monti', lastName: 'Speiser' },
    { id: 4, firstName: 'Mila', lastName: 'Speiser' },
  ]);

  const renderItem = ({ item }: { item: User }) => <UserItem user={item} />;
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={[styles.h1, { marginBottom: 20, marginTop: 0 }]}>
          PawMatch
        </Text>
        <Text style={[styles.h2, { marginBottom: 10, marginTop: 0 }]}>
          Find the Pawfect Match!
        </Text>
      </View>

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item: User) => String(item.id)}
      />
      <StatusBar style="auto" hidden={false} />
    </SafeAreaView>
  );
};

export default App;
