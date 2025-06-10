// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 导航菜单
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navBar = document.querySelector('.nav-bar');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const profileCard = document.querySelector('.profile-card');
    const floatingShapes = document.querySelectorAll('.shape');
    
    // 苹果风格的平滑滚动效果
    const smoothScrollTo = (target, duration = 1000) => {
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // iOS风格的缓动函数
            const easeOutQuint = progress => 1 - Math.pow(1 - progress, 5);
            
            window.scrollTo(0, startPosition + distance * easeOutQuint(progress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };
    
    // 菜单切换
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // 导航链接点击事件
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有链接的active类
            navLinksItems.forEach(item => item.classList.remove('active'));
            
            // 添加当前链接的active类
            link.classList.add('active');
            
            // 如果菜单是打开的，点击链接后关闭菜单
            if (menuToggle && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            // 平滑滚动到目标位置
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement, 800);
            }
        });
    });
    
    // 视差滚动效果
    const parallaxEffect = () => {
        const scrollTop = window.scrollY;
        
        // 为浮动图形添加视差效果
        if (floatingShapes.length > 0) {
            floatingShapes.forEach((shape, index) => {
                const speed = 0.05 + (index * 0.02);
                const yPos = scrollTop * speed;
                shape.style.transform = `translateY(${yPos}px) ${shape.classList.contains('shape-square') ? 'rotate(45deg)' : ''}`;
            });
        }
        
        // 为个人卡片添加细微的视差效果
        if (profileCard) {
            const heroSection = document.getElementById('hero');
            if (heroSection && scrollTop <= heroSection.offsetHeight) {
                const yPos = scrollTop * 0.15;
                profileCard.style.transform = `perspective(1000px) rotateX(${Math.min(5, scrollTop * 0.02)}deg) translateY(${yPos}px)`;
            }
        }
    };
    
    // 存储上一次滚动位置
    let lastScrollTop = 0;
    let ticking = false;
    
    // 滚动事件处理，使用requestAnimationFrame优化性能
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // 导航栏样式随滚动变化
                if (scrollTop > 50) {
                    navBar.classList.add('scrolled');
                } else {
                    navBar.classList.remove('scrolled');
                }
                
                // 应用视差效果
                parallaxEffect();
                
                // 处理动画元素
                handleScrollAnimation();
                
                // 更新活动导航链接
                updateActiveNavLink();
                
                // 存储当前滚动位置
                lastScrollTop = scrollTop;
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // 返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            // 使用平滑滚动到顶部，带有iOS风格的缓动效果
            smoothScrollTo(document.body, 1000);
        });
    }
    
    // 联系表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // 显示提交成功的消息（在实际应用中，这里应该发送数据到服务器）
            alert('消息已发送！我们会尽快回复您。');
            
            // 重置表单
            contactForm.reset();
        });
    }
    
    // 为项目卡片添加鼠标悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            projectCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.98)';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            projectCards.forEach(c => {
                c.style.opacity = '';
                c.style.transform = '';
            });
        });
    });
    
    // 初始化页面
    initPage();
    
    // 窗口大小改变时，重新计算视差效果
    window.addEventListener('resize', () => {
        handleScrollAnimation();
        parallaxEffect();
    });
});

/**
 * 初始化页面
 */
function initPage() {
    // 当页面加载完成后，设置初始活动导航链接
    updateActiveNavLink();
    
    // 初始触发一次滚动动画检查
    handleScrollAnimation();
    
    // 初始化技能条动画
    setTimeout(() => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const skillBars = skillsSection.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.classList.add('animate');
            });
        }
    }, 1000);
    
    // 初始化视差效果
    setTimeout(() => {
        const parallaxEffect = () => {
            const scrollTop = window.scrollY;
            
            // 为浮动图形添加视差效果
            const floatingShapes = document.querySelectorAll('.shape');
            if (floatingShapes.length > 0) {
                floatingShapes.forEach((shape, index) => {
                    const speed = 0.05 + (index * 0.02);
                    const yPos = scrollTop * speed;
                    shape.style.transform = `translateY(${yPos}px) ${shape.classList.contains('shape-square') ? 'rotate(45deg)' : ''}`;
                });
            }
        };
        
        parallaxEffect();
    }, 500);
}

/**
 * 处理基于滚动位置的动画
 */
function handleScrollAnimation() {
    // 获取所有需要动画的元素
    const animElements = [
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.about-content'),
        ...document.querySelectorAll('.skills-container'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.contact-info'),
        ...document.querySelectorAll('.contact-form')
    ];
    
    // 遍历元素，检查是否在视口中
    animElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

/**
 * 更新当前活跃的导航链接
 */
function updateActiveNavLink() {
    // 获取所有部分和导航链接
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 确定当前滚动位置在哪个部分
    let currentSectionId = '';
    let minDistance = Number.MAX_VALUE;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + 100; // 添加一些偏移量
        
        // 计算距离部分顶部的距离
        const distance = Math.abs(scrollPosition - sectionTop);
        
        // 如果我们在这个部分，并且距离比之前找到的最小距离小
        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight &&
            distance < minDistance
        ) {
            minDistance = distance;
            currentSectionId = section.getAttribute('id');
        }
    });
    
    // 更新导航链接
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1); // 移除 #
        if (href === currentSectionId) {
            link.classList.add('active');
        }
    });
}

