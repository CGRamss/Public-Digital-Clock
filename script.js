document.addEventListener('DOMContentLoaded', function() {
    // Initialize number strips
    const strips = {
        hourPuluhan: { element: document.getElementById('hourPuluhanStrip'), max: 2 },
        hourSatuan: { element: document.getElementById('hourSatuanStrip'), max: 9 },
        minutePuluhan: { element: document.getElementById('minutePuluhanStrip'), max: 5 },
        minuteSatuan: { element: document.getElementById('minuteSatuanStrip'), max: 9 },
        secondsPuluhan: { element: document.getElementById('secondsPuluhanStrip'), max: 5 },
        secondsSatuan: { element: document.getElementById('secondsSatuanStrip'), max: 9 }
    };

    // Number boxes for each strip
    Object.entries(strips).forEach(([key, strip]) => {
        for (let i = 0; i <= strip.max; i++) {
            const numberBox = document.createElement('div');
            numberBox.className = 'number-box';
            numberBox.textContent = i;
            strip.element.appendChild(numberBox);
        }
    });

    // TEST MODE - Set true to speed up time
    const TEST_MODE = false;
    const TEST_SPEED = 100; // Test speed (ms)
    let testTime = 863970;

    function updateClock() {
        let hr, min, sec;
        
        if (TEST_MODE) {
            // Test mode - accelerated time
            testTime += 0.1;
            sec = Math.floor(testTime % 60);
            min = Math.floor((testTime / 60) % 60);
            hr = Math.floor((testTime / 3600) % 24);
        } else {
            // Normal mode - real time
            const dateNow = new Date();
            hr = dateNow.getHours();
            min = dateNow.getMinutes();
            sec = dateNow.getSeconds();
        }

        // Update hour tens digit (0-2)
        const hourTens = Math.floor(hr / 10);
        strips.hourPuluhan.element.style.transform = `translateY(${hourTens * -130}px)`;

        // Update hour ones digit (0-9)
        const hourOnes = hr % 10;
        strips.hourSatuan.element.style.transform = `translateY(${hourOnes * -130}px)`;

        // Update minute tens digit (0-5)
        const minuteTens = Math.floor(min / 10);
        strips.minutePuluhan.element.style.transform = `translateY(${minuteTens * -130}px)`;

        // Update minute ones digit (0-9)
        const minuteOnes = min % 10;
        strips.minuteSatuan.element.style.transform = `translateY(${minuteOnes * -130}px)`;

        // Update second tens digit (0-5)
        const secondTens = Math.floor(sec / 10);
        strips.secondsPuluhan.element.style.transform = `translateY(${secondTens * -130}px)`;

        // Update second ones digit (0-9)
        const secondOnes = sec % 10;
        strips.secondsSatuan.element.style.transform = `translateY(${secondOnes * -130}px)`;
    }

    // Run clock
    updateClock();
    
    if (TEST_MODE) {
        // Test mode - faster updates
        setInterval(updateClock, TEST_SPEED);
    } else {
        // Normal mode - update every second
        setInterval(updateClock, 1000);
    }
});