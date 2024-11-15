import { Link } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';
import FullPageContainer from '../../components/FullPageContainer';
import H1 from '../../components/H1';
import { colors } from '../../constants/colors';

export default function Verify() {
  return (
    <FullPageContainer>
      <H1>Verify</H1>

      <Link href="/addFirstDog" asChild>
        <Button
          style={{ alignSelf: 'center', width: 332, marginBottom: 10 }}
          textColor={colors.text}
          mode="outlined"
        >
          Verify
        </Button>
      </Link>
    </FullPageContainer>
  );
}
