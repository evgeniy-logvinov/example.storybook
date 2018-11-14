export default maxWidth => function () {
  return {
    render (h) {
      return (
      <div style={{
        maxWidth: `${maxWidth}px`
      }}>
        <story/>
      </div>
      )
    }
  }
}