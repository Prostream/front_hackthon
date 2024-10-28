import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 从后端获取数据
    fetch('http://localhost:5000/')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('错误:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的新应用</h1>
        <div className="content-container">
          <p className="message-box">
            来自后端的消息: {message}
          </p>
          <button className="custom-button" onClick={() => console.log("按钮被点击")}>
            点击我
          </button>
        </div>
        <p>
          编辑 <code>src/App.js</code> 和 <code>backend/server.js</code> 来修改内容
        </p>
        <a
          className="App-link"
          href="http://localhost:5000"
          target="_blank"
          rel="noopener noreferrer"
        >
          访问后端API
        </a>
      </header>
    </div>
  );
}

export default App;
