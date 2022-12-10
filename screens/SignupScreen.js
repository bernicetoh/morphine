import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { authentication, db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  orderBy,
  doc,
  query,
  updateDoc,
  addDoc,
  serverTimestamp,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
const SignupScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const checkValid = () => {
    if (
      firstName &&
      lastName &&
      email &&
      phoneNum &&
      password &&
      repassword &&
      phoneNum.length == 8 &&
      password == repassword &&
      validateEmail(email)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSignup = () => {
    if (checkValid()) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          await setDoc(doc(db, "users", user.uid), {
            email: email,
            fName: firstName,
            lName: lastName,
            phoneNum: phoneNum,
          }).catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => alert(error.message));
    } else {
      Alert.alert("Error", "Please enter valid information");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View>
          <TouchableOpacity
            style={styles.backbtn}
            onPress={() => navigation.navigate("login")}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="First Name"
              placeholderTextColor="black"
              onChangeText={(text) => setFirstName(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Last Name"
              placeholderTextColor="black"
              onChangeText={(text) => setLastName(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="+65 Phone Number"
              placeholderTextColor="black"
              onChangeText={(text) => setPhoneNum(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="black"
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="black"
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Re-enter Password"
              placeholderTextColor="black"
              onChangeText={(text) => setRepassword(text)}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.signupbutton} onPress={handleSignup}>
            <Text style={styles.signuptext}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#A3A3BD",
    borderRadius: 15,
    width: 270,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    padding: 13,
  },
  signupbutton: {
    width: 100,
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#171E4A",
    alignSelf: "center",
  },
  signuptext: {
    color: "white",
    fontWeight: "bold",
  },
  backbtn: {
    bottom: 120,
    right: 50,
  },
});
export default SignupScreen;