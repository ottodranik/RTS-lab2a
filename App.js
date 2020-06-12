import React, { Component } from 'react';
import { Formik } from 'formik'
import { Text, Button, Alert, View } from 'react-native';
import { styles, validationSchema } from './utils';
import { Perceptron } from './Perceptron'
import { InitFormField } from './InitFormField'

const options = {
  threshold: 4,
  dots: [ [0, 6], [1, 5], [3, 3], [2, 4] ],
  conditions: [0, 0, 0, 1],
  weights: [0, 0],
};

export default class App extends Component {
  state = {
    weights: [],
  }
  perceptron = new Perceptron(options);

  onSubmitHandler = ({ learningSpeed, deadline, iterationsCount }) => {
    const { message, weights } = this.perceptron.calculate(learningSpeed, deadline, iterationsCount);
    Alert.alert(message);
    this.setState({ weights });
  };

  render() {
    return (
      <Formik
        initialValues={{ learningSpeed: 0.01, deadline: 0.5, iterationsCount:100 }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmitHandler}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.cnt}>
            <Text style={styles.textTitle}>Перцептрон</Text>
            {
              ['learningSpeed', 'deadline', 'iterationsCount'].map(parameterName => (
                InitFormField({ parameterName, values, handleChange, errors, setFieldTouched, touched })
              ))
            }
            <Text style={styles.textTitle}>Ваги: {this.state.weights.join('; ')}</Text>
            <Button
              title='Go!'
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  }
}

