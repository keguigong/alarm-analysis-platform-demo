export default function loadMap() {
  const baseMapKey = 'YTxMSeq6ybBA1W1ufGrGhpiERix9xH5U'

  return new Promise<void>(function (resolve, reject) {
    const scripts = [
      'https://api.map.baidu.com/apiv=2.exp&type=webgl&key=' + baseMapKey
    ]
    const scriptCount = scripts.length
    let scriptLoadedCount = 0
    scripts.forEach((src) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = src
      script.onerror = () => {
        reject()
      }
      script.onload = () => {
        scriptLoadedCount += 1
        console.log(scriptLoadedCount)
        if (scriptLoadedCount >= scriptCount) {
          resolve()
        }
      }
      document.head.appendChild(script)
    })
  })
}
