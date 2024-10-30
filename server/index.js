const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "你是一个环保专家助手，专门回答关于环境保护、可持续发展、垃圾分类等相关问题。请用简洁友好的语气回答用户的问题。"
          },
          {
            role: "user",
            content: req.body.message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error.response?.data || error);
    res.status(500).json({ 
      error: '服务器错误',
      details: error.response?.data || error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 