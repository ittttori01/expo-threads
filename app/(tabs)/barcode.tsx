import { StyleSheet } from "react-native";
import { Text, View, Button } from "../../components/Themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../types/product";
import { useNavigation } from "@react-navigation/native";

export default function TabTwoScreen() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const backendUrl = process.env.EXPO_PUBLIC_API_URL;
    const [product, setProduct] = useState<Product | null>(null);
    const navigation = useNavigation();

    const findProduct = async (scanned: string): Promise<Product> => {
        const result = await axios.get(backendUrl + "/product/" + scanned);
        const { name, spec, price, barcode } = result.data;
        const scannedProduct: Product = { name, spec, price, barcode };
        return scannedProduct;
    };

    const resetAll = () => {
        setScanned(false);
        setProduct(null);
    };
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({
        type,
        data,
    }: {
        type: string;
        data: string;
    }) => {
        setScanned(true);
        const scanned: string = data.trim();
        alert(scanned);
        const product = await findProduct(scanned);
        setProduct(product); //
        // navigation.navigate("product", { product });
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {product && (
                <View style={styles.productContainer}>
                    <Text>{product.name}</Text>
                    <Text>{`Spec: ${product.spec}`}</Text>
                    <Text>{`Price: ${product.price}`}</Text>
                    <Text>{`Barcode: ${product.barcode}`}</Text>
                    <Button onPress={() => resetAll()} title="Reset" />
                </View>
            )}
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
    productContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
