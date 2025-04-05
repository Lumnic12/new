"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import styles from './Chatbot.module.css'

interface Message {
  text: string
  isBot: boolean
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (text: string, isBot: boolean) => {
    setMessages(prev => [...prev, { text, isBot }])
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputMessage.trim() || isTyping) return

    addMessage(inputMessage, false)
    const userMessage = inputMessage
    setInputMessage("")
    setIsTyping(true)

    try {
      console.log('Sending message:', userMessage)
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      console.log('API response:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Weather service unavailable')
      }

      if (!data.response) {
        throw new Error('No response from weather service')
      }

      addMessage(data.response, true)
    } catch (error) {
      console.error('Chatbot Error:', error)
      // Fix error handling to safely access error message property
      const errorMessage = error && typeof error === 'object' && 'message' in error ? error.message : 'Please try again later.'
      addMessage(`Sorry, I couldn't get weather information. ${errorMessage}`, true)
    } finally {
      setIsTyping(false)
    }
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage(
        "Hello! I can help you check weather conditions for any location. Try asking:\n" +
        "- Weather of [city]?\n" +
        "I'll tell you the temperature, conditions, and whether it's a good time to visit!",
        true
      )
    }
  }, [isOpen])

  return (
    <div className={styles.chatbotContainer}>
      <button 
        className={styles.chatbotButton}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle />
      </button>

      {isOpen && (
        <div className={styles.chatbotBox}>
          <div className={styles.chatbotHeader}>
            <h3>Chat Support</h3>
            <button 
              className={styles.closeChat}
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.isBot ? styles.botMessage : styles.userMessage
                }`}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.message} ${styles.botMessage} ${styles.loadingMessage}`}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className={styles.chatInput}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isTyping}
            />
            <button 
              type="submit"
              className={styles.sendBtn}
              disabled={!inputMessage.trim() || isTyping}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}