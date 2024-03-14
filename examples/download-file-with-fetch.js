import { createWriteStream } from 'fs'
import logger from './log.js'
import https from 'node:https'
import 'dotenv/config'
import { Spinner } from '@topcli/spinner'
import url from 'node:url'
import path from 'node:path'
import cliProgress from 'cli-progress'
import pb from 'pretty-bytes'
let notionAPI = 'https://www.notion.so/api/v3'

let { NOTION_TOKEN, NOTION_FILE_TOKEN, NOTION_SPACE_ID } = process.env
let headers = {
    'Content-Type': 'application/json',
    Cookie: `token_v2=${NOTION_TOKEN}; file_token=${NOTION_FILE_TOKEN}`,
}

const get = async (endpoint) =>
    await fetch(`${notionAPI}/${endpoint}`, {
        method: 'GET',
        headers,
    }).then((res) => res.json())

async function post(endpoint, data) {
    return fetch(`${notionAPI}/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    }).then((res) => res.json())
}
function getFilenameFromUrl(fileUrl) {
    // The URL constructor is used to ensure the file URL is properly parsed
    const { pathname } = new url.URL(fileUrl)
    // Use path.basename to get the filename from the path
    const filename = path.basename(pathname)
    return filename
}

const downloadPromise = (url, outputPath, bar1) => {
    return new Promise((resolve, reject) => {
        const request = https.get(url, { headers }, (response) => {
            const totalSize = parseInt(response.headers['content-length'], 10)
            let downloadedSize = 0

            if (response.statusCode !== 200) {
                reject(
                    new Error(
                        `Failed to download: ${response.statusCode} ${response.statusMessage}`
                    )
                )
                return
            }

            const fileStream = createWriteStream(outputPath)
            response.pipe(fileStream)

            response.on('data', ({ length }) => {
                downloadedSize += length
                let percent = Math.floor((downloadedSize / totalSize) * 100)

                bar1.update(percent, {
                    val: pb(downloadedSize),
                    tot: pb(totalSize),
                    perc: ((downloadedSize / totalSize) * 100).toFixed(2),
                })
                //  console.log(`Downloaded ${downloadedSize} of ${totalSize} bytes (${((downloadedSize / totalSize) * 100).toFixed(2)}%)`);
            })

            fileStream.on('finish', () => {
                fileStream.close()
                console.log('Download Completed')
                resolve()
            })

            response.on('error', (err) => {
                console.error('Error during download', err)
                reject(err)
            })

            fileStream.on('error', (err) => {
                console.error('Error writing file', err)
                reject(err)
            })
        })

        request.on('error', (err) => {
            console.error('Request error', err)
            reject(err)
        })
    })
}
async function download(url, destination) {
  if (!url) {
    throw new Error('URL is required')
  }
  let filename = "progress"
  if (!destination) {
    filename = getFilenameFromUrl(url)
  }
    const bar1 = new cliProgress.SingleBar(
        { format: filename + ': {bar}' + '| {perc}% || {val}/{tot}' },
        cliProgress.Presets.legacy
    )

    bar1.start(100, 0, {
        val: 0,
        tot: 100,
        perc: 0,
        filename: filename,
    })
    if (!destination) {
        destination = `/tmp/${filename}`
    }
   
    await downloadPromise(url, destination, bar1)
    bar1.stop()
    return destination
}
export { get, post, download }
