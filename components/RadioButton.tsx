import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const RadioButton = (props: any) => {
  const [radio, setRadio] = useState('');

  const select = (value: any) => {
    setRadio(value);
    props.onSelect(value);
  };

  return (
    <View>
      {props.data.map((q: any) => {
        return (
          <View
            style={{
              backgroundColor: radio === q.value ? '#D9E7FB' : '#fff',
              borderColor: '#d3d6da',
              borderWidth: 2,
              borderRadius: 10,
              height: 50,
              width: 240,
              alignItems: 'center',
              paddingStart: 30,
              paddingEnd: 30,
              marginTop: 10,
            }}
            key={q.label}>
            <TouchableOpacity
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
              style={{
                flexDirection: 'row',
              }}
              onPress={() => select(q.value)}>
              <Text
                style={{
                  //backgroundColor: radio === q.value ? '#d3d6da' : '#fff',
                  marginTop: 8,
                  fontSize: props.styling.size - 10,
                }}>
                {q.label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default RadioButton;
