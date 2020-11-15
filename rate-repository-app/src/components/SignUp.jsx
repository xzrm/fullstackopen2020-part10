import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useSignUp } from '../hooks/useSignUp';
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
  passwordConfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Required length of at least 1 character')
    .max(30, 'Required max length of 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Required length of at least 1 character')
    .max(30, 'Required max length of 30 characters'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.contrainer}>
      <FormikTextInput
        name="username"
        placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true} />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text
          color='textPrimaryContrast'
          fontWeight="bold"> Sign up </Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUp = () => {

  const [signUp] = useSignUp();
  let history = useHistory();

  const onSubmit = async (values) => {
    const {
      username,
      password
    } = values;

    history.push("/");

    try {
      const { data } = await signUp({ username, password });
      if (data.createUser.username === username) {
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;