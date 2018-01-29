import { default as ImagePicker } from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import { readFileAsBase64 } from './fs'

export function resize(data, width, height) {
  return ImageResizer.createResizedImage(`data:image/jpeg;base64,${data}`, width, height, 'JPEG', 80).
         then((resized) => readFileAsBase64(resized.path)).
         then((final) => `data:image/jpeg;base64,${final}`)
}

export function choosePhoto(title, width, height) {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker({ title,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
    }, (response) => {
      if (response.error) {
        reject(response.error)
        return
      }

      resolve(response.didCancel ? "" : resize(response.data, width, height))
    })
  })
}
