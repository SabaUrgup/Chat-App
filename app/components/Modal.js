import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../utils/styles";

//👇🏻 Import socket from the socket.js file in utils folder
import socket from "../utils/socket";

const Modal = ({ setVisible }) => {
    const closeModal = () => setVisible(false);
    const [groupName, setGroupName] = useState("");

    const handleCreateRoom = () => {
        //👇🏻 sends a message containing the group name to the server
        socket.emit("createRoom", groupName);
        closeModal();
    };
    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalsubheading}>Enter your Group name</Text>
            <TextInput
                style={styles.modalinput}
                placeholder='Group name'
                onChangeText={(value) => setGroupName(value)}
            />
            <View style={styles.modalbuttonContainer}>
                {/* 👇🏻 The create button triggers the function*/}
                <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={styles.modaltext}>CREATE</Text>
                </Pressable>

                <Pressable
                    style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
                    onPress={closeModal}
                >
                    <Text style={styles.modaltext}>CANCEL</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Modal;