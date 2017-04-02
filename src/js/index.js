	import React, {Component} from 'react';
	import ReactDom from 'react-dom';
	import '../less/index.less';
	const data = [
        {"name": "magasa",
         "slug": "masaga",
         "avatarUrl": "1.png",
         "bio": "电影杂志主编",
         "id": 1
        },
        {"name": "陈一楠",
         "slug": "chen-yi-nan",
         "avatarUrl": "1.png",
         "bio": "电影杂志主编",
         "id": 2
        },
        {"name": "kobe",
         "slug": "kobe",
         "avatarUrl": "1.png",
         "bio": "电影杂志主编",
         "id": 3
        },
        {"name": "rusell",
         "slug": "rusell",
         "avatarUrl": "1.png",
         "bio": "电影杂志主编",
         "id": 4
        },
        {"name": "james",
         "slug": "james",
         "avatarUrl": "1.png",
         "bio": "电影杂志主编",
         "id": 5
        },
        {"name": "westBrook",
         "slug": "westBrook",
         "avatarUrl": "1.png",
         "bio": "电影杂志主编",
         "id": 6
        },
        {"name": "booker",
         "slug": "booker",
         "avatarUrl": "1.png",
         "bio": "电影杂志主编",
         "id": 7
        }
	]
	class SearchBar extends Component{
		 onHandleChange () {
		 	this.props.onFilterText(this.refs.inp.value);
		 }
		 render () {
		 	let inviteList = this.props.inviteList;
		 	let row = inviteList.map( (ele, index) => {
		 		return <strong style={{color: '#000'}} key={index + 100}>{ele.name + ","}</strong>
		 	})
		 	return (
		 	   <div className="search">
		 	        <span>你应经邀请{row}等{row.length}人</span>
		 	        <input ref="inp" type="text" placeholder="搜索你想邀请的人" onChange={this.onHandleChange.bind(this)}/>
		 	   </div>
		    )
		 }
	}
	class InviteItem extends Component{
		 onHandleClick () {
            this.props.onTouchHandle(this.props.message.id)
		 }
		 render () {
            return (
              <li className="item">
                  <img src={"./src/img/" + this.props.message.avatarUrl}/>
                  <div className="name">{this.props.message.name}</div>
                  <div className="bio">{this.props.message.bio}</div>
                  <button style={this.props.message.canInvited ? {color: "#11a668", border: "1px solid #11a668"} : {color: "#8590a6", border: "1px solid #ccd8e1"}} onClick={this.onHandleClick.bind(this)}>{this.props.message.canInvited ? '邀请回答' : '取消邀请'}</button>
              </li>
            )
		 }
	}
	class InviteList extends Component{
		 componentWillMount () {
             this.onDealData();
		 }
		 shouldComponentUpdate (nextProps, nextState) {
             this.props = nextProps;
             this.onDealData();
             return true;
		 }
		 onDealData () {
		 	// let data = this.props.data;
		 	let row = [];
		 	let {data, filterText, onTouchHandle} = this.props;
		 	data.forEach( (ele, index) => {
		 	  if(ele.name.indexOf(filterText) !== -1){
			 	    row.push(
	                  <InviteItem onTouchHandle={onTouchHandle} key={index+100} message={ele}></InviteItem>
	                ) 
	          }
		 	});	
		 	this.row = row;
		 }
		 render () {
		 	return (
		 		<div className="List">
		 		    <ul>
                       {
                       	this.row
                       }   
		 		    </ul>
		 		</div>
		    )
		 }
	}
	class App extends Component{
		constructor () {
			super();
			this.state = {
				filterText: '',
				list: [],
				inviteList: []
			}
		}
		onFilterText (text) {
            this.setState({
            	filterText: text
            })
		}
		componentWillMount () {
			let newList = [];
			this.props.data.forEach((ele, index) =>{
                 ele.canInvited = true;
			     newList.push(ele);
			});
			this.setState({
				list: newList
			})
		}
		onTouchHandle (id) {
            let list = this.state.list;
            let orderList = [...this.state.inviteList];
            for (let i = 0; i< list.length; i++){
                  if(list[i].id == id){
                      list[i].canInvited = !list[i].canInvited;
                      if (!list[i].canInvited) {
                      	orderList.unshift(list[i]);
                      }
                      break;
                  }
            }; 
            orderList = orderList.filter( (ele, index) => {
            	return !ele.canInvited;
            });
            this.setState({
            	inviteList: orderList
            });        
		}
		 render () {
		 	return(
		 	<div className='wrapper'>
                 <SearchBar inviteList={this.state.inviteList} onFilterText={this.onFilterText.bind(this)}></SearchBar>
		 	     <InviteList filterText={this.state.filterText} data={this.state.list} onTouchHandle={this.onTouchHandle.bind(this)}></InviteList>
		 	</div>
		 	)
		 }
	}
	ReactDom.render(
         <App data={data}></App>,
         document.getElementById('root')
	)