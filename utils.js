import * as yup from 'yup'
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cnt: {
    margin: 10,
    marginTop: 50,
  },
  textTitle: {
    marginBottom: 20,
    display: 'flex',
  },
  textInput: {
    height: 50,
    fontSize: 15,
    backgroundColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#999',
    color: '#000',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  errorString: {
    fontSize: 10,
    color: 'red',
    marginTop: 3,
    marginBottom: 6,
    position: 'absolute',
    bottom: -20,
  },
  textCnt: {
    marginBottom: 20,
  }
});

export const validationSchema = yup.object().shape({
  learningSpeed: yup.number()
    .positive('Should be positive number')
    .required(),

  deadline: yup.number()
    .positive('Should be positive number')
    .required(),

  iterationsCount: yup.number()
    .positive('Should be positive number')
    .integer('Should be positive integer')
    .required(),
});