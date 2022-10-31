import React from 'react';
import styled from 'styled-components';
import { FilterType } from '../../constant'

interface InputProps {
  filterState: FilterType
  onClick: (filtertype: FilterType) => void
}

interface CheckProps {
  selected?: boolean
}

const StyledFilter = styled.div`
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: space-around;
`
const FilterTab = styled.div`
  flex: 1;
  cursor: pointer;
  font-size: 20px;
  padding-bottom: 4px;
  text-align: center;
  padding: 8px;
  border-bottom: ${(props:CheckProps) => props.selected? 'solid': 'none'};
  border-width: 4px;
  border-color: #e0e6e9;
  // &:hover{
  //   background: rgba(0,0,0,0.1);
  // }
`
export const Filter: React.FC<InputProps> = ({ filterState, onClick }) => {

  return (
    <StyledFilter>
      <FilterTab 
        selected={filterState === FilterType.All? true: false}
        onClick={() => onClick(FilterType.All)}
      > 
        All
      </FilterTab>
      
      <FilterTab 
        selected={filterState === FilterType.Active? true: false}
        onClick={() => onClick(FilterType.Active)}
      > 
        Active
      </FilterTab>
      
      <FilterTab 
        selected={filterState === FilterType.Completed? true: false}
        onClick={() => onClick(FilterType.Completed)}
      > 
        Completed
      </FilterTab>
    </StyledFilter>
  )

}