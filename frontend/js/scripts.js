document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);

        if (targetId === 'About' || targetId === 'Projects' || targetId === 'achievements') {
            e.preventDefault();

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('backgroundCanvas');
    if (canvas) {
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
    }

    document.addEventListener('DOMContentLoaded', function () {
        const chatCanvas = document.getElementById('chatBackgroundCanvas');
        if (chatCanvas) {
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
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (hamburger && dropdownMenu) {
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
    }

    const counterSection = document.querySelector(".wrapper");
    if (counterSection) {
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
                        const plusSign = valueDisplay.nextElementSibling;
                        if (plusSign && plusSign.classList.contains('plus-sign')) {
                            setTimeout(() => {
                                plusSign.style.opacity = '1';
                            }, 200);
                        }
                    }
                }, duration);
            });
        }

        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counterSection);
    }
});

window.addEventListener('load', function () {
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        setTimeout(() => {
            imageContainer.classList.add('float-in-space');
        }, 1000);
    }
});

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

const scrollBtn = document.querySelector('.scroll-button');
if (scrollBtn) {
    scrollBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const text = document.querySelector('.cool-text');
    if (text) {
        const letters = text.textContent.split('').map(letter => `<span>${letter}</span>`).join('');
        text.innerHTML = letters;
    }
});

const supportButton = document.getElementById('supportButton');
const aibutton = document.getElementById('ai');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const mainContent = document.querySelector('.main');

function showChat() {
    if (chatContainer && mainContent) {
        chatContainer.style.display = 'flex';
        setTimeout(() => {
            chatContainer.classList.add('visible');
        }, 10);
        mainContent.classList.add('blur');
        document.body.classList.add('no-scroll');
    }
}

function hideChat() {
    if (chatContainer && mainContent) {
        chatContainer.classList.remove('visible');
        setTimeout(() => {
            chatContainer.style.display = 'none';
            mainContent.classList.remove('blur');
            document.body.classList.remove('no-scroll');
        }, 500);
    }
}

if (supportButton) supportButton.addEventListener('click', showChat);
if (aibutton) aibutton.addEventListener('click', showChat);
if (closeChat) closeChat.addEventListener('click', hideChat);

document.addEventListener("DOMContentLoaded", () => {
    if (chatContainer) chatContainer.style.display = 'none';
});

const chatHistory = [];

document.querySelectorAll('.default-question').forEach((question) => {
    question.addEventListener('click', function () {
        const userMessage = this.textContent;
        const dq = document.querySelector('.default-questions');
        if (dq) dq.style.display = 'none';
        handleUserMessage(userMessage);
    });
});

const sendButtonEl = document.getElementById('send_button');
if (sendButtonEl) {
    sendButtonEl.addEventListener('click', sendMessage);
}

document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('msg_input');
    if (inputField) {
        inputField.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});

function sendMessage() {
    const inputField = document.getElementById('msg_input');
    if (!inputField) return;
    const userMessage = inputField.value.trim();
    if (!userMessage) return;
    const dq = document.querySelector('.default-questions');
    if (dq) dq.style.display = 'none';
    inputField.value = '';
    handleUserMessage(userMessage);
}

async function handleUserMessage(userMessage) {
    showUserMessage(userMessage);
    chatHistory.push({ role: 'user', content: userMessage });

    const typingId = showTypingIndicator();

    try {
        const response = await fetch('https://portfolio-website-dqza.vercel.app/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: chatHistory }),
        });

        removeTypingIndicator(typingId);

        if (!response.ok) {
            const err = await response.json();
            showBotMessage(err.error || 'Something went wrong. Please try again.');
            return;
        }

        const data = await response.json();
        const reply = data.reply;
        chatHistory.push({ role: 'assistant', content: reply });
        showBotMessage(reply);

    } catch (err) {
        removeTypingIndicator(typingId);
        showBotMessage("I'm having trouble connecting right now. You can reach Fatima directly at fatimanoor.se22@gmail.com.");
    }
}

