// 3D Background
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('bg-canvas').appendChild(renderer.domElement);

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }

// animate();




// Create spice models
function createSpice(radius, height, color, x, y, z) {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const spice = new THREE.Mesh(geometry, material);
    spice.position.set(x, y, z);
    return spice;
}

// Add spices to the scene
const spices = [
    createSpice(0.5, 2, 0x8B4513, -3, 0, -5),  // Cinnamon (brown)
    createSpice(0.3, 0.3, 0x000000, 2, 1, -4), // Black Pepper
    createSpice(0.1, 0.1, 0xFFD700, -1, -1, -3), // Saffron (gold)
    createSpice(0.4, 0.4, 0x045720, 3, -2, -6)  // Herb (dark green)
];

spices.forEach(spice => scene.add(spice));

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);

    spices.forEach(spice => {
        spice.rotation.x += 0.01;
        spice.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Responsive design
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.body.style.backgroundPositionY = scrollY * 0.5 + 'px';
});

// Product image hover effect
const productImages = document.querySelectorAll('.product-image');
productImages.forEach(image => {
    image.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = image.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        image.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 10}deg) rotateY(${(x - 0.5) * 10}deg)`;
    });
    
    image.addEventListener('mouseleave', () => {
        image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});


// Add a smooth scale effect to the product cards on hover
const products = document.querySelectorAll('.product');

products.forEach(product => {
    product.addEventListener('mouseenter', () => {
        product.style.transform = 'scale(1.05)';
    });

    product.addEventListener('mouseleave', () => {
        product.style.transform = 'scale(1)';
    });
});





// Social media hover effect
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        const platform = icon.getAttribute('data-platform');
        icon.style.backgroundColor = getSocialColor(platform);
    });

    icon.addEventListener('mouseout', () => {
        icon.style.backgroundColor = '#045720';
    });
});

function getSocialColor(platform) {
    const colors = {
        facebook: '#3b5998',
        twitter: '#1da1f2',
        instagram: '#e1306c',
        linkedin: '#0077b5',
        youtube: '#ff0000',
        pinterest: '#bd081c'
    };
    return colors[platform] || '#045720';
}

// Add a floating effect to the contact section
const contactSection = document.querySelector('.cta');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const sectionPosition = contactSection.offsetTop;
    const windowHeight = window.innerHeight;

    if (scrollPosition > sectionPosition - windowHeight + 100) {
        contactSection.style.transform = 'translateY(-20px)';
        contactSection.style.opacity = '1';
    } else {
        contactSection.style.transform = 'translateY(0)';
        contactSection.style.opacity = '0.8';
    }
});




// Optional Three.js for additional background effects if needed.
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();

// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('bg-canvas').appendChild(renderer.domElement);

// camera.position.z = 5;

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }

// animate();


function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}


// Function to open the nav
function openNav() {
    document.getElementById("nav-links").classList.add("open");
}

// Function to close the nav
function closeNav() {
    document.getElementById("nav-links").classList.remove("open");
}



document.getElementById('infoBtn').addEventListener('click', function() {
    const infoContent = document.getElementById('infoContent');
    infoContent.classList.toggle('show');
});
