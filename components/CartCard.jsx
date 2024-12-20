import { useSQLiteContext } from "expo-sqlite";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import DatabaseManager from "../services/cartService";


export default function CartCard({ goodData }) {
  const sqlite = useSQLiteContext();
  const db = new DatabaseManager(sqlite);
  

  const addToCart = async (localGoodData) => {
    await db.addGood(localGoodData);
  };
  const decreaseCount = async (localGoodData) => {
    if (localGoodData.count === 1) {
      return db.deleteGood(localGoodData.id);
    }
    await db.decreaseGoodCount(localGoodData.id);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: goodData.image }} style={styles.image} />
      <Text style={styles.title}>{goodData.title}</Text>
      <Text style={styles.price}>Цена: {goodData.price}$</Text>
      <Text style={styles.description}>{goodData.description}</Text>
      <View style={styles.countLine}>
        <Pressable style={styles.button} onPress={() => decreaseCount(goodData)}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.count}>{goodData.count}</Text>
        <Pressable style={styles.button} onPress={() => addToCart(goodData)}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 10, 
    padding: 20, 
    margin: 10, 
    backgroundColor: '#fff', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 5, 
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333',
    marginBottom: 10, 
  },
  image: {
    width: 100, 
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E92A2A',
    marginBottom: 5, 
  },
  description: {
    fontSize: 14,
    color: '#666', 
    marginBottom: 15, 
  },
  countLine: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  button: {
    borderWidth: 2, 
    borderColor: '#3577ff', 
    backgroundColor: '#3577ff', 
    width: 120, 
    alignItems: 'center', 
    borderRadius: 15, 
    paddingVertical: 8, 
    marginTop: 5, 
    marginHorizontal: 5, 
  },
  buttonText: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#fff',
  },
  count: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginHorizontal: 15, 
  },
});
