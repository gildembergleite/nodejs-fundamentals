import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1 

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i))
        this.push(buffer)
      }
    }, 500)
  }
}

fetch('http://localhost:3333', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(res => {
  return res.text()
}).then(data => {
  console.log(data)
})