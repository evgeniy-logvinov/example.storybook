export default minWidth => function () {
  return {
    render (h) {
      return (
      <div style={{
        minWidth: `${minWidth}px`,
        minHeight: `${minWidth}px`
      }}>
        <story/>
      </div>
      )
    }
  }
}