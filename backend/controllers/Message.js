import messageModel from "../models/MessageModel.js"


// function for add message in db
const addMessageHandler = async (req, res, next) => {
    try
    {
        const { f_name, email, message } = req.body

        const addedMessage = await messageModel.create({f_name, email, message})

        res.status(200).json({
            success : true,
            message : "Message Sent Successfully",
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// function for fetch messages to show in dashboard
const fetchMessagesHandler = async (req, res, next) => {
    try
    {
        const page = parseInt(req.query.page) || 1
        const limit = 3
        const messages = await messageModel.find({})
        .sort({_id : -1})
        .limit(limit)
        .skip((page - 1) * limit)

        const totalMessage = await messageModel.countDocuments()

        const totalPages = Math.ceil(totalMessage / limit)


        res.status(200).json({
            success : true,
            messages,
            currentPage : page,
            totalPages,
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// function for delete message from db
const deleteMessageHandler = async (req, res, next) => {
    try
    {
        const { mid } = req.params
        let message = await messageModel.findById(mid)

        if(!message)
        {
            return res.status(404).json({
                success : false,
                message : "Message Not Found"
            })
        }

        await message.deleteOne()

        res.status(200).json({
            success : true,
            message : "Message Deleted Successfully"
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export { addMessageHandler, fetchMessagesHandler, deleteMessageHandler }