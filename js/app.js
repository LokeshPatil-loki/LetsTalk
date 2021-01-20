alert("Implementations are not completed"); 

alert("Currently it is not optimized for smartphones"); 

// Some Html Elements
const divRecentChat = document.querySelector('.recentChats');
const chatSection = document.querySelector('.chatSection');
const sendButton = document.querySelector('.sendButton');
const textComposer = document.querySelector('.textComposer');

let selectedChat = undefined;

// Changing width and height of components according to browser widnow width and height
const resizeComponents = e => {
    //Resize RecentChat Div
    divRecentChat.style.maxHeight = (window.innerHeight - (54+40+80))+ 'px';
    // Resize Message Composer
    document.querySelector('.textComposerContainer').style.width = (window.innerWidth - document.querySelector('.left').offsetWidth  - 150) + 'px'; 
};
document.body.addEventListener('load',resizeComponents);
window.addEventListener('resize',resizeComponents);



// Send Message
const send = () => {
    let message = textComposer.innerText.trim();
    if(message !== 'Type your message here' && message.length !== 0){
        let id = "msg"+(Date.now() * Math.random()).toString();
        let timeStamp = date.toDateString().substring(4) + "\n" + date.toTimeString().substring(0,5);
        let to = 'him';
        let from = 'me';
        let item1 = MessageItemModel(id,message,from,to,timeStamp);
        let item2 = MessageItemModel(id,message,to,from,timeStamp);
        createMessageItem(item1);
        createMessageItem(item2);
        chatSection.scrollTop = chatSection.scrollHeight;
    }
    textComposer.innerText = '';
};
sendButton.addEventListener('click',e => {
    send();
});
textComposer.addEventListener('keydown',e => {
    // if(e.keyCode === 13 && e.shiftKey){

    // }
    // else 
    if(e.keyCode === 13 && !e.shiftKey){
        e.preventDefault();
        send();
    }
    
});

// Message Composer Placeholder Functionality
document.querySelector('.textComposer').addEventListener('focusin',e =>{
    if(e.target.innerText === 'Type your message here'){
        e.target.innerText = '';
    }
    e.target.style.color = 'var(--text-color)';
});
document.querySelector('.textComposer').addEventListener('focusout',e =>{
    if(e.target.innerText === ''){
        e.target.innerText = 'Type your message here';
        e.target.style.color = 'var(--text-color-alpha-60)';
    }
});

// Factory Metod to create RecentChatItem Objects
const RecentChatItemModel = (imgUrl,senderName,message,timeStamp,isRead) => ({
    imgUrl,senderName,message,timeStamp,isRead,classList: ['recentChatItem']
});

// Factory Method to create MessageItems Objects
const MessageItemModel = (id,message,from,to,timeStamp) => ({
    id,message,from,to,timeStamp
});

// Function to create and add recentChatItem to html document
const createRecentChatItem = recentChatItemModel => {
    if(!recentChatItemModel.isRead){recentChatItemModel.classList.push('notReady')}
    let item = document.createElement('div');
    let id = (Date.now() * Math.random()).toString(); 
    item.setAttribute('id',id);
    recentChatItemModel.classList.forEach(value => {
        item.classList.add(value);
    })
    
    let img = document.createElement('img');
    img.classList.add('recentChatProfileImage');
    img.setAttribute('src',recentChatItemModel.imgUrl);

    let nameMessage = document.createElement('div');
    nameMessage.classList.add('nameMessage');

    let container = document.createElement('div');

    let recentChatSenderName = document.createElement('div');
    recentChatSenderName.classList.add('recentChatSenderName');
    recentChatSenderName.innerText = recentChatItemModel.senderName.length > 19 ? recentChatItemModel.senderName.substring(0,16) + "..." : recentChatItemModel.senderName;

    let recentTimeStamp = document.createElement('div');
    recentTimeStamp.classList.add('recentTimeStamp');
    recentTimeStamp.innerText = recentChatItemModel.timeStamp;

    let recentChatMessage = document.createElement('div');
    recentChatMessage.classList.add('recentChatMessage');
    
    let pMessage = document.createElement('p');
    pMessage.innerText = recentChatItemModel.message.length > 34 ? recentChatItemModel.message.substring(0,31) + "..." : recentChatItemModel.message;
    
    divRecentChat.appendChild(item);
    item.appendChild(img);
    item.appendChild(nameMessage);
    nameMessage.appendChild(container);
    nameMessage.appendChild(recentChatMessage);
    container.appendChild(recentChatSenderName);
    container.appendChild(recentTimeStamp);
    recentChatMessage.appendChild(pMessage);

    // Perform some action user clicks on recentChatItem
    item.addEventListener('click',(e) => {
        if(selectedChat !== undefined){
            let chatSelected = document.getElementById(selectedChat);
            chatSelected.classList.remove('selectedChat');
        }
        let chat = document.getElementById(id);
        chat.classList.remove('notReady');
        chat.classList.add('selectedChat');
        selectedChat = chat.getAttribute('id');

        document.querySelector('.senderProfilePicture').setAttribute('src',recentChatItemModel.imgUrl);
        document.querySelector('.senderName').innerText = recentChatItemModel.senderName;
    });
    
}

// Function to create and MessageItem to html document
const createMessageItem = messageItemModel => {
    let item = document.createElement('div');
    item.setAttribute('id',messageItemModel.id);
    item.classList.add('messageItem');
    item.classList.add(messageItemModel.from === 'me' ? 'sent' : 'received');

    let messageContainer = document.createElement('div');
    messageContainer.classList.add('messageContainer');

    let message = document.createElement('div');
    message.classList.add('message');
    message.innerText = messageItemModel.message;

    let time = document.createElement('div');
    time.classList.add('time');
    time.innerText = messageItemModel.timeStamp;

    item.appendChild(messageContainer);
    messageContainer.appendChild(message);
    messageContainer.appendChild(time);
    chatSection.appendChild(item);
}

let recentChatList =  [
//     RecentChatItemModel('resources/user1.jpeg','Abhijeet Patil','Me karto handle issue.','10/10/2020',true),
//     RecentChatItemModel('resources/user2.jpeg','Ashutosh Mhatre','Devala manat nahi pan tula manato.','10/10/2020',false),
//     RecentChatItemModel('resources/user4.jpeg','Nishant Kate','Ma','10/10/2020',false),
//     RecentChatItemModel('resources/user3.jpeg','Mamita Mokal','Lorem ipsum dolor sit amet.','10/10/2020',true),
    RecentChatItemModel('resources/user5.jpeg','Lokesh Patil','That\'s what she said','10/10/2020',true),
    RecentChatItemModel('resources/user6.jpeg','Weird Guy','Kind of Weird.','10/10/2020',true),
    RecentChatItemModel('resources/user7.jpg','Jon Snow','I don\'t want it','10/10/2020',true),
    RecentChatItemModel('resources/user8.jpg','Daenerys Targaryen','Dracarys','10/10/2020',false),
    RecentChatItemModel('resources/user9.jpeg','Chloe Decker','Act like child, get treated like child','10/10/2020',false),
    RecentChatItemModel('resources/user10.jpg','Lucifer Morningstar','Oh Hello Detective','10/10/2020',true),
    RecentChatItemModel('resources/user11.jpg','Cersie Lanister','Elephants, I believe.','10/10/2020',true),
];
let date = new Date();
let messagesList = [];
recentChatList.forEach(item => createRecentChatItem(item));
messagesList.forEach(item => createMessageItem(item));
// createRecentChatItem(item1)
