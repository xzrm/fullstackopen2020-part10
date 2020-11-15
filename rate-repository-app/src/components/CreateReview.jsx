import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import { useCreateReview } from '../hooks/useCreateReview';


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
  repositoryOwnerName: '',
  repositoryName: '',
  rating: '',
  review: ''
};

const validationSchema = yup.object().shape({
  repositoryOwnerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(1)
    .max(100)
    .required('Rating is required'),
  review: yup.string()
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.contrainer}>
      <FormikTextInput
        name="repositoryOwnerName"
        placeholder="Repository owner name" />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name" />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100" />
      <FormikTextInput
        name="review"
        placeholder="Review"
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text
          color='textPrimaryContrast'
          fontWeight="bold"> Create a review </Text>
      </TouchableOpacity>
    </View>
  );
};

const CreateReview = () => {

  const [createReview] = useCreateReview();
  let history = useHistory();

  const onSubmit = async (values) => {
    const {
      repositoryOwnerName,
      repositoryName,
      rating,
      review
    } = values;

    try {
      const { data } = await createReview(
        {
          repositoryOwnerName,
          repositoryName,
          rating,
          review
        });

      if (data.createReview.id !== undefined) {
        history.push(`/${data.createReview.repositoryId}`);
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;