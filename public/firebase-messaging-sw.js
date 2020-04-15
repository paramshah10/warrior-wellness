//  importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-app.js')

 if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../public/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }