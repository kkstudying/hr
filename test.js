const cbSleep = (time, cb) => {
  setTimeout(() => {
    cb()
  }, time)
}
cbSleep(2000, () => { console.log('1111') })
