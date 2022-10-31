import React, { useState, useEffect, KeyboardEvent, useRef, useMemo } from 'react';
import { TodoItem, SearchBox, Filter, Button } from '../../Components'
import { InputState, FilterType } from '../../constant'
import { TopWrapper, AppWrapper, Title, ButtonWrapper, TodoItemWrapper } from './Wrapper'
import remove from 'lodash/remove'
import debounce from 'lodash/debounce'
import { useParams, useLocation } from 'react-router-dom'
import {ToastContainer, toast } from "react-toastify";

import { useQuery, useMutation, useLazyQuery, useSubscription  } from '@apollo/react-hooks';
import { TODO_QUERY, ADD_TODO_MUTATION, DELETE_TODO_MUTATION, CHECK_TODO_MUTATION, TODO_SUBSCRIPTION } from '../../Graphql'

interface TodoItemInterface {
  id: string
  name: string
  completed: boolean
  owner: string
}

interface propState {
  userId: string;
} 

const Main: React.FC = () => {
  const { username } = useParams()
  const location = useLocation();
  const { userId } = location.state as propState;

  const [filteredTodoItemList, setFilteredTodoItemList] = useState<TodoItemInterface[]>([])
  const [inputState, setInputState] = useState<InputState>(InputState.Hidden)
  const [inputText, setInputText] = useState('')
  const [filterState, setFilterState] = useState<FilterType>(FilterType.All)
  const [selectedId, setSelectedId] = useState<string>('')
  let todoItemList = useRef<TodoItemInterface[]>([])
  
  
  const [getTodo, { loading, error, data, refetch } ] = useLazyQuery(TODO_QUERY,  { variables : { userId } });
  const [addTodo] = useMutation(ADD_TODO_MUTATION);
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION);
  const [updateTodoCheck] = useMutation(CHECK_TODO_MUTATION);
  const todoSubscription = useSubscription(TODO_SUBSCRIPTION);
  console.log(todoSubscription)

  useEffect(() => {
    getTodo({ variables : { userId } }).then((res => {
      todoItemList.current = res? res.data.todos: []
      filter()
    }))
  }, [])

  useEffect(() => {
    if(todoSubscription.data) {
      const {mutation,name, data} = todoSubscription.data.todo
      if(mutation === "CREATED" && username !== name) {
        toast.success(`${name} created ${data.name}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          })
      }

      if(mutation === "DELETED" && username !== name) {
        toast.success(`${name} deleted ${data.name}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          })
      }

    }

  }, [todoSubscription.data])

  const filter = () => {
    let filteredList: TodoItemInterface[] = []
    switch (filterState) {
      case FilterType.All:
        filteredList = todoItemList.current
        break
      case FilterType.Active:
        filteredList = todoItemList.current.filter((item) => item.completed === false)
        break
      case FilterType.Completed:
        filteredList = todoItemList.current.filter((item) => item.completed === true)
        break
      default:
        break
    }
    setFilteredTodoItemList(filteredList)
    return filteredList
  }

  const addTodoItem = async (text: string) => {
    await addTodo({
      variables : {
      name: text,
      completed: false,
      owner: userId
    }})
    refetch().then((res => {
      todoItemList.current = res? res.data.todos: []
      filter()
    }))
    filter()
    setSelectedId('')
  }

  const searchItem = (text: string) => {
    let filteredList: TodoItemInterface[] = filter()
    setFilteredTodoItemList(filteredList.filter(item => item.name.includes(text)))
  }

  const deleteItem = async () => {
    await deleteTodo({
      variables : {
      id: selectedId
    }})
    refetch().then((res => {
      todoItemList.current = res? res.data.todos: []
      filter()
    }))
    setSelectedId('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputState === InputState.Add && inputText !== '') {
        addTodoItem(inputText)
        setInputText('')
      } 
    }
  }

  const handleItemClick = (id: string) => {
    setSelectedId(id === selectedId? '': id)
  }
 
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
    if (inputState === InputState.Search) {
      debouncedResults(e.target.value)
    }
  }

  const debouncedResults = useMemo(() => {
    return debounce(searchItem, 300);
  }, []);

  const handleCheckChange = async (id: string) => {
    await updateTodoCheck({
      variables : {
      id: id
    }})
    refetch().then((res => {
      todoItemList.current = res? res.data.todos: []
      filter()
    }))
  }

  const handleFilterClick = (filterType: FilterType) => {
    setFilterState(filterType)
  }

  useEffect(() => {
    filter()
    return() => {
      debouncedResults.cancel();
    }
  }, [filterState])

  return (
    <TopWrapper>
      <AppWrapper>
        <Title>Todo App</Title>
        <SearchBox autoFocus
          inputState={inputState}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <ButtonWrapper>
          <Button
            onClick={() => {
              setInputState(InputState.Add)
              setInputText('')
            }}>
            ADD
          </Button>
          <Button
            onClick={() => {
              setInputState(InputState.Search)
              setInputText('')
            }}>
            SEARCH </Button>
          <Button onClick={deleteItem}>DELETE</Button>
        </ButtonWrapper>
        <TodoItemWrapper>
          <Filter filterState={filterState} onClick={handleFilterClick}></Filter>
          {
            filteredTodoItemList.map((item: TodoItemInterface) => (
              <TodoItem
                key={item.id}
                id={item.id}
                title={item.name}
                selected={item.id === selectedId}
                completed={item.completed}
                onClick={handleItemClick}
                onCheckChange={handleCheckChange}
              />
            ))
          }
        </TodoItemWrapper>

      </AppWrapper>
      <ToastContainer />
    </TopWrapper>

  )
}

export default Main;