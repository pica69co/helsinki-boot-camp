import React, {useState} from 'react';
import './App.css';

const App = (props) => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0)
  
  let Votes = new Uint8Array(anecdotes.length)
  const [votes, setVotes] = useState(Votes)
  
  const [winnerAnecdote, setWinnerAnecdote] = useState(0)

  const handleNextAnecdote = () => {
    let aleatoryAnecdote = Math.floor(Math.random() * anecdotes.length)
     return setSelected(aleatoryAnecdote)

  }


  const handleCountVotes = () => {
    let  greatVote= 0
    
    const copy = [...votes]
    copy[selected]++
    
    for (let v = 0; v < copy.length; v++) {
        if( copy[v] > greatVote ) {
          setWinnerAnecdote(v)
          greatVote = copy[v]
        }
      }
      return setVotes(copy)
  }
    
  return (
    <div>
      <h1>Anecdotes</h1>
      <h2>Anecdote of the day</h2>
       <quotes>{`"${anecdotes[selected]}"`}</quotes>
       <p>{`has ${votes[selected]} votes`}</p>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <button onClick={handleCountVotes}>vote</button>      
      <h3>Anecdote with most votes:</h3>
      <quotes>{`"${anecdotes[winnerAnecdote]}"`}</quotes>
    </div>
  );
}

export default App;
