import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const MAX_REQUESTS_PER_MINUTE = 3;

// 请求队列
let requestQueue = [];
let isProcessing = false;

// 请求时间戳记录
let requestTimestamps = [];

// 检查速率限制
const checkRateLimit = () => {
  const now = Date.now();
  requestTimestamps = requestTimestamps.filter(
    timestamp => now - timestamp < 60000
  );
  return requestTimestamps.length < MAX_REQUESTS_PER_MINUTE;
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 处理请求队列
const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;
  
  isProcessing = true;
  
  try {
    const { message, resolve, reject } = requestQueue[0];
    
    // 检查速率限制
    if (!checkRateLimit()) {
      reject(new Error('请求太频繁，请等待一分钟后再试。'));
      return;
    }

    // 记录请求时间戳
    requestTimestamps.push(Date.now());

    const response = await makeRequest(message);
    resolve(response);
  } catch (error) {
    requestQueue[0].reject(error);
  } finally {
    // 移除已处理的请求
    requestQueue.shift();
    isProcessing = false;
    
    // 如果队列中还有请求，继续处理
    if (requestQueue.length > 0) {
      // 添加小延迟，避免立即处理下一个请求
      await delay(1000);
      processQueue();
    }
  }
};

const makeRequest = async (message) => {
  const response = await axios.post(
    OPENAI_API_URL,
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一个环保专家助手，专门回答关于环境保护、可持续发展、垃圾分类等相关问题。请用简洁友好的语气回答用户的问题。"
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: false
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data.choices[0].message.content;
};

export const sendMessage = async (message) => {
  return new Promise((resolve, reject) => {
    // 将请求添加到队列
    requestQueue.push({ message, resolve, reject });
    
    // 尝试处理队列
    processQueue();
  });
};

// 错误处理包装函数
const handleError = (error) => {
  console.error('OpenAI API Error:', error);
  
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return 'API 密钥无效或已过期，请检查配置。';
      case 429:
        return '请求太频繁，请等待一分钟后再试。';
      case 500:
        return 'OpenAI 服务器出现问题，请稍后再试。';
      case 503:
        return 'OpenAI 服务暂时不可用，请稍后再试。';
      default:
        return `服务器返回错误 (${error.response.status})：${error.response.data.error?.message || '未知错误'}`;
    }
  } else if (error.request) {
    return '无法连接到 OpenAI 服务器，请检查网络连接。';
  } else {
    return error.message || '请求配置错误';
  }
}; 