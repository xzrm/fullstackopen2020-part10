import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import theme from '../theme';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 14,
    color: theme.colors.textError

  },
  textInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 10
  },
  textInputError: {
    height: 50,
    borderColor: theme.colors.textError,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 10
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        style={showError ? styles.textInputError: styles.textInput}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;