function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const messagesContainer = document.querySelector('.messages');
    if (!messagesContainer) return id;

    const message = document.createElement('li');
    message.className = 'message left';
    message.id = id;
    message.innerHTML = `
        <div class="avatar"></div>
        <div class="text_wrapper">
            <div class="text" style="letter-spacing:2px;opacity:0.6;">...</div>
        </div>
    `;
    messagesContainer.appendChild(message);
    setTimeout(() => message.classList.add('appeared'), 0);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function showBotMessage(message, datetime = getCurrentTimestamp()) {
    renderMessageToScreen({ text: message, time: datetime, message_side: 'left' });
}

function showUserMessage(message, datetime = getCurrentTimestamp()) {
    renderMessageToScreen({ text: message, time: datetime, message_side: 'right' });
}

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
    if (!messagesContainer) return;

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

window.addEventListener('load', function () {
    const msgContainer = document.querySelector('.messages');
    if (msgContainer) {
        showBotMessage("Hi! I'm Fatima's AI assistant. Ask me anything about her work, projects, or experience.");
    }
});

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function () {
        const current = document.querySelector('input[type=radio]:checked');
        if (current.id === 'slide1') {
            document.getElementById('slide4').checked = true;
        } else if (current.previousElementSibling) {
            current.previousElementSibling.checked = true;
        }
    });

    nextBtn.addEventListener('click', function () {
        const current = document.querySelector('input[type=radio]:checked');
        if (current.id === 'slide4') {
            document.getElementById('slide1').checked = true;
        } else if (current.nextElementSibling) {
            current.nextElementSibling.checked = true;
        }
    });
}

const terminalText = document.getElementById('terminal-text');
if (terminalText) {
    const messages = [
        "$ whoami",
        "$ ./initialize_life.sh",
        "$ npm install --save motivation caffeine",
        "$ git commit -m 'docs: Update life achievements'",
        "$ docker run -d life-journey:latest"
    ];

    let messageIndex = 0;
    let charIndex = 0;

    function typeMessage() {
        if (messageIndex < messages.length) {
            if (charIndex < messages[messageIndex].length) {
                terminalText.textContent = messages[messageIndex].substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeMessage, 50);
            } else {
                setTimeout(() => {
                    messageIndex++;
                    charIndex = 0;
                    terminalText.textContent = '';
                    typeMessage();
                }, 1500);
            }
        } else {
            messageIndex = 0;
            setTimeout(() => {
                terminalText.textContent = '';
                typeMessage();
            }, 2000);
        }
    }

    typeMessage();
}

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.dev-timeline-item').forEach((item, i) => {
        gsap.set(item, { opacity: 0, y: 50 });

        ScrollTrigger.create({
            trigger: item,
            start: "top bottom-=100",
            end: "top center",
            scrub: true,
            onEnter: () => {
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        });
    });
}

(function () {
    const tags = document.querySelectorAll('.stack-tag');

    tags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(8px)';
        tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease, background 0.25s ease';
    });

    const stackObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visibleTags = entry.target.querySelectorAll('.stack-tag');
                visibleTags.forEach((tag, i) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, i * 60);
                });
                stackObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stack-category').forEach(cat => {
        stackObserver.observe(cat);
    });
})();

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const sendButton = contactForm.querySelector('.send-button');

        sendButton.textContent = 'SENDING...';
        sendButton.disabled = true;

        try {
            const response = await fetch('https://portfolio-website-dqza.vercel.app/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (response.ok) {
                sendButton.textContent = 'SENT ✓';
                sendButton.style.background = 'rgba(6, 182, 212, 0.3)';
                contactForm.reset();
                setTimeout(() => {
                    sendButton.textContent = 'SEND';
                    sendButton.style.background = '';
                    sendButton.disabled = false;
                }, 4000);
            } else {
                alert(data.error || 'Something went wrong. Please try again.');
                sendButton.textContent = 'SEND';
                sendButton.disabled = false;
            }
        } catch (err) {
            alert('Network error. Please check your connection and try again.');
            sendButton.textContent = 'SEND';
            sendButton.disabled = false;
        }
    });
}