import styled from 'styled-components'

export const TopWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  margin-top: 70px;
  justify-content: center;
`
export const AppWrapper = styled.div`
  width: 600px;
  background: rgba(255,255,255,0.13);
  padding: 30px;
  display: flex;
  flex-direction: column;
  `

export const Title = styled.h1`
  text-align: center;
`
export const TodoItemWrapper = styled.div`
  padding: 20px;
  text-align: center;
  background: rgba(255,255,255,0.07);
  overflow-y: scroll;
  flex: 1;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;  
  gap: 1;
`