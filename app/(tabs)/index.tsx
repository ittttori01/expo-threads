import * as React from "react";
import Lottie from "lottie-react-native";

import {
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { createRandomThread } from "../../utils/generate-dommy-data";
import { ThreadsContext } from "../../context/thread-context";

export default function TabOneScreen() {
    const animationRef = React.useRef<Lottie>(null);
    const threads = React.useContext(ThreadsContext);
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
                        height: 70,
                        alignItems: "center",
                    }}
                />
                {threads.map((thread) => thread.author.name)}
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
