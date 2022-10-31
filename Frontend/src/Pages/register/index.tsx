import React, { useEffect, useState } from "react";
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ReactLoading from 'react-loading'
import { useQuery, useMutation, useLazyQuery  } from '@apollo/react-hooks';

import {
  Section,
  Container,
  Title,
  Content,
  Footer,
  MessageContiner,
} from "./styles"
import { Button, Input, CheckItem } from '../../Components'
import { IPassword } from "../../types";

import { USER_QUERY } from '../../Graphql'
import { useNavigate } from 'react-router-dom'


// const SERVER_URL = 'http://localhost:5000/api'

const Login: React.FC = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isloading, setLoading] = useState(false)
  const [usernameValid, setUsernameValid] = useState<string|boolean>(false)
  const [passwordValid, setPasswordValid] = useState<IPassword>({
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChr: false,
    length: false
  })

  const [getUser, { loading, error, data }] = useLazyQuery(USER_QUERY);
  const navigate = useNavigate()
  
  if(data && data.users.length >= 1) {
    navigate(`/main/${username}`, { state: { userId: data.users[0].id } })
  }

  useEffect(() => {
    if(data && data.users.length === 0) {
      toast.error("UserName and Password is not invalid", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000
      })
    }
  }, [data])

  console.log(data)
  const handleSubmit = async (event:  React.SyntheticEvent) => {
    event.preventDefault()
    if(username === '') {
      setUsernameValid("Username is required")
      return
    }

    try {
      const {upperCase, lowerCase, number, specialChr, length} = passwordValid
      if (upperCase && lowerCase && number && specialChr && length) {
        getUser({variables: {username, password}})
        
        
      } else {
        toast.error("Input Valid Password!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000
        })  
      }
    } catch(err) {
      toast.error("Login failed!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000
      })
      setLoading(false)
    }
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
      setUsernameValid(false)
    } else if (event.target.name === 'password') {
      setPassword(event.target.value)
      validPassword(event.target.value)
    }
  }

  const validPassword = (str: string) => {
    const length = str.length >= 6
    const number = /(?=.*[0-9])/g.test(str)
    const upperCase = /(?=.*[A-Z])/g.test(str)
    const lowerCase = /(?=.*[a-z])/g.test(str)
    const specialChr = /(?=.*\W)/g.test(str)

    setPasswordValid({
      upperCase,
      lowerCase,
      number,
      specialChr,
      length
    })
  }

  const messageContent = <MessageContiner>
    <CheckItem pass={passwordValid.upperCase} text="At least one upper letter" />
    <CheckItem pass={passwordValid.lowerCase} text="At least one lower letter" />
    <CheckItem pass={passwordValid.number} text="At least one digit" />
    <CheckItem pass={passwordValid.specialChr} text="At least one special character" />
    <CheckItem pass={passwordValid.length} text="Minimum 6 in length" />
  </MessageContiner>;

  return (
    <div className="app">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <Section data-testid="container">
        {
          isloading ? 
          <ReactLoading type="bars" color="#444" /> :
          <Container onSubmit={handleSubmit}>
          <Title>LogIN</Title>
          <Content>
            <Input
              name="username"
              onChange={handleChange}
              title="Username"
              required={true}
              message={usernameValid}
            />
            <Input
              name="password"
              onChange={handleChange}
              title="Password"
              required={true}
              messageContent={messageContent}
              type="password"
            />
          </Content>
          <Footer>
            <Button type="submit">Register</Button>
          </Footer>
        </Container>
        }
        <ToastContainer />
      </Section>
    </div>
  );
}

export default Login;