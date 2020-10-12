/* global io */
const socket = io('https://1-0.futbol/');

socket.on('home', function (data) {
  const fixture = document.getElementById(data.id);
  const home = fixture.getElementsByClassName('score')[0];
  const away = fixture.getElementsByClassName('score')[0];

  home.innerHTML = data.content.home;
  away.innerHTML = data.content.away;
});
