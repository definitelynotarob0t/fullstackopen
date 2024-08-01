const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else if (message.startsWith('Wrong') || message.startsWith('Invalid')) {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

export default Notification