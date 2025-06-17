// Main JavaScript for Meta Author marketing website

document.addEventListener('DOMContentLoaded', () => {
  // Animate hero text elements
  animateHeroText();

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuPanel = document.getElementById('mobile-menu-panel');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');

  if (mobileMenuButton && mobileMenu && mobileMenuPanel) {
    // Open mobile menu
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      // Trigger animation after element is visible
      setTimeout(() => {
        mobileMenuPanel.style.transform = 'translateX(0)';
      }, 10);
    });

    // Close mobile menu function
    const closeMobileMenu = () => {
      mobileMenuPanel.style.transform = 'translateX(100%)';
      document.body.style.overflow = '';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
    };

    // Close button
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Backdrop click
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    });
  }

  // Add floating animation to hero image
  const heroImageContainer = document.querySelector('.relative.bg-white.rounded-3xl');
  if (heroImageContainer) {
    heroImageContainer.classList.add('float-animation');
  }

  // Add hover lift effect to cards
  document.querySelectorAll('.bg-white.p-10.rounded-3xl').forEach(card => {
    card.classList.add('hover-lift');
  });

  // Create visual elements for page depth
  const createVisualElements = () => {
    // Add background blobs
    const blobPositions = [
      { top: '15%', left: '10%', size: '600px', color: 'accent', opacity: 0.05 },
      { top: '60%', right: '5%', size: '700px', color: 'primary', opacity: 0.03 }
    ];
    
    const container = document.querySelector('.relative.overflow-hidden');
    
    if (container) {
      blobPositions.forEach(pos => {
        const blob = document.createElement('div');
        blob.classList.add('bg-blob-colorful');
        blob.style.width = pos.size;
        blob.style.height = pos.size;
        blob.style.opacity = pos.opacity;
        
        if (pos.top) blob.style.top = pos.top;
        if (pos.left) blob.style.left = pos.left;
        if (pos.right) blob.style.right = pos.right;
        if (pos.bottom) blob.style.bottom = pos.bottom;
        
        if (pos.color === 'accent') {
          blob.style.background = 'radial-gradient(circle at center, #FF6B6B, rgba(255,255,255,0))';
        } else if (pos.color === 'primary') {
          blob.style.background = 'radial-gradient(circle at center, #2D3047, rgba(255,255,255,0))';
        } else {
          blob.style.background = 'radial-gradient(circle at center, #1B1E2E, rgba(255,255,255,0))';
        }
        
        container.appendChild(blob);
      });
    }
  };
  
  createVisualElements();

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.bg-white.rounded-3xl, .bg-gradient-to-r, h1, h2, .feature-number, .img-wrapper');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (elementPosition.top < windowHeight * 0.85) {
        if (element.tagName === 'H1' || element.tagName === 'H2') {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        } else if (element.classList.contains('bg-white') || element.classList.contains('bg-gradient-to-r')) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0) scale(1)';
        } else {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      }
    });
  };
  
  // Initialize elements to be animated with initial styles
  document.querySelectorAll('.bg-white.rounded-3xl, .bg-gradient-to-r').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px) scale(0.98)';
    element.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });
  
  document.querySelectorAll('h1, h2, .feature-number, .img-wrapper').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  setTimeout(animateOnScroll, 100); // Run once after a small delay on page load

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Add sticky header effect
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.classList.add('sticky-header');
      header.classList.add('glass-effect');
      
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
    } else {
      header.classList.remove('sticky-header');
      header.classList.remove('glass-effect');
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Add header styles for sticky effect
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    .sticky-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 40;
      padding: 1rem 2rem;
      transition: transform 0.3s ease;
      background-color: rgba(245, 240, 225, 0.9);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
  `, styleSheet.cssRules.length);

  // Create parallax scrolling effect for background elements
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const backgroundElements = document.querySelectorAll('.bg-blob-colorful');
    
    backgroundElements.forEach(element => {
      const speed = 0.05;
      element.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
  
  // Run initial animations
  setTimeout(() => {
    animateOnScroll();
  }, 100);

  // Ultra-modern hero animations
  function animateHeroText() {
    // Animate the line under the heading
    setTimeout(() => {
      const animatedLine = document.querySelector('.animated-line');
      if (animatedLine) {
        animatedLine.classList.add('animate');
      }
    }, 800);

    // Add circle decorations to the hero section
    const heroSection = document.querySelector('.hero-text');
    if (heroSection) {
      const circleDecorations = [
        { size: '180px', top: '-50px', right: '-30px', color: '#FF6B6B', opacity: '0.03' },
        { size: '120px', bottom: '20px', left: '30%', color: '#2D3047', opacity: '0.04' },
        { size: '60px', top: '30%', left: '-20px', color: '#FF6B6B', opacity: '0.05' }
      ];

      circleDecorations.forEach(circle => {
        const circleElement = document.createElement('div');
        circleElement.classList.add('circle-decor');
        circleElement.style.width = circle.size;
        circleElement.style.height = circle.size;
        circleElement.style.top = circle.top;
        circleElement.style.right = circle.right;
        circleElement.style.bottom = circle.bottom;
        circleElement.style.left = circle.left;
        circleElement.style.background = circle.color;
        circleElement.style.opacity = circle.opacity;
        
        heroSection.appendChild(circleElement);
      });
    }
    
    // Enhanced parallax effect for hero section background elements
    if (window.innerWidth > 768) {
      const bgElements = document.querySelectorAll('.hero-section span[class*="absolute"]');
      
      // Add data-speed attributes for varied movement
      bgElements.forEach((element, index) => {
        element.setAttribute('data-speed-x', ((index % 3) + 1) * 0.5);
        element.setAttribute('data-speed-y', (((index + 1) % 3) + 1) * 0.5);
      });
      
      // Mouse movement parallax effect
      window.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        bgElements.forEach(element => {
          const speedX = element.getAttribute('data-speed-x') || 1;
          const speedY = element.getAttribute('data-speed-y') || 1;
          
          element.style.transform = `translate(${moveX * speedX}px, ${moveY * speedY}px)`;
        });
      });
    }
    
    // Add subtle animation to app preview
    const appPreview = document.querySelector('.float-animation');
    if (appPreview) {
      // Make sure the animation plays properly
      appPreview.style.animation = 'float 6s ease-in-out infinite';
      
      // Add subtle shadow animation
      let shadowInterval = setInterval(() => {
        const shadowValue = Math.floor(Math.random() * 5) + 15; // Random between 15 and 20
        appPreview.style.boxShadow = `0 ${shadowValue}px 35px rgba(0, 0, 0, 0.1)`;
      }, 2000);
      
      // Clean up interval when navigating away
      window.addEventListener('beforeunload', () => {
        clearInterval(shadowInterval);
      });
    }
    
    // Enhance text reveal animations
    const revealTexts = document.querySelectorAll('.reveal-text > span');
    revealTexts.forEach((text, index) => {
      text.style.animationDelay = `${0.1 + (index * 0.2)}s`;
    });
  }
}); 