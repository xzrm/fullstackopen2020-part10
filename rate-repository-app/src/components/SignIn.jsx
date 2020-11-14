import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { useHistory } from "react-router-dom";

const styles = StyleSheet.create({
  contrainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,

  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.contrainer}>
      <FormikTextInput
        name="username"
        placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text
          color='textPrimaryContrast'
          fontWeight="bold"> Sign in </Text>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = () => {

  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    console.log(username, password);
    try {
      const { data } = await signIn({ username, password });
      if (data.authorize.accessToken !== undefined) {
        history.push("/");
      }

    } catch (e) {
      console.log(e);
    }

  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;