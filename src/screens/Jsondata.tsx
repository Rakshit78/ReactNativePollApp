import { View, Text, Button, ScrollView } from 'react-native';

const Jsondata: React.FC = ({ route, navigation }: any) => {
  return (
    <View style={{ padding: 10 }}>
      <ScrollView>
        <View>
          <Button
            title='Back'
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <Text>{JSON.stringify(route.params.item, null, 2)}</Text>
      </ScrollView>
    </View>
  );
};

export default Jsondata;
