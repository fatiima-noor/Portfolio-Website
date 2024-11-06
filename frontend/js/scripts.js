//background
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
  
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
  
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas); 
  
    function createStar() {
        const star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 0.3 + 0.1 
        };
        return star;
    }
    
    const stars = Array.from({ length: 100 }, createStar);
  
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fillRect(star.x, star.y, star.length, 1);
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
    }
  
    function animate() {
        drawStars();
        requestAnimationFrame(animate);
    }
  
    animate(); 
  
// Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger'); 
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
  
    function showDropdown() {
        dropdownMenu.style.display = 'block'; 
        setTimeout(() => {
            dropdownMenu.classList.add('show');
        }, 10);
      }
    
  
    function hideDropdown() {
        dropdownMenu.classList.remove('show');
        setTimeout(() => {
            dropdownMenu.style.display = 'none'; 
        }, 500); 
    }
    
    
    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();
        if (dropdownMenu.classList.contains('show')) {
            hideDropdown();
        } else {
            showDropdown();
        }
    });
    
    document.addEventListener('click', (event) => {
        if (!dropdownMenu.contains(event.target) && !hamburger.contains(event.target)) {
            if (dropdownMenu.classList.contains('show')) {
                hideDropdown();
            }
        }
    });
  
  
    
  
    // Number animation
    let valueDisplays = document.querySelectorAll(".num");
    let interval = 2000;
  
    function animateNumbers() {
        valueDisplays.forEach((valueDisplay) => {
            let startValue = 0;
            let endValue = parseInt(valueDisplay.getAttribute("data-val"));
            let duration = Math.floor(interval / endValue);
            let counter = setInterval(function () {
                startValue += 1;
                valueDisplay.textContent = startValue;
                if (startValue == endValue) {
                    clearInterval(counter);
                }
            }, duration);
        });
    }
  
    const counterSection = document.querySelector(".wrapper");
    
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();  
                observer.disconnect();  
            }
        });
    }, { threshold: 0.5 });  
  
    observer.observe(counterSection);
  });
  
//character
  window.addEventListener('load', function() {
    const imageContainer = document.querySelector('.image-container');
    
    setTimeout(() => {
        imageContainer.classList.add('float-in-space'); 
    }, 1000); 
});

//About Section
const elements = document.querySelectorAll('.fade-in-scale');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1 
      });

      elements.forEach(el => observer.observe(el));


//scroll button
document.querySelector('.scroll-button').addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    targetElement.scrollIntoView({ behavior: 'smooth' });
});

  
//footer text
document.addEventListener("DOMContentLoaded", function() {
    const text = document.querySelector('.cool-text');
    const letters = text.textContent.split('').map(letter => `<span>${letter}</span>`).join('');
    text.innerHTML = letters;
  });


//chatbot

const supportButton = document.getElementById('supportButton');
const aibutton = document.getElementById('ai');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const mainContent = document.querySelector('.main'); 

function showChat() {
    chatContainer.style.display = 'flex'; 
    setTimeout(() => {
        chatContainer.classList.add('visible'); 
    }, 10); 
    mainContent.classList.add('blur'); 
    document.body.classList.add('no-scroll'); 
}

function hideChat() {
    chatContainer.classList.remove('visible'); 
    setTimeout(() => {
        chatContainer.style.display = 'none'; 
        mainContent.classList.remove('blur'); 
        document.body.classList.remove('no-scroll'); 
    }, 500); 
}

supportButton.addEventListener('click', showChat);
aibutton.addEventListener('click', showChat);

closeChat.addEventListener('click', hideChat);

document.addEventListener("DOMContentLoaded", () => {
    chatContainer.style.display = 'none'; 
});

//chatbot background
document.addEventListener('DOMContentLoaded', function () {
    const chatCanvas = document.getElementById('chatBackgroundCanvas');
    const ctx = chatCanvas.getContext('2d');
    const chatWindow = document.querySelector('.chat-window');

    function resizeCanvas() {
        chatCanvas.width = chatWindow.clientWidth;
        chatCanvas.height = chatWindow.clientHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas); 

    function createStar() {
        return {
            x: Math.random() * chatCanvas.width,
            y: Math.random() * chatCanvas.height,
            length: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 0.3 + 0.1
        };
    }

    const stars = Array.from({ length: 100 }, createStar);

    function drawStars() {
        ctx.clearRect(0, 0, chatCanvas.width, chatCanvas.height);
        stars.forEach(star => {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fillRect(star.x, star.y, star.length, 1);
            star.y += star.speed;
            if (star.y > chatCanvas.height) {
                star.y = 0;
                star.x = Math.random() * chatCanvas.width;
            }
        });
    }

    function animate() {
        drawStars();
        requestAnimationFrame(animate);
    }

    animate();
});

//Chatbot Internal Design
function getCurrentTimestamp() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12'; 
    return `${hours}:${minutes} ${ampm}`;
  }

function renderMessageToScreen(args) {
    let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
  
    let messagesContainer = document.querySelector('.messages');
  
    // create message element
    let message = document.createElement('li');
    message.className = `message ${args.message_side}`;
    message.innerHTML = `
        <div class="avatar"></div>
        <div class="text_wrapper">
            <div class="text">${args.text}</div>
            <div class="timestamp">${displayDate}</div>
        </div>
    `;
  
    messagesContainer.appendChild(message);
  
    setTimeout(function () {
        message.classList.add('appeared');
    }, 0);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 
}
  
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('msg_input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('send_button').click();
        }
    });
});

function showUserMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'right',
    });
}

function showBotMessage(message, datetime) {
    renderMessageToScreen({
        text: message,
        time: datetime,
        message_side: 'left',
    });
}

document.getElementById('send_button').addEventListener('click', function (e) {
    showUserMessage(document.getElementById('msg_input').value);
    document.getElementById('msg_input').value = '';
    setTimeout(function () {
        showBotMessage(randomstring());
    }, 300);
});

function randomstring(length = 20) {
    let output = '';
  
    var randomchar = function () {
        var n = Math.floor(Math.random() * 62);
        if (n < 10) return n;
        if (n < 36) return String.fromCharCode(n + 55);
        return String.fromCharCode(n + 61);
    };
  
    while (output.length < length) output += randomchar();
    return output;
}

window.addEventListener('load', function () {
    showBotMessage('Hello there! Type in a message.');
});
