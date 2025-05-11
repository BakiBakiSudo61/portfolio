document.addEventListener('DOMContentLoaded', function() {
    // 要素の取得
    const cursorText = document.querySelector('.cursor-text');
    const hoverElements = document.querySelectorAll('.hover-effect');
    
    // カーソル追従効果
    document.addEventListener('mousemove', function(e) {
        // カーソルの位置を更新
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // カーソル要素を移動
        cursorText.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });
    
    // ホバー要素にマウスが乗った時の処理
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // ホバー要素のテキストを取得
            const text = this.textContent;
            
            // カーソル追従テキストを設定して表示
            cursorText.textContent = text;
            cursorText.style.opacity = '1';
            cursorText.style.visibility = 'visible';
        });
        
        element.addEventListener('mouseleave', function() {
            // マウスが離れたらカーソル追従テキストを非表示
            cursorText.style.opacity = '0';
            cursorText.style.visibility = 'hidden';
        });
    });
    
    // スムーススクロール
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800; // ミリ秒
                let start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const easeInOutCubic = progress < duration / 2
                        ? 4 * Math.pow(progress / duration, 3)
                        : 1 - Math.pow(-2 * progress / duration + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic);
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    }
    
    // 要素のフェードイン効果
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // 背景ビデオのロード完了時の処理
    const backgroundVideo = document.getElementById('background-video');
    if (backgroundVideo) {
        backgroundVideo.addEventListener('loadeddata', function() {
            // ビデオのロードが完了したら表示
            backgroundVideo.style.opacity = '1';
        });
    }
});
