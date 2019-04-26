const now = () => (
  typeof window.performance !== 'undefined'
  && typeof window.performance.now !== 'undefined'
    ? window.performance.now()
    : Date.now()
)

export default now
