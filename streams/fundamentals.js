import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++
    
    setTimeout(() => {
      if (i > 10) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i))
        this.push(buffer)
      }
    }, 500)
  }
}

class PositiveInNegativeStream extends Transform {
  _transform(chunk, encoding, callback) {
    const negativeNumbers = Number(chunk) * -1
    callback(null, Buffer.from(String(negativeNumbers)))
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new PositiveInNegativeStream())
  .pipe(new MultiplyByTenStream())