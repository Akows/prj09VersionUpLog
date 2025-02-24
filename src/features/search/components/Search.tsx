import React from 'react'

interface SearchProps {
    setActivePage2: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({setActivePage2}) => {
  return (
    <div>
        <button onClick={() => setActivePage2('post')}>뒤로가기</button>
        
        <p>이유승님이 작성한 포스트를 검색할 수 있습니다.</p>
        <input></input>
    </div>
  )
}

export default Search;