import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../services/api';
import styles from './Styles';

export default function Main({ navigation}) {

    const [product, setProduct] = useState([]);
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    
    async function loadProducts() {

        if (loading) {
            return;
        }

        if (total > 0 && product.length === total) {
            return;
        }
        setLoading(true);

        const response = await api.get('product', {
            params: { page }
        });

        setProduct([...product, ...response.data]);
        setTotal(response.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadProducts()
    }, []);

    return (
        <>

            <Text style={styles.productTitle}>O número de produtos é: {total}  nesse momento</Text>

            <FlatList contentContainerStyle={styles.list}
                data={product}
                keyExtractor={product => String(product.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadProducts}
                onEndReachedThreshold={0.2}
                renderItem={({ item: product }) => (

                    <View style={styles.productContainer}>
                       <Text style={styles.productTitle}>{product.id}</Text>
                        <Text style={styles.productTitle}>{product.title}</Text>
                        <Text style={styles.productDescription}>{product.description}</Text>
                        
                        <TouchableOpacity style={styles.productButton}
                         onPress={()=>{
                             navigation.navigate('Product',
                              { url: product.title})
                         }}>
                            <Text style={styles.productButtonText}
                            >Acessar</Text>

                        </TouchableOpacity>
                    </View>
                )}
            />
        </>
    );
}