/**
 * 检查元素是否在视口中
 * @param {HTMLElement} element - 要检查的元素
 * @return {boolean} - 如果元素在视口中，则返回true
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // 如果元素的顶部在视口的底部以上，并且元素的底部在视口的顶部以下
    // 添加一些偏移量，使动画在元素完全进入视口之前开始
    return (
        rect.top <= windowHeight - 100 &&
        rect.bottom >= 0
    );
}

/**
 * 添加iOS风格的3D触摸效果
 */
document.addEventListener('DOMContentLoaded', () => {
    // 为所有卡片添加3D触摸效果
    const cards = document.querySelectorAll('.profile-card, .project-card, .stat-item, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);
    });
    
    // 鼠标移动处理，创建3D效果
    function handleMouseMove(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // 计算鼠标在卡片上的相对位置（从中心点）
        const mouseX = e.clientX - cardRect.left - cardWidth / 2;
        const mouseY = e.clientY - cardRect.top - cardHeight / 2;
        
        // 计算倾斜角度（最大5度）
        const rotateX = (mouseY / (cardHeight / 2)) * -5;
        const rotateY = (mouseX / (cardWidth / 2)) * 5;
        
        // 应用变换，使用苹果风格的缓动
        card.style.transition = 'transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // 添加光照效果
        const shine = Math.max(
            0,
            Math.min(255, 128 + (mouseX / cardWidth) * 50 + (mouseY / cardHeight) * 50)
        );
        card.style.boxShadow = `
            0 10px 20px rgba(0, 0, 0, 0.1),
            ${mouseX / 30}px ${mouseY / 30}px 30px rgba(0, 122, 255, 0.15)
        `;
    }
    
    // 鼠标离开时恢复
    function handleMouseLeave() {
        this.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        this.style.boxShadow = 'var(--box-shadow)';
    }
    
    // 鼠标进入时的小动画
    function handleMouseEnter() {
        this.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        this.style.transform = 'perspective(1000px) scale3d(1.02, 1.02, 1.02)';
    }
});

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化动画和效果
    initSectionAnimations();
    initParallaxEffect();
    init3DTiltEffect();
    initBackgroundAnimation();
    setupNavigation();
    initScrollSpy();
    initScrollHeaderEffect();
});

// 滚动时控制页眉显示/隐藏效果
function initScrollHeaderEffect() {
    const nav = document.querySelector('.navigation');
    let lastScrollTop = 0;
    let scrollThreshold = 50; // 触发效果需要滚动的最小距离
    let isScrolling;
    
    // 添加滚动方向检测类
    nav.classList.add('nav-visible');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // 清除之前的定时器
        window.clearTimeout(isScrolling);
        
        // 处理顶部显示逻辑
        if (currentScroll <= 10) {
            nav.classList.add('nav-visible');
            nav.classList.remove('nav-hidden');
            return;
        }
        
        // 检测滚动方向并达到阈值才触发
        if (Math.abs(lastScrollTop - currentScroll) > scrollThreshold) {
            if (currentScroll > lastScrollTop) {
                // 向下滚动，隐藏导航栏
                nav.classList.remove('nav-visible');
                nav.classList.add('nav-hidden');
            } else {
                // 向上滚动，显示导航栏
                nav.classList.add('nav-visible');
                nav.classList.remove('nav-hidden');
            }
            lastScrollTop = currentScroll;
        }
        
        // 滚动停止时检查是否需要显示
        isScrolling = setTimeout(function() {
            // 在顶部区域时总是显示
            if (currentScroll <= 100) {
                nav.classList.add('nav-visible');
                nav.classList.remove('nav-hidden');
            }
        }, 100);
    });
}

// 设置导航菜单功能
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');

    // 导航菜单切换
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 导航项点击事件
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // 如果菜单是打开的，点击后关闭
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// 滚动监测，突出显示当前导航项
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset;
        
        // 检测当前视图中的部分
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // 偏移量
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // 更新活动导航项
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// 滚动触发的动画效果
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    // 初始化IntersectionObserver来检测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一旦元素可见，不再观察它
                observer.unobserve(entry.target);
            }
        });
    }, {
        // 元素20%进入视口时触发
        threshold: 0.2,
        // 提前触发动画效果
        rootMargin: '0px 0px -100px 0px'
    });
    
    // 开始观察所有部分
    sections.forEach(section => {
        observer.observe(section);
        
        // 添加初始类以便应用CSS动画
        section.classList.add('animate-on-scroll');
    });
}

