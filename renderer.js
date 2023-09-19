const updateOnlineStatus = () => {
  document.getElementById('connection-status').innerHTML = navigator.onLine ? 'online' : 'offline'
  document.getElementById('connection-status').style.color = navigator.onLine ? 'green' : 'red'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()