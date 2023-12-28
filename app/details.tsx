import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function Details() {
    const route = useRouter();

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>{product.name}</Text>
            <Text>{`Spec: ${product.spec}`}</Text>
            <Text>{`Price: ${product.price}`}</Text>
            <Text>{`Barcode: ${product.barcode}`}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
