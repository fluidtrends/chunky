import * as selectors   from '../selectors/auth'
import * as actions     from '../actions/auth'
import { Container }    from '../../..'

export default function (component) {
  return Container(component, selectors, actions)
}
