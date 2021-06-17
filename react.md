#### 1. Which of the following statements is true regarding React.js?

- [] React is just another MVC framework
- [] Every React component is stateless
- [] hallow rendering in React allows you to render a single component completely
- [] TDD is not allowed when writing React components

#### 2. Which of the following statements is true regarding the following component?

class MyComponent extends React.Component {
render(){
return (This is a component);
}
}

- [] Render should not be a function
- [] Render method is not required
- [✅] The return should be any React element, null or false
- [] Class should be replaced by className

#### 3. Which statement is true regarding component definition in React?

```
function SayHi(props) {
 return <h1>Hi, {props.name}</h1>;
}
class SayHi extends React.Component {
 render() {
 return <h1>Hi, {this.props.name}</h1>;
 }
}
```

- [] Both codes are equivalent from React's point of view
- [] The most simple and concise way to define a component is the first one but classes have some additional features
- [✅] This funetion is a valid React component because it accepts a single props object argument with data and returns a React
- [] All of the above

#### 4. What is true for ReactJ components defined as pure J functions?

- [] Pure function components do not have lifecycle methods
- [] Itis not possible to set defaultProps or propTypes for pure function components
- [] Pure function component have not render method defined
- [] A pure function is a function that may alter any external state

#### 5. How set a custom html inside ReactUs component?

- [] <div innerHTML={'ome custom HTML'}/>
- [] <div dangerouslyetInnerHTML={{__html:'ome custom HTML'}}/>
- [] <div innerHTML={{__html:'ome custom HTML'}}/>
- [] <div dangerouslyetInnerHTML={'ome custom HTML'}/>

#### 6. Considering the following codes:

```
var MessageBox = React.createClass({
 getlnitialtate: function() {
  return {nmameWithQualifier: 'Mr. ' + this.props.name};
 }
 render: function() {
  return <div>{this.state.nameWithQualifier}</div>;
 }
})
ReactDM.render(<MessageBox name=""Rogers""/>, mountNode);
var MessageBox = React.createClass({
 render: function() {
  return <div>{'Mr. ' + this. props.name}</div>;
 }
})
ReactDM.render(<MessageBox name=""Rogers"/>, mountNode);
```

- [] They are both exactly equivalent
- [] The first one is better than the second one because the second one violates the basic principle of the single source of truth
- [] The second one is better than the first one because the first one violates the basic principle of the single source of truth
- [] None of the above

#### 7. What will happen if parent component will fire render function?

- [] Child components will fire render functions too
- [] Child components will fire shouldComponentUpdate
- [] Child components will always fire componentDidUpdate
- [] Child components will fire no event

#### 8. Considering the following HTML example

```
<a href="#" onclick=""console.log('The link was clicked.');return false>Click me</a>
```

The same component in React:

- [] Is the same but with the event on click written in camelCase (i.e. onClick)
- [] You must call preventDefault explicitly
- [] Cannot be built because you cannot return false
- [] None of the above

#### 9. Which statement is true regarding state and props in React?

- [] They are not related
- [] The state can't be updated by the parent while props can
- [] Both props and state changes trigger a render update
- [] The parent's props becomes the child's state value

#### 10. Which is the correct function to render ReactJ component at server side as static html page?

- [] ReactDMerver.renderTotring
- [] ReactDM.render
- [] ReactDM.rendertaticnerver
- [✅] ReactDMerver.renderTotaticMarkup

#### 11. Which function is invoked just before render during initial render?

- [] componentWillUpdate()
- [] componentBeforeccur()
- [] componentWillReceiveMount()
- [✅] componentWillMount()

#### 12. PropTypes can be used for?

- [] Validation
- [] getPropsValue
- [✅] Typechecking
- [] Both (a) and (c) are correct

#### 13. Which of the following statements is incorrect regarding Flux concept?

- [] Propose a single directional data flow
- [] The reducer is a function that specifies the changes that actions trigger
- [] The stores are responsible of re-rendering the app
- [] The view recieves the data that the dispatcher sends to the stores

#### 14. Regarding the following code,Which statement is false?

```
import React from 'react';
var newData = {
data: 'Data from MP...',
var MyMP = ComposedComponent ? class extends React.Component {
componentDidMount() {
 this.settate({
  data: newData.data
 })
}
render(){ .
 return <ComposedComponent {...this.props} {...this.state} />;
}
class MyComponent extends React.Component {
 render() {
  return (
   <div>
   <h1>{this. props data}</h1>
   </div>
  )
 }
}
export default MyMP(MyComponent);
```

- [] The MyMP is a higher order function that is used only to pass data to MyComponent
- [] The function MyMP takes MyComponent, enhances it with newData and returns the enhanced component that will be rendered on screen
- [] MyComponent should extends React. PureComponent in order to the code to be correct
- [] If we run the app, we will see 'Data from MP...'
