import { ScrollView } from 'react-native';
import {
  CustomText,
  CustomView,
} from '~/components/Atoms';


export default function Home() {
  
  return (
    <ScrollView>
      <CustomView padding="4" bg="primary">
        <CustomText variant="h2" weight="bold">
          Welcome to Doone
        </CustomText>
      </CustomView>
    </ScrollView>
  );
}

