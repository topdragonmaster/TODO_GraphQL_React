import React from 'react'
import styled from 'styled-components'

interface props {
  id: string
  title?: string
  completed: boolean
  selected: boolean
  onClick: (id: string) => void
  onCheckChange: (id: string) => void
}

interface ButtonProps {
  // onClick: () => void
  select: boolean
}

interface TitleProps {
  checked: boolean
}

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  overflow: hidden;
  padding-left: 10px;
  height: 20px;
  white-space: nowrap;
  width: 20px;
`

const StyledTodoItem = styled.div<ButtonProps>`
  display: flex;
  border-bottom: solid;
  background: ${(props: ButtonProps) => props.select ? 'rgba(255,255,255, 0.5)' : 'rgba(255,255,255,0.07)'};
  border-color: #e0e6e9;
  align-items: center;
  &:hover{
    background: rgba(255,255,255,0.4);
  }
`
const Title = styled.p<TitleProps>`
  padding-left: 20px;
  font-size: 17px;
  display: flex;
  align-items: center;
  margin: 0px;
  text-decoration: ${(props: TitleProps) => props.checked ? 'line-through' : 'none'};
  flex: 1;
  padding: 10px;
`

export const TodoItem: React.FC<props> = ({ id, title, completed, selected, onClick, onCheckChange }) => {
  const handleButtonClick = () => {
    onClick(id)
  }

  const handleCheckChange = () => {
    onCheckChange(id)
  }
  
  return (
    <StyledTodoItem select={selected} >
      <Checkbox checked={completed} onChange={handleCheckChange} />
      <Title checked={completed} onClick={handleButtonClick}>{title}</Title>
    </StyledTodoItem>
  )
}