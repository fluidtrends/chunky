export default [{
  'constant': true,
  'inputs': [{
    'name': 'user',
    'type': 'address'
  }],
  'name': 'userBuys',
  'outputs': [{
    'name': 'result',
    'type': 'uint256[351]'
  }],
  'payable': false,
  'type': 'function'
}, {
  'constant': true,
  'inputs': [],
  'name': 'sale',
  'outputs': [{
    'name': '',
    'type': 'address'
  }],
  'payable': false,
  'type': 'function'
}, {
  'constant': true,
  'inputs': [],
  'name': 'dailyTotals',
  'outputs': [{
    'name': 'result',
    'type': 'uint256[351]'
  }],
  'payable': false,
  'type': 'function'
}, {
  'constant': true,
  'inputs': [{
    'name': 'user',
    'type': 'address'
  }],
  'name': 'userClaims',
  'outputs': [{
    'name': 'result',
    'type': 'bool[351]'
  }],
  'payable': false,
  'type': 'function'
}, {
  'inputs': [{
    'name': '_sale',
    'type': 'address'
  }],
  'payable': false,
  'type': 'constructor'
}]
