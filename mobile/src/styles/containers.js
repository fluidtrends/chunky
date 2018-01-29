import {
  StyleSheet
} from 'react-native'
import { Styles } from 'react-chunky'

export const containers = (theme) => StyleSheet.create({
  centered: {
   alignItems: 'center',
   justifyContent: 'center',
   padding: 8,
  },
  form: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.styleColor(theme.backgroundColor),
  },
  list: {
    width: "100%",
    backgroundColor: Styles.styleColor(theme.backgroundColor)
  },
  listRow: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20
  },
  listRowSeparator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#999999',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
