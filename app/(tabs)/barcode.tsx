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
        scannedProduct.price = Number(scannedProduct.price).toLocaleString();
        console.log(scannedProduct.price);
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
            <View style={styles.barcodeScannerContainer}>
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            {product && (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.heading}>{product.name}</Text>
                        <Text style={styles.description}>{product.spec}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{product.price}원</Text>
                        </View>
                        <View style={styles.discountBanner}>
                            <Button style={styles.discountText}>
                                Obtén tus primeros 2 meses a 1 $ al
                                mesㄹㅁㄴㅇ러마닝러마ㅣㄴ
                            </Button>
                        </View>
                    </View>
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
    barcodeScannerContainer: {
        flex: 1, // 전체 화면을 차지하도록 설정
        ...StyleSheet.absoluteFillObject, // 다른 스타일과 병합
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
