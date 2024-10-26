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
  
    