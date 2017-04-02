  import {createStore} from 'redux';
  import React, {Component} from 'react';
  import ReactDom from 'react-dom';
  function calActionFunc (text) {
      if(text === '-') {
           return {
           	 type: 'DECREASE'
           }
      }else if (text === '+') {
            return {
              type: 'INCREASE'
            }
      }else{
            return {
            	type: 'INIT'
            }
      }
  }
  const reducerCal = (state = 0, action) => {
  	  switch(action.type) {
  	  	 case 'DECREASE':
  	  	     return state - 1;
  	  	 case 'INCREASE':
  	  	     return state + 1;
  	  	 default:
  	  	     return state;
  	  }
  }
  const store = createStore(reducerCal);
	  store.dispatch({
	  	  type: 'INIT'
	  });
  class App extends Component{
  	  render () {
		return (
	  <div>
	       <h1>{store.getState()}</h1>
	       <button onClick={ () => {
	            let action = calActionFunc('-');
	            store.dispatch(action);
	       	}}>-</button>
	       <button onClick={ () => {
	       	    let action = calActionFunc('+');
	       	    store.dispatch(action);
	       }}>+</button>
	  </div>
	    )
  	}
  }
  const render = () => {
  	  ReactDom.render(
          <App></App>,
          document.getElementById('root')
  	  )
  }
  render();
  store.subscribe(render);