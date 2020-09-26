import React from 'react';
import Customer from './Components/Customer'
import './App.css';

const customers = [
{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '이순신',
  'birthday': '940111',
  'gender': '남자',
  'job': '회사원'
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '유관순',
  'birthday': '920331',
  'gender': '여자',
  'job': '학생'
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '바이브',
  'birthday': '890123',
  'gender': '남자',
  'job': '가수'
},
]


class App extends React.Component {
  render() {
    return (
      <div>
      { customers.map(c => {return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)})}
      </div>
    );
  }
}

export default App;
