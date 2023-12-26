import Lottie from "lottie-react-native";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function TabOneScreen() {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ backgroundColor: "gray" }}>
                <Lottie
                    source={require("../../animation/Animation - 1703512434756.json")}
                    autoPlay
                    loop={true}
                    style={{ width: 90, height: 90, alignSelf: "center" }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
