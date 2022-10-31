import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../constants/colors';

function Input({ label, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: Colors.primary100,
    //color: 'white',
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary100,
    //backgroundColor: 'white',
    color: Colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 12,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: Colors.error500,
  },
  invalidInput: {
    backgroundColor: Colors.error50,
  },
});
