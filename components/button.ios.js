import React from 'react';
import { Button } from 'react-native'

export default function MyButton() {
    return (
        <Button onPress={(e) => alert("test button iOs")} title="Learn More (iOS)"
            color='#100011' accessibilityLabel="Learn more about this purple button"/>
    )
}

/*export default class MyButton extends React.Component {
    render() {
        return (
            <Button onPress={(e) => alert("test button iOs class")} title="Learn More (iOS)"
                color='#100011' accessibilityLabel="Learn more about this purple button"/>
        )
    }
}*/