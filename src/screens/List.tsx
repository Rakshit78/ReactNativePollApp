import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const List: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;
  const getdata = async () => {
    try {
      setLoading(true);

      const data = await fetch(url);
      const jsondata: any = await data.json();
      await setList((res) => [...res, ...jsondata.hits]);
      setLoading(false);
    } catch (e) {
      setErr(true);
      console.log(e);
    }
  };
  const moredata = () => {
    setPage((prev) => prev + 1);
  };
  useLayoutEffect(() => {
    getdata();
    const id = setInterval(() => {
      moredata();
    }, 10000);
    return () => clearInterval(id);
  }, [page]);

  const RenderList: React.FC = ({ item }: any) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Jsondata', { item: item });
        }}
      >
        <View
          style={{
            marginVertical: 10,
            borderWidth: 1,
            borderColor: 'black',
            borderStyle: 'solid',
            padding: 10,
            elevation: 2,
          }}
        >
          <Text>Title:{item.title}</Text>
          <Text>Created At: {item.created_at}</Text>
          <Text>Author: {item.author}</Text>
          <Text>Url: {item.url}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/*map thing*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 6,
          }}
        >
          <FlatList
            data={list}
            keyExtractor={(res: any) => res.url}
            renderItem={RenderList}
            onEndReached={moredata}
          />
        </View>
      </ScrollView>
      {loading && <ActivityIndicator size={30} color={'blue'} />}
    </View>
  );
};

export default List;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
