import { useSQLiteContext } from "expo-sqlite";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import DatabaseManager from "../services/cartService";


export default function Card({ goodData }) {
  const sqlite = useSQLiteContext();
  const db = new DatabaseManager(sqlite);

  const addToCart = async (localProductData) => {
    await db.addGood(localProductData);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: goodData.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{goodData.title}</Text>
        <Text style={styles.price}>Цена: {goodData.price}$</Text>
        <Text style={styles.description}>{goodData.description}</Text>
        <Pressable style={styles.button} onPress={() => addToCart(goodData)}>
          <Text style={styles.buttonText}>Добавить в корзину</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginVertical: 10, 
    padding: 15, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, 
  },
  image: {
    width: 120, 
    height: 120, 
    borderRadius: 12, 
    marginRight: 15, 
    resizeMode: 'cover', 
  },
  infoContainer: {
    flex: 1, 
    justifyContent: 'space-between', 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 5, 
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
    marginBottom: 10, 
    flexWrap: 'wrap', 
  },
  button: {
    backgroundColor: '#3577ff', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10, 
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16, 
  },
});