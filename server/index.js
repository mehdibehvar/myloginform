const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3001
const token = '7learn'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const { username, password } = req.body
    if ('admin' === username && 'admin' === password) {
        res.send({
            success: true,
            data: token
        })
    }
    res.send({
        success: false,
        error: 'username or password is wrong!'
    })
})

app.get('/users/me', (req, res) => {
    const { authorization } = req.headers

    if (token === authorization) {
        res.send({
            success: true,
            data: {
                id: 1,
                username: 'admin',
                email: 'info@7larn.com',
                name: 'admin'
            }
        })
    }

    res.send({
        success: false,
        error: 'token is not valid'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})