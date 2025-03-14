// Main JavaScript for Sju00f6bo Schakt Website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap components
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  // Mobile Navigation Toggle
  const menuToggle = document.querySelector('.navbar-toggler');
  const header = document.querySelector('header');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      if (window.scrollY === 0 && !header.classList.contains('scrolled')) {
        header.classList.toggle('bg-light');
      }
    });
  }

  // Scroll Animations
  const animateElements = document.querySelectorAll('.animate-up');
  
  function checkAnimations() {
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        element.classList.add('show');
      }
    });
  }

  // Check animations on page load
  checkAnimations();
  
  // Check animations on scroll
  window.addEventListener('scroll', checkAnimations);

  // Scroll to section smoothly when clicking navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scrolled class to header on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      header.classList.add('bg-light');
    } else {
      header.classList.remove('scrolled');
      if (!menuToggle.classList.contains('collapsed')) return;
      header.classList.remove('bg-light');
    }
  });

  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Show/hide project items based on filter
        projectItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block';
          } else if (item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      let valid = true;
      const formFields = contactForm.querySelectorAll('input, textarea');
      
      formFields.forEach(field => {
        if (field.required && !field.value.trim()) {
          valid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });
      
      if (valid) {
        // Normally you would submit the form here
        // For now, just show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Tack fu00f6r ditt meddelande! Vi u00e5terkommer su00e5 snart som mu00f6jligt.';
        
        contactForm.appendChild(successMessage);
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
});
