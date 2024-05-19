import React from "react";
import {
  TextInput,
  StyleSheet,
  Image,
  View,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Text,
} from "react-native";

interface PhoneNumberInputProps {
  value: string;
  placeholder?: string;
  onChange: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  style,
  imageStyle,
}) => {
  const handlePhoneNumberChange = (text: string) => {
    onChange(text);
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../assets/images/zimbabwe.png")}
        style={[styles.image, imageStyle]}
      />
      <Text style={{ fontWeight: "600", marginRight: 8 }}>+263</Text>
      <TextInput
        keyboardType="phone-pad"
        placeholder="Enter phone number"
        value={value}
        onChangeText={handlePhoneNumberChange}
        returnKeyType="done"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
});

export default PhoneNumberInput;
