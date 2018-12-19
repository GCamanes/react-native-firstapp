import React from 'react';
import { Button } from 'react-native'
export default function MyButton() {
    return (
        <Button onPress={(e) => alert("test button android")} title="Learn More (android)"
            color='#100011' accessibilityLabel="Learn more about this purple button"/>
    )
}