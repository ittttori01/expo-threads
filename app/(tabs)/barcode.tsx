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

{
    /* <View style={styles.container}>
<View style={styles.card}>
  <Text style={styles.heading}>Basic</Text>
  <Text style={styles.description}>{product.spec}</Text>
  <View style={styles.priceContainer}>
    <Text style={styles.currency}>USD</Text>
    <Text style={styles.price}>{product.price.toFixed(2)}</Text>
  </View>
  <View style={styles.discountBanner}>
    <Text style={styles.discountText}>Obtén tus primeros 2 meses a 1 $ al mes</Text>
  </View>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Prueba gratis</Text>
  </TouchableOpacity>
  <Text style={styles.subheading}>Incluye:</Text>
  <View style={styles.list}>
    <Text style={styles.listItem}>Gestión de casos</Text>
    <Text style={styles.listItem}>Gestión de inventario</Text>
    <Text style={styles.listItem}>Trackeo para clientes</Text>
    <Text style={styles.listItem}>Personalización de entornos</Text>
    <Text style={styles.listItem}>1 solo perfil</Text>
  </View>
</View>
</View> */
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
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        color: "#666",
        marginBottom: 24,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        marginBottom: 16,
    },
    currency: {
        fontSize: 20,
        fontWeight: "bold",
    },
    price: {
        fontSize: 40,
        fontWeight: "bold",
        marginLeft: 4,
    },
    discountBanner: {
        backgroundColor: "#F2F2F2",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    discountText: {
        color: "#333333",
    },
    button: {
        backgroundColor: "black",
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    subheading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    list: {
        paddingLeft: 20,
    },
    listItem: {
        marginBottom: 8,
    },
});
