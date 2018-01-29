import RNFS from 'react-native-fs'

export function readFileAsBase64(path) {
  return RNFS.readFile(path, 'base64')
}
