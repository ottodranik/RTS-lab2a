import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './utils';

export const InitFormField = ({
  parameterName,
  values,
  handleChange,
  errors,
  setFieldTouched,
  touched
}) => (
  <View
    style={styles.textCnt}
    key={parameterName}
  >
    <TextInput
      style={styles.textInput}
      value={values[parameterName]}
      onChangeText={handleChange(parameterName)}
      onBlur={() => setFieldTouched(parameterName)}
      placeholder={'Enter ' + parameterName + ' value'}
    />
    {
      (touched[parameterName] && errors[parameterName])
        ? <Text style={styles.errorString}>{errors[parameterName]}</Text>
        : null
    }
  </View>
)