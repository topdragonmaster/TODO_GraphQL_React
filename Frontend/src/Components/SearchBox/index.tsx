import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { InputState } from '../../constant'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputState: InputState
}
const StyledInput = styled.input`
  padding: 6px;
  width: 100%;
  margin-bottom: 3px;
  font-size: 14px;
  background-color: rgba(255,255,255,0.07);
  border-radius: 3px;
  padding: 15px 10px;
  outline: none;
  border: none;
  color: white;
  ::placeholder {
    color: #e5e5e5;
  }
`
export const SearchBox: React.FC<InputProps> = ({ inputState, ...rest }) => {
  let placeholderText: string
  switch (inputState) {
    case InputState.Add:
      placeholderText = 'ADD TodoItem'
      break
    case InputState.Search:
      placeholderText = 'SEARCH TodoItem'
      break
    case InputState.Hidden:
      return (<div></div>)
  }

  return (
    <StyledInput placeholder={placeholderText} {...rest} ></StyledInput>
  )
}