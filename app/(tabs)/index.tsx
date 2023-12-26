import * as React from "react";
import Lottie from "lottie-react-native";

import {
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";

export default function TabOneScreen() {
    const animationRef = React.useRef<Lottie>(null);
    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingTop: Platform.select({ android: 30 }),
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                            animationRef.current?.play();
                        }}
                        tintColor={"transparent"}
                    />
                }
            >
                <Lottie
                    ref={animationRef}
                    source={require("../../animation/Animation - 1703631655289.json")}
                    autoPlay
                    loop={false}
                    style={{
                        width: 90,
                        height: 90,
                        alignItems: "center",
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
