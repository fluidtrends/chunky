import * as Material from './material'
export { Material }

export function styleColor(id) {
  const [type, name, shade] = id.split(".")

  if (type.toLowerCase() === 'material') {
    return Material.Colors[name][shade]
  }

  return "#333333"
}
