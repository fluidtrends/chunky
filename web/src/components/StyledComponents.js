import styled from 'styled-components'

export const Headline2 = styled.h2`
  margin: ${props => props.margin};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  color: ${props => props.color};
  ${props => props.additionalStyle};
  @media (max-width: 546px) {
    margin: 100px 20px 20px;
  }
`

export const Headline3 = styled.h3`
  margin: ${props => props.margin};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  color: ${props => props.color};
  ${props => props.additionalStyle};
  @media (max-width: 546px) {
    margin: 20px;
  }
`
