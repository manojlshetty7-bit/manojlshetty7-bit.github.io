/**
 * Portfolio Client Controller
 * Dynamically binds to Backend API endpoints (/api/*)
 * Supports Offline/Static Fallback for GitHub Pages!
 */

// Embedded Fallback Data in case the page is viewed as a static file (e.g. on GitHub Pages)
const FALLBACK_DATA = {
  profile: {
    name: "Manoj L Shetty",
    degree: "B.Tech Computer Science & Engineering",
    semester: "3rd Semester",
    institution: "REVA University, Bengaluru",
    school: "School of Computer Science & Engineering",
    course: "Portfolio Building (B25CS0311)",
    email: "manojlshetty7@gmail.com",
    links: {
      github: "https://github.com/manojlshetty7-bit",
      leetcode: "https://leetcode.com/u/_manoj_l_/",
      hackerrank: "https://www.hackerrank.com/profile/manojlshetty7",
      linkedin: "https://www.linkedin.com/in/manoj-l-shetty-00b6bb43a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    }
  }
};

let currentPortfolioData = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  fetchPortfolioData();
  bindContactForm();
  bindCopyEmail();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const iconSpan = document.getElementById('theme-icon');
  if (iconSpan) {
    iconSpan.innerHTML = theme === 'dark' 
      ? '☀️'
      : '🌙';
  }
}

// Fetch Portfolio Data from Backend API
async function fetchPortfolioData() {
  try {
    const res = await fetch('/api/all');
    if (!res.ok) throw new Error('API unavailable, falling back');
    currentPortfolioData = await res.json();
    console.log('[Frontend] Loaded dynamic data from Backend API:', currentPortfolioData);
  } catch (err) {
    console.warn('[Frontend] Running in static/offline mode:', err.message);
    currentPortfolioData = FALLBACK_DATA;
  }
}

// Contact Form Handler (POST /api/contact -> SQLite Backend)
function bindContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    const payload = {
      name: document.getElementById('contact-name').value.trim(),
      email: document.getElementById('contact-email').value.trim(),
      subject: document.getElementById('contact-subject').value.trim() || 'General Inquiry',
      message: document.getElementById('contact-message').value.trim()
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok && result.success) {
        showToast(result.message || 'Message stored in SQLite database!');
        form.reset();
      } else {
        // Fallback for GitHub Pages static site (no backend server running)
        showToast(`Thank you ${payload.name}! Message noted.`);
        form.reset();
      }
    } catch (err) {
      // In static deployment, open mail client fallback
      showToast(`Thank you ${payload.name}! Opening mail client...`);
      window.location.href = `mailto:manojlshetty7@gmail.com?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.message)}`;
      form.reset();
    } finally {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Copy Email Utility
function bindCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'manojlshetty7@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied to clipboard (manojlshetty7@gmail.com)');
    }).catch(() => {
      prompt('Copy email address:', email);
    });
  });
}

// Toast Helper
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Modal Inbox Message Viewer
async function openInboxModal() {
  const modal = document.getElementById('inbox-modal');
  const container = document.getElementById('messages-list');
  if (!modal || !container) return;

  container.innerHTML = '<p style="color:var(--text-muted);text-align:center;">Loading messages from SQLite database...</p>';
  modal.classList.add('open');

  try {
    const res = await fetch('/api/messages');
    if (!res.ok) throw new Error('API messages unavailable');
    const data = await res.json();

    if (!data.messages || data.messages.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">No messages received in the database yet. Send one through the contact form!</p>';
      return;
    }

    container.innerHTML = data.messages.map(m => `
      <div class="message-item">
        <div class="message-item-header">
          <span class="message-sender">${escapeHtml(m.name)} &lt;${escapeHtml(m.email)}&gt;</span>
          <span class="message-time">${new Date(m.created_at).toLocaleString()}</span>
        </div>
        <div style="font-weight:600;font-size:0.92rem;margin-bottom:6px;color:var(--text);">${escapeHtml(m.subject)}</div>
        <div style="color:var(--text-muted);font-size:0.9rem;white-space:pre-wrap;">${escapeHtml(m.message)}</div>
      </div>
    `).join('');
  } catch (e) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Backend database is accessible when running <code>python server.py</code> or <code>node server.js</code> locally.</p>';
  }
}

function closeInboxModal() {
  const modal = document.getElementById('inbox-modal');
  if (modal) modal.classList.remove('open');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
