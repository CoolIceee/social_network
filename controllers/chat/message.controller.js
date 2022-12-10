const Chat = require('../../models/chat/Chat.model')
const Message = require('../../models/chat/Message.model')
const Users = require('../../models/Users.model')
const { app, io } = require('../../app')
const date = require('date-and-time')
const { v4: uuid } = require('uuid')
const rooms = new Map()
const userInfo = new Map()

io.on('connection', async socket => {
  console.log('user connect')

  socket.on('join', async ({ oneChatId, userId }) => {
    const roomId = oneChatId
    const user = await Users.findById(userId)
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map([['users', new Map()]]))
    }
    
    socket.join(roomId)

    if (rooms.get(roomId).get('users') === user.login) {
      return
    }
    rooms.get(roomId).get('users').set(user.login, socket.id)

    const userData = await Users.findById(userId)

    socket
      .to(roomId)
      .emit('chat:message:um', `зашел такой пользователь ${userData.login}`)
  })
  socket.on(
    'create:message',
    async ({ message, oneChatId, userId, userTwoId }) => {
      const now = new Date()
      const name = await Users.findById(userId)
      const roomId = oneChatId
      const messageId = {
        userMessageId1: userId,
        userMessageId2: userTwoId,
        userName: name.login,
        logoUsers: name.logoUser,
        message,
        chatId: oneChatId,
        dataTime: date.format(now, 'HH:mm'),
      }
      const da = messageId
      io.in(roomId).emit('load:message', da)
    }
  )
  socket.on('disconnect', () => {
    console.log('user disconnected')
    socket.emit('user:online', 'offline')
  })
})

module.exports.messageController = {
  createChat: async (req, res) => {
    try {
      await Chat.create({
        usersId: [req.user.id, req.params.id],
        message: [],
      })
      const chat = await Chat.find({
        usersId: [req.user.id, req.params.id],
      })
      const id = chat[0].id
      await Users.findByIdAndUpdate(req.user.id, {
        $push: { chatsId: id },
      })
      await Users.findByIdAndUpdate(req.params.id, {
        $push: { chatsId: id },
      })
      res.json('чат создан')
    } catch (er) {
      res.json(er)
    }
  },
  getMessages: async (req, res) => {
    try {
      const data = await Chat.find({
        usersId: req.user.id,
      }).populate('message usersId')

      res.json(data)
    } catch {
      res.json('error')
    }
  },
  getMessagesOneChat: async (req, res) => {
    try {
      const OneChat = await Chat.findById(req.params.id).populate(
        'message usersId'
      )
      const mess = OneChat.message
      res.json({ OneChat, mess })
    } catch {
      res.json('error')
    }
  },
  postMessages: async (req, res) => {
    try {
      const { message } = req.body
      const name = await Users.findById(req.user.id)
      const OneChat = await Chat.findById(req.params.id)

      const now = new Date()
      const totalData = OneChat._id

      await Message.create({
        userMessageId1: req.user.id,
        userMessageId2: req.params.user,
        userName: name.login,
        logoUsers: name.logoUser,
        message,
        chatId: totalData,
        dataTime: date.format(now, 'HH:mm'),
      })

      const dataUserMessage = await Message.find({
        userMessageId1: req.user.id,
        userMessageId2: req.params.user,
        chatId: totalData,
      })

      const messageId = dataUserMessage[dataUserMessage.length - 1]
      await Chat.findByIdAndUpdate(totalData, {
        $push: { message: messageId.id },
      })

      res.json(OneChat)
    } catch {
      res.json('err')
    }
  },
}
