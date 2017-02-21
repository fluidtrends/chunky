export function log(message, type='info') {
  var color = '448AFF'
  var symbol = '➤'
  switch (type) {
    case 'ok':
      color = '66BB6A'
      symbol = '✔'
      break;
    case 'warning':
      color = 'FF8F00'
      symbol = '⚠'
      break;
    case 'error':
      color = 'D32F2F'
      symbol = '✗'
      break;
    default:
      color = '448AFF'
      symbol = '➤'
  }
  const output = `%c[Chunky] ${symbol} ${message} background: #${color}; color: white; display: block;`
  console.log(output)
  return output
}
