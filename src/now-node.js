const now = () => {
  const t = process.hrtime()
  return (t[0] * 1000) + (t[1] / 1000000)
}

export default now
