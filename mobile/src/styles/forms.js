import {
  StyleSheet
} from 'react-native'
import { Styles } from 'react-chunky'

export const forms = (theme) => StyleSheet.create({
  header: {
    padding: 10,
  },
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 20,
    borderRadius: 4,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    width: 300,
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  error: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    color: '#f44336'
  },
  prompt: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    color: '#999999'
  },
  textField: {
    height: 60,
    width: 250,
    alignSelf: "center",
    marginBottom: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  button: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 40,
    marginBottom: 20
  },
  secondaryButton: {
    margin: 10
  }
})