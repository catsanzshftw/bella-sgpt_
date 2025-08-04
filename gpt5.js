// ==UserScript==
// @name         GPT-5 Mode Toggle (Upper Left!)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a floating toggle in the upper left for GPT-5 Auto/Reasoning Alpha modes!
// @author       Flames-san wa wa
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function injectCustomToggle() {
        if (document.querySelector('#gpt5-mode-toggle')) return; // Already exists

        // Toggle container
        const toggleContainer = document.createElement('div');
        toggleContainer.id = 'gpt5-mode-toggle';
        toggleContainer.style.cssText = `
            position: fixed;
            top: 18px;
            left: 18px;
            z-index: 9999;
            background: rgba(240,240,250,0.96);
            border-radius: 16px;
            box-shadow: 0 2px 10px #79f8  ;
            padding: 10px 24px 10px 18px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Consolas', 'Arial', sans-serif;
            font-size: 15px;
            user-select: none;
        `;

        // Toggle label
        const toggleLabel = document.createElement('span');
        toggleLabel.textContent = 'GPT-5 Auto';
        toggleLabel.style.cssText = 'font-weight: bold; color: #217; letter-spacing:1px;';

        // Toggle switch
        const toggleSwitch = document.createElement('label');
        toggleSwitch.style.cssText = `
            position: relative;
            display: inline-block;
            width: 52px;
            height: 28px;
        `;

        // Toggle input
        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.id = 'gpt5-toggle';
        toggleInput.style.cssText = 'opacity: 0; width: 0; height: 0;';

        // Toggle slider
        const toggleSlider = document.createElement('span');
        toggleSlider.style.cssText = `
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.3s;
            border-radius: 28px;
        `;
        toggleSlider.innerHTML = '';

        // Slider knob (with before pseudo effect recreated)
        const sliderKnob = document.createElement('span');
        sliderKnob.style.cssText = `
            position: absolute;
            content: "";
            height: 22px;
            width: 22px;
            left: 3px;
            bottom: 3px;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0 2px 6px #aaa6;
            transition: 0.3s;
        `;
        toggleSlider.appendChild(sliderKnob);

        // Update UI on toggle
        function updateToggleUI() {
            if (toggleInput.checked) {
                toggleLabel.textContent = 'GPT-5 Reasoning Alpha';
                toggleSlider.style.backgroundColor = '#2196F3';
                sliderKnob.style.transform = 'translateX(24px)';
            } else {
                toggleLabel.textContent = 'GPT-5 Auto';
                toggleSlider.style.backgroundColor = '#ccc';
                sliderKnob.style.transform = 'translateX(0px)';
            }
        }

        toggleInput.addEventListener('change', () => {
            // Here you can also update the actual LLM selection in the site if possible!
            updateToggleUI();
        });

        // Compose
        toggleSwitch.appendChild(toggleInput);
        toggleSwitch.appendChild(toggleSlider);

        toggleContainer.appendChild(toggleLabel);
        toggleContainer.appendChild(toggleSwitch);

        document.body.appendChild(toggleContainer);

        // Style for nice hover
        const style = document.createElement('style');
        style.textContent = `
        #gpt5-mode-toggle label:hover span { box-shadow: 0 0 0 3px #6cf6; }
        `;
        document.head.appendChild(style);

        // Initialize
        updateToggleUI();
    }

    function init() {
        // On load and DOM changes
        window.addEventListener('load', injectCustomToggle);

        const observer = new MutationObserver(() => {
            injectCustomToggle();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    init();
})();
