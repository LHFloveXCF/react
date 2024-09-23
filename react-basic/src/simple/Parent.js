// 1. 自定义组件
function Son (props) {
    return <button>click me ; {props.name}</button>
  }
  
  // 这是项目的根组件 app -> index.js -> public/index.html(root)
  function Parent() {
    const name = 'this is parent app'
    return (
      <div className="App">
        <Son name={name}/>
      </div>
    );
  }
  
  export default Parent;
  