import { StyleSheet, Button } from "react-native";
import { Text, View } from "../../components/Themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../types/product";

export default function TabTwoScreen() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const backendUrl = process.env.EXPO_PUBLIC_API_URL;
    const [product, setProduct] = useState<Product | null>(null);

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
        const product = await findProduct(scanned);
        setProduct(product);
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
                <View style={styles.productContainer}>
                    <View style={styles.card}>
                        <Text style={styles.heading}>{product.name}</Text>
                        <Text style={styles.description}>{product.spec}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{product.price}원</Text>
                        </View>
                        <View style={styles.discountBanner}>
                            <Button
                                onPress={resetAll}
                                title="다시 스캔하기"
                            ></Button>
                        </View>
                        {/* <Button
                            onPress={resetAll}
                            title="다시 스캔하기"
                        ></Button> */}
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
    productContainer: {
        flex: 1,
        width: "100%",
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
    card: {
        backgroundColor: "white",
        width: 350,
        height: 300,
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
        fontSize: 20,
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
        marginTop: 24,
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
});
