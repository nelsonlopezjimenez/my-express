const express = require('express')
const recursiveSearch = require('./scripts/recursiveSearch.js')
const { extname } = require('path')
const cors = require('cors')

const app = express()

app.use(express.static('public'))
app.use(express.static('views'))
app.use(cors())

app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.get('/quarter1', (req, res) => {
    res.render('week000.ejs')
})
app.get('/quarter2', (req, res) => {
    res.render('quarter2/home.ejs')
})
app.get('/calendar', (req, res) => {
    res.render('calendar000.ejs')
})
app.get('/youtube.nel', (req, res) => {
    res.render('videos000.ejs')
})
app.get('/youtube.nel', (req, res) => {
    res.render('videos000.ejs')
})
app.get('/cfc', (req, res) => {
    res.render('cfc.ejs')
})
app.get('/videos', (req, res) => {
    const videoPath = 'public/youtube.nel/public_html/RAW-VIDEOS/'
    const videoList = []
    const finalList = []

    recursiveSearch(videoPath, (err, path, files) => {

        const isVideo = file => (
            extname(file.name) === '.mp4' ||
            extname(file.name) === '.mkv' ||
            extname(file.name) === '.webm'
        )

        if (err) console.log('ERROR:', err)
        const videoFiles = files.filter(file => isVideo(file))
        let newPath = path.replace('public\\', '')
        newPath = newPath.replace('public/', '')
        newPath = newPath.replace(/\\/g, '/')
        if (videoFiles.length) {
            videoFiles.forEach(file => videoList.push(`${newPath}/${file.name}`))

        }
    })
    setTimeout(() => {
        for (let index = 0; index < videoList.length; index++) {
            const video = videoList[index];
            finalList.push(video.replace('//', '/'))
        }
        res.json(finalList)
    }, 1000)
})
app.listen(22022, (req, res) => {
    console.log("listening on port 22022")
})