// 视差滚动效果
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.gradient-blob');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((element, index) => {
            // 每个元素以不同的速率移动，创建深度感
            const speed = 0.1 * (index + 1);
            const yOffset = scrollY * speed;
            
            // 应用变换
            element.style.transform = `translateY(${yOffset}px)`;
        });
    });
}

// 3D倾斜效果（类似iOS卡片倾斜）
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.glass-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // 获取鼠标在卡片上的位置
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 计算旋转角度（最大±10度）
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; // 垂直旋转
            const rotateY = ((x - centerX) / centerX) * 5;  // 水平旋转
            
            // 平滑应用3D变换，使用弹性过渡
            card.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // 添加微妙阴影效果，增强3D感
            const shadowX = (x - centerX) * 0.1;
            const shadowY = (y - centerY) * 0.1;
            card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.1)`;
        });
        
        // 鼠标离开时，重置变换
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
        });
    });
}

// 背景动画效果
function initBackgroundAnimation() {
    const blobs = document.querySelectorAll('.gradient-blob');
    
    // 为每个blob创建随机动画
    blobs.forEach((blob, index) => {
        // 随机初始位置（在合理范围内）
        const randomX = (Math.random() - 0.5) * 10;
        const randomY = (Math.random() - 0.5) * 10;
        
        // 应用初始位置
        blob.style.transform = `translate(${randomX}%, ${randomY}%)`;
        
        // 创建和应用CSS动画
        animateBlob(blob, index);
    });
}

// 为blob元素创建和应用CSS动画
function animateBlob(blob, index) {
    // 动画持续时间在15-25秒之间，使动画看起来不同步
    const duration = 15 + (index * 5);
    
    // 使用GSAP（如果可用）或CSS动画
    if (typeof gsap !== 'undefined') {
        // 这是GSAP动画代码，如果页面包含GSAP库
        gsap.to(blob, {
            x: `random(-15, 15)%`,
            y: `random(-15, 15)%`,
            rotation: `random(-10, 10)`,
            duration: duration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    } else {
        // 使用CSS动画作为备选
        const keyframes = `
            @keyframes float-${index} {
                0% { transform: translate(${Math.random() * 10 - 5}%, ${Math.random() * 10 - 5}%) rotate(${Math.random() * 10 - 5}deg); }
                33% { transform: translate(${Math.random() * 10 - 5}%, ${Math.random() * 10 - 5}%) rotate(${Math.random() * 10 - 5}deg); }
                66% { transform: translate(${Math.random() * 10 - 5}%, ${Math.random() * 10 - 5}%) rotate(${Math.random() * 10 - 5}deg); }
                100% { transform: translate(${Math.random() * 10 - 5}%, ${Math.random() * 10 - 5}%) rotate(${Math.random() * 10 - 5}deg); }
            }
        `;
        
        // 将关键帧添加到页面
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        // 应用动画
        blob.style.animation = `float-${index} ${duration}s infinite cubic-bezier(0.4, 0.0, 0.2, 1)`;
    }
}

// 添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // 计算目标元素位置
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            
            // 平滑滚动动画
            let startTime = null;
            const duration = 800; // 0.8秒
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // 使用iOS类似的弹性曲线
                const easeOutBack = progress => {
                    const c1 = 1.70158;
                    const c3 = c1 + 1;
                    return 1 + c3 * Math.pow(progress - 1, 3) + c1 * Math.pow(progress - 1, 2);
                };
                
                window.scrollTo(0, startPosition + distance * easeOutBack(progress));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// 为技能标签添加随机动画效果
const skillPills = document.querySelectorAll('.skill-pill');
skillPills.forEach(pill => {
    // 添加轻微随机延迟
    const delay = Math.random() * 0.5;
    pill.style.animationDelay = `${delay}s`;
    
    // 添加悬停效果
    pill.addEventListener('mouseenter', () => {
        // 为每个标签随机选择一个颜色
        const colors = [
            'rgba(0, 122, 255, 0.2)',
            'rgba(255, 45, 85, 0.2)',
            'rgba(88, 86, 214, 0.2)',
            'rgba(255, 149, 0, 0.2)',
            'rgba(52, 199, 89, 0.2)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        pill.style.backgroundColor = randomColor;
    });
    
    pill.addEventListener('mouseleave', () => {
        // 恢复原来的颜色
        pill.style.backgroundColor = 'rgba(0, 122, 255, 0.1)';
        
        // 添加随机"弹跳"动画
        pill.style.animation = 'none';
        setTimeout(() => {
            pill.style.animation = `bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`;
        }, 10);
    });
});

// 添加弹跳动画
const bounceKeyframes = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = bounceKeyframes;
document.head.appendChild(styleSheet); 