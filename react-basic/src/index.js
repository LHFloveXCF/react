// 项目启动必须的包
import React from 'react';
import ReactDOM from 'react-dom/client';
// 导入项目入口文件
import App from './App';
// import JsxTest from './jsx/jsx';
// import JsxList from './jsx/jsxList';
import JsxCondition from './jsx/jsxCondition';
import DemoEvent from './event/demo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
    // <JsxTest></JsxTest>
    // <JsxList></JsxList>
    // <DemoEvent/>
);
