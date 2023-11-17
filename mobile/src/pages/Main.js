import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, TextInput, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons'
import api from "../services/api";
import styles from "./Styles";

export default function Main({ navigation }) {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState({ loading: false, id: null });

  async function loadProducts() {
    try {
      if (loading) {
        return;
      }

      if (total > 0 && product.length === total) {
        return;
      }
      setLoading(true);

      const response = await api.get("product", {
        params: { page },
      });

      setProduct([...product, ...response.data]);
      setTotal(response.headers["x-total-count"]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {

    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function deleteProduct(id, title) {
    setLoadingDelete({ loading: true, id })
    try {
      await api.delete(`product/${id}`, {
        headers: {
          Authorization: title
        }
      });
      setProduct(product.filter(products => products.id !== id))
    } catch (err) {
      Alert.alert('Ooops...', `Não foi possivel deletar: ${product.title}`)
    } finally {
      setLoadingDelete({ loading: false, id: null })
    }
  }

  return (
    <>
      <Text style={styles.productTitle}>
        O número de produtos é: {total} nesse momento
      </Text>

      <FlatList
        contentContainerStyle={styles.list}
        data={product}
        keyExtractor={(product) => String(product.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadProducts}
        onEndReachedThreshold={0.2}
        renderItem={({ item: product }) => (
          <View style={styles.productContainer}>
            <View style={styles.info}>
              <Text style={styles.productTitle}>{product.id})</Text>
              <Text style={styles.productTitle}>{product.title}</Text>
              <RectButton onPress={() => deleteProduct(product.id, product.title)}>
                {loadingDelete.loading && loadingDelete.id === product.id ? <ActivityIndicator color='#ea552f' size='small' /> :
                  <Feather name='trash-2' size={24} color="#ea552f" />
                }
              </RectButton>
            </View>
            <Text style={styles.productDescription} numberOfLines={3}>{product.description}</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.productButton}
              onPress={() => {
                navigation.navigate("Product", { product });
              }}
            >
              <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
}
