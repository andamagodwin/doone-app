import { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  CustomText,
  CustomView,
  Icon,
  CheckToggle
} from '~/components/Atoms';


export default function Home() {
  const [done, setDone] = useState(false);
  
  return (
    <ScrollView>
      <CustomView padding="4" bg="primary">
        <CustomView style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText variant="h2" weight="bold">
            Welcome to Doone
          </CustomText>
          <Icon family="Ionicons" name="add" size="lg" variant="brand-primary" />
          <CheckToggle value={done} onChange={setDone} size="md" />
        </CustomView>
      </CustomView>
    </ScrollView>
  );
}

