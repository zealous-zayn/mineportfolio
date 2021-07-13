var socket = io("https://api.pushpop.in/");
// make connection with server from user side
socket.on("connect", function () {
  console.log("Connected to Server");
  newUserConnected(null);
  socket.on("listentyping", async (data) => {
    console.log(data.receiver_id+" is typing")
    $(".head__note").css("display", "block");
  });

  socket.on("receivechat", async (data) => {
    console.log(data.message_data)
    $(".head__note").css("display", "none");
    $(".message").append(
      `<div class="message__base">
      <div class="message__avatar avatar">
        <a href="#" class="avatar__wrap">
          <img
            class="avatar__img"
            src="http://placehold.it/35x35"
            width="35"
            height="35"
            alt="avatar image"
          />
        </a>
      </div>
      <div class="message__textbox">
        <span class="message__text"
          >${data.message_data.message}</span
        >
      </div>
    </div>
    <div class="message__head">
     <span class="message__note">${data.message_data.timestamp}</span>
    </div>`
    );
  });

});

let userName = "";

const newUserConnected = async (user) => {
  socket.emit("chatbox", { user_id: "60d473986e7d361bf611c0c2" });
};

$("#messageToSend").on('keypress', function () {
  socket.emit("typing",{receiver_id:"60d472c36e7d361bf611c0c0"})

})

const addToUsersBox = async (user) => {
  $(".users").empty();
  $("#senderID").val(user[0].user_id);
  user.forEach((element) => {
    $(".users").append(
      `<li class='users__item' id='${element.data}' onclick='getData(this.id)'><div class='users__avatar'> <a href='#' class='avatar__wrap'><img class='avatar__img' src='http://placehold.it/35x35' width='35' height='35' alt='avatar image'/></a></div><span class='users__note'>${element.data}</span></li>`
    );
  });
  $(".modal__note").text(user.length + " online");
};

const getData = async (id) => {
  $(".head__title").text(id);
  $("#receiverID").val(id);
  $(".avatar__logo").text(id[0]);
};

$("#chatApp").submit(function (event) {
  event.preventDefault();
  var data = {
    receiver_id:"60d472c36e7d361bf611c0c0",
    message_data :{
    message_id :1,
    senderID: $("#senderID").val(),
    receiverID: $("#receiverID").val(),
    message: $("textarea#enterMessage").val(),
    timestamp : formatAMPM(new Date)
    }
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  socket.emit("startchat", data);
  $("#chatApp").trigger("reset");
  $(".message").append(
    `<div class="message__base" style="justify-content: flex-end;">
    <div class="message__textbox" style="
    justify-content: flex-end;
    width: auto;">
      <span class="message__text"
        >${data.message_data.message}</span
      >
    </div>
    <div class="message__avatar avatar">
      <a href="#" class="avatar__wrap">
        <img
          class="avatar__img"
          src="http://placehold.it/35x35"
          width="35"
          height="35"
          alt="avatar image"
        />
      </a>
    </div>
  </div>
  <div class="message__head" style="justify-content: flex-end;">
    <span class="message__note">${data.message_data.timestamp}</span>
  </div>`
  );
});
