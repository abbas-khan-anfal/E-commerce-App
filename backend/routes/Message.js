import express from 'express'
import { addMessageHandler, deleteMessageHandler, fetchMessagesHandler } from '../controllers/Message.js'
// create router
const messageRouter = express.Router()

// route for add message in db
messageRouter.post('/add', addMessageHandler)

// route for fetching messages to show in dashboard
messageRouter.get('/fetch', fetchMessagesHandler)

// route for delete message from db
messageRouter.delete('/delete/:mid', deleteMessageHandler) // mid mean message id

export default messageRouter
