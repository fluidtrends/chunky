import * as selectors   from '../selectors/user'
import * as actions     from '../actions/user'
import { Container }    from '../../..'

export default function (component) {
  return Container(component, selectors, actions)
}
