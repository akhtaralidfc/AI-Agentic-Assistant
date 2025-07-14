import { useState } from 'react'
import ChatInput from './components/ChatInput.jsx'
import ChatResponse from './components/ChatResponse.jsx'
import './App.css'
import { fetchChatResponse } from './services/api.jsx';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading]=useState(false);

  const handleQuestionSubmit=async (question)=>{
    setLoading(true);
    setResponse(null);
    try{
      const apiResponse=await fetchChatResponse(question);
      setResponse(apiResponse);
    }catch(error){
      alert("Failed to get response...")
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <div className='App'>
        <header className='bg-primary text-white text-center'>
          <h1>Gemini Chatbot</h1>
        </header>
        <ChatInput onSubmit={handleQuestionSubmit}/>
        {loading && <h3 className='text-center'>Loading...</h3>}
        <ChatResponse response={response} />
      </div>
    </>
  )
}

export default App
