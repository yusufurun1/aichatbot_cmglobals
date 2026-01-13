/**
 * CM Globals Chat Widget - Easy Integration Script
 * ==============================================
 * 
 * Bu script, CM Globals Chat Widget'ı herhangi bir web sitesine
 * kolayca entegre etmek için tasarlanmıştır.
 * 
 * KULLANIM:
 * 1. Bu dosyayı sitenize ekleyin: <script src="cmglobals-widget.js"></script>
 * 2. Script otomatik olarak widget'ı sayfanın sağ alt köşesine ekler.
 */

(function () {
  'use strict';

  // Default configuration
  const defaultConfig = {
    position: 'bottom-right',
    chatUrl: 'https://chat.cmglobals.com/popup.html',
    primaryColor: '#0CAA8C', // Green color from CM Globals logo
    autoOpen: false,
    buttonSize: 60,
    widgetWidth: 400,
    widgetHeight: 600,
    zIndex: 999999,
    offsetX: 20,
    offsetY: 20,
    mobileBreakpoint: 768,
  };

  // Merge user config with defaults
  const config = Object.assign({}, defaultConfig, window.CMGlobalsWidgetConfig || {});

  // State
  let isOpen = false;
  let widgetContainer = null;
  let toggleButton = null;
  let iframe = null;
  let iframeLoaded = false;

  // Styles
  const styles = `
    .cmglobals-widget-container {
      position: fixed;
      z-index: ${config.zIndex};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .cmglobals-widget-container.bottom-right {
      bottom: ${config.offsetY}px;
      right: ${config.offsetX}px;
    }

    .cmglobals-widget-container.bottom-left {
      bottom: ${config.offsetY}px;
      left: ${config.offsetX}px;
    }

    .cmglobals-widget-toggle {
      width: ${config.buttonSize}px;
      height: ${config.buttonSize}px;
      border-radius: 50%;
      background: ${config.primaryColor};
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(12, 170, 140, 0.4), 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .cmglobals-widget-toggle:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 25px rgba(12, 170, 140, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .cmglobals-widget-toggle:active {
      transform: scale(0.95);
    }

    .cmglobals-widget-toggle svg {
      width: 28px;
      height: 28px;
      color: #ffffff;
      transition: all 0.3s ease;
    }

    .cmglobals-widget-toggle.open svg.chat-icon {
      opacity: 0;
      transform: rotate(90deg) scale(0);
    }

    .cmglobals-widget-toggle.open svg.close-icon {
      opacity: 1;
      transform: rotate(0) scale(1);
    }

    .cmglobals-widget-toggle svg.close-icon {
      position: absolute;
      opacity: 0;
      transform: rotate(-90deg) scale(0);
    }

    /* Pulse animation for attention */
    .cmglobals-widget-toggle::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: ${config.primaryColor};
      animation: cmglobals-widget-pulse 2s infinite;
      z-index: -1;
    }

    .cmglobals-widget-toggle:hover::before {
      animation: none;
    }

    @keyframes cmglobals-widget-pulse {
      0% {
        transform: scale(1);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.3);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    /* Chat window */
    .cmglobals-widget-window {
      position: absolute;
      width: ${config.widgetWidth}px;
      height: ${config.widgetHeight}px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05);
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      transform-origin: bottom right;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: #ffffff;
    }

    .cmglobals-widget-container.bottom-right .cmglobals-widget-window {
      bottom: ${config.buttonSize + 16}px;
      right: 0;
      transform-origin: bottom right;
    }

    .cmglobals-widget-container.bottom-left .cmglobals-widget-window {
      bottom: ${config.buttonSize + 16}px;
      left: 0;
      transform-origin: bottom left;
    }

    .cmglobals-widget-window.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .cmglobals-widget-iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: #ffffff;
    }

    /* Loading state */
    .cmglobals-widget-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      color: #64748b;
    }

    .cmglobals-widget-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e2e8f0;
      border-top-color: ${config.primaryColor};
      border-radius: 50%;
      animation: cmglobals-widget-spin 1s linear infinite;
    }

    @keyframes cmglobals-widget-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Mobile responsive */
    @media (max-width: ${config.mobileBreakpoint}px) {
      /* White background overlay for keyboard */
      .cmglobals-widget-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: -2000px;
        background: #ffffff;
        z-index: ${config.zIndex};
        display: none;
      }
      
      .cmglobals-widget-backdrop.visible {
        display: block;
      }

      .cmglobals-widget-window {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100% !important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        border-radius: 0;
        transform: translateY(100%);
        transform-origin: bottom center;
        background: #ffffff !important;
        z-index: ${config.zIndex + 1};
      }

      .cmglobals-widget-window.open {
        transform: translateY(0);
      }

      .cmglobals-widget-iframe {
        width: 100% !important;
        height: 100% !important;
        min-height: 100% !important;
        background: #ffffff !important;
      }

      .cmglobals-widget-toggle {
        width: 56px;
        height: 56px;
        z-index: ${config.zIndex + 2};
      }

      .cmglobals-widget-toggle.open {
        position: fixed;
        top: 16px;
        right: 16px;
        bottom: auto;
        background: #ffffff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
      }

      .cmglobals-widget-toggle.open svg {
        color: #333333;
      }

      .cmglobals-widget-toggle svg {
        width: 24px;
        height: 24px;
      }

      .cmglobals-widget-container.bottom-right,
      .cmglobals-widget-container.bottom-left {
        bottom: 16px;
        right: 16px;
        left: auto;
      }
    }
  `;

  // SVG Icons - Proper Chat Bubble
  const chatIcon = `
    <svg class="chat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.04 2 11c0 2.45 1.14 4.68 3 6.25V22l4.75-2.85c.73.09 1.48.14 2.25.14 5.52 0 10-4.04 10-9S17.52 2 12 2zm1 11h-2v-2h2v2zm0-4h-2V6h2v3z"/>
    </svg>
  `;

  const closeIcon = `
    <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/>
    </svg>
  `;

  // Create widget elements
  function createWidget() {
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create white backdrop for mobile keyboard (placed first, behind everything)
    const backdrop = document.createElement('div');
    backdrop.className = 'cmglobals-widget-backdrop';
    backdrop.id = 'cmglobals-widget-backdrop';
    document.body.appendChild(backdrop);

    // Create container
    widgetContainer = document.createElement('div');
    widgetContainer.className = `cmglobals-widget-container ${config.position}`;
    widgetContainer.id = 'cmglobals-chat-widget';

    // Create toggle button
    toggleButton = document.createElement('button');
    toggleButton.className = 'cmglobals-widget-toggle';
    toggleButton.setAttribute('aria-label', 'Chat Widget Aç/Kapat');
    toggleButton.innerHTML = chatIcon + closeIcon;
    toggleButton.addEventListener('click', toggleWidget);

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.className = 'cmglobals-widget-window';
    chatWindow.id = 'cmglobals-widget-window';

    // Create loading indicator
    const loading = document.createElement('div');
    loading.className = 'cmglobals-widget-loading';
    loading.id = 'cmglobals-widget-loading';
    loading.innerHTML = `
      <div class="cmglobals-widget-spinner"></div>
      <span>Yükleniyor...</span>
    `;
    chatWindow.appendChild(loading);

    // Create iframe (lazy load)
    iframe = document.createElement('iframe');
    iframe.className = 'cmglobals-widget-iframe';
    iframe.id = 'cmglobals-widget-iframe';
    iframe.title = 'CM Globals Chat Widget';
    iframe.setAttribute('allow', 'microphone');
    iframe.style.display = 'none';

    iframe.addEventListener('load', function () {
      iframeLoaded = true;
      document.getElementById('cmglobals-widget-loading').style.display = 'none';
      iframe.style.display = 'block';
    });

    chatWindow.appendChild(iframe);

    // Assemble widget
    widgetContainer.appendChild(chatWindow);
    widgetContainer.appendChild(toggleButton);

    // Add to page
    document.body.appendChild(widgetContainer);

    // Auto open if configured
    if (config.autoOpen) {
      setTimeout(function () {
        toggleWidget();
      }, 1500);
    }
  }

  // Toggle widget open/close
  function toggleWidget() {
    isOpen = !isOpen;

    const chatWindow = document.getElementById('cmglobals-widget-window');
    const backdrop = document.getElementById('cmglobals-widget-backdrop');
    const isMobile = window.innerWidth <= config.mobileBreakpoint;

    if (isOpen) {
      toggleButton.classList.add('open');
      chatWindow.classList.add('open');

      // On mobile, modify the parent page to have white background
      if (isMobile) {
        // Show white backdrop
        if (backdrop) {
          backdrop.classList.add('visible');
        }

        // Force white background on html and body
        document.documentElement.style.cssText = 'background: #ffffff !important; background-color: #ffffff !important; overflow: hidden !important;';
        document.body.style.cssText += 'background: #ffffff !important; background-color: #ffffff !important; overflow: hidden !important;';
      }

      // Load iframe content on first open
      if (!iframe.src) {
        iframe.src = config.chatUrl;
      }
    } else {
      toggleButton.classList.remove('open');
      chatWindow.classList.remove('open');

      // Hide backdrop and restore body styles
      if (backdrop) {
        backdrop.classList.remove('visible');
      }

      if (isMobile) {
        document.documentElement.style.cssText = '';
        document.body.style.cssText = document.body.style.cssText.replace(/background:\s*#ffffff\s*!important;?\s*/gi, '').replace(/background-color:\s*#ffffff\s*!important;?\s*/gi, '').replace(/overflow:\s*hidden\s*!important;?\s*/gi, '');
      }
    }
  }

  // Public API
  window.CMGlobalsWidget = {
    open: function () {
      if (!isOpen) toggleWidget();
    },
    close: function () {
      if (isOpen) toggleWidget();
    },
    toggle: toggleWidget,
    isOpen: function () {
      return isOpen;
    },
    destroy: function () {
      if (widgetContainer) {
        widgetContainer.remove();
        widgetContainer = null;
        toggleButton = null;
        iframe = null;
        isOpen = false;
      }
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }

  // Handle escape key to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      toggleWidget();
    }
  });

})();
